import Layout from "@/components/Layout";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nextPath = useMemo(() => {
    const value = new URLSearchParams(location.search).get("next");
    if (!value || !value.startsWith("/")) {
      return "/admin-dashboard";
    }
    return value;
  }, [location.search]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(nextPath, { replace: true });
    }
  }, [isAuthenticated, navigate, nextPath]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      toast({
        title: "Connexion refusee",
        description: "Email ou mot de passe incorrect.",
      });
      return;
    }
    toast({
      title: "Connexion reussie",
      description: "Bienvenue dans le dashboard admin.",
    });
    navigate(nextPath, { replace: true });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-md">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">Connexion admin</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Entrez vos identifiants temporaires pour acceder au dashboard.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="admin@akconseil.fr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Mot de passe</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Mot de passe temporaire"
                />
              </div>

              <button
                type="submit"
                className="w-full px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
