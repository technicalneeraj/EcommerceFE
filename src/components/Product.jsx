import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utility/Api';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { useCategory } from '../utility/CategoryContext';

const Product = () => {
    const { setCurrentCategory, currentCategory } = useCategory();
    const navigate = useNavigate(); 
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { status, data } = await apiRequest("GET", `/product?category=${currentCategory}`);
                if (status === 200) {
                    setProducts(data.message);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentCategory]); 

    // Fetch wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const { status, data } = await apiRequest("GET", "/user/send-wishlist");
                if (status === 200) {
                    setWishlist(data.wishlistData);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []); 

    return (
        <div className='flex flex-wrap justify-center'>
            {products.map((product) => {
                const isFavorited = wishlist.some(item => item === product._id);
                return (
                    <div key={product._id}>
                        <Card imageUrl={product.images[0].url} ID={product._id} isFavoriteInDb={isFavorited} />
                        <div className='mb-3 ml-3 pl-2'>
                            <div className='text-sm'>{product.name}</div>
                            <div className='text-gray-400'>&#8377; {product.price}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Product;
