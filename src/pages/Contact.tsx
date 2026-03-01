import Layout from "@/components/Layout";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message envoyé !", description: "Nous vous répondrons dans les meilleurs délais." });
    setForm({ name: "", email: "", subject: "", message: "" });
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
              N'hésitez pas à nous écrire pour toute question ou demande de renseignement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
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
                className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors"
              >
                Envoyer <Send size={16} className="ml-2" />
              </button>
            </form>

            {/* Info */}
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
              <div className="bg-card rounded-2xl p-8">
                <h3 className="font-display text-lg font-bold mb-3">Horaires</h3>
                <p className="text-muted-foreground text-sm mb-2">Lundi - Vendredi : 9h - 18h</p>
                <p className="text-muted-foreground text-sm">Samedi : Sur rendez-vous</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
