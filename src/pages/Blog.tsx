import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import booksStudy from "@/assets/books-study.jpg";
import illusEducation from "@/assets/illus-education.jpg";
import illusInsertion from "@/assets/illus-insertion.jpg";
import illusCoaching from "@/assets/illus-coaching.jpg";
import illusGrowth from "@/assets/illus-growth.jpg";
import illusWellbeing from "@/assets/illus-wellbeing.jpg";
import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Comment accompagner un adolescent en difficulté scolaire",
    excerpt: "Découvrez les clés pour soutenir un jeune en perte de motivation et l'aider à retrouver confiance en ses capacités.",
    date: "15 Fév 2026",
    category: "Éducatif",
    image: illusEducation,
  },
  {
    title: "Réussir sa reconversion professionnelle en 5 étapes",
    excerpt: "De l'idée au projet concret : les étapes essentielles pour changer de voie avec sérénité et méthode.",
    date: "8 Fév 2026",
    category: "Insertion",
    image: illusInsertion,
  },
  {
    title: "L'importance du coaching en entreprise",
    excerpt: "Pourquoi de plus en plus de structures font appel au coaching pour renforcer la cohésion et la performance de leurs équipes.",
    date: "1 Fév 2026",
    category: "Professionnel",
    image: illusCoaching,
  },
  {
    title: "Parentalité positive : mythes et réalités",
    excerpt: "Comprendre les fondements de la parentalité bienveillante et comment l'appliquer au quotidien.",
    date: "25 Jan 2026",
    category: "Éducatif",
    image: booksStudy,
  },
  {
    title: "Valoriser ses compétences lors d'un entretien d'embauche",
    excerpt: "Techniques concrètes pour mettre en avant votre parcours et convaincre votre futur employeur.",
    date: "18 Jan 2026",
    category: "Insertion",
    image: illusGrowth,
  },
  {
    title: "Gérer le stress au travail : outils et méthodes",
    excerpt: "Des stratégies pratiques pour retrouver un équilibre professionnel et préserver son bien-être.",
    date: "10 Jan 2026",
    category: "Professionnel",
    image: illusWellbeing,
  },
];

const Blog = () => (
  <Layout>
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-6">
            Blog
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Nos articles & conseils</h1>
          <p className="text-muted-foreground text-lg">
            Retrouvez nos derniers articles sur l'éducation, l'insertion professionnelle et le développement personnel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-hidden h-48">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-light">{article.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} /> {article.date}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                <span className="inline-flex items-center text-sm font-semibold text-foreground group-hover:text-navy-light transition-colors cursor-pointer">
                  Lire la suite <ArrowRight size={14} className="ml-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
