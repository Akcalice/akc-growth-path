import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  isChecking: boolean;
  email: string | null;
  publishPassword: string | null;
  refreshSession: () => Promise<void>;
  startLogin: (email: string, password: string, nextPath: string) => Promise<string>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const ADMIN_AUTH_KEY = "akconseil_admin_auth";
const ADMIN_AUTH_EMAIL_KEY = "akconseil_admin_email";
const ADMIN_AUTH_PASSWORD_KEY = "akconseil_admin_password";
const TEMP_ADMIN_EMAIL = "admin@akconseil.fr";
const TEMP_ADMIN_PASSWORD = "AKC-Temp-2026!";

const readAuthState = () =>
  typeof window !== "undefined" && window.localStorage.getItem(ADMIN_AUTH_KEY) === "1";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthState);
  const [isChecking, setIsChecking] = useState(false);
  const [email, setEmail] = useState<string | null>(
    typeof window !== "undefined"
      ? window.localStorage.getItem(ADMIN_AUTH_EMAIL_KEY) || null
      : null,
  );
  const [publishPassword, setPublishPassword] = useState<string | null>(
    typeof window !== "undefined"
      ? window.localStorage.getItem(ADMIN_AUTH_PASSWORD_KEY) ||
          (window.localStorage.getItem(ADMIN_AUTH_KEY) === "1" ? TEMP_ADMIN_PASSWORD : null)
      : null,
  );

  const refreshSession = async () => {
    const nextAuthenticated = readAuthState();
    setIsAuthenticated(nextAuthenticated);
    setEmail(
      nextAuthenticated
        ? window.localStorage.getItem(ADMIN_AUTH_EMAIL_KEY) || TEMP_ADMIN_EMAIL
        : null,
    );
    setPublishPassword(
      nextAuthenticated
        ? window.localStorage.getItem(ADMIN_AUTH_PASSWORD_KEY) || TEMP_ADMIN_PASSWORD
        : null,
    );
  };

  const startLogin = async (loginEmail: string, password: string, nextPath: string) => {
    if (!nextPath) {
      throw new Error("Destination de connexion invalide.");
    }
    const isValid =
      loginEmail.trim().toLowerCase() === TEMP_ADMIN_EMAIL &&
      password === TEMP_ADMIN_PASSWORD;
    if (!isValid) {
      throw new Error("Email ou mot de passe incorrect.");
    }
    window.localStorage.setItem(ADMIN_AUTH_KEY, "1");
    window.localStorage.setItem(ADMIN_AUTH_EMAIL_KEY, loginEmail.trim().toLowerCase());
    window.localStorage.setItem(ADMIN_AUTH_PASSWORD_KEY, password);
    setIsAuthenticated(true);
    setEmail(loginEmail.trim().toLowerCase());
    setPublishPassword(password);
    return "Connexion reussie.";
  };

  const logout = async () => {
    window.localStorage.removeItem(ADMIN_AUTH_KEY);
    window.localStorage.removeItem(ADMIN_AUTH_EMAIL_KEY);
    window.localStorage.removeItem(ADMIN_AUTH_PASSWORD_KEY);
    setIsAuthenticated(false);
    setEmail(null);
    setPublishPassword(null);
  };

  useEffect(() => {
    void refreshSession();
  }, []);

  const value = {
    isAuthenticated,
    isChecking,
    email,
    publishPassword,
    refreshSession,
    startLogin,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth doit etre utilise dans AdminAuthProvider");
  }
  return context;
};
