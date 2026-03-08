import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const ADMIN_AUTH_KEY = "akconseil_admin_auth";

export const TEMP_ADMIN_EMAIL = "admin@akconseil.fr";
export const TEMP_ADMIN_PASSWORD = "AKC-Temp-2026!";

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const readInitialAuthState = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === "1";
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(readInitialAuthState);

  const login = (email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === TEMP_ADMIN_EMAIL && password === TEMP_ADMIN_PASSWORD;
    if (ok) {
      window.localStorage.setItem(ADMIN_AUTH_KEY, "1");
      setIsAuthenticated(true);
    }
    return ok;
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth doit etre utilise dans AdminAuthProvider");
  }
  return context;
};
