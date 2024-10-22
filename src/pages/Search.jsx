import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { apiRequest } from "../utility/Api";
import { useCategory } from "../utility/CategoryContext";
import { authContext } from "../utility/AuthContext";
import ItemCategoryCard from "../components/CategoryProductCard";

const Search = () => {

  const location = useLocation();
  const { userData } = useContext(authContext);
  const q = queryParams.get("q");
  const queryParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const { currentCategory } = useCategory();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [q]);

  useEffect(() => {
    if (userData) {
      const fetchWishlist = async () => {
        try {
          const { status, data } = await apiRequest(
            "GET",
            "/user/send-wishlist"
          );
          if (status === 200) {
            setWishlist(data.wishlistData);
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };
      fetchWishlist();
    }
  }, []);

  const fetchProducts = async () => {
    const res = await apiRequest("GET", `/product/search?search=${q}`);
    setProducts(res.data);
    if (res.data.length == 0) {
      fetchSimilarProducts();
    }
  };

  const fetchSimilarProducts = async () => {
    const res = await apiRequest("GET", `/product?category=${currentCategory}`);
    setSimilarProducts(res.data.message);
  };

  return (
    <div className="container mx-auto">
      <div></div>
      <div>
        <div className="text-2xl">
          Showing results for {q} -{" "}
          <span className="text-gray-400">{products.length} items</span>
        </div>
        {products.length == 0 ? (
          <div>
            <div className="text-center text-xl pt-3 pb-5">
              The product you are searching for cannot be found
            </div>
            <div className="text-2xl">
              Here are the closely relevant search results
            </div>
            <div className="flex flex-wrap">
              {similarProducts.map((product) => {
                const isFavorited = wishlist.some(
                  (item) => item === product._id
                );

                return (
                  <ItemCategoryCard
                    key={product._id}
                    product={product}
                    isFavoriteInDb={isFavorited}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {products.map((product) => {
              const isFavorited = wishlist.some((item) => item === product._id);
              return (
                <ItemCategoryCard
                  key={product._id}
                  product={product}
                  isFavoriteInDb={isFavorited}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
