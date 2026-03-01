import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { formatBlogDate, getBlogArticleBySlug } from "@/data/blogArticles";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const BlogArticle = () => {
  const { slug = "" } = useParams();
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return (
      <Layout>
        <Seo
          title="Article introuvable | AKC Gestion Conseils"
          description="L'article demande n'existe pas ou n'est plus disponible."
          canonicalPath="/blog"
          noindex
        />
        <section className="py-20 md:py-28">
          <div className="container max-w-2xl text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Article introuvable
            </h1>
            <p className="text-muted-foreground mb-8">
              Le contenu demande n'est pas disponible. Vous pouvez consulter les autres
              articles du blog.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour au blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://akc-growth-path.vercel.app";

  const canonicalPath = `/blog/${article.slug}`;
  const imageUrl = `${baseUrl}${article.image}`;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: [imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AKC Gestion Conseils",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo-akc.svg`,
      },
    },
    mainEntityOfPage: `${baseUrl}${canonicalPath}`,
    keywords: article.keywords.join(", "),
  };

  return (
    <Layout>
      <Seo
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalPath={canonicalPath}
        image={article.image}
        type="article"
        keywords={article.keywords}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        structuredData={articleStructuredData}
      />

      <article className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-semibold mb-8 hover:text-navy-light transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux articles
          </Link>

          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-5">
              {article.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-5">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                Publie le {formatBlogDate(article.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                Temps de lecture : {article.readingTime}
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="w-full h-[240px] md:h-[420px] object-cover"
              loading="eager"
            />
          </div>

          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-foreground/90">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.heading}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc pl-6 mt-5 space-y-2 text-foreground/90">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={`${section.heading}-bullet-${bulletIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 p-8 rounded-2xl bg-accent/40">
            <h3 className="font-display text-2xl font-semibold mb-3">
              Besoin d'un accompagnement personnalise ?
            </h3>
            <p className="text-muted-foreground mb-6">
              AKC Gestion Conseils vous aide a transformer ces recommandations en plan
              d'action adapte a votre situation.
            </p>
            <Link
              to="/rendez-vous"
              className="inline-flex items-center px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogArticle;
