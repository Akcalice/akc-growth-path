import Layout from "@/components/Layout";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { startLogin, isAuthenticated, isChecking } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => {
    const value = new URLSearchParams(location.search).get("next");
    if (!value || !value.startsWith("/")) {
      return "/admin-dashboard";
    }
    return value;
  }, [location.search]);

  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      navigate(nextPath, { replace: true });
    }
  }, [isChecking, isAuthenticated, navigate, nextPath]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const message = await startLogin(email, password, nextPath);
      toast({
        title: "Connexion reussie",
        description: message,
      });
      navigate(nextPath, { replace: true });
    } catch (error) {
      toast({
        title: "Connexion refusee",
        description:
          error instanceof Error ? error.message : "Email ou mot de passe incorrect.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-md">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">Connexion admin</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Entrez vos identifiants pour acceder au backoffice.
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
                  placeholder="Mot de passe admin"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-5 text-xs text-muted-foreground">
              Retour au site :{" "}
              <Link to="/" className="underline hover:text-foreground">
                accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
