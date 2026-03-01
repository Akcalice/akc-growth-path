import Layout from "@/components/Layout";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCmsContent } from "@/context/CmsContentContext";

type FallbackState = {
  mailto: string;
  gmail: string;
  plainText: string;
};

const Contact = () => {
  const { toast } = useToast();
  const { content } = useCmsContent();
  const page = content.contactPage;
  const calendlyUrl = content.site.calendlyUrl;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fallbackState, setFallbackState] = useState<FallbackState | null>(null);

  const buildFallbackState = () => {
    const subjectText = `[Contact site] ${form.subject || "Nouveau message"}`;
    const plainText = [
      `Nom: ${form.name}`,
      `Email: ${form.email}`,
      "",
      "Message:",
      form.message,
    ].join("\n");
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(plainText);
    const to = encodeURIComponent(content.site.contactEmail);
    return {
      mailto: `mailto:${content.site.contactEmail}?subject=${subject}&body=${body}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      plainText,
    };
  };

  const activateFallback = (description: string) => {
    const nextFallbackState = buildFallbackState();
    setFallbackState(nextFallbackState);
    toast({
      title: "Envoi alternatif active",
      description,
    });
  };

  const onCopyFallback = async () => {
    if (!fallbackState) {
      return;
    }
    try {
      await navigator.clipboard.writeText(fallbackState.plainText);
      toast({
        title: "Message copie",
        description: "Le contenu a ete copie dans le presse-papiers.",
      });
    } catch {
      toast({
        title: "Copie impossible",
        description: "Copiez le texte manuellement depuis le formulaire.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFallbackState(null);
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => ({}))) as {
          error?: string;
          fallback?: boolean;
        };
        const message =
          typeof errorPayload.error === "string"
            ? errorPayload.error
            : page.form.errorDescription;
        if (errorPayload.fallback) {
          activateFallback(
            "Le service email serveur n'est pas configure. Utilisez les boutons d'envoi juste en dessous.",
          );
          return;
        }
        throw new Error(message);
      }

      const payload = (await response.json().catch(() => ({}))) as {
        fallback?: boolean;
      };
      if (payload.fallback) {
        activateFallback(
          "Le service email est indisponible temporairement. Utilisez les boutons d'envoi juste en dessous.",
        );
        return;
      }

      toast({
        title: page.form.successTitle,
        description: page.form.successDescription,
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      activateFallback(
        error instanceof Error
          ? `${error.message} Utilisez les boutons d'envoi juste en dessous.`
          : "Une erreur est survenue. Utilisez les boutons d'envoi juste en dessous.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">{page.form.fullNameLabel}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder={page.form.fullNamePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{page.form.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder={page.form.emailPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{page.form.subjectLabel}</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder={page.form.subjectPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{page.form.messageLabel}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm resize-none"
                  placeholder={page.form.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
              >
                {isSubmitting ? "Envoi..." : page.form.submitLabel} <Send size={16} className="ml-2" />
              </button>

              {fallbackState && (
                <div className="rounded-xl border border-border bg-accent/40 px-4 py-3 text-sm text-muted-foreground">
                  <p className="mb-3">
                    Envoi direct indisponible pour le moment. Choisissez une option :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={fallbackState.mailto}
                      className="inline-flex items-center px-3 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-navy-light transition-colors"
                    >
                      Ouvrir ma messagerie
                    </a>
                    <a
                      href={fallbackState.gmail}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors"
                    >
                      Ouvrir Gmail Web
                    </a>
                    <button
                      type="button"
                      onClick={() => void onCopyFallback()}
                      className="inline-flex items-center px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors"
                    >
                      Copier le message
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Info */}
            <div className="space-y-8">
              <div className="bg-accent/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-6">{page.infoTitle}</h3>
                <div className="space-y-4">
                  <a href={`mailto:${content.site.contactEmail}`} className="flex items-center gap-3 text-sm hover:text-navy-light transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                      <Mail size={18} className="text-foreground" />
                    </div>
                    {content.site.contactEmail}
                  </a>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                      <MapPin size={18} className="text-foreground" />
                    </div>
                    {content.site.location}
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-8">
                <h3 className="font-display text-lg font-bold mb-3">{page.hoursTitle}</h3>
                <p className="text-muted-foreground text-sm mb-2">{page.hoursWeekdays}</p>
                <p className="text-muted-foreground text-sm">{page.hoursSaturday}</p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
                >
                  Prendre RDV sur Calendly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
