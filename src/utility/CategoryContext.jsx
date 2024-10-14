import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [currentCategory, setCurrentCategory] = useState('men');

    return (
        <CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    return useContext(CategoryContext);
};
