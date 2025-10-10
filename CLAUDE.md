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

## Dual Brand Architecture - Headers & Footers

### Overview
The site supports two distinct brands that share the same theme infrastructure:
- **Cellcolabs** (B2B) - Green brand at cellcolabs.com
- **Cellcolabs Clinical** (B2C) - Blue brand at cellcolabsclinical.com

### Implementation Strategy

**Headers and footers are implemented as global modules** (not partials) to allow non-technical users to edit content through the HubSpot UI.

### Brand-Specific Modules

**Cellcolabs Clinical (Blue Brand) - ✅ COMPLETE:**
- `header-clinical.module` - Header with Clinical branding and navigation
- `footer-clinical.module` - Footer with Clinical branding and menus (desktop layout matches Figma exactly)

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

- `"global": true` - Makes module reusable across pages
- `"is_available_for_new_content": false` - Hides from module picker in content editor
- Only accessible through base template, not directly added to pages

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

### Menu Structure

Each brand has separate HubSpot menu sets:

**Cellcolabs Clinical (Blue Brand) - ✅ COMPLETE:**
- `main_navigation_clinical` - Main header navigation
- `footer_product_clinical` - Footer Product column (Stem cells, Trials, Clinics, Consultation)
- `footer_company_clinical` - Footer Company column (About, FAQ, Partnerships, Career, Privacy policy)
- `footer_support_clinical` - Footer Support column (Contact us)
- `footer_social_clinical` - Footer Social column (Instagram, Facebook, LinkedIn, LINE)

**Cellcolabs (Green Brand) - TO BE CREATED:**
- `main_navigation_cellcolabs` - Main header navigation
- `footer_product_cellcolabs` - Footer Product column links
- `footer_company_cellcolabs` - Footer Company column links
- `footer_support_cellcolabs` - Footer Support column links
- `footer_social_cellcolabs` - Footer Social column links

### Footer Structure (Clinical - Complete)

**Desktop Layout (1024px+) - ✅ MATCHES FIGMA:**
- Logo: 114px wide, positioned at left: 0
- 4 navigation columns positioned with absolute positioning at specific percentages:
  - Product: `calc(33.333% + 16px)` - 212px wide
  - Company: `calc(50% + 12px)` - 212px wide
  - Support: `calc(66.667% + 8px)` - 212px wide
  - Social: `calc(83.333% + 4px)` - 212px wide
- Contact and Copyright sections align with Product column
- All link colors forced to white with maximum specificity overrides

**Mobile Layout (767px and below):**
- Text logo + tagline at top
- 2-column grid for navigation links (Product/Support, Company/Social)
- All menu items left-aligned (overrides HubSpot default center alignment)
- Contact section below navigation
- Copyright at bottom

**Tablet Layout (768-1023px):**
- Same structure as desktop with 32px gap
- 2-column grid for navigation
- Scales responsively

### Creating New Brand Modules

When creating the Cellcolabs (green) modules:

1. Duplicate the Clinical module as starting point
2. Update `meta.json` label to reflect brand
3. Update logo image URLs to green brand assets
4. Update `data-brand` attribute to "cellcolabs"
5. Update menu references to use `_cellcolabs` suffix
6. Update default field values to Cellcolabs content
7. Ensure color variables use green brand colors
8. Upload to HubSpot: `hs upload growth-child/modules/[module].module "growth child/modules/[module].module"`

### Key Principles

- **Separate modules per brand** - Don't use conditional logic within a single module
- **Global modules only** - Ensures consistent branding across all pages
- **Hidden from picker** - Prevents accidental addition to pages outside template structure
- **Domain-based switching** - Automatic brand detection in base template
- **Editable content** - All text, links, and navigation managed through HubSpot UI

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

## CSS and Styling

- **ALWAYS use brand CSS variables** for all styling (colors, fonts, spacing)
- Brand variables are defined in `child.css` and automatically adjust for breakpoints
- Never hardcode values - variables enable centralized updates across all modules
- Test responsive behavior at all breakpoints (desktop 1024px+, tablet 768-1023px, mobile 767px and below)

### CSS File Structure

The project uses a clear separation of CSS files by module type:

