# CellcoLabs Component Architecture

## Objectives
- Build a unified design system serving both cellcolabs.com and cellcolabsclinical.com from a single HubSpot portal.
- Maintain consistent components across brands with automatic domain-based theming.
- Enable marketing team to edit content without developer intervention.
- Leverage HubSpot's infrastructure for hosting, CDN, and content management.

## High-Level System
- **Component Development**: React (Vite) used for component development, testing, and design system maintenance.
- **HubSpot CMS**: Single portal hosts all production pages via custom theme and modules with automatic brand detection.
- **Component Integration**: React components are manually copied to HubSpot custom modules after development and testing.
- **Content Management**: HubSpot manages all content, menus, and assets via built-in editing tools.
- **Multi-Brand Support**: Automatic theme switching based on domain with separate navigation menus per brand.

## Frontend & Component Architecture
- Simple React app (Vite) with TypeScript for component development and testing.
- Theme tokens stored in JSON files (`src/themes/cellcolabs.json`, `src/themes/cellcolabsclinical.json`) and mapped to CSS variables.
- Components built with CSS Modules for scoped styling and responsive design (breakpoints: 768px tablet, 1024px desktop).
- Domain-based theme detection via JavaScript for automatic brand switching in HubSpot custom theme.
- Components manually copied from React development to HubSpot custom modules after testing.

## Component Development Workflow
1. Develop and test React components locally at `http://localhost:5173`.
2. Use built-in theme switcher and responsive preview to validate both brands.
3. Generate static HTML/CSS fragments using `npm run build:fragments` for testing HubSpot integration.
4. Test fragments locally at `http://localhost:8081/test-fragments.html`.
5. Manually copy component code to HubSpot custom modules in Design Manager.
6. Configure module fields to match component props for content editing.

## HubSpot Integration & Custom Theme
- Create a lightweight custom HubSpot theme with JavaScript-based domain detection for automatic brand switching.
- Custom modules contain HTML/CSS/JS copied from React components with HubL templating for content fields.
- Module fields (text, images, repeaters) allow marketing team to edit content without developer intervention.
- Theme variables and styles embedded directly in modules for simplicity and reliability.
- Forms, CRM submissions, and marketing analytics continue to run natively inside HubSpot.

## Navigation & Content Management
- Navigation and footer components integrated with HubSpot's native menu system and module fields.
- Brand-specific menus managed through HubSpot Menu Builder, automatically displayed based on domain detection.
- Content fields (headlines, descriptions, images) fully editable through HubSpot's page editor interface.
- React preview app includes theme switcher and sample data to mimic HubSpot content structure during development.

## Theme & Domain Strategy
- Brand token files stored in repo (`src/themes/cellcolabs.json`, `src/themes/cellcolabsclinical.json`).
- CSS variables automatically applied based on domain detection in HubSpot custom theme.
- Single HubSpot portal serves both brands with automatic theme switching.
- React preview includes theme switcher for local development and testing.
- Brand-specific menus and content managed separately in HubSpot for each domain.

## Component Assets & Testing
- Components tested as static HTML/CSS fragments before integration (`npm run build:fragments`).
- Local fragment server at `http://localhost:8080` for testing HubSpot integration locally.
- Test page at `http://localhost:8081/test-fragments.html` validates responsive behavior and theming.
- All styling and JavaScript embedded directly in HubSpot modules for simplicity and reliability.

## Development & QA Environment
- React development server at `http://localhost:5173` with component gallery and theme switcher.
- Preview app serves as design system documentation and testing environment for stakeholders.
- Fragment testing server simulates HubSpot integration locally before deployment.
- Both brands testable locally with accurate responsive breakpoints and theme variables.

## Environments
- **Development**: Local React server (`localhost:5173`), fragment server (`localhost:8080`), and test page (`localhost:8081`).
- **HubSpot Integration**: Custom modules created in HubSpot Design Manager with manually copied component code.
- **Production**: Single HubSpot portal hosting both cellcolabs.com and cellcolabsclinical.com with domain-based theme detection.
- Manual deployment process: develop locally → test fragments → copy to HubSpot modules → configure fields → publish.

## Deployment Workflow
1. **Component Development**: Build and test components in React development environment.
2. **Fragment Testing**: Generate static fragments and test locally before HubSpot integration.
3. **HubSpot Module Creation**: Manually copy HTML/CSS/JS to custom modules in Design Manager.
4. **Field Configuration**: Set up module fields to match component props for content editing.
5. **Theme Integration**: Apply domain-based brand detection in custom theme.
6. **Content Management**: Marketing team manages all content through HubSpot's native editing interface.

## HubSpot Page Authoring
- Marketing team drags custom modules onto pages through HubSpot's drag-and-drop page editor.
- All content (text, images, menu items) editable through intuitive HubSpot field interfaces.
- Navigation integrates with HubSpot Menu Builder for brand-specific menu management.
- React preview app serves as component documentation and testing environment for stakeholders.

