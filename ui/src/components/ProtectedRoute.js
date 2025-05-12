import { Navigate } from "react-router-dom";
import menuConfig from "../constants";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, } = useAuth();
  if (!user) { return <Navigate to="/login" replace />; }
  const menu = menuConfig[user.role] || [];

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`${"/" + user.role + "/dashboard"}`} replace />;
  }
  return <AdminLayout menu={menu}>{children}</AdminLayout>;
};

export default ProtectedRoute;
