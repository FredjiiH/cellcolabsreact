# CRITICAL INSTRUCTIONS FOR CLAUDE CODE

## HubSpot Theme Management - IMPORTANT

### ⚠️ NEVER CREATE DUPLICATE THEMES
**The production theme is named "growth child" (with space)**

- **ALWAYS** upload to the existing "growth child" theme
- **NEVER** create a duplicate theme unless explicitly requested
- **NEVER** upload with a different name like "growth-child" (with hyphen)
- Duplicate themes will break existing pages that reference the original theme

### Correct Upload Process

When uploading HubSpot modules or theme updates:

1. **For individual module updates** (PREFERRED):
   ```bash
   # Upload only the specific module that changed
   hs upload growth-child/modules/[module-name].module "growth child/modules/[module-name].module"
   ```

2. **For multiple file updates**:
   ```bash
   # Upload specific files or folders
   hs upload growth-child/child.css "growth child/child.css"
   hs upload growth-child/templates "growth child/templates"
   ```

3. **Full theme upload** (ONLY when necessary):
   ```bash
   # This should rarely be needed
   hs upload growth-child "growth child"
   ```

### Key Points to Remember

- The local folder is named `growth-child` (with hyphen) for file system compatibility
- The HubSpot theme is named `"growth child"` (with space) - note the quotes when uploading
- Only upload changed files to minimize risk and improve upload speed
- Always verify the theme name in HubSpot with `hs list` before uploading

### Why This Matters

Pages in HubSpot are linked to specific themes. If you create a duplicate theme:
- Existing pages lose their template connection
- Modules disappear from pages
- Site functionality breaks
- Recovery requires restoring the original theme name

## Dual Brand Architecture - Overview

### Brands

The site supports two distinct brands that share the same theme infrastructure:
- **Cellcolabs** (B2B) - Green brand at cellcolabs.com
- **Cellcolabs Clinical** (B2C) - Blue brand at cellcolabsclinical.com

### Implementation Strategy

**Headers and footers are implemented as global modules** (not partials) to allow non-technical users to edit content through the HubSpot UI.

### Brand-Specific Modules

**Cellcolabs Clinical (Blue Brand) - ✅ COMPLETE:**
- `header-clinical.module` - Header with Clinical branding and navigation
- `footer-clinical.module` - Footer with Clinical branding and menus

**Cellcolabs (Green Brand) - TO BE CREATED:**
- `header-cellcolabs.module` - Header with Cellcolabs branding and navigation
- `footer-cellcolabs.module` - Footer with Cellcolabs branding and menus

### Naming Convention

**Modules:**
- Clinical brand: `[component]-clinical.module` (e.g., `footer-clinical.module`)
- Cellcolabs brand: `[component]-cellcolabs.module` (e.g., `footer-cellcolabs.module`)

**HubSpot Menus:**
- Clinical brand: `[menu-name]_clinical` (e.g., `footer_product_clinical`)
- Cellcolabs brand: `[menu-name]_cellcolabs` (e.g., `footer_product_cellcolabs`)

### Module Configuration

All header/footer modules use these settings in `meta.json`:
```json
{
  "global": true,
  "is_available_for_new_content": false,
  "host_template_types": ["PAGE", "BLOG_POST", "BLOG_LISTING"]
}
```

### Domain-Based Loading

Brand detection happens in `base.html` based on request domain:

```html
{% set global_brand = "cellcolabsclinical" %}
{% if request.domain == "cellcolabs.com" %}
  {% set global_brand = "cellcolabs" %}
{% endif %}

<body data-brand="{{ global_brand }}">
  {% block header %}
    {% if global_brand == "cellcolabs" %}
      {% module "header_cellcolabs" path="../../modules/header-cellcolabs.module" %}
    {% else %}
      {% module "header_clinical" path="../../modules/header-clinical.module" %}
    {% endif %}
  {% endblock header %}

  {% block footer %}
    {% if global_brand == "cellcolabs" %}
      {% module "footer_cellcolabs" path="../../modules/footer-cellcolabs.module" %}
    {% else %}
      {% module "footer_clinical" path="../../modules/footer-clinical.module" %}
    {% endif %}
  {% endblock footer %}
</body>
```

