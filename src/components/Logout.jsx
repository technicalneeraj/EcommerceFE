import React from 'react';
import { apiRequest } from '../utility/Api';
import { useContext } from 'react';
import { authContext } from '../utility/AuthContext';
import { toast } from 'react-toastify';
const Logout = () => {
    const { setIsLog ,setUserRole} =  useContext(authContext);

    const handleLogout = async () => {
        try {
            const response = await apiRequest('POST', '/um/logout');
            if (response.status === 200) {
                setIsLog(false);
                setUserRole("");
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
