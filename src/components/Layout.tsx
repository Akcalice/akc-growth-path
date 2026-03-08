import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Seo from "./Seo";
import { useCmsContent } from "@/context/CmsContentContext";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  const { content } = useCmsContent();
  const location = useLocation();
  const isBlogRoute = location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  const pageSeoMap: Record<string, { title: string; description: string }> = {
    "/": {
      title: `${content.site.companyName} | Accompagnement educatif, social et professionnel`,
      description: content.site.defaultMetaDescription,
    },
    "/a-propos": {
      title: `A Propos | ${content.site.companyName}`,
      description:
        "Decouvrez l'expertise de AKConseil : accompagnement humain et sur-mesure avec plus de 25 ans d'experience.",
    },
    "/services": {
      title: `Services | ${content.site.companyName}`,
      description:
        "Explorez les services AKConseil : accompagnement educatif, insertion & orientation, coaching professionnel.",
    },
    "/accompagnement": {
      title: `Accompagnement | ${content.site.companyName}`,
      description:
        "Nos poles d'accompagnement educatif, insertion et professionnel pour vous aider a avancer avec clarte.",
    },
    "/prix": {
      title: `Tarifs | ${content.site.companyName}`,
      description:
        "Consultez les tarifs et forfaits AKConseil : seances individuelles, accompagnements et ateliers sur-mesure.",
    },
    "/rendez-vous": {
      title: `Prendre rendez-vous | ${content.site.companyName}`,
      description:
        "Reservez votre rendez-vous avec AKConseil pour demarrer un accompagnement adapte a votre situation.",
    },
    "/contact": {
      title: `Contact | ${content.site.companyName}`,
      description:
        "Contactez AKConseil pour toute question sur nos accompagnements educatifs, sociaux et professionnels.",
    },
  };

  const seoData = pageSeoMap[location.pathname] ?? {
    title: content.site.tabTitle,
    description: content.site.defaultMetaDescription,
  };
  const siteBaseUrl = content.site.siteUrl || "https://akconseil.fr";
  const logoUrl = new URL(content.site.logoPath, siteBaseUrl).toString();

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.site.companyName,
    url: siteBaseUrl,
    logo: logoUrl,
    email: content.site.contactEmail,
  };

  useEffect(() => {
    const faviconPath = content.site.faviconPath || "/favicon.ico";
    const faviconVersion = "12";
    const faviconUrl = `${faviconPath}${faviconPath.includes("?") ? "&" : "?"}v=${faviconVersion}`;

    let icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.setAttribute("type", faviconPath.endsWith(".svg") ? "image/svg+xml" : "image/x-icon");
    icon.href = faviconUrl;

    let shortcut = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement | null;
    if (!shortcut) {
      shortcut = document.createElement("link");
      shortcut.rel = "shortcut icon";
      document.head.appendChild(shortcut);
    }
    shortcut.href = faviconUrl;
  }, [
    location.pathname,
    content.site.faviconPath,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isBlogRoute && (
        <Seo
          title={seoData.title}
          description={seoData.description}
          canonicalPath={location.pathname}
          baseUrl={siteBaseUrl}
          image={content.site.ogImage}
          type="website"
          keywords={[
            "AKConseil",
            "accompagnement educatif",
            "insertion professionnelle",
            "orientation",
            "coaching professionnel",
          ]}
          structuredData={organizationStructuredData}
        />
      )}
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
