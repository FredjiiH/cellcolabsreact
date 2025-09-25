# Component Development System

React-based component development environment for building and testing HubSpot-ready components with multi-brand theming support.

## 🎯 Purpose

This system allows developers to:
- Build responsive React components locally
- Test multi-brand theming in real-time
- Generate static HTML/CSS fragments for HubSpot integration
- Maintain design system consistency across both brands

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
├── Navigation/
│   ├── Navigation.tsx
│   └── Navigation.module.css
├── HeroBlock/
│   ├── HeroBlock.tsx
│   └── HeroBlock.module.css
└── Footer/
    ├── Footer.tsx
    └── Footer.module.css
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
npm run build:fragments  # Generate static fragments (if available)
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
  --font-family-body: 'Inter', sans-serif;
  --space-16: 1rem;
}
```

## 📦 Components

### **✅ Navigation Component**
- Responsive header with mobile hamburger menu
- Figma-based dotted menu icon (2x3 grid)
- Brand text with bold/regular styling
- HubSpot Menu Builder integration ready

### **✅ HeroBlock Component**
- Flexible content section with image positioning
- Responsive layout (side-by-side → stacked)
- CTA button with brand colors
- Content fields for HubSpot integration

### **✅ Footer Component**
- Multi-column responsive layout
- Brand-specific styling
- Contact information and links
- Ready for HubSpot field mapping

## 🔄 HubSpot Integration Workflow

### **1. Component Development**
Build and test components in the React environment with theme switching.

### **2. Fragment Generation**
```bash
npm run build:fragments
```
Generates static HTML/CSS files in `dist/fragments/`.

### **3. Manual HubSpot Integration**
Copy component code to HubSpot custom modules:
1. Create custom module in HubSpot Design Manager
2. Copy HTML structure to `module.html`
3. Copy CSS styles to `module.css`
4. Configure fields in `fields.json`
5. Test in HubSpot preview

### **4. Content Field Mapping**
Components include `data-placeholder` attributes for easy HubSpot field mapping:
```html
<h1 data-placeholder="heading">Default Heading</h1>
<p data-placeholder="description">Default description</p>
```

## 📁 File Structure

```
01-component-development/
├── README.md                    # This file
├── src/
│   ├── components/              # React components
│   ├── themes/                  # Brand JSON configurations
│   ├── utils/                   # Helper utilities
│   ├── App.tsx                  # Preview application
│   └── main.tsx                 # Application entry point
├── docs/
│   ├── COMPONENT_ARCHITECTURE.md
│   ├── FIGMA_INTEGRATION.md
│   └── FRAGMENT_GENERATION.md
├── dist/                        # Built files
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System Integration

### **Figma Workflow**
1. Design components in Figma with proper annotations
2. Extract design tokens and specifications
3. Build React components matching Figma exactly
4. Test responsive behavior and brand switching
5. Generate fragments for HubSpot integration

### **Design Token Sources**
- **Typography**: [Figma Typography System](https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=825-3231)
- **Spacing**: [Figma Spacing System](https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=825-4897)

## 🧪 Testing

### **Multi-Brand Testing**
Use the theme switcher in the development environment to test both brands:
- Color switching (blue ↔ green)
- Typography consistency
- Component spacing and layout
- Responsive behavior at all breakpoints

### **Browser Testing**
Test components across:
- Chrome, Firefox, Safari, Edge
- Mobile devices (iOS Safari, Chrome Mobile)
- Different screen sizes and orientations

## 📚 Documentation

Detailed documentation available in the `docs/` folder:
- **[COMPONENT_ARCHITECTURE.md](./docs/COMPONENT_ARCHITECTURE.md)** - System architecture
- **[FIGMA_INTEGRATION.md](./docs/FIGMA_INTEGRATION.md)** - Design to code workflow
- **[FRAGMENT_GENERATION.md](./docs/FRAGMENT_GENERATION.md)** - Static fragment creation

## 🚀 Next Steps

1. **Add More Components** - Expand the component library
2. **Automate Fragment Generation** - Improve build pipeline
3. **Enhanced Preview** - Better development experience
4. **Testing Framework** - Add automated component testing
5. **Storybook Integration** - Component documentation

---

**Status**: 🟢 Active Development Environment
**Purpose**: Component development and testing
**Integration**: Manual copy to HubSpot custom modules