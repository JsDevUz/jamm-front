import { useMutation } from "@tanstack/react-query";
import { updateGroupAvatar } from "../api/chatApi";

const useUpdateGroupAvatar = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: updateGroupAvatar,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    },
  });
};

export default useUpdateGroupAvatar;
