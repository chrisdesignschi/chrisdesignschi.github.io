# Gratitude Journal

A personal gratitude journal web app. Log what you're grateful for, one line at a time.

Built with React + Vite. Deployed to GitHub Pages.

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173/gratitude/ in your browser
```

## Deploy to GitHub Pages

### First-time setup (do this once):

1. **Create a new GitHub repo** called `gratitude` at https://github.com/new
   - Make it public
   - Don't initialize with README (you already have one)

2. **Push this project to GitHub:**
   ```bash
   cd gratitude-journal
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gratitude.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo on GitHub → Settings → Pages
   - Under "Source", select **GitHub Actions**
   - That's it! The included workflow will auto-deploy on every push

4. **Your app will be live at:** `https://YOUR_USERNAME.github.io/gratitude/`

### If you use a custom domain (chriszhu.com):

If your GitHub Pages is already configured with a custom domain, the app will be available at `chriszhu.com/gratitude/`. No extra DNS setup needed — it uses the same custom domain config as your portfolio.

### Every time you make changes:

```bash
git add .
git commit -m "Your change description"
git push
```

The GitHub Action will automatically rebuild and deploy. Takes about 1-2 minutes.

## Features

- **Quick entry** — type and hit Enter, done
- **Daily feed** — scroll through entries grouped by day
- **Inline editing** — tap any entry to edit, tag, or delete
- **Categories** — optional tags like "people", "food", "places"
- **Metrics** — bar chart with 7D/1M/3M/1Y views, streak counter, category breakdown
- **Bulk import** — paste from your Notes app, dates are auto-detected
- **Data backup** — JSON export/import for safety and cross-device transfer
- **Dark/light mode** — auto-detects your system preference
- **Responsive** — desktop sidebar layout + mobile bottom tab bar

## Data Storage

All data is stored in your browser's localStorage. This means:
- Data persists between sessions
- Data is specific to each browser/device
- Clearing browser data will erase entries
- Use JSON export/import to move data between devices

## Project Structure

```
gratitude-journal/
├── index.html          # Entry point
├── src/
│   ├── main.jsx        # React mount
│   ├── App.jsx         # Full application
│   └── index.css       # Global styles
├── vite.config.js      # Build config (sets /gratitude/ base path)
├── package.json        # Dependencies
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy on push
```
