# Quick Start Guide

## Get Your PWA Running in 5 Minutes

### 1. Clone and Install (2 minutes)
```bash
git clone https://github.com/yourusername/portfolio-data-collector.git
cd portfolio-data-collector
npm install
```

### 2. Customize Brand (1 minute)
Edit `src/config.js`:
```javascript
brand: {
  name: "Your Brand Name",
  logo: "https://your-logo-url.com/logo.png",
  tagline: "Your Tagline"
},
whatsapp: {
  destinationNumber: "YOUR_WHATSAPP_NUMBER",  // without +
  message: "Your custom message"
}
```

### 3. Run Locally (1 minute)
```bash
npm run dev
```
Open http://localhost:5173

### 4. Deploy to GitHub Pages (1 minute)
Update these files with your GitHub username:
- `vite.config.ts` → `base: '/your-repo-name/'`
- `package.json` → `"homepage": "https://USERNAME.github.io/your-repo-name"`

Then:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/your-repo-name.git
git push -u origin main
```

Done! Your PWA is now live.

---

## Usage Flow

1. **Fill Form**: Go through each section
2. **Upload Photos**: Profile photo + case photos
3. **Add Data**: Skills, timeline, clinical cases
4. **Preview**: Review your TOML file
5. **Send**: Click "Send via WhatsApp"

## What Happens When User Sends?

1. TOML file is generated with all data
2. File is downloaded automatically
3. WhatsApp opens with pre-filled message
4. User attaches the downloaded config.toml file
5. Message is sent to your configured WhatsApp number

---

## Need Help?

- Full documentation: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- File overview: `FILES.md`
