import React from "react";
import {
  IncomingCallRequest,
  OutgoingCallRequest,
  PrivateVideoCall,
} from "../../features/calls/components";
import { useCall } from "../../contexts/CallContext";

export default function CallOverlays() {
  const {
    incomingCall,
    outgoingCall,
    activeCall,
    acceptCall,
    rejectCall,
    cancelCall,
    endActiveCall,
  } = useCall();

  return (
    <>
      {incomingCall && (
        <IncomingCallRequest
          isOpen={Boolean(incomingCall)}
          caller={incomingCall.fromUser}
          onAccept={acceptCall}
          onReject={rejectCall}
        />
      )}
      {outgoingCall && (
        <OutgoingCallRequest
          isOpen={Boolean(outgoingCall)}
          target={outgoingCall.targetUser}
          onCancel={cancelCall}
        />
      )}
      {activeCall && (
        <PrivateVideoCall
          isOpen={Boolean(activeCall)}
          roomId={activeCall.roomId}
          remoteUser={activeCall.remoteUser}
          isCaller={activeCall.isCaller}
          onClose={endActiveCall}
        />
      )}
    </>
  );
}
