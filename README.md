# 🎬 Movie Explorer

A sleek React app to search movies via the OMDb API, view rich details, and save personal favorites — complete with pagination, a sidebar-driven layout, and a dark, responsive UI.

<p align="center">
  <img alt="Movie Explorer banner" src="docs/banner.png" width="800"/>
</p>

<p align="center">
  <a href="#-features"><img alt="features" src="https://img.shields.io/badge/Features-Complete-blue"/></a>
  <a href="#-tech-stack"><img alt="tech" src="https://img.shields.io/badge/Stack-React%20%7C%20Router%20%7C%20CSS-green"/></a>
</p>

---

## 🧭 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Architecture & Tech Stack](#-architecture--tech-stack)
* [Getting Started](#-getting-started)

  * [Prerequisites](#prerequisites)
  * [Clone](#clone)
  * [Environment Variables](#environment-variables)
  * [How to Get an API Key](#-how-to-get-an-omdb-api-key)
  * [Install Dependencies](#install-dependencies)
  * [Run Dev Server](#run-dev-server)
* [Project Structure](#-project-structure)
* [Configuration & API](#-configuration--api)
* [Usage Guide](#-usage-guide)
* [Styling & Theming](#-styling--theming)
* [Accessibility](#-accessibility)
* [Performance Tips](#-performance-tips)
* [Testing](#-testing)
* [Linting & Formatting](#-linting--formatting)
* [Deployment](#-deployment)
* [CI/CD (Optional)](#cicd-optional)



---

## 📌 Overview

**Movie Explorer** is a React web application that lets you:

* Search movies by title via the **OMDb API**
* Explore **details** (poster, year, and more)
* Add/remove **favorites** (persisted to `localStorage`)
* Navigate **pages** of results using built-in **pagination**
* Enjoy a responsive **dark UI** with a **sidebar** and interactive cards

> Why this project? It’s a clean, beginner-friendly example of working with third‑party APIs, state management via React Hooks, client-side routing, and UX patterns like favorites and pagination.

---

## ✨ Features

* 🔎 **Search**: Query OMDb by title with fetch.
* 📑 **Pagination**: Navigate results using `&page=` (OMDb returns 10 per page).
* 🧠 **Favorites**: Save/remove movies; persisted in `localStorage`.
* 🧭 **Routing**: `react-router-dom` for Home, Favorites, and Details routes.
* 🖼️ **Movie Details**: Poster, title, year, and more; clean centered card.
* 🧱 **Sidebar Navigation**: Toggleable sidebar + overlay on small screens.
* 🎛️ **Responsive UI**: Cards grid adapts across breakpoints.
* 🌓 **Dark Theme**: Modern, accessible contrast with soft shadows.

Nice-to-haves included in the repo:

* 🚫 Graceful error + empty states
* ⏳ Loading indicator
* ❤️ Distinct favorite state (icon toggle)

---

## 🧱 Architecture & Tech Stack

* **React** (Hooks)
* **Routing**: `react-router-dom`
* **Styling**: Plain CSS (easy to swap with Tailwind/SCSS later)
* **Data**: OMDb API (`https://www.omdbapi.com/`)
* **State**: Component-level state via Hooks; favorites in `localStorage`
* **Build**: Vite *or* Create React App (both supported below)



## 🚀 Getting Started

### Prerequisites

* **Node.js**: v18+ recommended
* **Package Manager**: npm or yarn or pnpm
* **OMDb API Key** (free) → create one at omdbapi.com

### Clone

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### Environment Variables

> Do **NOT** commit secrets. Keep `.env` out of Git with `.gitignore`.

#### Vite

Create `.env` in project root:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

Access it with `import.meta.env.VITE_OMDB_API_KEY`.

#### Create React App (CRA)

Create `.env` in project root:

```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

Access it with `process.env.REACT_APP_OMDB_API_KEY`.

#### `.gitignore`

```gitignore
# dependencies
node_modules/

# builds
build/
dist/

# env
.env
.env.local
```

> If you previously committed `.env`, scrub it from history before pushing. (See Troubleshooting.)

### 🔑 How to Get an OMDb API Key

1. Go to the official [OMDb API website](http://www.omdbapi.com/apikey.aspx).
2. Choose the **Free** or **Paid** plan.

   * **Free plan** → 1,000 requests per day.
   * **Paid plans** → higher limits and extended usage.
3. Sign up with your email address.
4. Receive your **API key** in your inbox.
5. Copy the key into your `.env` file as shown above (`VITE_OMDB_API_KEY` or `REACT_APP_OMDB_API_KEY`).

### Install Dependencies

```bash
# npm
npm install

# or yarn
yarn

# or pnpm
pnpm install
```

### Run Dev Server

```bash
# Vite
yarn dev
# or
npm run dev

# CRA
npm start
# or
yarn start
```

---

## 📁 Project Structure

```
<your-repo>/
├─ src/
│  ├─ components/
│  │  ├─ HomePage.jsx
│  │  ├─ Favorites.jsx
│  │  ├─ MovieDetails.jsx
│  │  └─ common/ (buttons, loaders, etc.)
│  ├─ styles/
│  │  └─ HomePage.css
│  ├─ App.jsx
│  ├─ main.jsx / index.js
│  └─ router.jsx (if you split routes)
├─ public/
├─ docs/
│  └─ screenshots/
├─ .env (excluded)
├─ .gitignore
├─ package.json
└─ README.md
```

---

## ⚙️ Configuration & API

### OMDb Endpoints used

* **Search**: `https://www.omdbapi.com/?apikey=<KEY>&s=<query>&page=<n>`

  * Returns up to **10 items per page**; use `totalResults` to compute pages.
* **Details**: `https://www.omdbapi.com/?apikey=<KEY>&i=<imdbID>&plot=full`

### Pagination Logic

* Track `page` and `totalResults` in state
* Compute `totalPages = Math.ceil(totalResults / 10)`
* Fetch with current `page`; render **Prev/Next** buttons with proper disabling

### Favorites Persistence

* Store an array of movie objects in `localStorage` under `favorites`
* Toggle add/remove by `imdbID`

---

## 📖 Usage Guide

### Search

1. Enter a title in the search bar
2. Hit **Search** → results load
3. If nothing appears, check the error message (e.g., no results, API limit)

### Pagination

* Use **Prev/Next** to navigate pages
* Page indicator shows `Page X of Y`

### Favorites

* Click **Favorite** on a card to save/remove
* Favorites count appears in Sidebar; Favorites page lists them
* Data persists across refreshes via `localStorage`

### Movie Details

* Click a card → navigates to Details (`/movie/:imdbID`)
* Back nav returns to your last listing page (keep `page` in state/query param)
* Details page centers the card with accessible color contrast

---

## 🎨 Styling & Theming

* Dark UI using modern cards (rounded corners, subtle shadows)
* Responsive grid via CSS
* Centered detail card with `margin: 2rem auto` (avoid large left padding)
* Easily replace with Tailwind by porting class names if you prefer utility-first styling

---

## ♿ Accessibility

* Semantic elements for nav/content
* Sufficient color contrast
* Buttons have `aria-label`s where icons are used
* Keyboard focus styles preserved; interactive elements are reachable

---

## ⚡ Performance Tips

* Avoid unnecessary re-renders by memoizing derived lists if needed
* Debounce the search input for fewer API calls (optional enhancement)
* Use responsive images; fall back placeholder when Poster is `N/A`

---

## ✅ Testing

*Suggested setup (optional):*

* **Unit/Component**: Vitest + React Testing Library *or* Jest + RTL
* **What to test**:

  * Search triggers fetch and renders results
  * Pagination buttons enable/disable correctly
  * Favorites toggle updates UI and `localStorage`
  * Details route fetches and displays movie info

---

## 🧹 Linting & Formatting

* **ESLint** for consistent code style
* **Prettier** for formatting

Example scripts:

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write ."
  }
}
```

---

## ☁️ Deployment

### Netlify / Vercel

* Connect your repo; set environment variable for the OMDb key
* Build command (Vite): `npm run build` — Output dir: `dist`
* Build command (CRA): `npm run build` — Output dir: `build`

### GitHub Pages (for Vite)

* Set `base` in `vite.config.js` to `"/<repo-name>/"`
* Use `gh-pages` to deploy `dist/`

---

## 🏗 CI/CD (Optional)

Example GitHub Actions workflow (Vite): `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint --if-present
      - run: npm run build
```

---

## 🛠 Troubleshooting

* **White screen on deploy**: If using GitHub Pages + Vite, ensure `base` is set correctly.
* **API key not working**: Confirm the env var exists at build time and the correct prefix (`VITE_` or `REACT_APP_`).
* **`.env` got committed**: Remove and scrub history:

  ```bash
  git rm --cached .env
  echo ".env" >> .gitignore
  git commit -m "Remove .env from repo"
  # Optional: rewrite history with BFG or git filter-repo if it was pushed
  ```
* **CORS / Network errors**: OMDb is public over HTTPS; check adblockers/VPN/firewall.


## 🗺 Roadmap

* Infinite scroll option (in addition to buttons)
* Advanced filters (year, type, maybe ratings)
* Caching layer for detail responses
* Unit/integration tests
* Offline-ready (cache assets & last results with Service Worker)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit your changes: `git commit -m "feat: add awesome"`
4. Push the branch: `git push origin feat/awesome`
5. Open a Pull Request

Please run `npm run lint` and `npm run build` before submitting.



## 🙏 Acknowledgements

* [OMDb API](https://www.omdbapi.com/) for the dataset
* React + open-source community for tooling and docs

---

### Changelog (keep manually)

* `v0.1.0` – Initial release: search, details, favorites, pagination
