import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  baseUrl?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, unknown>;
};

const getBaseUrl = (configuredBaseUrl?: string) => {
  if (configuredBaseUrl) {
    try {
      return new URL(configuredBaseUrl).origin;
    } catch {
      // ignore invalid configured url
    }
  }
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return "https://akc-growth-path.vercel.app";
};

const ensureMeta = (attribute: "name" | "property", key: string, value: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
};

const removeMeta = (attribute: "name" | "property", key: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  const meta = document.querySelector(selector);
  if (meta) {
    meta.remove();
  }
};

const ensureCanonical = (url: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
};

const ensureStructuredData = (data: Record<string, unknown>) => {
  const id = "seo-structured-data";
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const removeStructuredData = () => {
  const script = document.getElementById("seo-structured-data");
  if (script) {
    script.remove();
  }
};

const Seo = ({
  title,
  description,
  canonicalPath = "/",
  baseUrl,
  image = "/logo-akc.png",
  type = "website",
  keywords = [],
  noindex = false,
  publishedTime,
  modifiedTime,
  structuredData,
}: SeoProps) => {
  useEffect(() => {
    const resolvedBaseUrl = getBaseUrl(baseUrl);
    const canonicalUrl = new URL(canonicalPath, resolvedBaseUrl).toString();
    const imageUrl = new URL(image, resolvedBaseUrl).toString();

    document.title = title;

    ensureMeta("name", "description", description);
    ensureMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    if (keywords.length > 0) {
      ensureMeta("name", "keywords", keywords.join(", "));
    }

    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:type", type);
    ensureMeta("property", "og:url", canonicalUrl);
    ensureMeta("property", "og:image", imageUrl);

    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);
    ensureMeta("name", "twitter:image", imageUrl);

    if (type === "article" && publishedTime) {
      ensureMeta("property", "article:published_time", publishedTime);
    } else {
      removeMeta("property", "article:published_time");
    }
    if (type === "article" && modifiedTime) {
      ensureMeta("property", "article:modified_time", modifiedTime);
    } else {
      removeMeta("property", "article:modified_time");
    }

    ensureCanonical(canonicalUrl);
    if (structuredData) {
      ensureStructuredData(structuredData);
    } else {
      removeStructuredData();
    }
  }, [
    title,
    description,
    canonicalPath,
    baseUrl,
    image,
    type,
    keywords,
    noindex,
    publishedTime,
    modifiedTime,
    structuredData,
  ]);

  return null;
};

export default Seo;
