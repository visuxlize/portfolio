# Portfolio website

**Repository:** [github.com/visuxlize/portfolio](https://github.com/visuxlize/portfolio) — this folder (**`visuxlize-portfolio/`**) is the **canonical source** for the site; run all commands **here**, not from the monorepo root.

Personal portfolio for **Andres Marte** — software developer, UX/UI designer, and photographer. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, deployed to **GitHub Pages**.

**Live:** [https://visuxlize.github.io/portfolio/](https://visuxlize.github.io/portfolio/)

---

## Features

- **Hero** — Dot-grid background, ambient glow, focus-area chips (full-stack / UX·UI / photography) with auto-rotation, typewriter headline keyword + tagline
- **Experience** — Timeline of roles and education
- **Projects** — Cards with links to GitHub (and live demos where available)
- **About** — Photo, bio, languages, soft skills, and **tech stack** grid (Frontend, Backend, Design, Security, Dev & tooling, Deploy)
- **Contact** — Ways to reach you
- **Theme** — Light/dark toggle with system preference as default
- **Responsive** — Mobile-first layout

---

## Tech stack

- React 18, TypeScript, Create React App  
- Tailwind CSS  
- Framer Motion  
- Lucide React (icons)  
- `gh-pages` for deployment  

---

## Project structure

```
visuxlize-portfolio/
├── public/
│   ├── index.html
│   └── images/           # e.g. portrait assets
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Dev server |
| `npm run build` | Production build (output in `build/`) |
| `npm test` | Test runner |
| `npm run deploy` | `predeploy` runs `build`, then publishes `build/` to `gh-pages` |

Ensure `package.json` **`homepage`** matches your GitHub Pages URL (currently `https://visuxlize.github.io/portfolio`).

---

## Deployment

See **`DEPLOYMENT_GUIDE.md`** for step-by-step GitHub Pages setup. Short version:

```bash
npm run deploy
```

Repo **Settings → Pages**: source branch **`gh-pages`**, folder **`/ (root)`**.

---

## Contact

- **GitHub:** [@visuxlize](https://github.com/visuxlize)