**`child.css`** - Core theme foundation
- CSS variables: colors, typography, spacing, brand system
- Global typography overrides (body, headings, links)
- Container widths and grid system
- HubSpot spacing system integration
- Mobile width fixes
- Utility classes
- **This is the single source of truth for all brand variables**
- Does NOT contain header/footer styles (those are in modules)

**`css/standard-modules.css`** - Standard HubSpot modules
- All built-in HubSpot module overrides in ONE file
- Forms (inputs, labels, buttons, validation)
- Accordion, tabs, cards, pricing tables
- Blog listing, pagination, related posts
- Image gallery, video modules
- Social follow, social sharing
- Any other default HubSpot modules
- Organized with clear comment sections per module
- Uses brand variables from `child.css`

**`css/marketplace-modules.css`** - Marketplace module overrides
- Third-party marketplace module styling
- Only populated when marketplace modules are installed
- Uses brand variables from `child.css`

**`modules/[module].module/module.html`** - Custom theme modules
- Individual CSS embedded in `<style>` tags within module.html
- Auto-loaded by HubSpot when module is used
- Uses brand variables from `child.css`
- Module-specific overrides when needed
- Examples: `header-clinical.module`, `footer-clinical.module`, `section-builder.module`

### Why This Structure?

**Single file per category (not per module) for standard/marketplace:**
- HubSpot doesn't auto-load CSS for standard modules like it does for theme modules
- Loading 20+ separate CSS files creates performance issues
- Single file approach: better performance, easier maintenance
- Still organized with clear comment sections

**Embedded CSS for theme modules:**
- HubSpot automatically includes module.html (including <style> tags) when module is used
- Conditional loading (only loads when module is on page)
- Clean separation of concerns
- Self-contained modules

### Loading Order in base.html

```html
{{ require_css(get_public_template_url("../../child.css")) }}
{{ require_css(get_public_template_url("../../css/standard-modules.css")) }}
{{ require_css(get_public_template_url("../../css/marketplace-modules.css")) }}
```

Theme module CSS is automatically included when the module is used (no manual loading needed).

### Best Practices

1. **Always use brand variables** - Never hardcode colors, fonts, or spacing
2. **Organize with comments** - Use clear section headers in `standard-modules.css`
3. **Test responsively** - All styles must work at all breakpoints
4. **Maximum specificity** - Use high specificity to override Growth theme defaults
5. **Document changes** - Add comments for complex overrides
6. **Keep child.css clean** - Only global/foundational styles, no module-specific code

## Button and Link Styling Architecture

### Button Brand Variables

All button styling is controlled via CSS variables in `child.css` for both brands:

**Cellcolabs Clinical (Blue Brand):**
```css
/* Button Colors - Primary */
--button-primary-bg: #BECFFF;           /* Light blue - brand-100 */
--button-primary-bg-hover: #879ADF;     /* Medium blue - brand-300 */
--button-primary-bg-active: #4F65BE;    /* Dark blue - brand-500 */
--button-primary-text: #161616;         /* Dark text */
--button-primary-border: transparent;   /* No border */

/* Button Colors - Secondary/Outline */
--button-secondary-bg: transparent;
--button-secondary-border: #161616;
--button-secondary-border-hover: #6F6F6F;
--button-secondary-border-active: #8D8D8D;
--button-secondary-text: #161616;

/* Button Shape */
--button-border-radius: 24px;
```

**Cellcolabs (Green Brand):**
```css
/* Button Colors - Primary */
--button-primary-bg: #7FD99F;           /* Light green - placeholder */
--button-primary-bg-hover: #5BC47D;     /* Medium green - placeholder */
--button-primary-bg-active: #00A651;    /* Primary green */
--button-primary-text: #161616;
--button-primary-border: transparent;

/* Secondary and border radius same as Clinical */
```

### Standard Button Styling

Standard HubSpot buttons (`.hs-button`, `<button>`, etc.) are styled in `css/standard-modules.css`:

