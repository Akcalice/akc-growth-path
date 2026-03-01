import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
import { useCmsContent } from "@/context/CmsContentContext";

const poleIcons = [GraduationCap, Users, Briefcase];
const poleColors = ["bg-gold-light", "bg-accent", "bg-secondary"];

const Accompagnement = () => {
  const { content } = useCmsContent();
  const page = content.accompagnementPage;

  return (
    <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
            {page.badge}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
          <p className="text-muted-foreground text-lg">
            {page.intro}
          </p>
        </div>

        <div className="space-y-12">
          {page.poles.map((pole, index) => {
            const PoleIcon = poleIcons[index] ?? Briefcase;
            const poleColor = poleColors[index] ?? "bg-secondary";
            return (
            <div key={`${pole.title}-${index}`} className={`${poleColor} rounded-2xl p-8 md:p-12`}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4">
                    <PoleIcon size={24} className="text-foreground" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{pole.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{pole.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">{page.listTitle}</h3>
                  <ul className="space-y-3">
                    {pole.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <CheckCircle size={18} className="text-foreground shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/rendez-vous" className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors">
            {page.ctaLabel} <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Accompagnement;
