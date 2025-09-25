# CellcoLabs Architecture - Proof of Concept

## PoC Objectives
Validate the core architecture concept: React as a component factory generating static fragments consumed by HubSpot CMS, with responsive design and multi-brand theming.

## Scope
Build a minimal but complete vertical slice demonstrating:
- Component development in React with responsive design
- Static fragment generation pipeline
- Multi-brand theming (cellcolabs vs cellcolabsclinical)
- HubSpot integration without HubDB dependency
- Local development workflow

## Components to Build

### 1. Navigation Bar
- Desktop: Horizontal menu with brand logo
- Mobile: Hamburger menu with slide-out drawer
- Content: Brand text + menu items
- Source: Based on Figma design (node 699:4112)

### 2. Footer
- Desktop: Multi-column layout with links
- Mobile: Stacked single column
- Content: Links, copyright, brand info
- Simple implementation for PoC

### 3. Hero/Content Block
- Desktop: Side-by-side image and text
- Mobile: Stacked with image above text
- Content: Heading, body text, CTA button, background image
- Fully responsive with fluid typography

## Technical Implementation

### Project Structure
```
cellcolabsreact/
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx
│   │   │   └── Navigation.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.module.css
│   │   └── HeroBlock/
│   │       ├── HeroBlock.tsx
│   │       └── HeroBlock.module.css
│   ├── themes/
│   │   ├── cellcolabs.json
│   │   └── cellcolabsclinical.json
│   ├── utils/
│   │   ├── fragment-generator.ts
│   │   └── theme-loader.ts
│   └── preview/
│       └── App.tsx (preview environment)
├── dist/
│   └── fragments/
│       ├── navigation/v1/
│       ├── footer/v1/
│       └── hero-block/v1/
└── mock-hubspot/
    └── test-module.html
```

### Tech Stack
- **Vite**: Fast build tool and dev server
- **React 18**: Component development
- **TypeScript**: Type safety
- **CSS Modules**: Scoped styling with CSS variables
- **PostCSS**: Theme processing
- **Node.js**: Fragment generation scripts

### Responsive Breakpoints
```css
/* Mobile First Approach */
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1440px;
```

### Theme Token Structure
```json
{
  "name": "cellcolabs",
  "colors": {
    "primary": "#0066CC",
    "secondary": "#00A86B",
    "text": {
      "primary": "#161616",
      "secondary": "#666666"
    },
    "background": {
      "primary": "#FFFFFF",
      "section": "#F5F5F5"
    }
  },
  "typography": {
    "fontFamily": {
      "heading": "'Barlow', sans-serif",
      "body": "'Inter', sans-serif"
    },
    "sizes": {
      "mobile": {
        "h1": "32px",
        "body": "16px"
      },
      "desktop": {
        "h1": "48px",
        "body": "18px"
      }
    }
  },
  "spacing": {
    "unit": "8px",
    "containerPadding": {
      "mobile": "16px",
      "desktop": "24px"
    }
  }
}
```

## Fragment Generation Pipeline

### Build Process
1. React component renders with sample data
2. Extract rendered HTML using ReactDOMServer
3. Extract and inline critical CSS
4. Generate manifest with placeholders
5. Output static files to dist/fragments/

### Fragment Structure
```html
<!-- dist/fragments/navigation/v1/fragment.html -->
<nav class="nav-wrapper" data-component="navigation" data-version="1.0.0">
  <div class="nav-container">
    <div class="nav-brand" data-placeholder="brand_text">
      Cellcolabs Clinical
    </div>
    <button class="nav-mobile-toggle" aria-label="Menu">
      <span></span>
    </button>
    <ul class="nav-menu" data-placeholder="menu_items">
      <li><a href="#">Treatments</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Partners</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
</nav>
```

