import Layout from "@/components/Layout";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useAdminAuth();

  return (
    <Layout>
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
              Acces principal pour gerer le site AKConseil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Edition visuelle</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Mode edition visuelle du site pour ajuster les textes et contenus.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/?edit=1"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
                >
                  Ouvrir l'editeur rapide
                </a>
                <Link
                  to="/page-builder"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Ouvrir le page builder
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Actions</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Deconnexion
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Retour au site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
