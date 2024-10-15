import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { apiRequest } from "../../utility/Api";
import { useCategory } from "../../utility/CategoryContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";
const MainCarousel = () => {
  const { currentCategory } = useCategory();
  const [data, setData] = useState([]);
  const carouselRef = useRef(null);
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

  const items = data.map((item) => (
    <img
      className="cursor-pointer w-full"
      role="presentation"
      src={item.image}
      alt="carouselimage"
    />
  ));

  const goToNext = () => {
    carouselRef.current.slideNext();
  };

  const goToPrev = () => {
    carouselRef.current.slidePrev();
  };
  return (
    <div className="flex justify-center relative items-center">
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        controlsStrategy="alternate"
        disableButtonsControls
        infinite
      />
      <button
        onClick={goToPrev}
        className=" left-5 top-64 absolute p-2  rounded"
      >
        <ArrowBackIosIcon />
      </button>
      <button
        onClick={goToNext}
        className="right-5 top-64 absolute p-2  rounded"
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default MainCarousel;
