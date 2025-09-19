# Cellcolabs Component Library PoC

## Overview
This is a proof-of-concept implementation of the Cellcolabs architecture, demonstrating:
- React-based component development
- Multi-brand theming (Cellcolabs & Cellcolabs Clinical)
- Responsive design across mobile, tablet, and desktop
- Static fragment generation for HubSpot integration

## Components Built
1. **Navigation** - Responsive header with dotted mobile menu icon
2. **HeroBlock** - Flexible content block with image positioning
3. **Footer** - Multi-column footer with brand-specific styling

## Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Theme Switching
Use the theme switcher in the top-right corner to toggle between:
- Cellcolabs (primary blue theme)
- Cellcolabs Clinical (darker professional theme)

## Project Structure
```
src/
├── components/
│   ├── Navigation/      # Header navigation with mobile menu
│   ├── HeroBlock/       # Content section with image
│   └── Footer/          # Multi-column footer
├── themes/
│   ├── cellcolabs.json       # Brand theme tokens
│   └── cellcolabsclinical.json
├── utils/
│   └── theme-loader.ts  # Theme application utilities
└── App.tsx              # Main preview app with examples
```

## Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px
- **Wide**: ≥ 1440px

## Key Features
- ✅ CSS Modules for scoped styling
- ✅ CSS Variables for dynamic theming
- ✅ Mobile-first responsive design
- ✅ Figma-based component implementation
- ✅ Data placeholders for HubSpot integration

## Next Steps
1. Complete fragment generator for static HTML/CSS export
2. Set up Google Cloud Storage and CDN
3. Create HubSpot custom modules
4. Implement CI/CD pipeline
5. Add remaining components from Figma

## Development Notes
- Components use CSS Modules (`.module.css` files)
- Theme tokens are applied via CSS custom properties
- All components include `data-placeholder` attributes for HubSpot field mapping
- Mobile menu uses CSS-only approach (can be enhanced with JS if needed)