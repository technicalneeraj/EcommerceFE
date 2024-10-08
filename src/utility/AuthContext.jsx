import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { apiRequest } from './Api';

export const authContext = createContext();

export default function UserAuthContext({ children }) {
    const token = Cookies.get('accessToken');
    const [isLog, setIsLog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userRole,setUserRole]=useState("");
    const verifyToken = async () => {
        try {
            setIsLoading(true);
            const response = await apiRequest("GET", '/api/auth/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setIsLog(true);
                setIsLoading(false);
                setUserData(response.data.user);
                setUserRole(response.data.user.role);
            } else {
                setIsLog(false);
                setIsLoading(false);
                setUserData(null);
                setUserRole("");
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            setIsLog(false);
            setIsLoading(false);
            setUserData(null);
            setUserRole("");
        }
    };
    useEffect(() => {
        if (token) {
            verifyToken();
        } else {
            setIsLog(false);
            setIsLoading(false);
        }
    }, []);
    return (
        <authContext.Provider value={{ isLog, isLoading, userData, setIsLog, setUserData ,setUserRole,userRole}}>
            {children}
        </authContext.Provider>
    );
}