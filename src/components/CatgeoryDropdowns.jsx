import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utility/Api';

const CategoryDropdowns = ({ setCategory }) => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedSuperParent, setSelectedSuperParent] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedChild, setSelectedChild] = useState('');

    const superParents = [
        { id: 'men', name: 'Men' },
        { id: 'women', name: 'Women' },
        { id: 'kids', name: 'Kids' }
    ];

    // Hardcoded subcategories
    const subCategories = {
        men: ['Upper', 'Lower'],
        women: ['Upper', 'Lower'],
        kids: ['Upper', 'Lower'],
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiRequest("GET", '/api/categories');
                if (Array.isArray(response.data)) {
                    console.log(response.data);
                    // setCategories(response.data);
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
        setFilteredCategories([]);

        if (selected) {
            const filtered = categories.filter(category => 
                category.parent.includes(selected)
            );
            setFilteredCategories(filtered);
        }
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
    };

    return (
        <div className="flex flex-col space-y-4">
            <select onChange={handleSuperParentChange} value={selectedSuperParent} className="p-2 border border-gray-300 rounded">
                <option value="">Select Super Parent Category</option>
                {superParents.map(parent => (
                    <option key={parent.id} value={parent.id}>
                        {parent.name}
                    </option>
                ))}
            </select>

            <select onChange={handleSubCategoryChange} value={selectedSubCategory} disabled={!selectedSuperParent} className="p-2 border border-gray-300 rounded">
                <option value="">Select Sub Category</option>
                {selectedSuperParent && subCategories[selectedSuperParent]?.map((subCat, index) => (
                    <option key={index} value={subCat}>
                        {subCat}
                    </option>
                ))}
            </select>

            <select onChange={handleChildChange} value={selectedChild} disabled={!selectedSubCategory} className="p-2 border border-gray-300 rounded">
                <option value="">Select Child Category</option>
                {filteredCategories.length > 0 ? (
                    filteredCategories.map(category => (
                        <option key={category._id} value={category._id}>
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
