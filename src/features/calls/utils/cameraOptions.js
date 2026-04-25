const CAMERA_FACING_PREFIX = "__camera_facing__:";

function isMobileLikeEnvironment() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  return coarsePointer || /(iphone|ipad|ipod|android|mobile)/i.test(navigator.userAgent || "");
}

export function buildCameraDeviceOptions(devices = []) {
  const options = devices.map((device, index) => ({
    id: device.deviceId,
    label: device.label || `Camera ${index + 1}`,
  }));

  const hasNamedFacingCamera = options.some((option) =>
    /(front|back|rear|ultra|wide|tele|selfie|facetime)/i.test(option.label),
  );
  const hasIPhoneLikeCamera = options.some((option) => /(iphone|ipad)/i.test(option.label));
  const shouldAddFacingOptions =
    options.length > 0 &&
    !hasNamedFacingCamera &&
    (hasIPhoneLikeCamera || (isMobileLikeEnvironment() && options.length <= 2));

  if (!shouldAddFacingOptions) return options;

  const baseDeviceId = options[0]?.id || "default";

  return [
    { id: `${CAMERA_FACING_PREFIX}user:${baseDeviceId}`, label: "Front camera" },
    {
      id: `${CAMERA_FACING_PREFIX}environment:${baseDeviceId}`,
      label: "Back camera",
    },
    ...options,
  ];
}

export function parseCameraDeviceSelection(selectionId = "") {
  if (!selectionId.startsWith(CAMERA_FACING_PREFIX)) {
    return {
      mode: "device",
      deviceId: selectionId,
    };
  }

  const [facingMode = "environment", deviceId = ""] = selectionId
    .slice(CAMERA_FACING_PREFIX.length)
    .split(":");

  return {
    mode: "facing",
    deviceId,
    facingMode,
  };
}
