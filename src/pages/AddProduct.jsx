import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryDropdowns from '../components/CatgeoryDropdowns';
import { apiRequest } from '../utility/Api';
const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const [status, setStatus] = useState('active');
    const [tags, setTags] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('brand', brand);
        formData.append('category', category); // Use the selected category ID
        formData.append('stock', stock);
        formData.append('isFeatured', isFeatured);
        formData.append('status', status);
        formData.append('tags', tags.split(',').map(tag => tag.trim()).join(','));

        if (mainImage) {
            formData.append('mainImage', mainImage);
        }
        otherImages.forEach(image => {
            formData.append('otherImages', image);
        });

        try {
            const response = await apiRequest("POST",'/product/add-product', formData);
            console.log('Product added:', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-md">
            <h1 className='text-2xl font-semibold text-center mb-4'>Add New Product</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Name of product*'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full p-2 border border-gray-300 rounded'
                />
                <textarea
                    placeholder='Description of product*'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className='w-full p-2 border border-gray-300 rounded h-24'
                />
                <input
                    type="number"
                    placeholder='Price of product*'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className='w-full p-2 border border-gray-300 rounded'
                />
                <input
                    type="text"
                    placeholder='Brand of product*'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    className='w-full p-2 border border-gray-300 rounded'
                />
                
                <CategoryDropdowns setCategory={setCategory} />

                <input
                    type="number"
                    placeholder='Stock quantity*'
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    min="0"
                    className='w-full p-2 border border-gray-300 rounded'
                />
                <div>
                    <label className="block mb-2">Main Image (required):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMainImage(e.target.files[0])}
                        required
                        className='w-full border border-gray-300 rounded'
                    />
                </div>
                <div>
                    <label className="block mb-2">Other Images (optional):</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setOtherImages([...e.target.files])}
                        className='w-full border border-gray-300 rounded'
                    />
                </div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={() => setIsFeatured(!isFeatured)}
                        className="mr-2"
                    />
                    Featured Product
                </label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full p-2 border border-gray-300 rounded'>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
                <input
                    type="text"
                    placeholder='Tags (comma separated)'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                />
                <button type="submit" className='w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700'>Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
