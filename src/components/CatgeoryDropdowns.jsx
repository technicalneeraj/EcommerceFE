import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utility/Api';

const CategoryDropdowns = ({ setCategory ,setParentCategory,setSubParentCategory}) => {
    const [categories, setCategories] = useState([]);
    const [selectedSuperParent, setSelectedSuperParent] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedChild, setSelectedChild] = useState('');

    const superParents = [
        { id: 'men', name: 'men' },
        { id: 'women', name: 'women' },
        { id: 'kids', name: 'kids' }
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiRequest("GET", '/api/categories');
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Expected an array of categories, got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSuperParentChange = (e) => {
        const selected = e.target.value;
        setSelectedSuperParent(selected);
        setSelectedSubCategory('');
        setSelectedChild('');
    };

    const handleSubCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedSubCategory(selected);
        setSelectedChild('');
    };

    const handleChildChange = (e) => {
        const selected = e.target.value;
        setSelectedChild(selected);
        setCategory(selected); 
        setParentCategory(selectedSuperParent);
        setSubParentCategory(selectedSubCategory);
    };

    return (
        <div className="flex flex-col space-y-4">
            <select onChange={handleSuperParentChange} value={selectedSuperParent} className="p-2 border border-gray-300 rounded">
                <option value="">Select Super Parent Category</option>
                {superParents.map(parent => (
                    <option key={parent.id} value={parent.name}>
                        {parent.name}
                    </option>
                ))}
            </select>

            <select onChange={handleSubCategoryChange} value={selectedSubCategory} disabled={!selectedSuperParent} className="p-2 border border-gray-300 rounded">
                <option value="">Select Sub Category</option>
                    <option key={1} value="lower">lower</option>
                    <option key={2} value="upper">upper</option>
            </select>

            <select onChange={handleChildChange} value={selectedChild} disabled={!selectedSubCategory} className="p-2 border border-gray-300 rounded">
                <option value="">Select Child Category</option>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <option key={category._id} value={category.type}>
                            {category.type}
                        </option>
                    ))
                ) : (
                    <option disabled>No Child Categories Available</option>
                )}
            </select>
        </div>
    );
};

export default CategoryDropdowns;
