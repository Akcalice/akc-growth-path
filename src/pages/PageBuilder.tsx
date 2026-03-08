import Layout from "@/components/Layout";
import { CmsBlogPost, CmsContent } from "@/content/defaultCmsContent";
import { imageMap, resolveImageSrc } from "@/content/imageMap";
import { useCmsContent } from "@/context/CmsContentContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";

type SaveState = "idle" | "saving" | "saved" | "error";
const PAGE_BUILDER_PASSWORD_KEY = "akconseil_page_builder_password";

const cloneContent = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const createEmptyPost = (): CmsBlogPost => ({
  slug: `nouvel-article-${Date.now()}`,
  title: "Nouvel article",
  metaTitle: "Nouvel article | AKConseil",
  metaDescription: "Description de l'article",
  excerpt: "Resume de l'article",
  category: "Educatif",
  imageKey: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Illustration article",
  publishedAt: new Date().toISOString().slice(0, 10),
  updatedAt: new Date().toISOString().slice(0, 10),
  readingTime: "5 min",
  author: "AKConseil",
  keywords: ["accompagnement"],
  sections: [
    {
      heading: "Introduction",
      paragraphs: ["Ecrivez ici le contenu de votre article."],
      bullets: [],
    },
  ],
});

const saveStatusLabel: Record<SaveState, string> = {
  idle: "Aucune modification",
  saving: "Sauvegarde...",
  saved: "Sauvegarde",
  error: "Erreur de sauvegarde",
};

