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

⚠️ **CRITICAL: Never create duplicate themes!** Always upload to the existing "growth child" theme.

```bash
cd 02-child-theme-production/
# For individual module updates (PREFERRED):
hs upload growth-child/modules/[module-name].module "growth child/modules/[module-name].module"

# For full theme upload (ONLY when necessary):
hs upload growth-child "growth child"
```

**Important Notes:**
- The HubSpot theme is named `"growth child"` (with space)
- The local folder is named `growth-child` (with hyphen)
- Always use quotes around "growth child" when uploading
- Prefer uploading only changed modules/files to avoid breaking existing pages

## 📚 Documentation

Each part contains its own detailed documentation:

- **[01-component-development/README.md](./01-component-development/README.md)** - React component development
- **[02-child-theme-production/README.md](./02-child-theme-production/README.md)** - Production child theme

### **Key Guides**
- **[02-child-theme-production/docs/URL_FIELD_IMPLEMENTATION_GUIDE.md](./02-child-theme-production/docs/URL_FIELD_IMPLEMENTATION_GUIDE.md)** - HubSpot link field implementation
- **[02-child-theme-production/docs/THEME_MODULE_EVALUATION.md](./02-child-theme-production/docs/THEME_MODULE_EVALUATION.md)** - Theme module approach validation

## 🎨 Brand System

### **Dual Brand Architecture**
The site supports two distinct brands sharing the same theme infrastructure:

**Cellcolabs Clinical** (B2C - Blue Brand)
- Primary Color: `#4F65BE` (Blue)
- Domain: `cellcolabsclinical.com`
- Typography: Bricolage Grotesque (headings), Inter (body)
- Header: `header-clinical.module`
- Footer: `footer-clinical.module`
- Menus: `main_navigation_clinical`, `footer_product`, `footer_company`, etc.

**Cellcolabs** (B2B - Green Brand)
- Primary Color: `#00A651` (Green)
- Domain: `cellcolabs.com`
- Typography: Bricolage Grotesque (headings), Inter (body)
- Header: `header-cellcolabs.module` (to be created)
- Footer: `footer-cellcolabs.module` (to be created)
- Menus: `main_navigation_cellcolabs`, `footer_product_cellcolabs`, etc. (to be created)

### **Global Theme Detection**
Brand switching is handled globally in `base.html` template:
- Automatic detection based on `request.domain`
- Domain-based conditional loading of header/footer modules
- No manual theme selection needed in modules
- CSS variables inherit from `<body data-brand="...">`

### **Header & Footer as Global Modules**
Headers and footers are implemented as **global modules** (not partials):
- Allows non-technical users to edit content via HubSpot UI
- Hidden from module picker (`is_available_for_new_content: false`)
- Only accessible through base template
- Separate module per brand for clean architecture

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
- `modules/header-clinical.module` - Clinical brand navigation header (global module)
- `modules/footer-clinical.module` - Clinical brand footer (global module)
- `modules/header-cellcolabs.module` - Cellcolabs brand header (to be created)
- `modules/footer-cellcolabs.module` - Cellcolabs brand footer (to be created)
- `templates/layouts/base.html` - Base page layout with brand detection
- `child.css` - Global styles and brand system
- `child.js` - Global JavaScript functionality

## 📋 Current Status (October 2025)

✅ **Completed**
- Theme module workflow validated and working
- URL/link fields properly implemented
- Dual-brand system with automatic switching
- Mobile responsive navigation
- Headers/footers converted to global modules
- Clinical brand header and footer deployed
- Domain-based brand detection in base template

✅ **Production Ready**
- Child theme live on HubSpot
- Brand detection working
- Module deployment via CLI confirmed
- Marketing team can edit all content
- Clinical brand (blue) fully implemented

🔄 **In Progress**
- Footer styling refinement to match Figma design exactly
- Cellcolabs brand (green) header and footer creation

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

**Last Updated**: October 7, 2025
**Active System**: Child Theme Production with Theme Modules
**Status**: ✅ Production Ready - Dual Brand Architecture Implemented