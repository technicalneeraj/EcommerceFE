import React from 'react';
import { apiRequest } from '../utility/Api';
import { useContext } from 'react';
import { authContext } from '../utility/AuthContext';
const Logout = () => {
    const { setIsLog } =  useContext(authContext);

    const handleLogout = async () => {
        try {
            const response = await apiRequest('POST', '/um/logout');
            if (response.status === 200) {
                setIsLog(false);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
