import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '../utility/Api';
import { useRef } from 'react';

const CategoryAdd = () => {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategories, setParentCategories] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('parentCategories', JSON.stringify(parentCategories.split(',')));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await apiRequest("POST",'/api/categories/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Category added');
      setCategoryName('');
      setParentCategories('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Error adding category');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name:
          </label>
          <input 
            type="text" 
            value={categoryName} 
            onChange={(e) => setCategoryName(e.target.value)} 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parent Categories (comma-separated names):
          </label>
          <input 
            type="text" 
            value={parentCategories} 
            onChange={(e) => setParentCategories(e.target.value)} 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image:
          </label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            accept="image/*" 
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryAdd;
