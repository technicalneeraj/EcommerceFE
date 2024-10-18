import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./utility/AuthContext";
import React from 'react';

const AdminRoutes = () => {
    const { userRole } = useContext(authContext);
    return userRole==="admin" ? <Outlet /> : <Navigate to="/"/>;
}

export default AdminRoutes;
