# [visuxlize/portfolio](https://github.com/visuxlize/portfolio)

GitHub repository: **[github.com/visuxlize/portfolio](https://github.com/visuxlize/portfolio)**

This repo is a **monorepo**. The **only folder for the public portfolio website** (the site deployed to GitHub Pages) is:

### **`visuxlize-portfolio/`**

Do not add a second copy of `src/` / `public/` / `package.json` at the repo root for that site — install, run, build, and deploy **from `visuxlize-portfolio/`** only.

**Live site:** [https://visuxlize.github.io/portfolio/](https://visuxlize.github.io/portfolio/)

**GitHub Pages:** **Settings → Pages → Build and deployment → Source:** choose **Deploy from a branch** (not “GitHub Actions” for this setup). Branch **`gh-pages`**, folder **`/ (root)`**. The workflow **Deploy portfolio to GitHub Pages** updates that branch on every push to `main`. If you use the **`main`** branch as the Pages source, you will only see **`README.md`**, not the React app.

---

## Portfolio app — work in this directory

```bash
cd visuxlize-portfolio
npm install
npm start          # http://localhost:3000
npm run build      # production bundle → build/
npm run deploy     # build + push to gh-pages branch
```

`visuxlize-portfolio/package.json` sets **`homepage`** for the **`/portfolio/`** path on GitHub Pages.

---

## What else is in this repo?

| Path | Role |
|------|------|
| **`visuxlize-portfolio/`** | **Portfolio site source** (CRA + TypeScript + Tailwind + Framer Motion) |
| **`.github/workflows/`** | CI (e.g. Deno job runs only if `deno.json` exists at repo root) |
| Other top-level folders | Other projects and coursework (not the deployed portfolio app) |

---

## Contact

- **GitHub:** [@visuxlize](https://github.com/visuxlize)
- **Email:** [mAndres1994@gmail.com](mailto:mAndres1994@gmail.com)
- **LinkedIn:** [Andres Marte](https://www.linkedin.com/in/andres-marte-95438217b/)

---

## License

Project-specific licenses may apply in subfolders; the portfolio contents are personal work unless noted otherwise.
