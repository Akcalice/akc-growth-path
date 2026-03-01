import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { ExternalLink, Settings } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminDashboard = () => {
  const { email, logout } = useAdminAuth();

  return (
    <Layout>
      <Seo
        title="Dashboard Backoffice | AKConseil"
        description="Acces centralise aux outils backoffice du site AKConseil."
        canonicalPath="/admin-dashboard"
        noindex
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-4">
              Backoffice
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Dashboard d'administration
            </h1>
            <p className="text-muted-foreground">
              Tous les acces importants pour gerer le site, le contenu et le deploiement.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted-foreground">
                Connecte en tant que : <strong>{email || "admin"}</strong>
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors"
              >
                Deconnexion
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Editeur visuel</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Passez la souris sur les contenus pour modifier, supprimer ou ajouter des blocs.
              </p>
              <a
                href="/?edit=1"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Ouvrir l'editeur visuel
              </a>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Vercel</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Deploiements, nom de domaine, variables d'environnement et logs.
              </p>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                Dashboard Vercel <ExternalLink size={14} className="ml-2" />
              </a>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">GitHub</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Repository principal, historique des versions et collaboration.
              </p>
              <a
                href="https://github.com/Akcalice/akcsite"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                Ouvrir GitHub <ExternalLink size={14} className="ml-2" />
              </a>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Parametres techniques</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Variables a configurer : ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD,
                ADMIN_AUTH_SECRET, CMS_GITHUB_TOKEN, RESEND_API_KEY, RESEND_FROM_EMAIL,
                CONTACT_TO_EMAIL.
              </p>
              <span className="inline-flex items-center text-sm font-semibold">
                <Settings size={14} className="mr-2" />
                Voir README pour le detail
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
