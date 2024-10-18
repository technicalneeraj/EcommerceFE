import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { authContext } from "../utility/AuthContext";

const ItemCategoryCard = ({ product, isFavoriteInDb }) => {
  const { isLog } = useContext(authContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const handleHeartClicked = async (ID) => {
    if (!isLog) {
      toast.error("Please Login First");
      navigate("/login");
      return;
    }
    setIsFavorited(!isFavorited);
    try {
      const response = await apiRequest(
        "PATCH",
        `/user/updating-user-wishlist/${ID}`
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="relative cursor-pointer flex flex-col  bg-white  overflow-hidden mx-3 h-[30rem] w-[18rem]  mb-5 mt-4">
        <div className="h-[25rem] w-[18rem]">
          <img
            onClick={() => navigate(`/product/${product._id}`)}
            className="w-full h-full object-cover object-top"
            src={product.images[0].url}
          />
        </div>
        <div className="mb-4 mt-2">
          <div className="bold">{product.name}</div>
          <hr />
          {product.discountPrice > 0 ? (
            <div className="flex">
              <div className="font-bold mr-2">
                &#8377;
                {product.price-product.discountPrice}
               
              </div>
              <div className="line-through text-gray-400">&#8377;
              {product.price}</div>
            </div>
          ) : (
            <div className="font-bold">
              &#8377;
              {product.price}
            </div>
          )}
        </div>
        <button
          onClick={() => handleHeartClicked(product._id)}
          className="absolute top-2 rounded-full p-1 right-2 text-red-500 bg-white  cursor-pointer border-none"
        >
          {isFavoriteInDb || isFavorited ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>
      </div>
    </>
  );
};

export default ItemCategoryCard;
