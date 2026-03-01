import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated, isChecking } = useAdminAuth();

  if (isChecking) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-sm text-muted-foreground">Verification de la session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    const nextPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/admin-login?next=${encodeURIComponent(nextPath)}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
