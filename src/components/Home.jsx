import React, { useState,useEffect } from 'react'
import axios from "axios";
import Card from './Card';
import MainCarousel from './HomeCarousel/MainCarousel';

const Home = () => {
  const [data,setData]=useState([]);
  
  return (
    <>
    <MainCarousel/>
    <h1 className='text-2xl font-extrabold py-5'>Categories</h1>
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