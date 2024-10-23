import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../utility/AuthContext";

const PublicRoute = () => {
    
    const { isLog } = useContext(authContext);
    return !isLog ? <Outlet /> : <Navigate to="/"/>;

}

export default PublicRoute;
