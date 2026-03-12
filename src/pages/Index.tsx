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
import { imageMap, resolveImageSrc } from "@/content/imageMap";
import EditableText from "@/components/visual-editor/EditableText";
import EditableImage from "@/components/visual-editor/EditableImage";
import EditableArrayActions from "@/components/visual-editor/EditableArrayActions";

const serviceIcons = [GraduationCap, Users, Briefcase];

const Index = () => {
  const { content } = useCmsContent();
  const home = content.home;
  const calendlyUrl = content.site.calendlyUrl;
  const logoPath = content.site.logoPath || "/logo-akc.png";
  const logoSrc = `${logoPath}${logoPath.includes("?") ? "&" : "?"}v=15`;

  return (
    <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/40 to-background" />
      <div className="container relative py-20 md:py-32 text-center">
        <div className="mx-auto mb-7 w-max">
          <EditableImage
            path="site.logoPath"
            src={logoSrc}
            alt={`Logo ${content.site.companyName}`}
            className="h-14 md:h-16 w-auto"
            imgClassName="h-14 md:h-16 w-auto"
            loading="eager"
          />
        </div>
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-foreground text-xs font-semibold tracking-wider uppercase mb-8 animate-fade-in">
          <EditableText path="home.heroBadge" value={home.heroBadge} />
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
          <EditableText path="home.heroTitleLine1" value={home.heroTitleLine1} />
          <br />
          <EditableText path="home.heroTitleLine2" value={home.heroTitleLine2} />
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10" style={{ animationDelay: "0.2s" }}>
          <EditableText
            path="home.heroDescription"
            value={home.heroDescription}
            multiline
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "0.3s" }}>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
          >
            <EditableText path="home.heroPrimaryCta" value={home.heroPrimaryCta} />
          </a>
          <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-cream-dark transition-colors">
            <EditableText path="home.heroSecondaryCta" value={home.heroSecondaryCta} />{" "}
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>

    {/* Intro section */}
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            <EditableText path="home.introTitle" value={home.introTitle} multiline />
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            <EditableText
              path="home.introDescription"
              value={home.introDescription}
              multiline
            />
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
            const serviceImage = resolveImageSrc(service.imageKey, imageMap.booksHero);
            return (
            <div key={`${service.title}-${index}`} className="group relative bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute mt-2 ml-2 z-10">
                <EditableArrayActions
                  arrayPath="home.services"
                  index={index}
                  createItem={() => ({
                    title: "Nouveau service",
                    description: "Description a completer",
                    imageKey: "booksHero",
                  })}
                />
              </div>
              <div className="overflow-hidden h-56">
                <EditableImage
                  path={`home.services[${index}].imageKey`}
                  src={serviceImage}
                  alt={service.title}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <ServiceIcon size={20} className="text-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  <EditableText
                    path={`home.services[${index}].title`}
                    value={service.title}
                  />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <EditableText
                    path={`home.services[${index}].description`}
                    value={service.description}
                    multiline
                  />
                </p>
              </div>
            </div>
          );
          })}
        </div>
        <div className="mt-6">
          <EditableArrayActions
            arrayPath="home.services"
            createItem={() => ({
              title: "Nouveau service",
              description: "Description a completer",
              imageKey: "booksHero",
            })}
          />
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">
          <EditableText path="home.howItWorksTitle" value={home.howItWorksTitle} />
        </h2>
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
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            <EditableText path="home.whyTitle" value={home.whyTitle} />
          </h2>
          <p className="text-muted-foreground text-lg">
            <EditableText path="home.whySubtitle" value={home.whySubtitle} />
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <EditableImage
              path="home.whyImageKey"
              src={resolveImageSrc(home.whyImageKey, imageMap.communitySunset)}
              alt="Communaute solidaire"
              imgClassName="w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
          <div className="bg-accent/50 rounded-2xl p-10">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
              <EditableText path="home.whyTagline" value={home.whyTagline} />
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <EditableText path="home.whyCardTitle" value={home.whyCardTitle} />
            </h3>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
            >
              <EditableText path="home.whyCtaLabel" value={home.whyCtaLabel} />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
          <EditableText path="home.testimonialsTitle" value={home.testimonialsTitle} />
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {home.testimonials.map((testimonial, index) => (
            <div key={`${testimonial.name}-${index}`} className="bg-background rounded-2xl p-8 shadow-sm">
              <div className="mb-2">
                <EditableArrayActions
                  arrayPath="home.testimonials"
                  index={index}
                  createItem={() => ({
                    text: "Nouveau temoignage",
                    name: "Nom",
                    sessions: "1 session",
                    stars: 5,
                  })}
                />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(Math.max(1, Math.min(5, testimonial.stars ?? 5)))].map((_, j) => (
                  <Star key={j} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground font-medium mb-6 leading-relaxed">
                "
                <EditableText
                  path={`home.testimonials[${index}].text`}
                  value={testimonial.text}
                  multiline
                />
                "
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  <EditableText path={`home.testimonials[${index}].name`} value={testimonial.name} />
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  <EditableText
                    path={`home.testimonials[${index}].sessions`}
                    value={testimonial.sessions}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <EditableArrayActions
            arrayPath="home.testimonials"
            createItem={() => ({
              text: "Nouveau temoignage",
              name: "Nom",
              sessions: "1 session",
              stars: 5,
            })}
          />
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
          <EditableText path="home.faqTitle" value={home.faqTitle} />
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          <EditableText path="home.faqDescription" value={home.faqDescription} multiline />
        </p>
        <Accordion type="single" collapsible className="border border-border rounded-2xl overflow-hidden">
          {home.faqItems.map((faq, index) => (
            <AccordionItem key={`faq-item-${index}`} value={`faq-${index}`} className="border-b border-border last:border-0">
              <AccordionTrigger className="px-6 py-5 text-left font-display text-base font-semibold hover:no-underline">
                <EditableText path={`home.faqItems[${index}].q`} value={faq.q} multiline />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                <EditableText path={`home.faqItems[${index}].a`} value={faq.a} multiline />
                <div className="mt-3">
                  <EditableArrayActions
                    arrayPath="home.faqItems"
                    index={index}
                    createItem={() => ({ q: "Nouvelle question", a: "Nouvelle réponse" })}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-10">
          <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
            <EditableText path="home.faqCtaLabel" value={home.faqCtaLabel} />
          </Link>
        </div>
        <div className="text-center mt-4">
          <EditableArrayActions
            arrayPath="home.faqItems"
            createItem={() => ({ q: "Nouvelle question", a: "Nouvelle réponse" })}
            className="inline-flex"
          />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-accent/50 py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
          <EditableText path="home.finalCtaTitle" value={home.finalCtaTitle} />
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          <EditableText path="home.finalCtaDescription" value={home.finalCtaDescription} multiline />
        </p>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
        >
          <EditableText path="home.finalCtaLabel" value={home.finalCtaLabel} />{" "}
          <ArrowRight size={18} className="ml-2" />
        </a>
      </div>
    </section>
  </Layout>
  );
};

export default Index;
