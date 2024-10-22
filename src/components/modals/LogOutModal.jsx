import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const LogOutModal = ({ isOpen, onClose, onConfirm, image, text1, text2 }) => {
  
  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center z-50  fixed inset-0 bg-black bg-opacity-50">
      <div className="bg-white relative rounded shadow-md max-w-96">
        <button
          onClick={onClose}
          className="z-10 bg-red-800 text-white rounded absolute top-0 right-0 -mr-2 -mt-2"
        >
          <CloseIcon />
        </button>
        <div className="p-3 flex space-x-2">
          <div>
            <img src={image} className="h-16" />
          </div>
          <div>
            <div className="font-bold text-red-800 text-center mb-3">{text1}</div>
            <div className="text-gray-500">{text2}</div>
          </div>
        </div>
        <div className="flex w-full font-bold">
          <button
            onClick={onConfirm}
            className="bg-red-500 w-1/2 text-white p-2"
          >
            CONFIRM
          </button>

          <button
            onClick={onClose}
            className=" border border-red-500 text-red-500 w-1/2 p-2"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
