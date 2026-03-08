import Layout from "@/components/Layout";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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
      };

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
            "Le formulaire ne peut pas envoyer votre message pour le moment.",
        );
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Message envoye",
        description: "Votre demande a bien ete envoyee. Nous revenons vers vous rapidement.",
      });
    } catch (error) {
      toast({
        title: "Envoi impossible",
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue. Merci de reessayer dans un instant.",
      });
      console.error("Erreur formulaire contact:", error);
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
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-muted-foreground text-lg">
              N'hesitez pas a nous ecrire pour toute question ou demande de renseignement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Nom complet</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Sujet</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm"
                  placeholder="Sujet de votre message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-ring focus:outline-none text-sm resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"} <Send size={16} className="ml-2" />
              </button>
            </form>

            <div className="space-y-8">
              <div className="bg-accent/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold mb-6">Informations de contact</h3>
                <div className="space-y-4">
                  <a href="mailto:contact@akconseil.fr" className="flex items-center gap-3 text-sm hover:text-navy-light transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                      <Mail size={18} className="text-foreground" />
                    </div>
                    contact@akconseil.fr
                  </a>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                      <MapPin size={18} className="text-foreground" />
                    </div>
                    France
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
