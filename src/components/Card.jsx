import React from 'react'

const Card = ({imageurl}) => {
  return (
    <>
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden mx-3 w-[15rem] mb-4 mt-4'>
        <div className='h-[13rem] w-[10rem]'>
          <img className="object-cover object-top w-full h-full transition-transform duration-300 hover:scale-105" src='https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Oversized_Tshirtjpg_pRkx6L0.jpg?format=webp&w=480&dpr=1.0'></img>
        </div>
    </div>
    </>
  )
}

export default Card