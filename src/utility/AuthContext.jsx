import React, { createContext, useContext, useState ,useEffect} from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLog, setIsLog] = useState(false);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            setIsLog(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLog, setIsLog }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