### Key Principles

- **Separate modules per brand** - Don't use conditional logic within a single module
- **Global modules only** - Ensures consistent branding across all pages
- **Hidden from picker** - Prevents accidental addition to pages outside template structure
- **Domain-based switching** - Automatic brand detection in base template
- **Editable content** - All text, links, and navigation managed through HubSpot UI

📚 **For detailed header/footer architecture, see:** [02-child-theme-production/docs/HEADER_FOOTER_ARCHITECTURE.md](./02-child-theme-production/docs/HEADER_FOOTER_ARCHITECTURE.md)

## Testing and Development Workflow

1. Develop components locally in `01-component-development`
2. Test thoroughly with `npm run dev`
3. Convert to HubSpot module in `02-child-theme-production/growth-child/modules`
4. Upload ONLY the new/changed module to "growth child" theme
5. Never upload the entire theme unless absolutely necessary

## Module Naming Conventions

- Use kebab-case for module folder names: `locations-carousel-block.module`
- Ensure module names are descriptive and consistent
- Include `.module` extension in folder names

### Global Modules

**Global modules** are modules where the same content appears on multiple pages. When you edit a global module, the changes apply to all instances across the site.

**Naming Convention:**
- Add `-global` suffix to module folder name: `content-checklist-block-global.module`
- Update `meta.json` label to include "(Global)": `"label": "Content Checklist Block (Global)"`
- Add description note: `"This is a global module - same content appears everywhere"`

**Configuration Required:**
```json
{
  "label": "Module Name (Global)",
  "description": "Module description. This is a global module - same content appears everywhere.",
  "global": true,
  "is_available_for_new_content": true
}
```

**When to Use Global Modules:**
- Headers and footers (consistent across all pages)
- Content blocks that need to be identical everywhere (e.g., feature lists, announcements)
- Elements that require single-source editing

**When NOT to Use Global Modules:**
- Content that varies per page
- Modules that need customization on each instance
- Page-specific sections

**Examples:**
- `content-checklist-block-global.module` - Feature list that appears identically on multiple pages
- `header-clinical.module` - Clinical brand header (global but brand-specific)
- `footer-clinical.module` - Clinical brand footer (global but brand-specific)

## CSS and Styling - Overview

### Core Principles

- **ALWAYS use brand CSS variables** for all styling (colors, fonts, spacing)
- Brand variables are defined in `child.css` and automatically adjust for breakpoints
- Never hardcode values - variables enable centralized updates across all modules
- Test responsive behavior at all breakpoints (desktop 1024px+, tablet 768-1023px, mobile 767px and below)

### CSS File Structure

**`child.css`** - Core theme foundation
- CSS variables: colors, typography, spacing, brand system
- Global typography overrides (body, headings, links)
- Container widths and grid system
- **This is the single source of truth for all brand variables**
- Does NOT contain header/footer styles (those are in modules)

**`css/standard-modules.css`** - Standard HubSpot modules
- All built-in HubSpot module overrides in ONE file
- Forms, accordion, tabs, cards, blog, etc.
- Organized with clear comment sections per module
- Uses brand variables from `child.css`

**`css/marketplace-modules.css`** - Marketplace module overrides
- Third-party marketplace module styling
- Uses brand variables from `child.css`

**`modules/[module].module/module.html`** - Custom theme modules
- Individual CSS embedded in `<style>` tags
- Auto-loaded by HubSpot when module is used
- Uses brand variables from `child.css`

### Loading Order in base.html

```html
{{ require_css(get_public_template_url("../../child.css")) }}
{{ require_css(get_public_template_url("../../css/standard-modules.css")) }}
{{ require_css(get_public_template_url("../../css/marketplace-modules.css")) }}
```

### Typography Scale (Figma-Aligned)

All font sizes automatically adjust across three breakpoints and match the Figma design system:

