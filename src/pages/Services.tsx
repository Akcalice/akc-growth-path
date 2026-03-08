import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Briefcase, Building2, User, ArrowRight } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";
import { imageMap } from "@/content/imageMap";

const serviceIcons = [GraduationCap, Users, Briefcase];
const audienceIcons = [User, Building2];
const serviceImageOverrides = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
];

const Services = () => {
  const { content } = useCmsContent();
  const page = content.servicesPage;

  return (
    <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
            {page.badge}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
          <p className="text-muted-foreground text-lg">
            {page.intro}
          </p>
        </div>

        <div className="space-y-16">
          {page.items.map((item, index) => {
            const ServiceIcon = serviceIcons[index] ?? Briefcase;
            const image =
              serviceImageOverrides[index] ||
              imageMap[item.imageKey as keyof typeof imageMap] ||
              imageMap.illusEducation;
            return (
            <div key={`${item.title}-${index}`} className={`grid md:grid-cols-2 gap-10 items-center`}>
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-accent/30">
                  <img src={image} alt={item.title} className="w-full h-72 object-cover" loading="lazy" />
                </div>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center mb-4">
                  <ServiceIcon size={24} className="text-foreground" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{item.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold text-foreground">Pour qui :</span> {item.forWho}
                </p>
                <Link to="/accompagnement" className="inline-flex items-center text-foreground font-semibold hover:text-navy-light transition-colors">
                  {item.learnMoreLabel} <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>

    {/* Audiences */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">{page.audiencesTitle}</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {page.audiences.map((audience, index) => {
            const AudienceIcon = audienceIcons[index] ?? User;
            return (
            <div key={`${audience.title}-${index}`} className="bg-background rounded-2xl p-8 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                <AudienceIcon size={24} className="text-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{audience.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{audience.text}</p>
            </div>
          );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold mb-6">{page.ctaTitle}</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          {page.ctaDescription}
        </p>
        <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
          {page.ctaLabel} <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  </Layout>
  );
};

export default Services;
