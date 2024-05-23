import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store"; // Adjust the import path as necessary

interface RoleProtectedRouteProps {
  requiredRole: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ requiredRole }) => {
  const { userRole } = useSelector((state: RootState) => state.auth);

  if (userRole === requiredRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default RoleProtectedRoute;
