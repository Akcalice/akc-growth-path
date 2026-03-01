import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Heart, Target, Users, BookOpen } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";
import { imageMap } from "@/content/imageMap";

const valueIcons = [Heart, Target, Users, BookOpen];

const APropos = () => {
  const { content } = useCmsContent();
  const about = content.about;
  const calendlyUrl = content.site.calendlyUrl;
  const portraitImage =
    imageMap[about.portraitImageKey as keyof typeof imageMap] ?? imageMap.consultantPortrait;
  const methodologyImage =
    imageMap[about.methodologyImageKey as keyof typeof imageMap] ?? imageMap.booksStudy;

  return (
    <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
              {about.badge}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {about.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {about.paragraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {about.paragraph2}
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
            >
              {about.ctaLabel}
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={portraitImage} alt="La fondatrice d'AKC Gestion Conseils" className="w-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Methodology */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
            <img src={methodologyImage} alt="Livres et etude" className="w-full h-80 object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{about.methodologyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {about.methodologyParagraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {about.methodologyParagraph2}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">{about.valuesTitle}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {about.values.map((value, index) => {
            const ValueIcon = valueIcons[index] ?? BookOpen;
            return (
            <div key={`${value.title}-${index}`} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                <ValueIcon size={24} className="text-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.text}</p>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default APropos;
