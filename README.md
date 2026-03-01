# AKC Growth Path

Site vitrine React/TypeScript pour AKC Gestion Conseils.

## Stack technique

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Lancer le projet en local

```bash
npm install
npm run dev
```

Copiez aussi le fichier d'exemple des variables d'environnement si vous testez les APIs :

```bash
cp .env.example .env
```

## Vérifications avant mise en ligne

```bash
npm run test
npm run build
```

## Déploiement

Le site est déployé sur Vercel depuis la branche `main`.
Chaque push sur `main` déclenche un nouveau déploiement de production.

## Backoffice CMS

Un backoffice JSON est disponible sur la route :

- `/admin-dashboard`
- `/admin-cms`

Le contenu est chargé via `/api/cms-content` puis peut être publié vers GitHub.

### Variables d'environnement Vercel pour le CMS

- `CMS_ADMIN_TOKEN` : token secret pour autoriser la publication depuis le backoffice.
- `CMS_GITHUB_TOKEN` : token GitHub avec permission d'écriture sur le repository.
- `CMS_GITHUB_OWNER` : propriétaire GitHub du repository (ex: `Akcalice`).
- `CMS_GITHUB_REPO` : nom du repository (ex: `akc-growth-path`).
- `CMS_GITHUB_BRANCH` : branche cible pour publier le contenu (ex: `main`).
- `CMS_CONTENT_FILE_PATH` : chemin du fichier CMS dans le repo (par défaut `cms-content.json`).

## Envoi des messages du formulaire de contact

Le formulaire envoie les messages vers l'API `/api/contact`, puis vers l'email de destination.

### Variables d'environnement Vercel pour l'email

- `RESEND_API_KEY` : clé API Resend.
- `RESEND_FROM_EMAIL` : email expéditeur vérifié dans Resend.
- `CONTACT_TO_EMAIL` : email de réception des demandes de contact.
