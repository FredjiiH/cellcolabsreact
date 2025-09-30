# Component Development System

React-based component development environment for building and testing HubSpot-ready components with multi-brand theming support.

## 🎯 Purpose

This system allows developers to:
- Build responsive React components locally
- Test multi-brand theming in real-time
- Perfect component styling and interactions
- Prepare components for HubSpot theme module conversion

## 🏗️ Architecture

### **Development Environment**
- **React 18** with TypeScript for component development
- **Vite** for fast development server and building
- **CSS Modules** for scoped component styling
- **CSS Variables** for dynamic multi-brand theming

### **Theme System**
Brand configurations stored in JSON files:
- `src/themes/cellcolabsclinical.json` - Clinical brand (blue theme)
- `src/themes/cellcolabs.json` - Main Cellcolabs brand (green theme)

### **Component Structure**
```
src/components/
├── Grid2x2CardImage/           # ✅ Deployed as theme module
│   ├── Grid2x2CardImage.tsx
│   └── Grid2x2CardImage.module.css
├── ButtonMultiVariant/         # ✅ Deployed as theme module
│   ├── ButtonMultiVariant.tsx
│   └── ButtonMultiVariant.module.css
├── ContentSection/             # → Ready for theme module conversion
│   ├── ContentSection.tsx
│   └── ContentSection.module.css
├── Navigation/                 # → Using templates/partials/header.html instead
├── HeroBlock/                  # → Ready for future conversion
└── Footer/                     # → In development
```

## 🚀 Quick Start

### **Installation**
```bash
npm install
```

### **Development Server**
```bash
npm run dev
# Opens http://localhost:5173
```

### **Available Commands**
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Lint code
```

## 🎨 Brand System

### **Theme Switching**
The development environment includes a theme switcher to test both brands:
- **Cellcolabs Clinical**: Blue theme (`#4F65BE`)
- **Cellcolabs**: Green theme (`#00A651`)

### **Responsive Breakpoints**
```css
/* Mobile First */
--breakpoint-tablet: 768px
--breakpoint-desktop: 1024px
--breakpoint-wide: 1440px
```

### **CSS Variables**
Theme tokens are automatically applied as CSS variables:
```css
:root {
  --color-primary: #4F65BE;        /* Blue for Clinical */
  --color-text-link: #4F65BE;
  --font-family-heading: 'Bricolage Grotesque', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  --space-16: 1rem;
}
```

## 📦 Components

### **✅ Production Ready (Deployed as Theme Modules)**

#### **Grid2x2CardImage**
- 2x2 responsive grid layout
- Image cards with overlay content
- Badge text, titles, descriptions, links
- Mobile-first responsive design

#### **ButtonMultiVariant**
- Multiple button styles (primary, secondary, outline)
- Multiple sizes (small, default, large)
- Brand-aware colors
- Alignment options

### **🔄 Ready for Conversion**

#### **ContentSection**
- Flexible text/image content blocks
- Responsive layouts
- Brand theming support
- Ready for HubSpot fields

#### **HeroBlock**
- Hero sections with content + imagery
- CTA integration
- Responsive design
- Field-ready structure

### **🚧 In Development**

#### **Footer**
- Multi-column responsive layout
- Brand-specific styling
- Contact information sections
- Still being refined

## 🔄 Production Workflow

### **Current Process: React → Theme Modules**

1. **Component Development**
   ```bash
   cd 01-component-development/
   npm run dev
   # Perfect components with theme switching
   ```

2. **Theme Module Conversion**
   - Copy component to `02-child-theme-production/growth-child/modules/`
   - Convert React JSX → HubL template
   - Convert CSS Modules → embedded CSS
   - Create `fields.json` for editable content
   - Add `meta.json` metadata

3. **Deployment**
   ```bash
   cd 02-child-theme-production/
   hs upload growth-child --dest="growth child"
   ```

### **Conversion Guidelines**

#### **HTML Conversion**
```javascript
// React JSX
<div className={styles.card}>
  <h3>{card.title}</h3>
</div>

// HubL Template
<div class="card">
  <h3>{{ card.title }}</h3>
</div>
```

#### **CSS Conversion**
```css
/* React CSS Module */
.card {
  background: var(--color-primary);
}

/* Theme Module CSS */
.card {
  background: var(--color-primary);
}
```

#### **Field Configuration**
```json
// fields.json
{
  "id": "title",
  "name": "title",
  "label": "Title",
  "type": "text",
  "default": "Default Title"
}
```

## 📁 File Structure

```
01-component-development/
├── README.md                    # This file
├── src/
│   ├── components/              # React components
│   │   ├── Grid2x2CardImage/   # ✅ Deployed
│   │   ├── ButtonMultiVariant/  # ✅ Deployed
│   │   ├── ContentSection/      # Ready for conversion
│   │   ├── HeroBlock/          # Ready for conversion
│   │   ├── Navigation/         # Using header.html instead
│   │   └── Footer/             # In development
│   ├── themes/                  # Brand JSON configurations
│   ├── utils/                   # Helper utilities
│   ├── App.tsx                  # Preview application
│   └── main.tsx                 # Application entry point
├── docs/                        # Component documentation
├── dist/                        # Built files (generated)
└── package.json                 # Dependencies and scripts
```

## 🎛️ Development Features

### **Theme Switcher**
Real-time brand switching in development:
- Toggle between Clinical (blue) and Cellcolabs (green)
- Instant visual feedback
- Test brand-specific behaviors

### **Responsive Testing**
Development server supports:
- Mobile viewport testing
- Tablet breakpoint validation
- Desktop layout verification
- Component behavior across sizes

### **Component Isolation**
Each component can be developed and tested independently:
- Hot module replacement
- Isolated CSS scoping
- Brand theme inheritance
- Responsive behavior testing

## 📚 Documentation

### **Component Guides**
- [COMPONENT_ARCHITECTURE.md](./docs/COMPONENT_ARCHITECTURE.md) - Architecture patterns
- [COMPONENT_NAMING_CONVENTIONS.md](./docs/COMPONENT_NAMING_CONVENTIONS.md) - Naming standards

## 🔗 Integration with Production

### **Deployment Chain**
```
01-component-development/ (React)
         ↓ (Convert)
02-child-theme-production/growth-child/modules/ (HubL)
         ↓ (Deploy)
HubSpot Design Manager (Live)
```

### **Field Mapping**
Components use placeholder patterns that convert to HubSpot fields:
```javascript
// React component prop
{title}

// HubSpot field access
{{ module.title }}
```

---

**Last Updated**: September 30, 2025
**Status**: ✅ Active development environment
**Integration**: Theme modules via 02-child-theme-production