**Desktop (1024px+):**
- Display: 64px, H1: 56px, H2: 40px, H3: 28px, H4: 20px
- Body Large: 18px, Body: 16px, Body Small: 14px
- Eyebrow: 14px, Navigation: 14px

**Tablet (768-1023px):**
- Display: 48px, H1: 36px, H2: 32px, H3: 28px, H4: 16px
- Body Large: 16px, Body: 16px, Body Small: 14px
- Eyebrow: 14px, Navigation: 14px

**Mobile (767px and below):**
- Display: 48px, H1: 36px, H2: 32px, H3: 28px, H4: 16px
- Body Large: 16px, Body: 16px, Body Small: 14px
- Eyebrow: 14px, Navigation: 14px

**Line Heights:**
- Display: 100% (1.0) with -2% letter-spacing
- Headings (H1-H4): 115% (1.15)
- Body text: 135% (1.35)
- Buttons/Navigation: 100% (1.0)

**Font Weights:**
- Regular: 400 (Inter Variable)
- Medium: 500 (used for headings in Barlow)
- Semibold: 650
- Bold: 700

### Button Styling

All buttons use centralized CSS variables:

```css
/* Button Colors - Clinical (Blue) */
--button-primary-bg: #BECFFF;           /* Light blue */
--button-primary-bg-hover: #879ADF;     /* Medium blue */
--button-primary-bg-active: #4F65BE;    /* Dark blue */
--button-primary-text: #161616;         /* Dark text */
--button-border-radius: 24px;
```

Standard HubSpot buttons (`.hs-button`, `<button>`, etc.) are styled in `css/standard-modules.css` using these variables.

### Link Styling

Global link colors managed in `child.css`:

```css
/* Brand-scoped links - exclude buttons and utility classes */
[data-brand="cellcolabsclinical"] a:not(.button):not(.btn):not(.hs-button):not(button):not(.link-white):not(.link-black) {
  color: var(--color-text-link) !important;
}
```

**Link Color Utilities:**
- `.link-white` - White links on dark backgrounds
- `.link-black` - Black links instead of brand color

### Background Color System

All modules with background color options use a **dual-field system** that combines Figma design system presets with custom color flexibility:

**Available Figma Preset Colors:**
- **Background colors:** `$bg-white`, `$bg-beige`, `$bg-blue`
- **Brand colors (Primary):** `brand-100` through `brand-900` (5 shades: 100, 300, 500, 700, 900)
- **Brand colors (Secondary):** `brand-secondary-100` through `brand-secondary-900` (5 shades: 100, 300, 500, 700, 900)
- **Neutral colors:** `neutral-900` (light gray), `neutral-0` (dark)
- **Custom Color** - Allows one-off custom colors when needed

All brand colors automatically adapt between Cellcolabs Clinical (blue) and Cellcolabs AB (blue/yellow) brands.

**Implementation Pattern:**
```json
{
  "name": "background_color_preset",
  "label": "Background Color",
  "type": "choice",
  "choices": [
    ["none", "None (Transparent)"],
    ["bg-white", "$bg-white"],
    ["bg-beige", "$bg-beige"],
    ["bg-blue", "$bg-blue"],
    ["neutral-900", "neutral-900 (Light Gray)"],
    ["neutral-0", "neutral-0 (Dark)"],
    ["custom", "Custom Color"]
  ],
  "help_text": "Select a Figma design system color or choose Custom for one-off colors"
},
{
  "name": "background_color_custom",
  "label": "Custom Background Color",
  "type": "color",
  "visibility": {
    "controlling_field": "background_color_preset",
    "controlling_value_regex": "custom"
  }
}
```

**Why This Approach:**
- Users see Figma variable names matching the design system
- Brand colors automatically adapt (e.g., `$bg-blue` changes per brand)
- Custom color option maintains flexibility for edge cases
- Centralized color management through CSS variables

