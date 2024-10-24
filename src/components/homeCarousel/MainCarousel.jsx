import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { apiRequest } from "../../utility/Api";
import { useCategory } from "../../utility/CategoryContext";

const MainCarousel = () => {
  const navigate = useNavigate();
  const { currentCategory } = useCategory();
  const carouselRef = useRef(null);
  const [data, setData] = useState([]);
  const [child, setChild] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest(
          "GET",
          `/api/categories/banner?category=${currentCategory}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentCategory]);

  const items = data.map((item) => {
    // setChild(item.category.split(',')[0])
    return (
      <img
        className="cursor-pointer w-full"
        role="presentation"
        src={item.image}
        alt="carouselimage"
        onClick={() =>
          navigate(`/${currentCategory}/${item.category.split(",")[0]}`)
        }
      />
    );
  });

  const goToNext = () => {
    carouselRef.current.slideNext();
  };

  const goToPrev = () => {
    carouselRef.current.slidePrev();
  };

  return (
    <>
      <div className="flex justify-center relative items-center">
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          controlsStrategy="alternate"
          disableButtonsControls
          infinite
        />
        <div className="absolute top-1/2 left-4 hidden sm:flex items-center">
          <button
            onClick={goToPrev}
            className="rounded p-2 bg-gray-200 hover:bg-gray-300 transition"
          >
            <ArrowBackIosIcon />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 hidden sm:flex items-center">
          <button
            onClick={goToNext}
            className="rounded p-2 bg-gray-200 hover:bg-gray-300 transition"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default MainCarousel;
