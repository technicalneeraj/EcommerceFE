import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utility/Api';

const CategoryDropdowns = ({ setCategory }) => {
    const [level1Categories, setLevel1Categories] = useState([]);
    const [level2Categories, setLevel2Categories] = useState([]);
    const [level3Categories, setLevel3Categories] = useState([]);
    const [selectedLevel1, setSelectedLevel1] = useState('');
    const [selectedLevel2, setSelectedLevel2] = useState('');

    useEffect(() => {
        const fetchLevel1Categories = async () => {
            try {
                const response = await apiRequest("GET",'/api/categories/level1');
                console.log(response)
                if (Array.isArray(response.data)) {
                    setLevel1Categories(response.data);
                } else {
                    console.error('Expected an array of categories, got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching Level 1 categories:', error);
            }
        };
        fetchLevel1Categories();
    }, []);

    const handleLevel1Change = async (e) => {
        const selected = e.target.value;
        setSelectedLevel1(selected);
        setSelectedLevel2(''); // Reset Level 2 and 3 when Level 1 changes
        if (selected) {
            try {
                const response = await  apiRequest("GET",`/api/categories/level2/${selected}`);
                if (Array.isArray(response.data)) {
                    setLevel2Categories(response.data);
                } else {
                    console.error('Expected an array of Level 2 categories, got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching Level 2 categories:', error);
            }
        } else {
            setLevel2Categories([]);
            setLevel3Categories([]);
        }
    };

    const handleLevel2Change = async (e) => {
        const selected = e.target.value;
        setSelectedLevel2(selected);

        if (selected) {
            try {
                const response = await apiRequest("GET",`/api/categories/level3/${selected}`);
                if (Array.isArray(response.data)) {
                    setLevel3Categories(response.data);
                } else {
                    console.error('Expected an array of Level 3 categories, got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching Level 3 categories:', error);
            }
        } else {
            setLevel3Categories([]);
        }
    };

    const handleLevel3Change = (e) => {
        setCategory(e.target.value); // Update the selected category in the parent component
    };

    return (
        <div className="flex flex-col space-y-4">
            <select onChange={handleLevel1Change} value={selectedLevel1} className="p-2 border border-gray-300 rounded">
                <option value="">Select Level 1 Category</option>
                {level1Categories.length > 0 ? (
                    level1Categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No Level 1 Categories Available</option>
                )}
            </select>

            <select onChange={handleLevel2Change} value={selectedLevel2} disabled={!selectedLevel1} className="p-2 border border-gray-300 rounded">
                <option value="">Select Level 2 Category</option>
                {level2Categories.length > 0 ? (
                    level2Categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No Level 2 Categories Available</option>
                )}
            </select>

            <select onChange={handleLevel3Change} disabled={!selectedLevel2} className="p-2 border border-gray-300 rounded">
                <option value="">Select Level 3 Category</option>
                {level3Categories.length > 0 ? (
                    level3Categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No Level 3 Categories Available</option>
                )}
            </select>
        </div>
    );
};

export default CategoryDropdowns;
