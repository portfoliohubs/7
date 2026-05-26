# Project Files Overview

## Core Application Files

### `/src/config.js`
**Purpose**: Central configuration file containing ALL customizable data
- Brand name, logo, tagline
- WhatsApp destination number and message
- Pre-defined clinical case categories
- UI text strings for both English and Arabic
- **Edit this file to customize the entire application**

### `/src/App.tsx`
**Purpose**: Main application component
- Multi-section form with 7 sections
- Bilingual UI (English/Arabic)
- Image upload and preview
- Dynamic milestone and case addition
- Progress tracking
- WhatsApp integration
- TOML file preview and download

### `/src/tomlGenerator.ts`
**Purpose**: Generates TOML configuration files
- Converts form data to TOML format
- Embeds base64-encoded images
- Handles bilingual fields
- Escapes special characters
- Provides download functionality

### `/src/imageProcessor.ts`
**Purpose**: Image processing utilities
- Converts images to WebP format
- Creates thumbnails
- Base64 encoding
- Image validation
- Progressive processing

### `/src/main.tsx`
**Purpose**: Application entry point
- Renders the App component
- Attaches to DOM

### `/src/index.css`
**Purpose**: Global styles
- Tailwind directives
- Custom component classes
- RTL/LTR utilities

## PWA Configuration Files

### `/public/manifest.json`
**Purpose**: Progressive Web App manifest
- App name and description
- Icons configuration
- Theme colors
- Start URL
- Display mode

### `/public/sw.js`
**Purpose**: Service worker for offline support
- Caches application files
- Handles offline requests
- Manages cache updates

### `/public/icon-192.svg`
**Purpose**: Small PWA icon (192x192 pixels)
- Used for app installation
- Displayed in browser tab

### `/public/icon-512.svg`
**Purpose**: Large PWA icon (512x512 pixels)
- High-resolution displays
- App installation prompts

## Build Configuration Files

### `/vite.config.ts`
**Purpose**: Vite build configuration
- React plugin setup
- GitHub Pages base URL
- Build output directory
- Optimization settings

### `/package.json`
**Purpose**: Project metadata and dependencies
- Project name and version
- NPM scripts (dev, build, deploy)
- Dependencies
- Deployment configuration

### `/index.html`
**Purpose**: HTML template
- PWA meta tags
- Theme color
- Manifest link
- Service worker registration
- SEO meta tags

## GitHub Deployment Files

### `/.github/workflows/deploy.yml`
**Purpose**: GitHub Actions deployment workflow
- Automatic build on push
- Deploys to GitHub Pages
- Handles PR deployments

### `/DEPLOYMENT.md`
**Purpose**: Step-by-step deployment guide
- GitHub setup instructions
- Configuration updates
- Troubleshooting guide

### `/README.md`
**Purpose**: Project documentation
- Features overview
- Quick start guide
- Customization instructions
- Technical details

## Supabase Edge Functions

### `/supabase/functions/whatsapp-sender/index.ts`
**Purpose**: WhatsApp integration endpoint
- Generates WhatsApp URLs
- CORS handling
- Error management

## Configuration Files

### `/.gitignore`
**Purpose**: Git ignore patterns
- Excludes node_modules
- Excludes build artifacts
- Excludes environment files

### `/tsconfig.json`
**Purpose**: TypeScript configuration
- Compiler options
- Type checking rules

### `/tailwind.config.js`
**Purpose**: Tailwind CSS configuration
- Theme customization
- Plugin configuration

### `/postcss.config.js`
**Purpose**: PostCSS configuration
- Tailwind integration
- Autoprefixer

### `/eslint.config.js`
**Purpose**: ESLint configuration
- Linting rules
- React-specific rules
