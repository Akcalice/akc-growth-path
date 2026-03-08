import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/admin-login?next=${encodeURIComponent(nextPath)}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
