import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { apiRequest } from '../utility/Api';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
const ProductData = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [tags,setTags]=useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true);

                const response = await apiRequest("GET", `/product/getsingleproduct/${id}`);
                setData(response.data.product);
                if (response.data.product.category) {
                    const catResponse = await apiRequest("GET", `/product/category/${response.data.product.category}`);
                    setCategory(catResponse.data.category.name);
                }
                const tagsArray = response.data.product.tags[0].split(','); // Assuming tags is the string you received
                setTags(tagsArray);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                alert("Error fetching product data");
            }
        };

        fetchdata();
    }, [id]);


    return (loading) ? <> Loading </> :
        <>
            <div className='flex flex-wrap justify-center'>
                <div className='left1 w-1/2 p-4'>
                    <div className='flex flex-wrap justify-start'>
                        {data && data.images && data.images.map((image) => (
                            <div className='w-1/2 p-2' key={image.url}>
                                <img src={image.url} alt='imageEXIST' className='w-full h-auto' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='right1 w-1/2 flex flex-col pt-4'>
                    <h1>{data.name}</h1>
                    <h1>{category}</h1>
                    <hr />
                    <div className='pt-3'> &#8377; &nbsp;{data.price}</div>
                    <div>
                        Quantity
                        <select className='ml-2'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                    <div className='mt-5 flex flex-wrap'>
                        <button className='bg-red-700 text-white py-2 px-12'>Add to cart</button>
                        <button className='border border-red-500 py-2 px-7'>&hearts; Add to wishlist</button>
                    </div>
                    <div className='mt-3'>
                        Share &nbsp; <InstagramIcon />&nbsp;
                        <WhatsAppIcon />&nbsp;
                        <FacebookIcon />&nbsp;
                        <XIcon />
                    </div>
                    <div className='pt-5 flex flex-wrap pr-5'>
                        <b>Product Description:</b>
                        {data.description}
                    </div>
                    <div className='mt-2'>
                        Tags: &nbsp;{tags && tags.map((tag, index) => (
                            <span key={index}>
                                #{tag} &nbsp;
                            </span>
                        ))}
                    </div>

                </div>
            </div>
        </>

}

export default ProductData