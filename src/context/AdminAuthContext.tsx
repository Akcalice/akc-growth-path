import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  isChecking: boolean;
  email: string | null;
  refreshSession: () => Promise<void>;
  startLogin: (email: string, password: string, nextPath: string) => Promise<string>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const refreshSession = async () => {
    try {
      setIsChecking(true);
      const response = await fetch("/api/admin-auth/session", { cache: "no-store" });
      if (!response.ok) {
        setIsAuthenticated(false);
        setEmail(null);
        return;
      }
      const payload = (await response.json()) as {
        authenticated?: boolean;
        email?: string;
      };
      setIsAuthenticated(Boolean(payload.authenticated));
      setEmail(payload.authenticated ? payload.email || null : null);
    } catch {
      setIsAuthenticated(false);
      setEmail(null);
    } finally {
      setIsChecking(false);
    }
  };

  const startLogin = async (loginEmail: string, password: string, nextPath: string) => {
    const response = await fetch("/api/admin-auth/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password,
        next: nextPath,
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
      message?: string;
    };

    if (!response.ok) {
      throw new Error(payload.error || "Connexion impossible.");
    }

    return (
      payload.message ||
      "Email de validation envoye. Ouvrez votre boite mail pour valider la connexion."
    );
  };

  const logout = async () => {
    try {
      await fetch("/api/admin-auth/logout", { method: "POST" });
    } finally {
      await refreshSession();
    }
  };

  useEffect(() => {
    void refreshSession();
  }, []);

  const value = {
    isAuthenticated,
    isChecking,
    email,
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
