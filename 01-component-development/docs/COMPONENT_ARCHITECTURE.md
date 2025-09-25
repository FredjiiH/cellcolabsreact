# Component Architecture & Development System

Comprehensive guide to the React-based component development system for Cellcolabs multi-brand architecture.

## 🎯 System Objectives

- Build a unified design system serving both cellcolabs.com and cellcolabsclinical.com from a single HubSpot portal
- Maintain consistent components across brands with automatic domain-based theming
- Enable marketing team to edit content without developer intervention
- Leverage HubSpot's infrastructure for hosting, CDN, and content management

## 🏗️ Architecture Overview

### **Development → Production Flow**
1. **Component Development**: React (Vite) used for component development, testing, and design system maintenance
2. **HubSpot Integration**: React components are manually copied to HubSpot custom modules after development and testing
3. **Production CMS**: HubSpot manages all content, menus, and assets via built-in editing tools
4. **Multi-Brand Support**: Automatic theme switching based on domain with separate navigation menus per brand

### **Technology Stack**
- **Development**: React 18 + TypeScript + Vite for fast iteration
- **Styling**: CSS Modules for scoped styling + CSS Variables for theming
- **Build**: Static fragment generation for HubSpot integration
- **CMS**: HubSpot with child theme approach (see Part 3)
- **Design System**: JSON-based theme tokens with Figma integration

## 📁 Project Structure

```
01-component-development/
├── src/
│   ├── components/           # React component library
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx
│   │   │   └── Navigation.module.css
│   │   ├── HeroBlock/
│   │   │   ├── HeroBlock.tsx
│   │   │   └── HeroBlock.module.css
│   │   └── Footer/
│   │       ├── Footer.tsx
│   │       └── Footer.module.css
│   ├── themes/              # Brand configuration files
│   │   ├── cellcolabs.json
│   │   └── cellcolabsclinical.json
│   ├── utils/
│   │   └── theme-loader.ts  # Theme application utilities
│   └── App.tsx              # Preview app with theme switcher
├── dist/                    # Built fragments (when generated)
└── package.json             # Dependencies and scripts
```

## 🎨 Theme System Architecture

### **Brand Token Structure**
Theme tokens stored in JSON files with comprehensive design system:

```json
{
  "name": "cellcolabsclinical",
  "colors": {
    "text": {
      "primary": "#161616",
      "secondary": "#525252",
      "tertiary": "#8D8D8D",
      "link": "#4F65BE"
    },
    "brand": {
      "100": "#BECFFF",
      "300": "#879ADF",
      "500": "#4F65BE",
      "700": "#2F4283",
      "900": "#0F2047"
    }
  },
  "typography": {
    "fontFamily": {
      "heading": "'Inter Variable', 'Inter', sans-serif",
      "body": "'Inter Variable', 'Inter', sans-serif"
    },
    "fontSize": {
      "desktop": { "h1": "3.5rem", "body": "1rem" },
      "mobile": { "h1": "2.25rem", "body": "1rem" }
    },
    "fontWeight": {
      "regular": "450",
      "medium": "500",
      "semiBold": "650",
      "bold": "700"
    }
  },
  "spacing": {
    "space4": "0.25rem",
    "space8": "0.5rem",
    "space16": "1rem",
    "space24": "1.5rem",
    "space32": "2rem",
    "space48": "3rem",
    "space64": "4rem",
    "space96": "6rem"
  }
}
```

### **CSS Variable Application**
Theme tokens automatically converted to CSS variables:

```css
:root {
  --color-text-primary: #161616;
  --color-brand-500: #4F65BE;
  --font-family-body: 'Inter Variable', 'Inter', sans-serif;
  --font-weight-medium: 500;
  --space-16: 1rem;
}
```

## 🧩 Component Development Workflow

### **1. Local Development**
```bash
npm run dev              # Start development server
# Open http://localhost:5173
```

- **Theme Switcher**: Toggle between Cellcolabs Clinical (blue) and Cellcolabs (green)
- **Responsive Preview**: Test at mobile (768px), tablet (1024px), desktop breakpoints
- **Live Reload**: Changes reflect immediately during development

### **2. Component Structure**
Each component follows consistent patterns:

```tsx
// Navigation.tsx
import React from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  brandText: string;
  menuItems: MenuItem[];
  theme: 'cellcolabs' | 'cellcolabsclinical';
}

export const Navigation: React.FC<NavigationProps> = ({ brandText, menuItems, theme }) => {
  return (
    <nav className={styles.navigation} data-theme={theme}>
      <div className={styles.container}>
        <div className={styles.brand} data-placeholder="brand_text">
          {brandText}
        </div>
        <ul className={styles.menu} data-placeholder="menu_items">
          {menuItems.map(item => (
            <li key={item.id}><a href={item.url}>{item.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
```

```css
/* Navigation.module.css */
.navigation {
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-light);
}

.container {
  max-width: 1460px; /* Match Figma specs */
  margin: 0 auto;
  padding: var(--space-16) var(--space-24);
}

.brand {
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.menu a {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
}

.menu a:hover {
  color: var(--color-brand-500); /* Brand-specific hover */
}

/* Responsive Design */
@media (max-width: 767px) {
  .container {
    padding: var(--space-8) var(--space-16);
  }
}
```

### **3. HubSpot Integration Placeholders**
Components include `data-placeholder` attributes for HubSpot field mapping:

```html
<div data-placeholder="brand_text">Cellcolabs Clinical</div>
<ul data-placeholder="menu_items">
  <li><a href="#">Navigation Item</a></li>
</ul>
<img data-placeholder="hero_image" src="placeholder.jpg" alt="Hero" />
```

## 📱 Responsive Design System

### **Breakpoints**
```css
/* Mobile First Approach */
:root {
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1440px;
  --breakpoint-container: 1460px;
}
```

### **Container System**
- **Max Width**: 1460px (matches Figma desktop design)
- **Padding**: Responsive based on breakpoint
  - Mobile: 16px
  - Tablet: 24px
  - Desktop: 24px
- **Wide Screens**: 152px side margins on ultra-wide displays

### **Typography Scale**
Responsive typography using CSS variables:
```css
/* Mobile */
--font-size-h1: 2.25rem;   /* 36px */
--font-size-h2: 2rem;      /* 32px */
--font-size-body: 1rem;    /* 16px */

/* Desktop */
@media (min-width: 1024px) {
  --font-size-h1: 3.5rem;  /* 56px */
  --font-size-h2: 3rem;    /* 48px */
  --font-size-body: 1rem;  /* 16px */
}
```

## 🔗 HubSpot Integration Strategy

### **Manual Integration Process**
1. **Develop Component**: Build and test in React environment
2. **Extract Code**: Copy HTML structure and CSS styles
3. **Create HubSpot Module**: In Design Manager → Custom Modules
4. **Configure Fields**: Set up `fields.json` for content editing
5. **Test Integration**: Preview in HubSpot environment

### **Module Field Configuration**
```json
// fields.json example
[
  {
    "name": "brand_text",
    "label": "Brand Text",
    "type": "text",
    "default": "Cellcolabs Clinical"
  },
  {
    "name": "menu_items",
    "label": "Navigation Menu",
    "type": "menu",
    "default": "main_navigation"
  },
  {
    "name": "theme_override",
    "label": "Brand Theme",
    "type": "choice",
    "choices": [
      ["auto", "Auto (Domain Detection)"],
      ["cellcolabsclinical", "Cellcolabs Clinical"],
      ["cellcolabs", "Cellcolabs"]
    ]
  }
]
```

### **HubSpot Template Integration**
```html
<!-- module.html -->
<nav class="navigation" data-theme="{{ module.theme_override|default('auto') }}">
  <div class="nav-container">
    <div class="brand">{{ module.brand_text }}</div>
    {% menu module.menu_items %}
  </div>
</nav>
```

## 🎨 Design System Integration

### **Figma → Code Workflow**
1. **Design Review**: Components designed in Figma with proper annotations
2. **Token Extraction**: Design tokens extracted to JSON theme files
3. **Component Build**: React components built matching Figma specifications exactly
4. **Responsive Testing**: Test across all breakpoints defined in Figma
5. **Brand Validation**: Verify both brand themes work correctly

### **Design System Sources**
- **Typography Specs**: [Figma Typography](https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=825-3231)
- **Spacing System**: [Figma Spacing](https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=825-4897)
- **Component Library**: Figma components with responsive states and content fields

### **Consistency Checks**
- ✅ Pixel-perfect match to Figma designs
- ✅ Proper responsive behavior at all breakpoints
- ✅ Brand theming works for both Clinical and Cellcolabs
- ✅ Content fields map correctly to HubSpot modules
- ✅ Typography uses exact font weights and sizes

## ✅ Current Components

### **Navigation Component**
- **Status**: ✅ Complete
- **Features**: Responsive header, mobile menu, brand text, HubSpot menu integration
- **HubSpot Module**: Created and deployed

### **HeroBlock Component**
- **Status**: ✅ Complete
- **Features**: Side-by-side layout, responsive images, CTA buttons, content fields
- **HubSpot Module**: Ready for deployment

### **Footer Component**
- **Status**: ✅ Complete
- **Features**: Multi-column layout, brand-specific styling, contact information
- **HubSpot Module**: Ready for deployment

## 🚀 Development Commands

```bash
# Development
npm install                  # Install dependencies
npm run dev                  # Start development server (localhost:5173)

# Building
npm run build               # Build production version
npm run preview             # Preview production build

# Code Quality
npm run lint                # Lint TypeScript and CSS
npm run type-check          # TypeScript type checking

# Fragment Generation (if available)
npm run build:fragments     # Generate static HTML/CSS fragments
```

## 🔮 Future Enhancements

### **Planned Features**
1. **Automated Fragment Generation**: Build pipeline for static HTML/CSS export
2. **Storybook Integration**: Component documentation and testing
3. **Visual Regression Testing**: Automated screenshot testing
4. **HubSpot CLI Integration**: Automated module deployment
5. **Advanced Components**: Form components, card grids, modal systems

### **Architecture Improvements**
1. **TypeScript Strict Mode**: Enhanced type safety
2. **Component Testing**: Jest + React Testing Library
3. **Performance Monitoring**: Bundle analysis and optimization
4. **Accessibility Testing**: Automated a11y validation
5. **Design Token Pipeline**: Automated Figma → JSON sync

---

**System Status**: 🟢 Active Development Environment
**Integration**: Manual copy to HubSpot custom modules
**Production**: Deployed via Child Theme (Part 3)
**Last Updated**: September 25, 2025