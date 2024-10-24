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

  const Uppersizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const Lowersizes = ["28", "30", "32", "34", "36"];

  return (
    <div className="fixed flex justify-center items-center z-50 inset-0 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded relative shadow-md w-11/12 sm:w-1/3 max-w-md">
        <button
          onClick={onClose}
          className="mr-2 bg-gray-300 p-2 rounded absolute top-2 right-2"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col sm:flex-row items-start">
          <div className="mb-4 sm:mb-0">
            <img src={item.images[0].url} className="h-24 p-1 mr-2" alt={item.name} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">{item.name}</div>
            <div className="text-gray-400">{item.category.type}</div>
            {item.discountPrice > 0 ? (
              <div className="font-bold">
                &#8377; {item.price - item.discountPrice}
                <span className="line-through text-gray-400 ml-1">
                  &#8377; {item.price}
                </span>
              </div>
            ) : (
              <div className="font-bold">&#8377; {item.price}</div>
            )}
          </div>
        </div>

        <div>
          <hr />
          <div className="font-bold mb-2">Please select a size.</div>
          <div className="flex flex-wrap space-x-2 mt-2">
            {item.category.parent.includes("upper")
              ? Uppersizes.map((size) => (
                  <div
                    key={size}
                    className={`border-2 rounded-3xl pr-3 mt-2 pl-3 pt-2 pb-2 cursor-pointer 
                    ${selectedSize === size ? "border-black" : "border-gray-400"}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))
              : Lowersizes.map((size) => (
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
          disabled={selectedSize === ""}
          onClick={selectedSize ? onConfirm : null}
          className={`${
            selectedSize === ""
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-400 cursor-pointer"
          } font-bold text-white p-2 w-full mt-2 rounded`}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default WishlistToCartModal;
