import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { ExternalLink, Settings } from "lucide-react";

const AdminDashboard = () => (
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
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display text-xl font-semibold mb-2">CMS du site</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Modifier les textes, sections, blog et metadata du site.
            </p>
            <Link
              to="/admin-cms"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              Ouvrir le CMS
            </Link>
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
              href="https://github.com/Akcalice/akc-growth-path"
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
              Variables a configurer : CMS_ADMIN_TOKEN, CMS_GITHUB_TOKEN, RESEND_API_KEY,
              RESEND_FROM_EMAIL, CONTACT_TO_EMAIL.
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

export default AdminDashboard;
