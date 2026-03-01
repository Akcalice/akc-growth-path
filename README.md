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

## Backoffice visuel securise

Acces admin :

- `/admin-login` : portail de connexion (email + mot de passe)
- `/admin-dashboard` : dashboard backoffice
- `/?edit=1` : editeur visuel au survol (apres connexion)

Le contenu edite est sauvegarde via `/api/cms-content` puis publie vers GitHub.

### Variables d'environnement Vercel pour le backoffice

- `ADMIN_LOGIN_EMAIL` : email autorise pour la connexion admin.
- `ADMIN_LOGIN_PASSWORD` : mot de passe admin.
- `ADMIN_AUTH_SECRET` : secret de signature des sessions admin.
- `CMS_GITHUB_TOKEN` : token GitHub avec permission d'ecriture sur le repository.
- `CMS_GITHUB_OWNER` : proprietaire GitHub du repository (ex: `Akcalice`).
- `CMS_GITHUB_REPO` : nom du repository (ex: `akcsite`).
- `CMS_GITHUB_BRANCH` : branche cible pour publier le contenu (ex: `main`).
- `CMS_CONTENT_FILE_PATH` : chemin du fichier de contenu (par defaut `cms-content.json`).

## Envoi des messages du formulaire de contact

Le formulaire envoie les messages vers l'API `/api/contact`, puis vers l'email de destination.

### Variables d'environnement Vercel pour l'email

- `RESEND_API_KEY` : clé API Resend.
- `RESEND_FROM_EMAIL` : email expéditeur vérifié dans Resend.
- `CONTACT_TO_EMAIL` : email de réception des demandes de contact.
