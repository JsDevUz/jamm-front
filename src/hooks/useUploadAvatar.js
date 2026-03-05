import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../api/chatApi";

const useUploadAvatar = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    },
  });
};

export default useUploadAvatar;
