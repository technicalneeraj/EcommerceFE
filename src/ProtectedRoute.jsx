import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./utility/AuthContext";

function ProtectedRoute() {
    const { isLog } = useAuth();
    return isLog ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
