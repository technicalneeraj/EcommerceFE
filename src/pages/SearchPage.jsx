import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../utility/Api";
import ItemCategoryCard from "../components/ItemCategoryCard";
import { useCategory } from "../utility/CategoryContext";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");
  const [products, setProducts] = useState([]);
  const { currentCategory } = useCategory();
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, [q]);

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
              {similarProducts.map((product) => (
                <ItemCategoryCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {products.map((product) => (
              <ItemCategoryCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
