import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { isAuthenticated, isChecking, refreshSession } = useAdminAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const nextPath = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const next = query.get("next");
    if (!next || !next.startsWith("/")) {
      return "/admin-dashboard";
    }
    return next;
  }, [location.search]);

  const authError = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const error = query.get("error");
    if (error === "invalid_or_expired_token") {
      return "Le lien de validation est invalide ou expire. Recommencez la connexion.";
    }
    if (error === "missing_token") {
      return "Lien de validation incomplet. Recommencez la connexion.";
    }
    return null;
  }, [location.search]);

  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      navigate(nextPath, { replace: true });
    }
  }, [isChecking, isAuthenticated, nextPath, navigate]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/admin-auth/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
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

      setEmailSent(true);
      toast({
        title: "Verification envoyee",
        description:
          payload.message ||
          "Consultez votre email et cliquez sur le lien de validation.",
      });
    } catch (error) {
      toast({
        title: "Erreur d'authentification",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Seo
        title="Connexion backoffice | AKConseil"
        description="Connexion securisee au backoffice AKConseil."
        canonicalPath="/admin-login"
        noindex
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-md">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Connexion securisee
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Saisissez vos identifiants puis validez l'acces via le lien envoye par email.
            </p>

            {authError && (
              <div className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="vous@akconseil.fr"
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
                  placeholder="Votre mot de passe"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Envoi..." : "Se connecter"}
              </button>
            </form>

            {emailSent && (
              <div className="mt-5 p-4 rounded-xl bg-accent/40 text-sm">
                <p className="mb-3">
                  Email de validation envoye. Ouvrez votre boite mail puis cliquez sur le lien.
                </p>
                <button
                  type="button"
                  onClick={() => void refreshSession()}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors"
                >
                  J'ai valide, verifier la session
                </button>
              </div>
            )}

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
