# Deployment Guide

This guide will walk you through deploying your Portfolio Data Collector PWA to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your machine
- Node.js 18+ installed

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `portfolio-data-collector`
3. Keep it public (GitHub Pages requires public repos for free accounts)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Update Configuration Files

Before pushing, update these files with your GitHub username:

### 1. `vite.config.ts`
```typescript
base: '/portfolio-data-collector/',  // Change to match your repo name
```

### 2. `package.json`
```json
"homepage": "https://YOUR_USERNAME.github.io/portfolio-data-collector"
```

### 3. `index.html`
```html
<meta property="og:url" content="https://YOUR_USERNAME.github.io/portfolio-data-collector/" />
```

### 4. `public/manifest.json`
```json
"start_url": "/portfolio-data-collector/",
"icons": [
  {
    "src": "/portfolio-data-collector/icon-192.png",
    ...
  }
]
```

### 5. `public/sw.js`
```javascript
const urlsToCache = [
  '/portfolio-data-collector/',
  '/portfolio-data-collector/index.html',
];
```

## Step 3: Update Brand Configuration

Edit `src/config.js`:

```javascript
const CONFIG = {
  brand: {
    name: "Your Brand Name",
    logo: "https://your-logo-url.com/logo.png",
    tagline: "Your Tagline"
  },
  whatsapp: {
    destinationNumber: "20123456789",  // Your WhatsApp number
    message: "Here is my portfolio configuration file"
  },
  // ... rest stays the same
};
```

## Step 4: Initialize Git and Push

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio Data Collector PWA"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/portfolio-data-collector.git

# Push to GitHub
git push -u origin main
```

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy your site

## Step 6: Access Your PWA

Your PWA will be available at:
```
https://YOUR_USERNAME.github.io/portfolio-data-collector/
```

## Automatic Deployments

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your PWA
2. Deploy to GitHub Pages
3. Update the live site

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

This builds the project and pushes to a `gh-pages` branch.

## Troubleshooting

### Build Fails
- Check Node.js version: `node -v` (should be 18+)
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### PWA Not Installing
- Ensure site is served over HTTPS (GitHub Pages provides this)
- Check `manifest.json` is valid
- Verify service worker is registered (check browser console)

### Images Not Uploading
- Check file size (max 10MB)
- Verify file type (JPG, PNG, WebP, GIF)
- Clear browser cache

### WhatsApp Not Opening
- Ensure WhatsApp is installed on mobile
- Check the phone number format in `config.js` (without +)
- Try in different browser

## Testing Locally

```bash
# Development mode
npm run dev

# Production preview
npm run build
npm run preview
```

## Updating the PWA

To make changes:

1. Edit files
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Update: your changes"
   git push
   ```
5. GitHub Actions will auto-deploy

## Environment Variables (Optional)

If using Supabase features, create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Support

For issues:
1. Check browser console for errors
2. Review the README.md
3. Open a GitHub issue

---

Your PWA is now ready for production use!
