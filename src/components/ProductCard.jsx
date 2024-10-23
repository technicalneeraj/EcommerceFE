import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LoaderModal from "./modals/LoaderModal";
import { apiRequest } from "../utility/Api";
import { authContext } from "../utility/AuthContext";
import { useCartWishlist } from "../utility/CartWishlistContext";

const ProductCard = ({ imageUrl, ID, isFavoriteInDb }) => {
  const navigate = useNavigate();
  const { userData } = useContext(authContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const { getCount } = useCartWishlist();
  const [isLoading, setIsLoading] = useState(false);

  const handleHeartClicked = async (ID) => {
    if (!userData) {
      toast.error("Please Login First");
      navigate("/login");
      return;
    }
    setIsLoading(true);
    setIsFavorited(!isFavorited);
    try {
      const response = await apiRequest(
        "PATCH",
        `/user/updating-user-wishlist/${ID}`
      );
      await getCount();
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <LoaderModal isOpen={isLoading} text={"Wait for a second"} />
      <div className="relative cursor-pointer flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden mx-3 w-[23rem] h-[36rem] mb-4 mt-4">
        <div className="h-[36rem] w-[23rem]">
          <img
            onClick={() => navigate(`/product/${ID}`)}
            className="w-full h-full object-cover object-top"
            src={imageUrl}
          />
        </div>
        <button
          onClick={() => handleHeartClicked(ID)}
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

export default ProductCard;
