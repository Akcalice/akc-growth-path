import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";
import EditableImage from "@/components/visual-editor/EditableImage";
import EditableText from "@/components/visual-editor/EditableText";

const Footer = () => {
  const { content } = useCmsContent();
  const logoPath = content.site.logoPath || "/logo-akc.svg";
  const logoSrc = `${logoPath}${logoPath.includes("?") ? "&" : "?"}v=10`;
  const calendlyUrl = content.site.calendlyUrl;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex mb-4" aria-label="Retour à l'accueil AKC">
              <EditableImage
                path="site.logoPath"
                src={logoSrc}
                alt={`Logo ${content.site.companyName}`}
                className="h-11 w-auto"
                imgClassName="h-11 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              <EditableText
                path="footer.description"
                value={content.footer.description}
                multiline
              />
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">
              <EditableText
                path="footer.navigationTitle"
                value={content.footer.navigationTitle}
              />
            </h4>
            <div className="flex flex-col gap-2">
              {content.footer.navigationLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <EditableText
                    path={`footer.navigationLinks[${index}].label`}
                    value={link.label}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">
              <EditableText path="footer.contactTitle" value={content.footer.contactTitle} />
            </h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a
                href={`mailto:${content.site.contactEmail}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail size={16} />
                <EditableText path="site.contactEmail" value={content.site.contactEmail} />
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                <EditableText path="site.location" value={content.site.location} />
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">
              <EditableText
                path="footer.appointmentTitle"
                value={content.footer.appointmentTitle}
              />
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              <EditableText
                path="footer.appointmentDescription"
                value={content.footer.appointmentDescription}
                multiline
              />
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex px-6 py-2.5 rounded-full bg-primary-foreground text-primary text-sm font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              <EditableText
                path="footer.appointmentCtaLabel"
                value={content.footer.appointmentCtaLabel}
              />
            </a>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50 space-y-1">
          <p>
            © {new Date().getFullYear()}{" "}
            <EditableText path="site.companyName" value={content.site.companyName} />.{" "}
            <EditableText path="footer.copyrightText" value={content.footer.copyrightText} />
          </p>
          <p>Created by Becc's Studio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
