import React from 'react'

const Card = ({imageUrl}) => {
  return (
    <>
    <div className='cursor-pointer flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden mx-3 w-[15rem] mb-4 mt-4'>
        <div className='h-[13rem] w-[10rem]'>
        <img className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105" src={imageUrl}/>
        </div>
    </div>
    </>
  )
}

export default Card