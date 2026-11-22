# AYUB // TRIPLE 4 — Interactive OS Portfolio

Interactive cyberpunk workspace portfolio for **Mohammed Ayub A** (`AYUB // TRIPLE 4`) — B.Tech Information Technology student at KPR Institute of Engineering and Technology, Coimbatore.

Built with React, TypeScript, React Router, Vite, Tailwind CSS, Motion, and Lucide React.

---

## Core Architecture

- **Boot / Initialization Screen** (`BootScreen.tsx`): Terminal-style initialization sequence with immediate `Enter Environment` and `Skip Intro` controls.
- **Desktop Environment & Main Dashboard** (`DesktopEnvironment.tsx`, `Dashboard.tsx`): Full-viewport interactive OS workspace launching 8 modules (`PROFILE`, `PROJECT ARCHIVE`, `SECURITY LAB`, `CREATIVE LAB`, `LEADERSHIP`, `DATA LAB`, `TERMINAL`, `CONTACT`).
- **Window Manager & Navigation History** (`WindowManager.tsx`, `NavigationHistory.tsx`, `MobileNavigation.tsx`): Multi-window focus, minimize/maximize/close controls, taskbar dock, breadcrumbs, browser Back/Forward routing (`HashRouter`), and responsive mobile navigation drawer.
- **Project Explorer & Inspector** (`ProjectExplorer.tsx`, `ProjectDetail.tsx`): File-explorer repository with directory tree, status filters (`ACTIVE`, `COMPLETED`, `CONCEPT`, `EXPLORATION`), and structured project detail views.
- **Interactive Terminal** (`InteractiveTerminal.tsx`): Command shell supporting `help`, `whoami`, `about`, `projects`, `skills`, `security`, `creative`, `leadership`, `data`, `contact`, `socials`, `resume`, `open <target>`, `home`, and `clear`.

---

## Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   The app runs on `http://localhost:3000`.

3. **Type-check and build**

   ```bash
   npm run lint
   npm run build
   ```

---

## Customizing Content & Placeholders

All portfolio content lives in **`src/data/portfolioData.ts`**:

- **Academic Info / CGPA**: Verify `PERSONAL_INFO.cgpa` (`8.53`) against your latest official transcript before publishing.
- **Project GitHub Links**: Update `githubUrl` on each item in `PROJECTS` once specific repositories are public.
- **Security Profiles**: Replace the placeholder URLs for **Hack The Box** and **PortSwigger** when available.
- **Creative Lab Assets**: Replace the three placeholder images in `CREATIVE_ITEMS` with your actual posters, LaunchPad branding artwork, and photography inside `src/assets/images/`.
- **Resume PDF**: Drop a static PDF at `public/Mohammed_Ayub_A_Resume.pdf` if you want direct static PDF downloads alongside the built-in printable resume viewer.

---

## Deploying to GitHub Pages (`ayub0021/portfolio`)

Configured for **`https://ayub0021.github.io/portfolio/`**:

- `vite.config.ts` automatically sets `base: '/portfolio/'` when `GITHUB_PAGES=true`.
- `HashRouter` ensures all bookmarked module routes (`/#/projects`, `/#/terminal`, `/#/projects/anchorman`) resolve cleanly on GitHub Pages without server rewrite rules.
- `.github/workflows/deploy.yml` builds and deploys `dist/` via GitHub Actions on every push to `main`.

### Setup Steps on GitHub

1. Create a public repository named **`portfolio`** under your GitHub account (`ayub0021`).
2. Push this codebase to the `main` branch.
3. In **Settings → Pages**, set **Source** to **GitHub Actions**.
4. To test the GitHub Pages base-path build locally:

   ```bash
   npm run build:gh
   npm run preview
   ```
