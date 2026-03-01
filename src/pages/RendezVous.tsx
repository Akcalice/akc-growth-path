import Layout from "@/components/Layout";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { useCmsContent } from "@/context/CmsContentContext";

const RendezVous = () => {
  const { content } = useCmsContent();
  const calendlyUrl = content.site.calendlyUrl;

  useEffect(() => {
    window.location.assign(calendlyUrl);
  }, [calendlyUrl]);

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Redirection vers Calendly...
          </h1>
          <p className="text-muted-foreground mb-8">
            Si la redirection ne se lance pas automatiquement, cliquez sur le bouton.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
          >
            Ouvrir Calendly <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default RendezVous;
