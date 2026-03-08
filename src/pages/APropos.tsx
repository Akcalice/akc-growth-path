import Layout from "@/components/Layout";
import { Heart, Target, Users, BookOpen } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";
import { imageMap, resolveImageSrc } from "@/content/imageMap";
import EditableText from "@/components/visual-editor/EditableText";
import EditableImage from "@/components/visual-editor/EditableImage";

const valueIcons = [Heart, Target, Users, BookOpen];

const APropos = () => {
  const { content } = useCmsContent();
  const about = content.about;
  const calendlyUrl = content.site.calendlyUrl;
  const normalizedPortraitKey =
    about.portraitImageKey === "consultantPortrait" ? "/logo-akc.svg" : about.portraitImageKey;
  const portraitImage = resolveImageSrc(normalizedPortraitKey, "/logo-akc.svg");
  const methodologyImage = resolveImageSrc(about.methodologyImageKey, imageMap.booksStudy);

  return (
    <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
              <EditableText path="about.badge" value={about.badge} />
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <EditableText path="about.title" value={about.title} />
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              <EditableText path="about.paragraph1" value={about.paragraph1} multiline />
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              <EditableText path="about.paragraph2" value={about.paragraph2} multiline />
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
            >
              <EditableText path="about.ctaLabel" value={about.ctaLabel} />
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-primary/5 p-6 md:p-8">
            <EditableImage
              path="about.portraitImageKey"
              src={portraitImage}
              alt={`Portrait ${content.site.companyName}`}
              imgClassName="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Methodology */}
    <section className="section-cream py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
            <EditableImage
              path="about.methodologyImageKey"
              src={methodologyImage}
              alt="Livres et etude"
              imgClassName="w-full h-80 object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <EditableText path="about.methodologyTitle" value={about.methodologyTitle} />
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <EditableText
                path="about.methodologyParagraph1"
                value={about.methodologyParagraph1}
                multiline
              />
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <EditableText
                path="about.methodologyParagraph2"
                value={about.methodologyParagraph2}
                multiline
              />
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
          <EditableText path="about.valuesTitle" value={about.valuesTitle} />
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {about.values.map((value, index) => {
            const ValueIcon = valueIcons[index] ?? BookOpen;
            return (
            <div key={`${value.title}-${index}`} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                <ValueIcon size={24} className="text-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                <EditableText path={`about.values[${index}].title`} value={value.title} />
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <EditableText
                  path={`about.values[${index}].text`}
                  value={value.text}
                  multiline
                />
              </p>
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
