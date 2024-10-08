import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./utility/AuthContext";
import React from 'react';

const ProtectedRoute = () => {
    const location=useLocation();  //get current location
    const { isLog } = useContext(authContext);
    return isLog ? <Outlet /> : <Navigate to="/login" state={{ from: location}}/>;
}

export default ProtectedRoute;
