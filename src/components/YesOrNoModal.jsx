import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const YesOrNoModal = ({ isOpen, onClose, onConfirm, image, text1, text2 }) => {
  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center z-50  fixed inset-0 bg-black bg-opacity-50">
      <div className="bg-white relative rounded shadow-md max-w-96">
      <button
          onClick={onClose}
          className="mr-2 bg-gray-300 rounded absolute top-2 right-2"
        >
          <CloseIcon />
        </button>
        <div className="p-3 flex space-x-2">
          <div>
            <img src={image} className="h-24" />
          </div>
          <div>
            <div className="font-bold">{text1}</div>
            <div className="text-gray-500">{text2}</div>
          </div>
        </div>
        <div className="flex w-full font-bold">
          <button
            onClick={onClose}
            className=" border border-gray-300 w-1/2 p-2"
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            className="bg-gray-600 w-1/2 text-white p-2"
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default YesOrNoModal;
