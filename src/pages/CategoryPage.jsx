import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utility/Api";
import ItemCategoryCard from "../components/ItemCategoryCard";

const CategoryPage = () => {
  const { Pcategory, category } = useParams();
  const [bannerImage, setBannerImage] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchBanner();
    fetchProduct();
  }, [Pcategory, category]);

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
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="flex container mx-auto justify-center">
        <div className="bg-red-400">         
        </div>
        <div className="w-full flex justify-center flex-wrap ">
          {products.map((product) => (
            <ItemCategoryCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
