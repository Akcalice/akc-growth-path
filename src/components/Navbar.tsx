import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { content } = useCmsContent();
  const navLinks = content.navbar.links;
  const logoPath = content.site.logoPath || "/logo-akc.svg";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Retour à l'accueil AKC">
          <img
            src={logoPath}
            alt="Logo AKC Gestion Conseils"
            className="h-9 md:h-11 w-auto"
            loading="eager"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/rendez-vous"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
        >
          {content.navbar.ctaLabel}
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rendez-vous"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold text-center"
            >
              {content.navbar.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
