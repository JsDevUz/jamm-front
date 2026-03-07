import React from "react";
import ConfirmDialog from "../../../../shared/ui/dialogs/ConfirmDialog";
import useChatAreaUiStore from "../store/useChatAreaUiStore";

const ChatAreaDeleteDialog = ({ currentChat, currentUser, onConfirm }) => {
  const isDeleteDialogOpen = useChatAreaUiStore(
    (state) => state.isDeleteDialogOpen,
  );
  const closeDeleteDialog = useChatAreaUiStore((state) => state.closeDeleteDialog);

  const isLeavingGroup =
    currentChat?.isGroup && currentChat?.createdBy !== currentUser?._id;

  return (
    <ConfirmDialog
      isOpen={isDeleteDialogOpen}
      onClose={closeDeleteDialog}
      title={isLeavingGroup ? "Guruhni tark etish" : "Suhbatni o'chirish"}
      description={
        isLeavingGroup
          ? "Siz haqiqatan ham ushbu guruhni tark etmoqchimisiz?"
          : "Siz haqiqatan ham ushbu suhbatni o'chirib tashlamoqchimisiz? Bu amal barcha xabarlarni ikkala tomon uchun ham o'chirib yuboradi."
      }
      confirmText={isLeavingGroup ? "Chiqish" : "O'chirish"}
      onConfirm={onConfirm}
      isDanger
    />
  );
};

export default ChatAreaDeleteDialog;
