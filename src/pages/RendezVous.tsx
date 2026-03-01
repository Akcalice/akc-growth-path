import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Calendar, Clock, Video, MapPin, CheckCircle } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";

const formatIcons = [Video, MapPin, Calendar];

const RendezVous = () => {
  const { content } = useCmsContent();
  const page = content.rendezVousPage;

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

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {page.options.map((option, index) => (
            <div
              key={`${option.title}-${index}`}
              className={`relative rounded-2xl p-8 shadow-sm ${option.popular ? "bg-primary text-primary-foreground ring-2 ring-gold" : "bg-card"}`}
            >
              {option.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-foreground text-xs font-bold">
                  Populaire
                </span>
              )}
              <h3 className="font-display text-xl font-bold mb-2">{option.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className={option.popular ? "text-primary-foreground/70" : "text-muted-foreground"} />
                <span className={`text-sm ${option.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{option.duration}</span>
              </div>
              <p className="font-display text-2xl font-bold mb-4">{option.price}</p>
              <p className={`text-sm leading-relaxed mb-6 ${option.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{option.description}</p>
              <ul className="space-y-2 mb-8">
                {option.features.map((feature, featureIndex) => (
                  <li key={`feature-${index}-${featureIndex}`} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className={option.popular ? "text-gold" : "text-foreground"} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={option.ctaLink}
                className={`block text-center px-6 py-3 rounded-full font-semibold transition-colors ${
                  option.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-navy-light"
                }`}
              >
                {option.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* Meeting formats */}
        <div className="bg-accent/50 rounded-2xl p-8 md:p-12">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">{page.formatsTitle}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {page.formats.map((format, index) => {
              const FormatIcon = formatIcons[index] ?? Calendar;
              return (
              <div key={`${format.title}-${index}`} className="text-center">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-3">
                  <FormatIcon size={22} className="text-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{format.title}</h3>
                <p className="text-sm text-muted-foreground">{format.text}</p>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default RendezVous;
