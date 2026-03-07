import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupVideoCall } from "../../features/calls/components";
import useAuthStore from "../../store/authStore";
import useMeetCallStore from "../../store/meetCallStore";

export default function MeetCallHost() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.user);
  const activeCall = useMeetCallStore((state) => state.activeCall);
  const isMinimized = useMeetCallStore((state) => state.isMinimized);
  const minimizeCall = useMeetCallStore((state) => state.minimizeCall);
  const maximizeCall = useMeetCallStore((state) => state.maximizeCall);
  const endCall = useMeetCallStore((state) => state.endCall);

  React.useEffect(() => {
    if (!location.pathname.startsWith("/join/")) {
      sessionStorage.setItem(
        "meet_return_path",
        `${location.pathname}${location.search}${location.hash}`,
      );
    }
  }, [location.pathname, location.search, location.hash]);

  if (!activeCall?.roomId) return null;

  const handleClose = () => {
    const returnPath = activeCall.returnPath || "/chats";
    endCall();

    if (location.pathname.startsWith("/join/")) {
      navigate(returnPath);
    }
  };

  const handleMinimize = () => {
    minimizeCall();

    if (location.pathname.startsWith("/join/") && currentUser) {
      navigate(activeCall.returnPath || "/chats");
    }
  };

  return (
    <GroupVideoCall
      isOpen
      roomId={activeCall.roomId}
      chatTitle={activeCall.chatTitle}
      isCreator={activeCall.isCreator}
      isPrivate={activeCall.isPrivate}
      initialMicOn={activeCall.initialMicOn}
      initialCamOn={activeCall.initialCamOn}
      isMinimized={isMinimized}
      onMinimize={handleMinimize}
      onMaximize={maximizeCall}
      onClose={handleClose}
    />
  );
}