## Content & Governance
- Theme tokens and component code version controlled in this repository.
- Simple release process: develop → test locally → copy to HubSpot → configure → publish.
- Marketing team manages all content through HubSpot without developer intervention.
- Component documentation available through React preview app and HubSpot integration guides.

## Future Enhancements
- Automate component copying to HubSpot modules through HubSpot CLI integration.
- Add CI/CD pipeline for automated testing and deployment workflows.
- Expand component library with additional Figma-based components.
- Implement automated theme sync between repository and HubSpot theme settings.

## Quick Start Checklist
- [x] Bootstrap React app with Vite and TypeScript
- [x] Create theme token files for both brands
- [x] Build responsive components (Navigation, ContentSection, Footer)
- [x] Implement fragment generation for HubSpot testing
- [x] Create HubSpot custom modules with proper field configuration
- [x] Test multi-brand theming and responsive design
- [ ] Create custom HubSpot theme with domain-based brand detection
- [ ] Set up brand-specific menu systems in HubSpot
- [ ] Document component usage and HubSpot integration process

## Design System & Figma Workflow
- Treat Figma as the single source of truth for shared layouts, theme tokens, and the component catalog across both domains.
- Maintain separate brand pages for exploration, but publish reusable primitives from a shared Figma library so repo tokens stay aligned.
- Capture component variants, responsive states, and content fields inside Figma annotations; mirror naming in React components and module schemas.
- Use Claude (or other tooling) to assist with design-to-code translation, followed by manual review to enforce accessibility, token usage, and data contracts.

### Collaboration Workflow
- Design team creates components in Figma with proper annotations for responsive states and content fields.
- Development team builds React components locally with theme switcher for immediate brand validation.
- Components tested as static fragments before manual integration into HubSpot custom modules.
- Marketing team manages all content through HubSpot's native interface without developer involvement.
- Documentation maintained in React preview app and HubSpot integration guides.

## Current Implementation Status

### ✅ Completed Components
- **Navigation Component** (`src/components/Navigation/`)
  - Responsive design with mobile hamburger menu
  - Figma-based dotted menu icon (3x5 grid)
  - Brand text with bold/regular styling
  - HubSpot module created and tested

- **Content Section Component** (`src/components/ContentSection/`)
  - Three-card responsive layout (1→2→3 columns)
  - Expandable descriptions with "Read more/less"
  - Dynamic header layout (stacked→side-by-side)
  - HubSpot module with repeater fields for cards

- **Footer Component** (`src/components/Footer/`)
  - Multi-column responsive layout
  - Brand information and contact details
  - Ready for HubSpot integration

### ✅ Infrastructure Complete
- **React Development Environment**
  - Local server: `http://localhost:5173`
  - Theme switcher for brand testing
  - Responsive breakpoints: 768px (tablet), 1024px (desktop)

- **Fragment Testing System**
  - Fragment generator: `npm run build:fragments`
  - Local fragment server: `http://localhost:8080`
  - Test page: `http://localhost:8081/test-fragments.html`

- **Theme System**
  - Brand token files: `src/themes/cellcolabs.json` & `cellcolabsclinical.json`
  - CSS Variables for automatic theme switching
  - Domain-based detection ready for HubSpot

### ✅ HubSpot Integration Proven
- **Custom Modules Created**
  - Navigation module with menu integration
  - Content section module with card repeaters
  - Field configurations tested and working

- **Testing & Documentation**
  - Integration guides: `HUBSPOT_INTEGRATION.md`, `QUICK_HUBSPOT_SETUP.md`
  - Step-by-step HubSpot setup instructions
  - Troubleshooting guides for common issues

### 🚀 Next Steps
1. **Create Custom HubSpot Theme**
   - Implement domain-based brand detection (`window.location.hostname`)
   - Set up automatic CSS variable switching
   - Configure separate menu systems for each brand

2. **Brand-Specific Menu Setup**
   - Create cellcolabs.com menu in HubSpot Menu Builder
   - Create cellcolabsclinical.com menu structure
   - Test automatic menu switching based on domain

3. **Complete Footer Integration**
   - Copy footer component to HubSpot custom module
   - Configure footer fields and content structure
   - Test footer responsive behavior

4. **Production Deployment**
   - Set up domain routing in HubSpot
   - Configure DNS for both domains
   - Test full multi-brand experience

### 📁 Key Files & Commands
```bash
# Development
npm run dev              # React preview at localhost:5173

# Fragment Testing
npm run build:fragments  # Generate static fragments
npm run serve:fragments  # Serve at localhost:8080

# Testing
open http://localhost:8081/test-fragments.html  # Full fragment test
```

**Repository Structure:**
- `src/components/` - React component library
- `src/themes/` - Brand token definitions
- `hubspot-modules/` - HubSpot module templates
- `dist/fragments/` - Generated static fragments
- `scripts/` - Build and fragment generation tools

### 🎯 Current Focus
The architecture is fully proven with working components in both React and HubSpot environments. The immediate priority is creating the custom HubSpot theme with domain-based brand detection to enable automatic switching between cellcolabs.com and cellcolabsclinical.com experiences within a single portal.
