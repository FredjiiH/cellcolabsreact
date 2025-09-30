# Cellcolabs Multi-Brand HubSpot Architecture

A comprehensive system for managing dual-brand websites (Cellcolabs & Cellcolabs Clinical) using HubSpot CMS with React-based component development.

## 🏗️ Project Structure

This project is organized into two main parts:

### **[01-component-development/](./01-component-development/)**
**React-based component development environment**
- Local development environment with Vite + React + TypeScript
- Multi-brand theming system with JSON theme tokens
- Component library with responsive design
- **Status**: 🟢 Active for component development

### **[02-child-theme-production/](./02-child-theme-production/)**
**Production child theme extending Growth theme**
- Child theme extending `@hubspot/growth` marketplace theme
- Theme modules deployed via HubSpot CLI
- Dual-brand system with automatic domain detection
- Complete navigation system with mobile menu
- **Status**: 🟢 Active - Current production approach

## 🎯 Current Active System

We're using a streamlined workflow from React development to HubSpot deployment:

- **Production Theme**: `growth child` (extends Growth theme)
- **Domains**: `cellcolabsclinical.com` (blue) & `cellcolabs.com` (green)
- **Module Approach**: Theme modules via CLI (fully tested and working)
- **Features**: Automatic brand switching, responsive navigation, dual-brand color system

## 🚀 Quick Start

### For Component Development:
```bash
cd 01-component-development/
npm install
npm run dev
# Open http://localhost:5173
```

### For Child Theme Deployment:
```bash
cd 02-child-theme-production/
hs upload growth-child --dest="growth child"
```

## 📚 Documentation

Each part contains its own detailed documentation:

- **[01-component-development/README.md](./01-component-development/README.md)** - React component development
- **[02-child-theme-production/README.md](./02-child-theme-production/README.md)** - Production child theme

### **Key Guides**
- **[02-child-theme-production/docs/URL_FIELD_IMPLEMENTATION_GUIDE.md](./02-child-theme-production/docs/URL_FIELD_IMPLEMENTATION_GUIDE.md)** - HubSpot link field implementation
- **[02-child-theme-production/docs/THEME_MODULE_EVALUATION.md](./02-child-theme-production/docs/THEME_MODULE_EVALUATION.md)** - Theme module approach validation

## 🎨 Brand System

**Cellcolabs Clinical** (Production)
- Primary Color: `#4F65BE` (Blue)
- Domain: `cellcolabsclinical.com`
- Typography: Bricolage Grotesque (headings), Inter (body)

**Cellcolabs** (Green Theme)
- Primary Color: `#00A651` (Green)
- Domain: `cellcolabs.com`
- Typography: Bricolage Grotesque (headings), Inter (body)

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules, CSS Variables
- **CMS**: HubSpot with child theme approach
- **Build Tools**: HubSpot CLI
- **Deployment**: HubSpot Design Manager

## 🔄 Production Workflow

### **Confirmed Approach: Theme Modules via CLI**

1. **Component Development**
   - Build and test in `01-component-development/` using React
   - Perfect styling and interactions locally

2. **Theme Module Creation**
   - Convert to HubSpot modules in `02-child-theme-production/growth-child/modules/`
   - Create `module.html` (template + CSS), `fields.json` (content fields), `meta.json` (metadata)

3. **CLI Deployment**
   ```bash
   cd 02-child-theme-production/
   hs upload growth-child --dest="growth child"
   ```

4. **Content Management**
   - Marketing team uses modules in HubSpot page editor
   - Full field editing capabilities with HubSpot UI

## 📦 Current Modules

### **Production Ready**
- `grid2x2-card-image.module` - 2x2 grid with image cards
- `button-multi-variant.module` - Multi-style button component
- `content-text-image.module` - Content sections with text and images

### **Theme Structure**
- `templates/partials/header.html` - Navigation header
- `templates/layouts/base.html` - Base page layout
- `child.css` - Global styles and brand system
- `child.js` - Global JavaScript functionality

## 📋 Current Status (September 2025)

✅ **Completed**
- Theme module workflow validated and working
- URL/link fields properly implemented
- Dual-brand system with automatic switching
- Mobile responsive navigation
- Three production-ready modules deployed

✅ **Production Ready**
- Child theme live on HubSpot
- Brand detection working
- Module deployment via CLI confirmed
- Marketing team can edit all content

## 📁 Folder Structure

```
cellcolabsreact/
├── 01-component-development/       # React development
│   └── src/components/            # React components
│
└── 02-child-theme-production/     # Production deployment
    ├── growth-child/              # Active child theme
    │   ├── modules/               # Theme modules
    │   │   ├── grid2x2-card-image.module/
    │   │   ├── button-multi-variant.module/
    │   │   └── content-text-image.module/
    │   ├── templates/             # Page structure
    │   ├── child.css             # Brand system
    │   └── child.js              # Global JS
    │
    └── growth-theme/             # Parent theme reference
```

## 📞 Need Help?

Each directory contains detailed README files and documentation specific to that part of the system. Start with the README in the directory you're working with.

---

**Last Updated**: September 30, 2025
**Active System**: Child Theme Production with Theme Modules
**Status**: ✅ Production Ready