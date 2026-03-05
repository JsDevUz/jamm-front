import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePresence } from "./PresenceContext";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CallContext = createContext();

export const useCall = () => useContext(CallContext);

export const CallProvider = ({ children }) => {
  const { socket } = usePresence();
  const currentUser = useAuthStore((s) => s.user);

  const [incomingCall, setIncomingCall] = useState(null); // { fromUser, roomId, callType }
  const [outgoingCall, setOutgoingCall] = useState(null); // { targetUser, roomId, callType }
  const [activeCall, setActiveCall] = useState(null); // { roomId, callType, remoteUser }

  // 1. Signal listeners
  useEffect(() => {
    if (!socket) return;

    const handleIncoming = (data) => {
      // If already in a call or calling, auto-reject or handle busy
      if (activeCall || outgoingCall || incomingCall) {
        socket.emit("call:reject", {
          toUserId: data.fromUser._id,
          roomId: data.roomId,
          reason: "busy",
        });
        return;
      }
      setIncomingCall(data);
    };

    const handleAccepted = (data) => {
      if (outgoingCall && outgoingCall.roomId === data.roomId) {
        setActiveCall({
          roomId: data.roomId,
          callType: outgoingCall.callType,
          remoteUser: outgoingCall.targetUser,
          isCaller: true,
        });
        setOutgoingCall(null);
      }
    };

    const handleRejected = (data) => {
      if (outgoingCall && outgoingCall.roomId === data.roomId) {
        toast.error(`${outgoingCall.targetUser.name} qo'ng'iroqni rad etdi`);
        setOutgoingCall(null);
      }
    };

    const handleCancelled = (data) => {
      if (incomingCall && incomingCall.roomId === data.roomId) {
        setIncomingCall(null);
      }
    };

    socket.on("call:incoming", handleIncoming);
    socket.on("call:accepted", handleAccepted);
    socket.on("call:rejected", handleRejected);
    socket.on("call:cancelled", handleCancelled);

    return () => {
      socket.off("call:incoming", handleIncoming);
      socket.off("call:accepted", handleAccepted);
      socket.off("call:rejected", handleRejected);
      socket.off("call:cancelled", handleCancelled);
    };
  }, [socket, activeCall, outgoingCall, incomingCall]);

  // 2. Actions
  const startPrivateCall = useCallback(
    (targetUser, callType = "video") => {
      if (!socket || !currentUser) return;

      const roomId = uuidv4();
      const callData = {
        toUserId: targetUser._id,
        roomId,
        callType,
      };

      setOutgoingCall({ targetUser, roomId, callType });
      socket.emit("call:request", callData);
    },
    [socket, currentUser],
  );

  const acceptCall = useCallback(() => {
    if (!socket || !incomingCall) return;

    socket.emit("call:accept", {
      toUserId: incomingCall.fromUser._id,
      roomId: incomingCall.roomId,
    });

    setActiveCall({
      roomId: incomingCall.roomId,
      callType: incomingCall.callType,
      remoteUser: incomingCall.fromUser,
      isCaller: false,
    });
    setIncomingCall(null);
  }, [socket, incomingCall]);

  const rejectCall = useCallback(() => {
    if (!socket || !incomingCall) return;

    socket.emit("call:reject", {
      toUserId: incomingCall.fromUser._id,
      roomId: incomingCall.roomId,
    });
    setIncomingCall(null);
  }, [socket, incomingCall]);

  const cancelCall = useCallback(() => {
    if (!socket || !outgoingCall) return;

    socket.emit("call:cancel", {
      toUserId: outgoingCall.targetUser._id,
      roomId: outgoingCall.roomId,
    });
    setOutgoingCall(null);
  }, [socket, outgoingCall]);

  const endActiveCall = useCallback(() => {
    // WebRTC logout is handled by the component cleanup
    setActiveCall(null);
  }, []);

  const value = {
    incomingCall,
    outgoingCall,
    activeCall,
    startPrivateCall,
    acceptCall,
    rejectCall,
    cancelCall,
    endActiveCall,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};
