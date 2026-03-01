import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Seo from "@/components/Seo";
import { blogArticles, formatBlogDate } from "@/data/blogArticles";

const Blog = () => {
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://akc-growth-path.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog AKC Gestion Conseils",
    description:
      "Articles pratiques sur l'accompagnement educatif, l'insertion professionnelle et le coaching en entreprise.",
    url: `${baseUrl}/blog`,
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      url: `${baseUrl}/blog/${article.slug}`,
      image: `${baseUrl}${article.image}`,
      keywords: article.keywords.join(", "),
      author: {
        "@type": "Organization",
        name: article.author,
      },
    })),
  };

  return (
    <Layout>
      <Seo
        title="Blog AKC Gestion Conseils | Conseils educatifs, insertion et coaching"
        description="3 articles de fond pour avancer sur les enjeux educatifs, l'orientation professionnelle et la performance des equipes."
        canonicalPath="/blog"
        image="/logo-akc.svg"
        type="website"
        keywords={[
          "blog accompagnement educatif",
          "blog insertion professionnelle",
          "blog coaching entreprise",
          "AKC Gestion Conseils",
        ]}
        structuredData={structuredData}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
              Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Nos 3 articles de reference
            </h1>
            <p className="text-muted-foreground text-lg">
              Des contenus utiles et actionnables pour progresser sur les sujets educatifs,
              l'insertion professionnelle et l'accompagnement en entreprise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <article
                key={article.slug}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={`/blog/${article.slug}`} aria-label={`Lire l'article ${article.title}`}>
                  <div className="overflow-hidden h-52">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-light">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} /> {formatBlogDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} /> {article.readingTime}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-semibold mb-3 leading-snug">
                    <Link to={`/blog/${article.slug}`} className="hover:text-navy-light transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-foreground group-hover:text-navy-light transition-colors"
                  >
                    Lire l'article <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