const PageBuilder = () => {
  const { content, setContentLocally, refresh } = useCmsContent();
  const { toast } = useToast();
  const [draft, setDraft] = useState<CmsContent>(content);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    const savedPassword = window.localStorage.getItem(PAGE_BUILDER_PASSWORD_KEY);
    if (savedPassword) {
      setAdminPassword(savedPassword);
    }
  }, []);

  const selectedPost = draft.blog.posts[selectedPostIndex] || null;

  const updateDraft = (updater: (previous: CmsContent) => CmsContent) => {
    setDraft((previous) => {
      const next = updater(previous);
      setContentLocally(next);
      return next;
    });
    setSaveState("idle");
  };

  const saveNow = async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false;
    if (!adminPassword.trim()) {
      setSaveState("error");
      if (!silent) {
        toast({
          title: "Mot de passe requis",
          description: "Renseignez le mot de passe admin pour publier les modifications.",
        });
      }
      return;
    }

    try {
      setSaveState("saving");
      const response = await fetch("/api/cms-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword.trim(),
        },
        body: JSON.stringify({ content: draft }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        details?: string;
      };
      if (!response.ok) {
        const details = payload.details ? ` ${payload.details}` : "";
        throw new Error((payload.error || `Erreur API (${response.status})`) + details);
      }

      await refresh();
      setSaveState("saved");
      if (!silent) {
        toast({
          title: "Modifications enregistrees",
          description: "Le contenu a bien ete publie.",
        });
      }
    } catch (error) {
      setSaveState("error");
      if (!silent) {
        toast({
          title: "Publication impossible",
          description: error instanceof Error ? error.message : "Erreur inconnue.",
        });
      }
    }
  };

  useEffect(() => {
    if (saveState === "saving" || saveState === "saved") {
      return;
    }
    if (!adminPassword.trim()) {
      return;
    }
    const timeout = window.setTimeout(() => {
      void saveNow({ silent: true });
    }, 2000);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [draft, adminPassword]); // eslint-disable-line react-hooks/exhaustive-deps

  const serviceImageRows = useMemo(
    () => [
      {
        label: "Accompagnement educatif",
        homeIndex: 0,
        servicesIndex: 0,
        fallback: imageMap.illusEducation,
      },
      {
        label: "Insertion & orientation",
        homeIndex: 1,
        servicesIndex: 1,
        fallback: imageMap.illusInsertion,
      },
    ],
    [],
  );
  const siteBaseUrl = (draft.site.siteUrl || "https://akconseil.fr").replace(/\/+$/, "");
  const homeSnippetTitle = draft.site.tabTitle || draft.site.companyName;
  const blogSnippetTitle = draft.blog.seoTitle || `Blog | ${draft.site.companyName}`;

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container max-w-6xl space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-3xl font-bold">Editeur contenu simplifie</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Modifiez les images, temoignages et articles de blog sans page builder complexe.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => {
                    const value = event.target.value;
                    setAdminPassword(value);
                    window.localStorage.setItem(PAGE_BUILDER_PASSWORD_KEY, value);
                  }}
                  placeholder="Mot de passe admin (publication)"
                  className="px-3 py-2 rounded-lg border border-border bg-background text-xs md:text-sm min-w-[240px]"
                />
                <span className="rounded-full bg-accent px-3 py-1 text-xs">
                  {saveStatusLabel[saveState]}
                </span>
                <button
                  type="button"
                  onClick={() => void saveNow()}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-navy-light transition-colors"
                >
                  Publier maintenant
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <h2 className="font-display text-2xl font-semibold">1) Images des services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceImageRows.map((row) => {
                const imageKey = draft.home.services[row.homeIndex]?.imageKey || "";
                const preview = resolveImageSrc(imageKey, row.fallback);
                return (
                  <div key={row.label} className="rounded-xl border border-border p-4 space-y-3">
                    <h3 className="font-semibold">{row.label}</h3>
                    <img
                      src={preview}
                      alt={row.label}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <input
                      value={imageKey}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.home.services[row.homeIndex].imageKey = nextValue;
                          next.servicesPage.items[row.servicesIndex].imageKey = nextValue;
                          return next;
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      placeholder="URL image"
                    />
                    <label className="inline-flex items-center px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold cursor-pointer">
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) {
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            const result = reader.result;
                            if (typeof result !== "string") {
                              return;
                            }
                            updateDraft((previous) => {
                              const next = cloneContent(previous);
                              next.home.services[row.homeIndex].imageKey = result;
                              next.servicesPage.items[row.servicesIndex].imageKey = result;
                              return next;
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-2xl font-semibold">2) Temoignages (dont etoiles)</h2>
            <div className="space-y-4">
              {draft.home.testimonials.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="rounded-xl border border-border p-4 space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <input
                      value={testimonial.name}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.home.testimonials[index].name = event.target.value;
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      placeholder="Nom"
                    />
                    <input
                      value={testimonial.sessions}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.home.testimonials[index].sessions = event.target.value;
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      placeholder="Sessions"
                    />
                    <select
                      value={testimonial.stars ?? 5}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.home.testimonials[index].stars = Number(event.target.value);
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value} etoile{value > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={testimonial.text}
                    onChange={(event) =>
                      updateDraft((previous) => {
                        const next = cloneContent(previous);
                        next.home.testimonials[index].text = event.target.value;
                        return next;
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    placeholder="Texte du temoignage"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateDraft((previous) => {
                        const next = cloneContent(previous);
                        next.home.testimonials.splice(index, 1);
                        return next;
                      })
                    }
                    className="px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold"
                  >
                    Supprimer ce temoignage
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                updateDraft((previous) => {
                  const next = cloneContent(previous);
                  next.home.testimonials.push({
                    text: "Nouveau temoignage",
                    name: "Nom",
                    sessions: "1 session",
                    stars: 5,
                  });
                  return next;
                })
              }
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
            >
              Ajouter un temoignage
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-2xl font-semibold">3) Redaction articles de blog</h2>
            <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-5">
              <aside className="space-y-2">
                {draft.blog.posts.map((post, index) => (
                  <button
                    key={post.slug}
                    type="button"
                    onClick={() => setSelectedPostIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
                      index === selectedPostIndex
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background"
                    }`}
                  >
                    {post.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.blog.posts.unshift(createEmptyPost());
                      setSelectedPostIndex(0);
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                >
                  + Nouvel article
                </button>
              </aside>

              {selectedPost && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      value={selectedPost.title}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts[selectedPostIndex].title = event.target.value;
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      placeholder="Titre"
                    />
                    <input
                      value={selectedPost.slug}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts[selectedPostIndex].slug = createSlug(event.target.value);
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      placeholder="slug"
                    />
                    <select
                      value={selectedPost.category}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts[selectedPostIndex].category = event.target.value as CmsBlogPost["category"];
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="Educatif">Educatif</option>
                      <option value="Insertion">Insertion</option>
                      <option value="Professionnel">Professionnel</option>
                    </select>
                    <input
                      value={selectedPost.readingTime}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts[selectedPostIndex].readingTime = event.target.value;
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                      placeholder="Temps de lecture"
                    />
                    <input
                      value={selectedPost.metaTitle}
                      onChange={(event) =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts[selectedPostIndex].metaTitle = event.target.value;
                          return next;
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm md:col-span-2"
                      placeholder="Meta title SEO (titre Google)"
                    />
                  </div>

                  <input
                    value={selectedPost.imageKey}
                    onChange={(event) =>
                      updateDraft((previous) => {
                        const next = cloneContent(previous);
                        next.blog.posts[selectedPostIndex].imageKey = event.target.value;
                        return next;
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    placeholder="URL image de couverture"
                  />

                  <textarea
                    value={selectedPost.excerpt}
                    onChange={(event) =>
                      updateDraft((previous) => {
                        const next = cloneContent(previous);
                        next.blog.posts[selectedPostIndex].excerpt = event.target.value;
                        return next;
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    placeholder="Resume"
                  />

                  <textarea
                    value={selectedPost.metaDescription}
                    onChange={(event) =>
                      updateDraft((previous) => {
                        const next = cloneContent(previous);
                        next.blog.posts[selectedPostIndex].metaDescription = event.target.value;
                        return next;
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    placeholder="Meta description SEO"
                  />

                  <input
                    value={selectedPost.keywords.join(", ")}
                    onChange={(event) =>
                      updateDraft((previous) => {
                        const next = cloneContent(previous);
                        next.blog.posts[selectedPostIndex].keywords = event.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean);
                        return next;
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    placeholder="Mots-cles SEO (separes par des virgules)"
                  />

                  <div className="space-y-3">
                    {selectedPost.sections.map((section, sectionIndex) => (
                      <div key={`${selectedPost.slug}-section-${sectionIndex}`} className="rounded-xl border border-border p-3 space-y-2">
                        <input
                          value={section.heading}
                          onChange={(event) =>
                            updateDraft((previous) => {
                              const next = cloneContent(previous);
                              next.blog.posts[selectedPostIndex].sections[sectionIndex].heading = event.target.value;
                              return next;
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                          placeholder="Titre de section"
                        />
                        <textarea
                          value={section.paragraphs.join("\n\n")}
                          onChange={(event) =>
                            updateDraft((previous) => {
                              const next = cloneContent(previous);
                              next.blog.posts[selectedPostIndex].sections[sectionIndex].paragraphs =
                                event.target.value
                                  .split(/\n{2,}/)
                                  .map((item) => item.trim())
                                  .filter(Boolean);
                              return next;
                            })
                          }
                          rows={5}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                          placeholder="Corps du texte (separez les paragraphes par ligne vide)"
                        />
                        <textarea
                          value={(section.bullets || []).join("\n")}
                          onChange={(event) =>
                            updateDraft((previous) => {
                              const next = cloneContent(previous);
                              next.blog.posts[selectedPostIndex].sections[sectionIndex].bullets =
                                event.target.value
                                  .split("\n")
                                  .map((item) => item.trim())
                                  .filter(Boolean);
                              return next;
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                          placeholder="Liste a puces (une ligne = une puce)"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateDraft((previous) => {
                              const next = cloneContent(previous);
                              next.blog.posts[selectedPostIndex].sections.splice(sectionIndex, 1);
                              return next;
                            })
                          }
                          className="px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-xs"
                        >
                          Supprimer section
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts[selectedPostIndex].sections.push({
                            heading: "Nouvelle section",
                            paragraphs: ["Texte de section"],
                            bullets: [],
                          });
                          return next;
                        })
                      }
                      className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold"
                    >
                      Ajouter section
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateDraft((previous) => {
                          const next = cloneContent(previous);
                          next.blog.posts.splice(selectedPostIndex, 1);
                          setSelectedPostIndex(0);
                          return next;
                        })
                      }
                      className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold"
                    >
                      Supprimer l'article
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <h2 className="font-display text-2xl font-semibold">
              4) SEO Google (titre, description, URL)
            </h2>
            <p className="text-sm text-muted-foreground">
              Ces champs influencent l'affichage de votre site sur Google (titre, description,
              URL canonique et partage social).
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-xs font-semibold">Nom entreprise</span>
                <input
                  value={draft.site.companyName}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.companyName = event.target.value;
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="AKConseil"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold">URL officielle du site</span>
                <input
                  value={draft.site.siteUrl}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.siteUrl = event.target.value.trim();
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="https://akconseil.fr"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold">Lien Instagram</span>
                <input
                  value={draft.site.instagramUrl}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.instagramUrl = event.target.value.trim();
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="https://www.instagram.com/votre-compte"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold">Lien LinkedIn</span>
                <input
                  value={draft.site.linkedinUrl}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.linkedinUrl = event.target.value.trim();
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="https://www.linkedin.com/in/votre-compte"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold">Titre SEO page d'accueil</span>
                <input
                  value={draft.site.tabTitle}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.tabTitle = event.target.value;
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="AKConseil | Accompagnement educatif, social et professionnel"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold">Description SEO page d'accueil</span>
                <textarea
                  value={draft.site.defaultMetaDescription}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.defaultMetaDescription = event.target.value;
                      return next;
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="Description affichee sur Google"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold">Titre SEO page Blog</span>
                <input
                  value={draft.blog.seoTitle}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.blog.seoTitle = event.target.value;
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="Blog AKConseil | Conseils et accompagnement"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold">Description SEO page Blog</span>
                <textarea
                  value={draft.blog.seoDescription}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.blog.seoDescription = event.target.value;
                      return next;
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="Description Google pour la page blog"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold">Image de partage (Open Graph)</span>
                <input
                  value={draft.site.ogImage}
                  onChange={(event) =>
                    updateDraft((previous) => {
                      const next = cloneContent(previous);
                      next.site.ogImage = event.target.value;
                      return next;
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="/logo-akc.svg"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold mb-3">Apercu Google - Accueil</p>
                <p className="text-sm text-blue-700 truncate">{siteBaseUrl}/</p>
                <p className="text-lg text-[#1a0dab] leading-snug">{homeSnippetTitle}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {draft.site.defaultMetaDescription}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold mb-3">Apercu Google - Blog</p>
                <p className="text-sm text-blue-700 truncate">{siteBaseUrl}/blog</p>
                <p className="text-lg text-[#1a0dab] leading-snug">{blogSnippetTitle}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {draft.blog.seoDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PageBuilder;
