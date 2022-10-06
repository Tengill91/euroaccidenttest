import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  // makes so that the browser know where we come from
  const location = useLocation();

  return (
    // checks if an user is added to the global context
    auth.user ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
