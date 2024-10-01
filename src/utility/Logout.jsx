import React from 'react';
import { apiRequest } from './Api';
import { useAuth } from './AuthContext';

const Logout = () => {
    const { setIsLog } = useAuth();

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
