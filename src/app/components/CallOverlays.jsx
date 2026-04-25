import React, { Suspense, lazy } from "react";
import { useCall } from "../../contexts/CallContext";

const IncomingCallRequest = lazy(() =>
  import("../../features/calls/components").then((module) => ({
    default: module.IncomingCallRequest,
  })),
);
const OutgoingCallRequest = lazy(() =>
  import("../../features/calls/components").then((module) => ({
    default: module.OutgoingCallRequest,
  })),
);
const PrivateVideoCall = lazy(() =>
  import("../../features/calls/components").then((module) => ({
    default: module.PrivateVideoCall,
  })),
);

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
    <Suspense fallback={null}>
      {incomingCall && (
        <IncomingCallRequest
          isOpen={Boolean(incomingCall)}
          caller={incomingCall.fromUser}
          callType={incomingCall.callType}
          onAccept={acceptCall}
          onReject={rejectCall}
        />
      )}
      {outgoingCall && (
        <OutgoingCallRequest
          isOpen={Boolean(outgoingCall)}
          target={outgoingCall.targetUser}
          callType={outgoingCall.callType}
          onCancel={cancelCall}
        />
      )}
      {activeCall && (
        <PrivateVideoCall
          isOpen={Boolean(activeCall)}
          roomId={activeCall.roomId}
          remoteUser={activeCall.remoteUser}
          callType={activeCall.callType}
          isCaller={activeCall.isCaller}
          onClose={endActiveCall}
        />
      )}
    </Suspense>
  );
}
