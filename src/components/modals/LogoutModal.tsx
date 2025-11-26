import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<Props> = ({ isOpen, closeModal, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4">
      <div className="rounded-2xl bg-white p-6 dark:bg-gray-900">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Logout
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Are you sure you want to logout?
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
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
