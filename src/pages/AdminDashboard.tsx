import Seo from "@/components/Seo";
import { ExternalLink, Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ContactSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  subject: string;
  message: string;
};

const AdminDashboard = () => {
  const { email, logout } = useAdminAuth();
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);

  const refreshMessages = async () => {
    try {
      setIsLoadingMessages(true);
      setMessagesError(null);
      const response = await fetch("/api/contact-submissions", { cache: "no-store" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || `Erreur API (${response.status})`);
      }
      const payload = (await response.json()) as { items?: ContactSubmission[] };
      setMessages(Array.isArray(payload.items) ? payload.items : []);
    } catch (err) {
      setMessagesError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    void refreshMessages();
  }, []);

  const sortedMessages = useMemo(() => {
    const copy = [...messages];
    copy.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return copy;
  }, [messages]);

  return (
    <Layout>
      <Seo
        title="Dashboard Backoffice | AKConseil"
        description="Accès centralisé aux outils backoffice du site AKConseil."
        canonicalPath="/admin-dashboard"
        noindex
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold-light text-xs font-semibold tracking-wider uppercase mb-4">
              Backoffice
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Dashboard d’administration
            </h1>
            <p className="text-muted-foreground">
              Tous les accès importants pour gérer le site, le contenu et le déploiement.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted-foreground">
                Connecté en tant que : <strong>{email || "admin"}</strong>
              </span>
              <button
                type="button"
                onClick={() => void logout()}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Éditeur visuel</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Passez la souris sur les contenus pour modifier, supprimer ou ajouter des blocs.
              </p>
              <a
                href="/?edit=1"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Ouvrir l’éditeur visuel
              </a>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Vercel</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Déploiements, nom de domaine, variables d’environnement et logs.
              </p>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                Dashboard Vercel <ExternalLink size={14} className="ml-2" />
              </a>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">GitHub</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Répertoire principal, historique des versions et collaboration.
              </p>
              <a
                href="https://github.com/Akcalice/akcsite"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                Ouvrir GitHub <ExternalLink size={14} className="ml-2" />
              </a>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-semibold mb-2">Paramètres techniques</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Variables à configurer : ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD, ADMIN_AUTH_SECRET,
                CMS_GITHUB_TOKEN, RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL.
              </p>
              <span className="inline-flex items-center text-sm font-semibold">
                <Settings size={14} className="mr-2" />
                Voir README pour le détail
              </span>
            </div>
          </div>

          <div className="mt-10 bg-card rounded-2xl border border-border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Messages du formulaire de contact
                </h2>
                <p className="text-sm text-muted-foreground">
                  Les réponses sont enregistrées automatiquement et affichées ici.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void refreshMessages()}
                disabled={isLoadingMessages}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                {isLoadingMessages ? "Actualisation..." : "Actualiser"}
              </button>
            </div>

            {messagesError ? (
              <div className="rounded-xl border border-border bg-accent/40 px-4 py-3 text-sm text-muted-foreground">
                <strong className="text-foreground">Erreur :</strong> {messagesError}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-muted-foreground">
                        Aucun message pour le moment.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedMessages.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="whitespace-nowrap">
                          {m.createdAt ? new Date(m.createdAt).toLocaleString("fr-FR") : "—"}
                        </TableCell>
                        <TableCell>{m.name || "—"}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <a className="underline underline-offset-2" href={`mailto:${m.email}`}>
                            {m.email || "—"}
                          </a>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{m.phone || "—"}</TableCell>
                        <TableCell>{m.service || "—"}</TableCell>
                        <TableCell>{m.subject || "—"}</TableCell>
                        <TableCell className="max-w-[520px]">
                          <div className="line-clamp-2 whitespace-pre-wrap">{m.message || "—"}</div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
