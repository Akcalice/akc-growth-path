import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Seo from "@/components/Seo";
import { useCmsContent } from "@/context/CmsContentContext";
import { imageMap } from "@/content/imageMap";

const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const Blog = () => {
  const { content } = useCmsContent();
  const blog = content.blog;
  const posts = blog.posts;
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://akc-growth-path.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${content.site.companyName}`,
    description: blog.seoDescription,
    url: `${baseUrl}/blog`,
    blogPost: posts.map((article) => {
      const articleImage =
        imageMap[article.imageKey as keyof typeof imageMap] ?? imageMap.illusEducation;
      return {
        "@type": "BlogPosting",
        headline: article.title,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        url: `${baseUrl}/blog/${article.slug}`,
        image: `${baseUrl}${articleImage}`,
        keywords: article.keywords.join(", "),
        author: {
          "@type": "Organization",
          name: article.author,
        },
      };
    }),
  };

  return (
    <Layout>
      <Seo
        title={blog.seoTitle}
        description={blog.seoDescription}
        canonicalPath="/blog"
        image={content.site.logoPath}
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
              {blog.badge}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {blog.listingTitle}
            </h1>
            <p className="text-muted-foreground text-lg">
              {blog.listingDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((article) => {
              const articleImage =
                imageMap[article.imageKey as keyof typeof imageMap] ?? imageMap.illusEducation;
              return (
              <article
                key={article.slug}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={`/blog/${article.slug}`} aria-label={`Lire l'article ${article.title}`}>
                  <div className="overflow-hidden h-52">
                    <img
                      src={articleImage}
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
            );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
