import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const plans = [
  {
    title: "Séance de suivi",
    price: "60€",
    featured: true,
    features: ["Session 1h", "Suivi progressif", "Objectifs sur-mesure"],
    cta: "Prendre RDV",
    ctaLink: "/rendez-vous",
  },
  {
    title: "Séance initiale",
    price: "90€",
    featured: false,
    features: ["Entretien 1h30 complet", "Bilan personnalisé", "Conseils adaptés + suivi"],
    cta: "Prendre RDV",
    ctaLink: "/rendez-vous",
  },
  {
    title: "Ateliers & Entreprises",
    price: "500€",
    featured: false,
    features: ["Session 3h (10 pers. max)", "Programme adapté/collectif", "Supports pédagogiques inclus"],
    cta: "Prendre RDV",
    ctaLink: "/rendez-vous",
  },
  {
    title: "Ateliers & Entreprises",
    price: "Sur devis",
    featured: false,
    features: ["Session 3h (10 pers. max)", "Forfaits semaines/mois", "Programme adapté/collectif"],
    cta: "Demander un devis",
    ctaLink: "/contact",
  },
];

const Prix = () => (
  <Layout>
    <section className="bg-accent/50 py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Tarifs & forfaits</h1>
          <p className="text-muted-foreground text-lg">
            Séances individuelles, suivis personnalisés, ateliers & offres entreprises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 flex flex-col ${
                plan.featured
                  ? "bg-gradient-to-br from-primary via-navy-light to-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <p className={`text-xs font-semibold tracking-wider uppercase mb-4 ${plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {plan.title}
              </p>
              <p className="font-display text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={18} className={`shrink-0 mt-0.5 ${plan.featured ? "text-gold" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                className={`block text-center px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                  plan.featured
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-navy-light"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold mb-6">Besoin d'une offre personnalisée ?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          Contactez-nous pour un devis sur-mesure adapté à vos besoins spécifiques.
        </p>
        <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
          Contactez-nous <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default Prix;
