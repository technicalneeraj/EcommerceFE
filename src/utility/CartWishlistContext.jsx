import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "./Api";
import { authContext } from "./AuthContext";

const CartWishlistContext = createContext();

export const CartWishlistProvider = ({ children }) => {
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [totalItemInWishlist, setTotalItemInWishlist] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isLog } = useContext(authContext);

  const getCount = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest("GET", "/user/total-item-in-cart-and-wishilist");
      setTotalItemInWishlist(response.data.totalWishlistItems);
      setTotalItemInCart(response.data.totalCartItems);
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLog) {
      getCount();
    } else {
      setTotalItemInCart(0);
      setTotalItemInWishlist(0);
      setIsLoading(false);
    }
  }, [isLog]);

  return (
    <CartWishlistContext.Provider
      value={{
        totalItemInCart,
        totalItemInWishlist,
        setTotalItemInCart,
        setTotalItemInWishlist,
        isLoading,
        getCount
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  return useContext(CartWishlistContext);
};
