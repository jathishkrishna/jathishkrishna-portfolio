# Jathish Krishna — Complete Portfolio Package

A premium, responsive React + TypeScript + Vite portfolio, plus a matching one-page resume in PDF, Word, and Markdown formats.

## Run locally
Install Node.js 20+ and npm. Open the `portfolio` folder in VS Code, then run:

```powershell
npm.cmd install
npm.cmd run dev
```

On macOS/Linux use `npm install` and `npm run dev`. On Windows PowerShell, `npm.cmd` avoids common execution-policy errors related to `npm.ps1`.

Build with `npm.cmd run build`. The output is in `portfolio/dist`.

## Edit your content
Most text is in `portfolio/src/data.ts`. Update name, links, skills, projects, education, coursework, and languages there. Your profile links and email are already configured.

### Photo and certifications
The hero uses a replaceable JK placeholder. Add your photo later to `portfolio/public/` and replace the photo-slot markup in `src/App.tsx`. Certifications are intentionally left empty until you provide verified details.

### Project links and accuracy
Project previews are illustrative UI concepts, not screenshots of the real apps. No fake repository/demo buttons are shown. Add actual `repoUrl`/`demoUrl` fields to project data and create corresponding links if you want those buttons. Smart Shop's confirmed stack is shown; other technology stacks are not guessed. Some project features and database integrations should be verified before claiming they work.

## GitHub Pages
This is configured for the personal-site URL `https://jathishkrishna.github.io/` and repository `jathishkrishna.github.io`.

1. Create that repository under `jathishkrishna`.
2. Push the contents of the `portfolio` folder to the repository root.
3. In repository Settings → Pages, choose GitHub Actions as the source.
4. The included `.github/workflows/deploy.yml` builds and deploys on pushes to `main`.
5. After the workflow completes, visit `https://jathishkrishna.github.io/`.

## Contact form / EmailJS
The contact form validates inputs. Without configuration, it displays an email-draft fallback. For direct delivery:
1. Copy `portfolio/.env.example` to `portfolio/.env.local`.
2. Create an EmailJS service/template and add your service ID, template ID, and public key to `.env.local`.
3. Ensure the EmailJS template uses `from_name`, `reply_to`, `message`, and `to_email`.
4. Restart the dev server and test. Only use EmailJS's public key in client-side code; never expose private server keys.

The EmailJS package is included. The `VITE_` variables are bundled into client code, so do not store secrets in them.

## Resume
The `resume` folder contains `Jathish_Krishna_Resume.pdf`, `.docx`, and `.md`. The phone number, certifications, and unconfirmed experience/technology details are omitted. Add your phone number before submitting applications if desired.
