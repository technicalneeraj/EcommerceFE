import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../utility/AuthContext";
import { apiRequest } from "../utility/Api";
import WishlistCard from "../components/WishlistCard";

const Wishlist = () => {
  const navigate = useNavigate();
  const { isLog } = useContext(authContext);
  const [itemsCount, setItemsCount] = useState(0);
  const [wishListItems, setWishListItems] = useState([]);
  useEffect(() => {
    if (isLog) {
      const productFetching = async () => {
        const response = await apiRequest("GET", "/user/wishlist-product");
        setItemsCount(response.data.data.length);
        setWishListItems(response.data.data);
      };
      productFetching();
    }
  }, [wishListItems]);
  return (
    <div>
      {itemsCount === 0 ? (
        <div className="flex flex-col flex-wrap items-center">
          <img
            className="h-96 p-3"
            src="https://www.thesouledstore.com/static/img/wishList-empty-icon.fd2a993.png"
          ></img>
          <div className="font-extrabold text-xl">
            Your wishlist is lonely and looking for love.
          </div>
          <div className="text-gray-700 mt-3">
            Add products to your wishlist, review them anytime and easily move
            to cart.
          </div>
          <div className="font-bold mb-9 mt-5">
            <button
              className="text-gray-700 border border-gray-700 p-3 rounded-xl mr-5"
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
            {!isLog && (
              <button
                className="bg-gray-700 p-3 rounded-xl text-white"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col container mx-auto pb-5">
          <div className="ml-3 mb-3">
            <span className="font-bold">My Wishlist </span>
            <span className="text-gray-500">({itemsCount} items)</span>
          </div>
          <div className="flex flex-wrap">
            {wishListItems.length > 0 &&
              wishListItems.map((item) => (
                <WishlistCard
                  item={item}
                  key={item._id}
                  setWishListItems={setWishListItems}
                />
              ))}
          </div>
          {/* <div className="mb-9"></div> */}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
