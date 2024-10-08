import React, { useState, useEffect } from 'react'
import Card from '../components/Card';
import MainCarousel from '../components/HomeCarousel/MainCarousel';
import { apiRequest } from '../utility/Api';
import Product from '../components/Product';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchcategories = async () => {
      const response = await apiRequest("GET", "/api/categories");
      if (response.status == 200) {
        setData(response.data)
      }
    }
    fetchcategories();
  });


  return (
    <>
      <MainCarousel/>
      <h1 className='text-2xl font-extrabold py-5 text-center'>Categories</h1>
      <div className='flex flex-wrap justify-center'>
        {
          data.map((single, index) => (
            <Card imageUrl={single.image} key={index} /> // Using index as key
          ))
        }
      </div>
      <h1 className='text-2xl font-extrabold py-5 text-center'>New Arrivals</h1>
      <div>
        <Product />
      </div>
    </>
  )
}

export default Home