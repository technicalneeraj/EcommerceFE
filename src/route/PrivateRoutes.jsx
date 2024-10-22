import { Outlet, Navigate, useLocation } from "react-router-dom";
import React,{ useContext } from "react";
import { authContext } from "../utility/AuthContext";


const PrivateRoutes = () => {

    const location=useLocation();  //get current location
    const { isLog } = useContext(authContext);
    return isLog ? <Outlet /> : <Navigate to="/login" state={{ from: location}}/>;
}

export default PrivateRoutes;
