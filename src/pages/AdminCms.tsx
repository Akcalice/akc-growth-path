import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useCmsContent } from "@/context/CmsContentContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const formatJson = (value: unknown) => JSON.stringify(value, null, 2);

const AdminCms = () => {
  const { content, refresh, setContentLocally, isLoading } = useCmsContent();
  const { toast } = useToast();

  const [adminToken, setAdminToken] = useState("");
  const [jsonValue, setJsonValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  const initialJson = useMemo(() => formatJson(content), [content]);

  useEffect(() => {
    if (!hasLocalChanges) {
      setJsonValue(initialJson);
    }
  }, [initialJson, hasLocalChanges]);

  const onFormat = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      setJsonValue(formatJson(parsed));
    } catch {
      toast({
        title: "JSON invalide",
        description: "Le contenu JSON contient une erreur de syntaxe.",
      });
    }
  };

  const onReset = () => {
    setJsonValue(initialJson);
    setHasLocalChanges(false);
  };

  const onSave = async () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonValue);
    } catch {
      toast({
        title: "JSON invalide",
        description: "Merci de corriger le JSON avant la publication.",
      });
      return;
    }

    if (!adminToken.trim()) {
      toast({
        title: "Token requis",
        description: "Entrez le token backoffice pour sauvegarder les changements.",
      });
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch("/api/cms-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cms-token": adminToken.trim(),
        },
        body: JSON.stringify({ content: parsed }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const message =
          typeof errorPayload?.error === "string"
            ? errorPayload.error
            : `Erreur API (${response.status})`;
        throw new Error(message);
      }

      setContentLocally(parsed as typeof content);
      setHasLocalChanges(false);
      toast({
        title: "Contenu publie",
        description:
          "La mise a jour du CMS est enregistree. Le site prend en compte les nouvelles donnees.",
      });
      await refresh();
    } catch (error) {
      toast({
        title: "Echec de publication",
        description:
          error instanceof Error ? error.message : "Une erreur inconnue est survenue.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <Seo
        title="Backoffice CMS | AKC Gestion Conseils"
        description="Espace d'administration du contenu du site AKC Gestion Conseils."
        canonicalPath="/admin-cms"
        noindex
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Backoffice CMS
            </h1>
            <p className="text-muted-foreground">
              Modifiez le contenu du site dans le JSON puis cliquez sur Publier.
            </p>
            <Link
              to="/admin-dashboard"
              className="inline-flex mt-4 text-sm font-semibold hover:text-navy-light transition-colors"
            >
              Voir le dashboard backoffice
            </Link>
          </div>

          <div className="bg-accent/40 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="font-display text-xl font-semibold mb-2">Acces securise</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Utilisez le token backoffice defini dans Vercel (variable
              <code className="mx-1">CMS_ADMIN_TOKEN</code>).
            </p>
            <input
              type="password"
              value={adminToken}
              onChange={(event) => setAdminToken(event.target.value)}
              placeholder="Entrer le token backoffice"
              className="w-full md:w-[420px] px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              type="button"
              onClick={onFormat}
              className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
            >
              Formater JSON
            </button>
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
            >
              Reinitialiser
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || isLoading}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? "Publication..." : "Publier"}
            </button>
          </div>

          <textarea
            value={jsonValue}
            onChange={(event) => {
              setJsonValue(event.target.value);
              setHasLocalChanges(true);
            }}
            className="w-full min-h-[600px] rounded-2xl border border-border bg-background p-4 font-mono text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
        </div>
      </section>
    </Layout>
  );
};

export default AdminCms;
