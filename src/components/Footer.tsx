import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="inline-flex mb-4" aria-label="Retour à l'accueil AKC">
            <img
              src="/logo-akc.svg"
              alt="Logo AKC Gestion Conseils"
              className="h-11 w-auto"
              loading="lazy"
            />
          </Link>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Accompagnement éducatif, social et professionnel sur-mesure. Aller au rythme de la personne accompagnée.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Accueil" },
              { to: "/a-propos", label: "À Propos" },
              { to: "/services", label: "Services" },
              { to: "/accompagnement", label: "Accompagnement" },
              { to: "/blog", label: "Blog" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <a href="mailto:contact@akconseil.fr" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail size={16} /> contact@akconseil.fr
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> France
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Prendre RDV</h4>
          <p className="text-sm text-primary-foreground/70 mb-4">
            Réservez une consultation personnalisée pour démarrer votre accompagnement.
          </p>
          <Link to="/rendez-vous" className="inline-flex px-6 py-2.5 rounded-full bg-primary-foreground text-primary text-sm font-semibold hover:bg-primary-foreground/90 transition-colors">
            Réserver
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} AKC Gestion Conseils. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
