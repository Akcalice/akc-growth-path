# AKConseil - site vitrine

## Lancer le projet

```bash
npm install
npm run dev
```

## Build et tests

```bash
npm run test
npm run build
```

## Formulaire de contact (envoi serveur)

Le formulaire appelle `POST /api/contact`.

Variables d'environnement Vercel recommandees :

- SMTP (prioritaire) :
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASSWORD`
  - `SMTP_FROM`
  - `NOTIFICATION_EMAIL`
- Ou Resend :
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `CONTACT_TO_EMAIL`

Sauvegarde en base (optionnelle) :

- `MONGODB_URI`
- `MONGODB_DB` (defaut: `akconseil`)
- `MONGODB_COLLECTION` (defaut: `contact_submissions`)

## Login admin temporaire

Routes :

- `/admin-login`
- `/admin-dashboard` (protege)
- `/page-builder` (editeur contenu simplifie)

Variables d'environnement requises pour l'acces admin :

- `ADMIN_LOGIN_EMAIL`
- `ADMIN_LOGIN_PASSWORD`
- `ADMIN_AUTH_SECRET`

Le login admin envoie un lien de validation par email (Resend), donc ajouter aussi :

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
