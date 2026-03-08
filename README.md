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

Variables d'environnement Vercel a definir :

- `RESEND_API_KEY` (obligatoire)
- `RESEND_FROM_EMAIL` (recommande)
- `CONTACT_TO_EMAIL` (recommande)

## Login admin temporaire

Routes :

- `/admin-login`
- `/admin-dashboard` (protege)

Identifiants temporaires par defaut :

- Email : `admin@akconseil.fr`
- Mot de passe : `AKC-Temp-2026!`
