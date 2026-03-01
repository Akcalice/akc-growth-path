import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCmsContent } from "@/context/CmsContentContext";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  const { content } = useCmsContent();
  const location = useLocation();

  useEffect(() => {
    const isBlogRoute =
      location.pathname === "/blog" || location.pathname.startsWith("/blog/");

    if (!isBlogRoute) {
      document.title = content.site.tabTitle;
    }

    const currentDescription = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    if (!currentDescription) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content.site.defaultMetaDescription);
    }

    const faviconPath = content.site.faviconPath || content.site.logoPath;

    let icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.setAttribute("type", "image/svg+xml");
    icon.href = `${faviconPath}${faviconPath.includes("?") ? "&" : "?"}v=10`;
  }, [
    location.pathname,
    content.site.tabTitle,
    content.site.defaultMetaDescription,
    content.site.logoPath,
    content.site.faviconPath,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
