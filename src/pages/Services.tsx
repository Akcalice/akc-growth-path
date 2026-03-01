import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import illusEducation from "@/assets/illus-education.jpg";
import illusInsertion from "@/assets/illus-insertion.jpg";
import illusCoaching from "@/assets/illus-coaching.jpg";
import { GraduationCap, Users, Briefcase, Building2, User, ArrowRight } from "lucide-react";

const servicesData = [
  {
    icon: GraduationCap,
    title: "Accompagnement éducatif",
    description: "Orientation, écoute attentive et soutien dans la gestion de situations complexes : éducation, développement personnel et équilibre familial.",
    forWho: "Parents, familles, jeunes",
    image: illusEducation,
  },
  {
    icon: Users,
    title: "Insertion & orientation professionnelle",
    description: "Ateliers ciblés, bilans de compétences et temps d'échange pour définir un projet clair, valoriser vos compétences et reprendre confiance.",
    forWho: "Personnes en reconversion, demandeurs d'emploi",
    image: illusInsertion,
  },
  {
    icon: Briefcase,
    title: "Coaching professionnel",
    description: "Formations et ateliers pratiques pour booster la confiance, atteindre ses objectifs, renforcer la cohésion et encourager l'autonomie.",
    forWho: "Entreprises, structures, professionnels",
    image: illusCoaching,
  },
];

const audiences = [
  { icon: User, title: "Particuliers", text: "Femmes, familles, jeunes en quête d'accompagnement personnalisé." },
  { icon: Building2, title: "Entreprises & Institutions", text: "Formations sur-mesure, ateliers collectifs et coaching d'équipe." },
];

const Services = () => (
  <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
            Nos services
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Des prestations sur-mesure</h1>
          <p className="text-muted-foreground text-lg">
            AKC Gestion Conseils vous accompagne avec engagement vers plus de sérénité professionnelle, sociale et éducative.
          </p>
        </div>

        <div className="space-y-16">
          {servicesData.map((s, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-10 items-center`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-accent/30">
                  <img src={s.image} alt={s.title} className="w-full h-72 object-cover" loading="lazy" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-foreground" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{s.description}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold text-foreground">Pour qui :</span> {s.forWho}
                </p>
                <Link to="/accompagnement" className="inline-flex items-center text-foreground font-semibold hover:text-navy-light transition-colors">
                  En savoir plus <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Audiences */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">À qui s'adressent nos services ?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {audiences.map((a, i) => (
            <div key={i} className="bg-background rounded-2xl p-8 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                <a.icon size={24} className="text-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{a.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold mb-6">Contactez-nous pour un devis sur-mesure</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          Offres variées : séance individuelle, suivi, forfaits et ateliers collectifs. Tous les services sont personnalisés.
        </p>
        <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
          Contactez-nous <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default Services;
