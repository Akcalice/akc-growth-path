import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";

const Prix = () => {
  const { content } = useCmsContent();
  const page = content.pricingPage;

  return (
    <Layout>
    <section className="bg-accent/50 py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">{page.title}</h1>
          <p className="text-muted-foreground text-lg">
            {page.intro}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.plans.map((plan, i) => {
            const isExternalCta = /^https?:\/\//.test(plan.ctaLink);
            return (
            <div
              key={i}
              className={`rounded-2xl p-7 flex flex-col ${
                plan.featured
                  ? "bg-gradient-to-br from-primary via-navy-light to-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <p className={`text-xs font-semibold tracking-wider uppercase mb-4 ${plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {plan.title}
              </p>
              <p className="font-display text-3xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={18} className={`shrink-0 mt-0.5 ${plan.featured ? "text-gold" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {isExternalCta ? (
                <a
                  href={plan.ctaLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`block text-center px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                    plan.featured
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-navy-light"
                  }`}
                >
                  {plan.ctaLabel}
                </a>
              ) : (
                <Link
                  to={plan.ctaLink}
                  className={`block text-center px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                    plan.featured
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-navy-light"
                  }`}
                >
                  {plan.ctaLabel}
                </Link>
              )}
            </div>
          );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold mb-6">{page.ctaTitle}</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
          {page.ctaDescription}
        </p>
        <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
          {page.ctaLabel} <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </section>
  </Layout>
  );
};

export default Prix;