**Modules with Background Color System:**
- Section Builder Module ✅ (with brand colors)
- Content Checklist Block Module ✅ (with brand colors)
- Grid 2x2 Card Image Module ✅ (with brand colors + user-controlled text/eyebrow styling)
- Image Card Overlay 3 Column Module ✅ (with brand colors + user-controlled text/eyebrow styling)
- Image Card Overlay 4 Column Module ✅ (with brand colors + user-controlled text/eyebrow styling)

**User-Controlled Text/Eyebrow Styling:**
For image card modules with background colors (not images), users can select:
- **Text Color Style:** Primary (dark) or Inverse (white)
- **Eyebrow Style:** Primary (dark semi-transparent) or Secondary (white semi-transparent)

This flexible system avoids hardcoded light/dark logic and remains future-proof as new colors are added.

**Eyebrow Background Variables (Centralized):**
All modules with eyebrows now use centralized CSS variables from `child.css`:
- `--color-eyebrow-bg-primary`: rgba(22, 22, 22, 0.08) - Dark semi-transparent for light backgrounds
- `--color-eyebrow-bg-secondary`: rgba(255, 255, 255, 0.12) - White semi-transparent for dark/image backgrounds

**Modules Using Eyebrow Variables:**
- Eyebrow Block Module ✅
- Section Builder Module ✅
- Process Steps Module ✅
- Locations Carousel Block V2 Module ✅

📚 **For complete CSS architecture, button/link styling, form styling, and best practices, see:** [02-child-theme-production/docs/CSS_STYLING_GUIDE.md](./02-child-theme-production/docs/CSS_STYLING_GUIDE.md)

## Custom Modules - Quick Reference

### Production Ready Modules

1. **Section Builder Module** ✅
   - Flexible multi-column layout (1-3 columns)
   - 8 content block types (eyebrow, heading, subheader, description, button, rich text, feature list, accordion)
   - Configurable spacing and padding
   - Full brand color support
   - Centralized eyebrow variables

2. **Process Steps Module** ✅
   - Scroll-activated step-by-step display
   - Numbered circles with connecting line
   - Progressive scroll effects
   - Two-column layout (desktop/tablet), single column (mobile)
   - Centralized eyebrow variables

3. **Team Cards Module** ✅
   - Responsive grid (3-column → 2-column → 1-column)
   - Expandable biographies
   - 4:5 aspect ratio photos
   - Full keyboard accessibility

4. **Article with Table of Contents Module** ⚠️
   - First draft complete, styling refinement needed
   - Auto-generated TOC with scroll spy
   - Up to 20 article sections
   - References accordion

5. **Grid 2x2 Card Image Module** ✅
   - 2x2 grid with image/color backgrounds
   - Full brand color support (10 brand colors total)
   - User-controlled text and eyebrow styling
   - Optional button CTAs

6. **Image Card Overlay 3 Column Module** ✅
   - 3-column responsive grid
   - Image/color backgrounds with full brand color support
   - User-controlled text and eyebrow styling
   - Optional link CTAs

7. **Image Card Overlay 4 Column Module** ✅
   - 4-column responsive grid
   - Image/color backgrounds with full brand color support
   - User-controlled text and eyebrow styling
   - Optional link CTAs

8. **Content Checklist Block Module** ✅
   - Feature list with checkmarks
   - Full brand color support
   - Eyebrow, heading, description
   - Up to 10 feature items

9. **Eyebrow Block Module** ✅
   - Standalone eyebrow component
   - 3 variants (Default, Inverted, Glass)
   - 5 alignment options
   - Centralized eyebrow variables

10. **Locations Carousel Block V2 Module** ✅
    - Two-column location display
    - Multi-image carousel per location
    - Tab navigation and auto-play
    - Centralized eyebrow variables

11. **Button Multi-Variant Module** ✅
    - Multiple button styles (primary, secondary, outline)

12. **Content Text Image Module** ✅
    - Content sections with text and images

13. **Eligibility Checker Module** ✅
    - Multi-step eligibility flow
    - GTM event tracking
    - Optional HubSpot meeting scheduler integration

