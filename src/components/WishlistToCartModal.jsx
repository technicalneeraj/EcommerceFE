import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const WishlistToCartModal = ({
  item,
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
        <div>
          <div className="flex">
            <div>
              <img src={item.images[0].url} className="h-24 p-1 mr-2"></img>
            </div>
            <div>
              <div className="font-bold text-sm">{item.name}</div>
              <div className="text-gray-400">{item.category.type}</div>
              <div className="font-extrabold">&#8377; {item.price}</div>
            </div>
          </div>
        </div>
        {/* <h2 className="mb-4">Are you sure you want to cart?</h2> */}
        <div>
          <hr />
          <div className="font-bold mb-2">Please select a size.</div>
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
        {
          selectedSize=="" ? ( <button
            disabled
            className="bg-gray-500 cursor-not-allowed font-bold text-white p-2 w-full mt-2 rounded"
          >
            ADD TO CART
          </button>)
          :(
            <button
            onClick={onConfirm}
            className="bg-red-400 cursor-pointer font-bold text-white p-2 w-full mt-2 rounded"
          >
            ADD TO CART
          </button>
          )
        }
       
      </div>
    </div>
  );
};

export default WishlistToCartModal;
