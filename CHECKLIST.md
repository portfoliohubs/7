# Setup Checklist ✓

Before deploying to GitHub Pages, complete this checklist:

## Configuration Updates

- [ ] Edit `src/config.js`
  - [ ] Update `brand.name` to your brand name
  - [ ] Update `brand.logo` to your logo URL
  - [ ] Update `brand.tagline` to your tagline
  - [ ] Verify `whatsapp.destinationNumber` is correct (201271476215)

## GitHub Repository Setup

- [ ] Create new repository on GitHub
- [ ] Name it `portfolio-data-collector` (or your preferred name)
- [ ] Keep it PUBLIC (required for free GitHub Pages)

## Path Configuration (If using custom repo name)

- [ ] Update `vite.config.ts` → `base: '/your-repo-name/'`
- [ ] Update `package.json` → `"homepage": "https://USERNAME.github.io/your-repo-name"`
- [ ] Update `index.html` → `og:url` meta tag
- [ ] Update `public/manifest.json` → `start_url` and icon paths
- [ ] Update `public/sw.js` → urlsToCache array

## Deployment

- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Add remote: `git remote add origin https://github.com/USERNAME/REPO.git`
- [ ] Push: `git push -u origin main`
- [ ] Go to repository Settings → Pages → Source: "GitHub Actions"

## Testing

- [ ] Visit your site: `https://USERNAME.github.io/REPO-NAME/`
- [ ] Test form submission
- [ ] Test image uploads
- [ ] Test TOML generation
- [ ] Test WhatsApp link
- [ ] Test on mobile device
- [ ] Test PWA installation

## Optional

- [ ] Replace `public/icon-192.svg` and `public/icon-512.svg` with your own icons
- [ ] Add Google Analytics (update `config.js` → `integrations.google_analytics_measurement_id`)
- [ ] Add Google Search Console verification

---

## Quick Commands Reference

```bash
# Run locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## Support Files

- `README.md` - Full documentation
- `DEPLOYMENT.md` - Detailed deployment guide
- `FILES.md` - File purposes
- `QUICKSTART.md` - 5-minute setup

---

✓ All set! Push to GitHub and your PWA will be live!
