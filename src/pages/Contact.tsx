import Layout from "@/components/Layout";
import { Instagram, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCmsContent } from "@/context/CmsContentContext";

const Contact = () => {
  const { toast } = useToast();
  const { content } = useCmsContent();
  const page = content.contactPage;
  const calendlyUrl = content.site.calendlyUrl;
  const instagramUrl = content.site.instagramUrl?.trim();
  const linkedinUrl = content.site.linkedinUrl?.trim();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        queued?: boolean;
        warning?: string;
        provider?: string;
      };

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error || page.form.errorDescription || "Envoi impossible pour le moment.",
        );
      }

      if (payload.queued) {
        toast({
          title: "Message enregistré",
          description:
            payload.warning ||
            "Votre message est bien enregistré, mais l’email n’a pas encore pu être envoyé.",
        });
      } else {
        toast({
          title: page.form.successTitle,
          description: page.form.successDescription,
        });
      }
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: page.form.errorTitle,
        description:
          error instanceof Error ? error.message : "Une erreur est survenue.",
      });
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
                <label className="block text-sm font-medium mb-1.5">Telephone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder="06 00 00 00 00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Service souhaite</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                >
                  <option value="">Selectionner un service</option>
                  <option value="Accompagnement educatif">Accompagnement educatif</option>
                  <option value="Insertion & orientation">Insertion & orientation</option>
                  <option value="Coaching professionnel">Coaching professionnel</option>
                  <option value="Autre">Autre</option>
                </select>
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
                className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Envoi..." : page.form.submitLabel} <Send size={16} className="ml-2" />
              </button>
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
                  <div className="flex items-center gap-3 text-sm">
                    {instagramUrl ? (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 hover:text-navy-light transition-colors"
                        aria-label="Instagram"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                          <Instagram size={18} className="text-foreground" />
                        </div>
                        Instagram
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 opacity-60">
                        <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                          <Instagram size={18} className="text-foreground" />
                        </div>
                        Instagram
                      </span>
                    )}
                    {linkedinUrl ? (
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 hover:text-navy-light transition-colors"
                        aria-label="LinkedIn"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                          <Linkedin size={18} className="text-foreground" />
                        </div>
                        LinkedIn
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 opacity-60">
                        <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                          <Linkedin size={18} className="text-foreground" />
                        </div>
                        LinkedIn
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-8 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
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