```css
/* Base button styling */
button, .btn, .button, .hs-button, a.hs-button,
input[type='submit'], input[type='button'] {
  font-family: var(--font-body) !important;
  font-size: var(--font-size-button) !important;
  border-radius: var(--button-border-radius, 24px) !important;
  /* ... */
}

/* Primary button - uses brand variables */
[data-brand] button, [data-brand] .hs-button,
[data-brand] a.hs-button, [data-brand] a.button {
  background-color: var(--button-primary-bg) !important;
  color: var(--button-primary-text) !important;
  border: 0.5px solid var(--button-primary-border) !important;
}

/* Hover and active states */
[data-brand] button:hover {
  background-color: var(--button-primary-bg-hover) !important;
}

[data-brand] button:active {
  background-color: var(--button-primary-bg-active) !important;
}
```

### Multi-Variant Button Module

The `button-multi-variant.module` also uses the same button brand variables:

```css
/* Primary button */
.button-multi-variant__link--primary {
  background-color: var(--button-primary-bg) !important;
  color: var(--button-primary-text) !important;
  border: 0.5px solid var(--button-primary-border) !important;
}

/* Outline button */
.button-multi-variant__link--outline {
  background: var(--button-secondary-bg) !important;
  color: var(--button-secondary-text) !important;
  border: 1.5px solid var(--button-secondary-border) !important;
}
```

### Global Link Styling

Link colors are managed in `child.css` with proper button exclusions:

```css
/* Base link styling (weak, for fallback) */
a {
  color: var(--color-text-link);
  font-weight: var(--font-weight-medium);
}

/* Brand-scoped links with proper specificity - exclude buttons */
[data-brand="cellcolabsclinical"] a:not(.button):not(.btn):not(.hs-button):not(button),
[data-brand="cellcolabs"] a:not(.button):not(.btn):not(.hs-button):not(button) {
  color: var(--color-text-link) !important;
  font-weight: var(--font-weight-medium);
}
```

**IMPORTANT:** Global link styling must be in `child.css`, NOT in individual modules. This ensures:
- Centralized link color management
- Proper button exclusions apply site-wide
- No conflicts between module-level and global styling

### Button Styling Checklist