### Manifest Format
```json
{
  "id": "navigation",
  "version": "1.0.0",
  "name": "Main Navigation",
  "responsive": true,
  "breakpoints": ["mobile", "tablet", "desktop"],
  "placeholders": [
    {
      "id": "brand_text",
      "type": "text",
      "default": "Cellcolabs"
    },
    {
      "id": "menu_items",
      "type": "menu",
      "default": "main_menu"
    }
  ],
  "assets": {
    "html": "./fragment.html",
    "css": "./styles.css"
  },
  "themes": ["cellcolabs", "cellcolabsclinical"]
}
```

## HubSpot Integration (Simplified)

### Without HubDB
- Use standard HubSpot module fields
- Leverage HubSpot's Menu Builder for navigation
- Store content directly in module instances
- No external data dependencies

### Custom Module Structure
```
hubspot-modules/
├── navigation.module/
│   ├── module.html
│   ├── module.css
│   ├── module.js
│   ├── fields.json
│   └── meta.json
└── hero-block.module/
    ├── module.html
    ├── module.css
    ├── fields.json
    └── meta.json
```

### Module Field Definitions
```json
// navigation.module/fields.json
[
  {
    "name": "brand_text",
    "label": "Brand Text",
    "type": "text",
    "default": "Cellcolabs Clinical"
  },
  {
    "name": "menu",
    "label": "Navigation Menu",
    "type": "menu",
    "default": "default"
  },
  {
    "name": "theme",
    "label": "Brand Theme",
    "type": "choice",
    "choices": [
      ["cellcolabs", "Cellcolabs"],
      ["cellcolabsclinical", "Cellcolabs Clinical"]
    ],
    "default": "cellcolabs"
  }
]
```

## Local Development Workflow

### Development Server
1. Run Vite dev server: `npm run dev`
2. Preview components at `http://localhost:5173`
3. Toggle themes via UI controls
4. Test responsive breakpoints

### Fragment Generation
```bash
npm run build:fragments
# Generates static fragments in dist/fragments/
```

### Local Testing with Mock HubSpot
1. Serve fragments locally: `npm run serve:fragments`
2. Open mock-hubspot/test-module.html
3. Fragments load from localhost
4. Simulate HubSpot field injection

### Testing Checklist
- [ ] Components render identically as React and fragments
- [ ] Theme switching works correctly
- [ ] Responsive breakpoints function properly
- [ ] Placeholders accept dynamic content
- [ ] No React runtime in production fragments
- [ ] CSS properly scoped and extracted

## Migration Path to Production

### Phase 1 (Current PoC)
- Local development only
- Manual fragment deployment
- Testing in HubSpot sandbox

### Phase 2 (Next Steps)
- Set up Google Cloud Storage bucket
- Configure Cloud CDN
- Implement CI/CD pipeline
- Deploy to staging environment

### Phase 3 (Production Ready)
- Add remaining components
- Implement visual regression testing
- Set up monitoring and analytics
- Deploy to production domains

## Success Criteria

### Technical Validation
✅ React components generate valid static HTML/CSS
✅ Fragments load without JavaScript dependencies
✅ Theme tokens apply correctly to both brands
✅ Responsive design works across breakpoints
✅ HubSpot modules consume fragments successfully

### Architecture Validation
✅ Development velocity improved vs pure HubSpot
✅ Marketing team can edit content without code
✅ Single component serves both domains
✅ Performance metrics meet targets (<2s FCP)
✅ Workflow is sustainable for team

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build fragments
npm run build:fragments

# Serve fragments locally
npm run serve:fragments

# Run tests
npm run test

# Lint code
npm run lint
```

## Next Steps After PoC

1. **Expand Component Library**: Add more components from Figma
2. **Cloud Infrastructure**: Set up GCS + CDN
3. **CI/CD Pipeline**: Automate build and deployment
4. **HubSpot Theme**: Create production-ready theme
5. **Documentation**: Expand docs for marketing team
6. **Performance Monitoring**: Add analytics and RUM