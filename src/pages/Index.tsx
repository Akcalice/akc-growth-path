import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import booksHero from "@/assets/books-hero.jpg";
import communitySunset from "@/assets/community-sunset.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import familySupport from "@/assets/family-support.jpg";
import { GraduationCap, Users, Briefcase, ArrowRight, Star, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: GraduationCap,
    title: "Accompagnement éducatif",
    description: "Orientation, écoute attentive et soutien dans la gestion de situations complexes : éducation, développement personnel et équilibre familial.",
    image: familySupport,
  },
  {
    icon: Users,
    title: "Insertion & orientation",
    description: "Ateliers ciblés et temps d'échange pour définir un projet clair, valoriser vos compétences et reprendre confiance en votre parcours.",
    image: coachingSession,
  },
  {
    icon: Briefcase,
    title: "Coaching professionnel",
    description: "Formations et ateliers pratiques pour booster la confiance, atteindre ses objectifs, renforcer la cohésion et encourager l'autonomie.",
    image: booksHero,
  },
];

const testimonials = [
  {
    text: "AKConseil a su m'accompagner avec une grande justesse, à un moment où j'avais besoin de recul et de clarté.",
    name: "Charline",
    sessions: "8 sessions",
  },
  {
    text: "Grâce à l'accompagnement personnalisé, j'ai pu retrouver confiance en moi et construire un projet professionnel solide.",
    name: "Anna",
    sessions: "7 sessions",
  },
  {
    text: "Un cadre bienveillant et sans jugement qui m'a permis d'avancer sereinement dans ma reconversion.",
    name: "Sophie",
    sessions: "12 sessions",
  },
];

const faqItems = [
  { q: "À qui s'adresse nos accompagnements ?", a: "Nos accompagnements s'adressent aux femmes, aux familles, aux jeunes en recherche d'orientation, ainsi qu'aux entreprises et structures souhaitant renforcer leurs équipes." },
  { q: "Comment réserver un rendez-vous ?", a: "Vous pouvez réserver directement via notre page de prise de rendez-vous en ligne ou nous contacter par email à contact@akconseil.fr." },
  { q: "À qui s'adresse l'accompagnement ?", a: "L'accompagnement s'adresse à toute personne souhaitant évoluer sur le plan éducatif, social ou professionnel, qu'elle soit particulier ou au sein d'une structure." },
  { q: "Quels sont les avantages de cet accompagnement ?", a: "Un suivi personnalisé, un cadre bienveillant, des outils concrets et une approche adaptée à votre rythme pour des résultats durables." },
  { q: "Comment se déroule le premier rendez-vous ?", a: "Le premier rendez-vous est un temps d'écoute et de diagnostic pour comprendre vos besoins, vos attentes et définir ensemble les axes prioritaires." },
  { q: "Puis-je poser des questions avant de m'engager ?", a: "Bien sûr ! Nous proposons un premier échange gratuit pour répondre à toutes vos questions avant tout engagement." },
  { q: "Proposes-tu des interventions en structure ou entreprise ?", a: "Oui, nous intervenons auprès des entreprises, associations et institutions avec des ateliers sur-mesure, des formations et du coaching collectif." },
];

const steps = [
  {
    num: "1",
    title: "Diagnostic",
    text: "Commencez par identifier vos besoins grâce à un diagnostic simple et rapide. Je cerne vos attentes et repère les axes prioritaires.",
  },
  {
    num: "2",
    title: "Accompagnement",
    text: "Recevez un accompagnement personnalisé : conseils, ateliers pratiques ou coaching adapté à votre profil.",
  },
  {
    num: "3",
    title: "Évolution",
    text: "Suivez votre évolution étape par étape. Je vous aide à garder le cap, à rester motivé et à mesurer vos progrès.",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/40 to-background" />
      <div className="container relative py-20 md:py-32 text-center">
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-foreground text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in">
          Consultante experte (+25 ans d'expériences)
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
          L'aide qu'il vous faut,
          <br />
          au moment juste.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10" style={{ animationDelay: "0.2s" }}>
          Parce que chaque parcours est unique, notre accompagnement l'est aussi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.3s" }}>
          <Link to="/rendez-vous" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
            Prendre Rendez-vous
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-cream-dark transition-colors">
            Découvrir nos services <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
      {/* Book images - side aligned */}
      <div className="container relative pb-10 md:pb-16">
        <div className="rounded-2xl overflow-hidden shadow-lg max-w-md ml-0">
          <img src={booksHero} alt="Livres ouverts symbolisant le savoir et l'accompagnement" className="w-full h-40 md:h-56 object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    {/* Intro section */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Accompagnement éducatif, social et professionnel sur-mesure.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Un accompagnement complet à travers des formations, des ateliers pratiques et des conseils sur-mesure, dédiés aux femmes, aux familles et aux structures professionnelles.
          </p>
        </div>
      </div>
    </section>

    {/* Services Cards */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-hidden h-56">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">Comment ça marche</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-background rounded-2xl p-8 shadow-sm">
              <span className="font-display text-3xl font-bold text-foreground/20 mb-4 block">{step.num}</span>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why AKC */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold">Pourquoi faire appel à AKConseil ?</h2>
          <p className="text-muted-foreground text-lg">Une approche humaine et engagée</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={communitySunset} alt="Communauté solidaire" className="w-full h-80 object-cover" loading="lazy" />
          </div>
          <div className="bg-accent/50 rounded-2xl p-10">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
              Parce que vous n'êtes pas seul
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">Un cadre bienveillant, sans jugement</h3>
            <Link to="/rendez-vous" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
              Votre évolution commence ici
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">Nos Avis clients</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground font-medium mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.sessions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">Foire Aux Questions</h2>
        <p className="text-muted-foreground text-center mb-12">Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.</p>
        <Accordion type="single" collapsible className="border border-border rounded-2xl overflow-hidden">
          {faqItems.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border last:border-0">
              <AccordionTrigger className="px-6 py-5 text-left font-display text-base font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-10">
          <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
            Contactez-nous
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-accent/50 py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Prêt·e à avancer ?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          Réservez votre premier rendez-vous et commencez votre accompagnement personnalisé.
        </p>
        <Link to="/rendez-vous" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
          Prendre Rendez-vous <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default Index;
