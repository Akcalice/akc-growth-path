import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { GraduationCap, Users, Briefcase, ArrowRight, Star, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCmsContent } from "@/context/CmsContentContext";
import { imageMap } from "@/content/imageMap";

const serviceIcons = [GraduationCap, Users, Briefcase];

const Index = () => {
  const { content } = useCmsContent();
  const home = content.home;

  return (
    <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/40 to-background" />
      <div className="container relative py-20 md:py-32 text-center">
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-foreground text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in">
          {home.heroBadge}
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
          {home.heroTitleLine1}
          <br />
          {home.heroTitleLine2}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10" style={{ animationDelay: "0.2s" }}>
          {home.heroDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.3s" }}>
          <Link to="/rendez-vous" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
            {home.heroPrimaryCta}
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-cream-dark transition-colors">
            {home.heroSecondaryCta} <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
      {/* Book images - side aligned */}
      <div className="container relative pb-10 md:pb-16">
        <div className="rounded-2xl overflow-hidden shadow-lg max-w-md ml-0">
          <img
            src={imageMap.booksHero}
            alt="Livres ouverts symbolisant le savoir et l'accompagnement"
            className="w-full h-40 md:h-56 object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    {/* Intro section */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            {home.introTitle}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {home.introDescription}
          </p>
        </div>
      </div>
    </section>

    {/* Services Cards */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {home.services.map((service, index) => {
            const ServiceIcon = serviceIcons[index] ?? Briefcase;
            const serviceImage = imageMap[service.imageKey as keyof typeof imageMap] ?? imageMap.booksHero;
            return (
            <div key={`${service.title}-${index}`} className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-hidden h-56">
                <img
                  src={serviceImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <ServiceIcon size={20} className="text-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">{home.howItWorksTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {home.steps.map((step) => (
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
          <h2 className="font-display text-3xl md:text-5xl font-bold">{home.whyTitle}</h2>
          <p className="text-muted-foreground text-lg">{home.whySubtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={imageMap[home.whyImageKey as keyof typeof imageMap] ?? imageMap.communitySunset}
              alt="Communaute solidaire"
              className="w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
          <div className="bg-accent/50 rounded-2xl p-10">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
              {home.whyTagline}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">{home.whyCardTitle}</h3>
            <Link to="/rendez-vous" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
              {home.whyCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">{home.testimonialsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {home.testimonials.map((testimonial, index) => (
            <div key={`${testimonial.name}-${index}`} className="bg-background rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground font-medium mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{testimonial.sessions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">{home.faqTitle}</h2>
        <p className="text-muted-foreground text-center mb-12">{home.faqDescription}</p>
        <Accordion type="single" collapsible className="border border-border rounded-2xl overflow-hidden">
          {home.faqItems.map((faq, index) => (
            <AccordionItem key={`faq-item-${index}`} value={`faq-${index}`} className="border-b border-border last:border-0">
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
            {home.faqCtaLabel}
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-accent/50 py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{home.finalCtaTitle}</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          {home.finalCtaDescription}
        </p>
        <Link to="/rendez-vous" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
          {home.finalCtaLabel} <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  </Layout>
  );
};

export default Index;
