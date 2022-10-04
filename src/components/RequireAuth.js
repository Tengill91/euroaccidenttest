

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // checks if an user is added to the global context
        auth.user
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAuth;