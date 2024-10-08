import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { apiRequest } from "../../utility/Api";

const MainCarousel = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest('GET', '/Bannerdata');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const items = data.map((item) => <img className="cursor-pointer w-full" role="presentation" src={item.image} alt='carouselimage' />)

  return (
    <div className=' flex justify-center items-center'>
      <AliceCarousel
        mouseTracking
        items={items}
        controlsStrategy="alternate"
        disableButtonsControls
        // autoPlay
        // autoPlayInterval={1000}
        infinite
      />
    </div>
  )
};

export default MainCarousel;