import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import MainCarousel from "../components/HomeCarousel/MainCarousel";
import { apiRequest } from "../utility/Api";
import Product from "../components/Product";
import CategoryCard from "../components/CategoryCard";
import { useLocation, useParams } from "react-router-dom";
import { useCategory } from "../utility/CategoryContext";

const Home = () => {
  const { setCurrentCategory, currentCategory } = useCategory();
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const category = location.pathname.split('/').pop(); 
    setCurrentCategory(category);
    const fetchData = async () => {
      if (currentCategory) {
        try {
          const response = await apiRequest(
            "GET",
            `/api/categories?category=${currentCategory}`
          );
          if (response.status === 200) {
            setData(response.data);
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
      <MainCarousel />
      <h1 className="text-2xl font-extrabold py-5 text-center">Categories</h1>
      <div className="flex flex-wrap justify-center">
        {data.map((single, index) => (
          <CategoryCard imageUrl={single.image} key={index} Pcategory={currentCategory} category={single.type}/> // Using index as key
        ))}
      </div>
      <h1 className="text-2xl font-extrabold py-5 text-center">New Arrivals</h1>
      <div>
        <Product />
      </div>
    </>
  );
};

export default Home;
