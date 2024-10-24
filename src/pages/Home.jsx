import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useCategory } from "../utility/CategoryContext";
import { apiRequest } from "../utility/Api";
import MainCarousel from "../components/homeCarousel/MainCarousel";
import Product from "../components/Product";
import CategoryCard from "../components/CategoryCard";
import LoaderModal from "../components/modals/LoaderModal";

const Home = () => {

  const location = useLocation();
  const { setCurrentCategory, currentCategory } = useCategory();
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {

    const category = location.pathname.split('/').pop(); 
    setCurrentCategory(category);
    const fetchData = async () => {
      setIsLoading(true);
      if (currentCategory) {
        try {
          const response = await apiRequest(
            "GET",
            `/api/categories?category=${currentCategory}`
          );
          if (response.status === 200) {
            setData(response.data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
    
  }, [currentCategory]);

  return (
    <>
      <LoaderModal isOpen={isLoading} text={"Wait for a while"}/>
      <MainCarousel />
      <h1 className="text-2xl font-extrabold py-5 text-center">Categories</h1>
      <div className="flex flex-wrap justify-center">
        {data.map((single, index) => (
          <CategoryCard imageUrl={single.image} key={index} Pcategory={currentCategory} category={single.type}/> // Using index as key
        ))}
      </div>
      <h1 className="text-2xl font-extrabold py-5 text-center">New Arrivals</h1>
      <div className="overflow-hidden">
        <Product />
      </div>
    </>
  );
};

export default Home;
