import React from "react";

const NewAddressModal = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
  return (
    <div className="flex justify-center items-center z-50  fixed inset-0 bg-black bg-opacity-50">
      <div className="bg-white relative rounded shadow-md max-w-96"></div>
    </div>
  );
};

export default NewAddressModal;
