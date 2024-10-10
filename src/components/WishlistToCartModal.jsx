import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const WishlistToCartModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedSize,
  setSelectedSize,
}) => {
  if (!isOpen) return null;
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  return (
    <div className="fixed flex justify-center items-center z-50  inset-0 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded relative shadow-md">
        <button
          onClick={onClose}
          className="mr-2 bg-gray-300 p-2 rounded absolute top-2 right-2"
        >
          <CloseIcon />
        </button>
        <h2 className="mb-4">Are you sure you want to cart?</h2>
        <div>
          <hr />
          <div className="font-bold">Please select a size.</div>
          <div className="flex flex-wrap space-x-2 mt-2">
            {sizes.map((size) => (
              <div
                key={size}
                className={`border-2 rounded-3xl pr-3 pl-3 pt-2 pb-2 cursor-pointer 
                ${selectedSize === size ? "border-black" : "border-gray-400"}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onConfirm}
          className="bg-gray-500 font-bold text-white p-2 w-full mt-2 rounded"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default WishlistToCartModal;
