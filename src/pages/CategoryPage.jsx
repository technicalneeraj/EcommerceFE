import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utility/Api";
import ItemCategoryCard from "../components/ItemCategoryCard";
import { authContext } from "../utility/AuthContext";

const CategoryPage = () => {
  const { userData } = useContext(authContext);
  const { Pcategory, category } = useParams();
  const [bannerImage, setBannerImage] = useState("");
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchBanner();
    fetchProduct();
  }, [Pcategory, category]);

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

  const fetchProduct = async () => {
    const product = await apiRequest(
      "GET",
      `/product/pageCategory?Pcategory=${Pcategory}&type=${category}`
    );
    setProducts(product.data.products);
  };
  const fetchBanner = async () => {
    const banner = await apiRequest(
      "GET",
      `/api/categories/banner?Pcategory=${Pcategory}&type=${category}`
    );
    setBannerImage(banner.data.image);
  };
  return (
    <div className="flex mx-auto flex-col">
      <div className="flex justify-center">
        <img src={bannerImage} />
      </div>
      <div className="flex container mx-auto justify-center">
        <div className="bg-red-400"></div>
        <div className="w-full flex justify-center flex-wrap ">
          {products.map((product) => {
            const isFavorited = wishlist.some((item) => item === product._id);
            return (
              <ItemCategoryCard
                product={product}
                key={product._id}
                isFavoriteInDb={isFavorited}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
