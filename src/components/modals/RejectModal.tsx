import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  shopName: string;
  onConfirm: () => void;
};

const RejectModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  shopName,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4">
      <div className="rounded-2xl bg-white p-6 dark:bg-gray-900">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Reject Shop
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Are you sure you want to reject
          <span className="font-semibold"> "{shopName}"</span>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={closeModal}>
            Cancel
          </Button>

          <Button
            className="bg-red-500"
            size="sm"
            onClick={() => {
              onConfirm();
              closeModal();
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
