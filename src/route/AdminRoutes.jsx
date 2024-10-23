import { Outlet, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { authContext } from "../utility/AuthContext";

const AdminRoutes = () => {
  
    const { userRole } = useContext(authContext);
    return userRole === "admin" ? <Outlet /> : <Navigate to="/" />;

};

export default AdminRoutes;