When creating or updating buttons:
1. ✅ Use button brand variables (never hardcode colors)
2. ✅ Ensure buttons are excluded from link styling with `:not()` selectors
3. ✅ Test all states (default, hover, active, disabled)
4. ✅ Verify text color is black (#161616), not link blue
5. ✅ Check border-radius is 24px via `var(--button-border-radius)`
6. ✅ Test on all breakpoints

### Sticky Header Implementation

Headers use sticky positioning to remain visible when scrolling. Due to HubSpot's wrapper structure, sticky positioning must be applied correctly.

**CRITICAL:** Sticky positioning MUST be:
1. Applied in the CSS `<style>` block (NOT inline styles)
2. Include `-webkit-sticky` prefix for Safari compatibility
3. Applied to the **HubSpot wrapper**, not the header element itself

**Correct Implementation:**

```css
/* STICKY HEADER - Must be in CSS block, not inline */
/* Apply to HubSpot wrapper since it's the parent container */
.hs_cos_wrapper_type_module:has(.header.site-header) {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 999999 !important;
}

.header.site-header {
  background-color: #ffffff !important;
}
```

**Why HubSpot Wrapper?**
- HubSpot wraps all modules in `.hs_cos_wrapper_type_module` divs
- The header element (72px) has same height as its immediate parent (72px)
- Sticky elements need a taller parent container to stick within
- The HubSpot wrapper has the full page height (body-wrapper) as its parent
- Using `:has()` selector targets only the wrapper containing the header

**Common Debugging:**
```javascript
// Check if sticky is applied
const wrapper = document.querySelector('.hs_cos_wrapper_type_module');
console.log('Position:', window.getComputedStyle(wrapper).position); // Should be "sticky"
console.log('Wrapper height:', wrapper.offsetHeight);
console.log('Parent height:', wrapper.parentElement.offsetHeight);

// Check for overflow issues (breaks sticky)
let element = wrapper.parentElement;
while (element && element !== document.body) {
  const overflow = window.getComputedStyle(element).overflow;
  if (overflow !== 'visible') {
    console.log('Overflow issue:', element.className, overflow);
  }
  element = element.parentElement;
}
```

**Requirements for Sticky to Work:**
- Parent container must be taller than viewport
- No `overflow: hidden/auto/scroll` on parent elements
- Element must be in CSS block with `-webkit-sticky` prefix
- Must have `top` or `bottom` value set

## Brand Variables and Responsive Typography

### Typography Scale (Updated to Match Figma)
All font sizes automatically adjust across three breakpoints:

**Desktop (1024px+):**
- Display: 80px
- H1: 56px
- H2: 48px
- H3: 36px
- H4: 16px
- Body Large: 18px
- Body: 16px
- Body Small: 14px

**Tablet (768-1023px):**
- Display: 48px
- H1: 36px
- H2: 32px
- H3: 28px
- H4: 16px
- Body Large: 16px
- Body: 16px
- Body Small: 14px

**Mobile (767px and below):**
- Display: 40px
- H1: 36px
- H2: 32px
- H3: 28px
- H4: 16px
- Body Large: 16px
- Body: 16px
- Body Small: 14px

### Using Typography Variables
```css
/* Heading uses responsive font size */
.my-heading {
  font-size: var(--font-size-h2); /* Auto-switches: 48px → 32px → 32px */
  line-height: var(--line-height-tight, 1.15);
  font-weight: var(--font-weight-medium, 580);
}
```

## Section Builder Module

The Section Builder is a flexible multi-column layout module supporting 1-3 column layouts with various content blocks.

### Available Layouts
- Single column
- Two columns (50/50, 60/40, 40/60)
- Three columns

### Content Block Types

1. **Eyebrow** - Small label/badge above headings
   - Variants: Default, Inverted, Glass

2. **Heading** - Responsive headings with multiple levels
   - Levels: Display (hero), H1, H2, H3, H4
   - Display heading: 80px desktop with -2% letter-spacing
   - All sizes use brand variables and auto-adjust

3. **Subheader** - Subtitle/tagline text
   - Font: Body Large (18px desktop, 16px tablet/mobile)
   - Weight: Medium (500)
   - Color: Secondary text (#525252)
   - Max-width options: None, Narrow (480px), Medium (640px), Wide (800px)

4. **Description** - Body text
   - Sizes: Small (14px), Medium (16px), Large (18px)

5. **Button** - Call-to-action buttons
   - Variants: Primary, Outline
   - Sizes: Small, Medium, Large

6. **Rich Text** - WYSIWYG content

7. **Feature List** - Checkmark or numbered list
   - Supports title + description per item
   - Matches Content Checklist Block styling

8. **Accordion** - Expandable/collapsible content sections
   - Supports multiple items with title + rich text content
   - Options: Allow multiple open, First item open by default
   - Smooth animations with rotating chevron icons
   - Fully responsive and accessible

### Spacing Controls

**Content Spacing** (between blocks within columns):
- 2XS (4px), XS (8px), Small (12px), Medium (16px)
- Large (24px), XL (32px), 2XL (48px), 3XL (64px)

**Column Gap** (space between columns):
- 2XS (4px), XS (8px), Small (12px), Medium (16px)
- Large (24px), XL (32px), 2XL (48px), 3XL (64px), 4XL (96px)

**Padding** (section outer padding):
- None, Small (32px), Medium (48px), Large (64px)
- XLarge (96px), 2XLarge (96px/48px top-bottom/left-right)
- All padding options reduce responsively on tablet/mobile

### Usage Example - Hero Section
```
Layout: Single Column
Content Spacing: XL (32px)
Padding: XLarge (96px)

Blocks:
1. Eyebrow (centered) - "Powered by Cellcolabs"
2. Heading Display (centered) - Main headline
3. Subheader (centered, Narrow width) - Tagline
4. Button (centered) - CTA
```

### Key Features
- All styling uses brand CSS variables
- Fully responsive with automatic breakpoint adjustments
- Instance-specific styles (background, padding) use inline styles to prevent inheritance
- Each block has alignment options (left, center, right)
- Columns stack vertically on mobile (767px and below)

## Process Steps Module

A scroll-activated module displaying a step-by-step process with numbered circles and connecting vertical line.

### Layout Structure
- **Desktop/Tablet (768px+):** Two-column layout
  - Left: Sticky header with eyebrow, heading, and subheader
  - Right: Steps with numbered circles and descriptions
- **Mobile (767px and below):** Single column, stacked layout
  - Header content at top
  - Steps below with smaller circles

### Features
- **Numbered Circles:** Auto-numbered (1-10) with top-down fill animation
  - Desktop/Tablet: 64px × 64px, H3 font size (36px/28px)
  - Mobile: 48px × 48px, responsive H3 sizing
  - Fill color: Brand 100 (light blue)
  - Border color: Gray 100 default, Brand 100 when active
- **Connecting Line:** Vertical line connects all circles, dynamically stops at last circle top
  - Background line: Gray 100
  - Progressive fill line: Brand 900 (dark blue)
  - Fills to bottom of last activated circle with smooth transitions
- **Progressive Scroll Effects:**
  - Circles fill from top-down as they reach trigger point
  - All previous circles stay filled (progressive activation)
  - Unfills when scrolling back up
  - Line progressively fills ahead of current position (200px lookahead)
  - Text opacity increases when step becomes active
- **Sticky Header:** Left column header sticks at 128px from top (desktop/tablet only)
- **Brand Variables:** All typography, colors, and spacing uses CSS variables

### Fields
- **Eyebrow Text:** Optional label (e.g., "Process")
- **Heading:** Main section heading (H2)
- **Subheader:** Supporting text (Body Large)
- **Steps (repeater, 1-10 items):**
  - Step Title (H3)
  - Step Description (Rich text)

### Responsive Behavior
- **Desktop (1024px+):** Header sticks at 128px, circles 64px, trigger point 250px from top
- **Tablet (768-1023px):** Header sticks at 64px, circles 64px, trigger point 250px from top
- **Mobile (767px and below):** No sticky header, circles 48px, dynamic trigger point (header height + 40px)

### Colors
- Circle fill: `var(--color-brand-100)` - #becfff
- Active border: `var(--color-brand-100)` - #becfff
- Progressive line: `var(--color-brand-900)` - #0f2047
- Background line: `var(--color-gray-100)` - #262626

### Known Issues / TODO
- **Mobile:** Sticky header (eyebrow + heading + subheader) not working - needs investigation of HubSpot page context preventing `position: sticky` from functioning correctly

## Article with Table of Contents Module

A long-form article module with automatic table of contents navigation and scroll spy functionality.

### Status
⚠️ **First draft created - substantial styling work needed to match Figma design on both desktop and mobile**

### Current Implementation
- Two-column layout (desktop/tablet)
- Auto-generated table of contents from article sections
- Scroll spy to highlight active section
- Smooth scroll navigation
- Sticky TOC positioning (desktop left, mobile top)
- References accordion
- Up to 20 article sections

### Layout Structure
- **Desktop/Tablet (768px+):** Two-column layout
  - Left: Sticky table of contents (560px width)
  - Right: Article content sections (560px width)
- **Mobile (767px and below):** Single column
  - Sticky horizontal scrolling TOC at top
  - Article sections stacked below

### Fields
- **Article Sections (repeater, 1-20 items):**
  - Section Title (text) - becomes H3 heading and TOC link
  - Section Content (rich text) - supports paragraphs, lists, links, formatting
  - Section Image (optional) - displays below section content
- **Show References** (boolean) - toggle references section
- **References Content** (rich text) - expandable accordion

### Features
- **Table of Contents:**
  - Auto-generated from section titles
  - Active section highlighting via scroll spy
  - Smooth scroll on link click
  - Desktop: Vertical list, sticky left column
  - Mobile: Horizontal pills, sticky top bar
- **Article Sections:**
  - Rich text content with full formatting support
  - Optional images between sections
  - Scroll spy tracking
- **References Accordion:**
  - Optional expandable section
  - Plus icon (rotates to X when open)
  - Smooth height transition

### TODO - Styling Refinement Needed
- **Desktop:**
  - Match exact spacing from Figma (128px top padding, 96px right padding on TOC)
  - Verify typography sizing and weights match design
  - Check image border radius and spacing
  - Fine-tune TOC link hover states and transitions
- **Mobile:**
  - Implement horizontal scroll TOC design (not in Figma, needs to be added)
  - Adjust pill button styling for active/inactive states
  - Verify spacing and padding matches mobile design patterns
  - Test sticky TOC behavior and scroll performance
- **General:**
  - Test with real content and long articles
  - Verify scroll spy accuracy with different section heights
  - Check accessibility (keyboard navigation, screen readers)
  - Test References accordion interaction