import React, { useEffect, useState } from 'react'
import { apiRequest } from '../utility/Api'
import { useNavigate } from 'react-router-dom';

import Card from './Card';
const Product = () => {
    const navigate = useNavigate(); 
    const [data,setData]=useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiRequest("GET", "/product");
                if (response.status === 200) {
                    setData(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

  return (
    <div className='flex flex-wrap justify-center'>
    {data.map((newdata) => (
        <div key={newdata._id} onClick={() => navigate(`/product/${newdata._id}`)}>
            <Card imageUrl={newdata.images[0].url} />
            <div className=' mb-3 ml-3 pl-2'>
                <div className='text-sm'>{newdata.name}</div>
                <div className='text-gray-400'>&#8377; {newdata.price}</div>
            </div>
        </div>
    ))}
    </div>
  )
}

export default Product