📚 **For complete module specifications, fields, features, and usage guidelines, see:** [02-child-theme-production/docs/MODULE_CATALOG.md](./02-child-theme-production/docs/MODULE_CATALOG.md)

## Documentation Index

### Core Documentation
- **[README.md](./README.md)** - Project overview and quick start guide
- **[02-child-theme-production/README.md](./02-child-theme-production/README.md)** - Child theme system overview

### Detailed Guides
- **[HEADER_FOOTER_ARCHITECTURE.md](./02-child-theme-production/docs/HEADER_FOOTER_ARCHITECTURE.md)** - Complete header/footer implementation details
  - Sticky header implementation
  - Header link color overrides
  - Dropdown hover gap fix
  - Footer structure and layouts
  - Creating new brand modules

- **[CSS_STYLING_GUIDE.md](./02-child-theme-production/docs/CSS_STYLING_GUIDE.md)** - Complete CSS architecture
  - CSS file structure and loading order
  - Brand variables and responsive typography
  - Brand color system (Figma-aligned with 10 brand colors)
  - Eyebrow background variables (centralized)
  - Button and link styling system
  - Link color override utilities
  - HubSpot form styling (complete system)
  - Modules with background color systems
  - Modules using eyebrow variables

- **[MODULE_CATALOG.md](./02-child-theme-production/docs/MODULE_CATALOG.md)** - All custom module specifications
  - Section Builder Module (with brand colors)
  - Process Steps Module (with eyebrow variables)
  - Team Cards Module
  - Article with Table of Contents Module
  - Grid 2x2 Card Image Module (with brand colors + flexible styling)
  - Image Card Overlay 3 Column Module (with brand colors + flexible styling)
  - Image Card Overlay 4 Column Module (with brand colors + flexible styling)
  - Content Checklist Block Module (with brand colors)
  - Eyebrow Block Module (with centralized variables)
  - Locations Carousel Block V2 Module (with eyebrow variables)
  - Module development guidelines

### Supporting Documentation
- **[MODULE_DEVELOPMENT_GUIDE.md](./02-child-theme-production/docs/MODULE_DEVELOPMENT_GUIDE.md)** - How to create new modules
- **[URL_FIELD_IMPLEMENTATION_GUIDE.md](./02-child-theme-production/docs/URL_FIELD_IMPLEMENTATION_GUIDE.md)** - HubSpot link field implementation
- **[WIDTH_SYSTEM_GUIDE.md](./02-child-theme-production/docs/WIDTH_SYSTEM_GUIDE.md)** - Width alignment system
- **[SPACING_SYSTEM_GUIDE.md](./02-child-theme-production/docs/SPACING_SYSTEM_GUIDE.md)** - Container-based spacing system
- **[DUAL_BRAND_SPACING_GUIDE.md](./02-child-theme-production/docs/DUAL_BRAND_SPACING_GUIDE.md)** - Spacing system implementation
- **[LCP_OPTIMIZATION_GUIDE.md](./02-child-theme-production/docs/LCP_OPTIMIZATION_GUIDE.md)** - LCP image optimization for Core Web Vitals
  - Section Builder LCP implementation (✅ Complete)
  - Manual srcset with DPR-aware sizes (400w, 800w, 1200w, 1704w)
  - Font preconnect optimization
  - Performance: 2.0s LCP local (98 score), 4.1s PSI (78 score)
  - Current status: ✅ Production ready - image optimization complete

---

**Last Updated**: October 23, 2025
**Status**: ✅ Production Ready - Clinical brand complete, Cellcolabs brand pending
**Theme**: growth child (extends Growth marketplace theme)

**Recent Updates (October 23, 2025):**
- ✅ Added full brand color system (10 colors: 5 primary + 5 secondary shades)
- ✅ Implemented centralized eyebrow background variables
- ✅ Updated 5 image card modules with brand colors and flexible text/eyebrow styling
- ✅ Standardized eyebrow styling across all modules using centralized variables
- ✅ Updated CSS_STYLING_GUIDE.md and MODULE_CATALOG.md with complete documentation
