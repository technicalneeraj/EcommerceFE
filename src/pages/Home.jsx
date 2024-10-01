import React, { useState,useEffect } from 'react'
import Card from '../components/Card';
import MainCarousel from '../components/HomeCarousel/MainCarousel';

const Home = () => {
  const [data,setData]=useState([]);
  
  return (
    <>
    <MainCarousel/>
    <h1 className='text-2xl font-extrabold py-5 text-center'>Categories</h1>
    <div className='flex flex-wrap justify-center'>
      {
        [1,1,1,1,1,1,1,1,1,1,1].map((single)=>(
          <Card imageurl={single.image} key={single.id}/>
        ))
      }
    </div>
    </>
  )
}

export default Home