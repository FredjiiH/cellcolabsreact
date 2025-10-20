# Header & Footer Architecture

## Overview

Headers and footers are implemented as **global modules** (not partials) to allow non-technical users to edit content through the HubSpot UI. The site supports two distinct brands that share the same theme infrastructure:

- **Cellcolabs** (B2B) - Green brand at cellcolabs.com
- **Cellcolabs Clinical** (B2C) - Blue brand at cellcolabsclinical.com

## Implementation Strategy

Headers and footers are implemented as global modules rather than partials because:
- Allows non-technical users to edit content via HubSpot UI
- Provides full field editing capabilities
- Maintains consistent branding across all pages
- Enables easy content updates without developer intervention

## Brand-Specific Modules

### Cellcolabs Clinical (Blue Brand) - ✅ COMPLETE

**Header:**
- `header-clinical.module` - Header with Clinical branding and navigation
- Features: Sticky positioning, responsive mobile menu, black link colors

**Footer:**
- `footer-clinical.module` - Footer with Clinical branding and menus
- Desktop layout matches Figma exactly with absolute positioning

**Menus:**
- `main_navigation_clinical` - Main header navigation
- `footer_product_clinical` - Footer Product column (Stem cells, Trials, Clinics, Consultation)
- `footer_company_clinical` - Footer Company column (About, FAQ, Partnerships, Career, Privacy policy)
- `footer_support_clinical` - Footer Support column (Contact us)
- `footer_social_clinical` - Footer Social column (Instagram, Facebook, LinkedIn, LINE)

### Cellcolabs (Green Brand) - TO BE CREATED

**Header:**
- `header-cellcolabs.module` - Header with Cellcolabs branding and navigation

**Footer:**
- `footer-cellcolabs.module` - Footer with Cellcolabs branding and menus

**Menus:**
- `main_navigation_cellcolabs` - Main header navigation
- `footer_product_cellcolabs` - Footer Product column links
- `footer_company_cellcolabs` - Footer Company column links
- `footer_support_cellcolabs` - Footer Support column links
- `footer_social_cellcolabs` - Footer Social column links

## Naming Convention

**Modules:**
- Clinical brand: `[component]-clinical.module` (e.g., `footer-clinical.module`)
- Cellcolabs brand: `[component]-cellcolabs.module` (e.g., `footer-cellcolabs.module`)

**HubSpot Menus:**
- Clinical brand: `[menu-name]_clinical` (e.g., `footer_product_clinical`)
- Cellcolabs brand: `[menu-name]_cellcolabs` (e.g., `footer_product_cellcolabs`)

## Module Configuration

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

## Domain-Based Loading

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

## Footer Structure (Clinical - Complete)

### Desktop Layout (1024px+) - ✅ MATCHES FIGMA

- Logo: 114px wide, positioned at left: 0
- 4 navigation columns positioned with absolute positioning at specific percentages:
  - Product: `calc(33.333% + 16px)` - 212px wide
  - Company: `calc(50% + 12px)` - 212px wide
  - Support: `calc(66.667% + 8px)` - 212px wide
  - Social: `calc(83.333% + 4px)` - 212px wide
- Contact and Copyright sections align with Product column
- All link colors forced to white with maximum specificity overrides

### Mobile Layout (767px and below)

- Text logo + tagline at top
- 2-column grid for navigation links (Product/Support, Company/Social)
- All menu items left-aligned (overrides HubSpot default center alignment)
- Contact section below navigation
- Copyright at bottom

### Tablet Layout (768-1023px)

- Same structure as desktop with 32px gap
- 2-column grid for navigation
- Scales responsively

## Sticky Header Implementation

Headers use sticky positioning to remain visible when scrolling. Due to HubSpot's wrapper structure, sticky positioning must be applied correctly.

**CRITICAL:** Sticky positioning MUST be:
1. Applied in the CSS `<style>` block (NOT inline styles)
2. Include `-webkit-sticky` prefix for Safari compatibility
3. Applied to the **HubSpot wrapper**, not the header element itself

### Correct Implementation

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

### Why HubSpot Wrapper?

- HubSpot wraps all modules in `.hs_cos_wrapper_type_module` divs
- The header element (72px) has same height as its immediate parent (72px)
- Sticky elements need a taller parent container to stick within
- The HubSpot wrapper has the full page height (body-wrapper) as its parent
- Using `:has()` selector targets only the wrapper containing the header

### Common Debugging

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

### Requirements for Sticky to Work

- Parent container must be taller than viewport
- No `overflow: hidden/auto/scroll` on parent elements
- Element must be in CSS block with `-webkit-sticky` prefix
- Must have `top` or `bottom` value set

## Header & Footer Link Color Overrides

### Problem Solved

Header navigation links need to be black (`#161616`) and footer links need to be white (`#ffffff`), but the global brand-scoped link rule in `child.css` applies brand color (blue for Clinical, green for Cellcolabs) to all links site-wide.

### Solution: CSS Custom Property Override System ✅ (October 2025)

Both header and footer modules now use the **CSS Custom Property Override System**, which provides clean, maintainable link color overrides without specificity wars or utility classes.

**Key Achievement:** Eliminated nuclear specificity selectors (8x repeated `[data-brand]` attributes) and utility classes (`.link-white`, `.link-black`) in favor of a scalable CSS variable system.

### How It Works

**1. Global Foundation (`child.css`):**

```css
/* Intermediary variable defined in :root */
:root {
  --link-color: var(--color-text-link);  /* Default: brand color */
}

/* Applied to all links */
a {
  color: var(--link-color);
}

[data-brand] a:not(.button):not(.btn):not(.hs-button):not(button) {
  color: var(--link-color);
}
```

**2. Header Module Override:**

```css
/* header-clinical.module/module.html */
.header {
  --link-color: var(--color-text-primary);  /* Override to black */
}

/* All navigation links automatically inherit black */
.header .nav-menu-link {
  /* No color declaration needed - inherits from --link-color */
}
```

**3. Footer Module Override:**

```css
/* footer-clinical.module/module.html */
.site-footer {
  --link-color: var(--color-text-inverse);  /* Override to white */
}

/* All footer links automatically inherit white */
.footer-menu-link {
  /* No color declaration needed - inherits from --link-color */
}
```

### Benefits

✅ **No specificity wars** - CSS variables don't have specificity, they just cascade
✅ **Clean, readable code** - Single override point per module
✅ **No utility classes** - No HTML class management needed
✅ **Scalable** - Easy to add new override points
✅ **Maintainable** - Clear intent and purpose
✅ **Works with nesting** - Submenus and nested elements inherit automatically

### Implementation Details

**Header Module Refactor:**

The header required a complete refactor to enable the CSS Custom Property Override System:

1. **Replaced HubSpot `{% menu %}` tag with manual loops:**
   - `{% menu %}` auto-generates HTML, preventing custom property control
   - Converted to `{% set main_menu = menu("main_navigation_clinical") %}`
   - Manual loops for desktop and mobile menus
   - Conditional logic for submenus and chevron icons
   - Filter to show only top-level items: `{% if item.label and item.level == 1 %}`

2. **Removed nuclear specificity selectors:**
   - Eliminated 8x repeated `[data-brand]` attribute selectors
   - Reduced code from ~700 to ~565 lines
   - Replaced with clean CSS Custom Property Override

3. **Fixed mobile menu toggle:**
   - Used event capture phase (`addEventListener(..., true)`)
   - Added `stopImmediatePropagation()` to prevent conflicts with `template_child.js`

**Footer Module Conversion:**

Footer already used manual `menu()` loops, so conversion was straightforward:

1. Removed `.link-white` utility classes from HTML
2. Added CSS Custom Property Override to `.site-footer`
3. Updated CSS comments to reflect new system

### Best Practice

When creating new header/footer modules (e.g., `header-cellcolabs.module`, `footer-cellcolabs.module`):

1. Use manual `menu()` loops, not `{% menu %}` tags
2. Set `--link-color` on the module container (`.header` or `.site-footer`)
3. Let links inherit color automatically - no color declarations needed
4. See `CSS_STYLING_GUIDE.md` for complete documentation

## Dropdown Hover Gap Fix

### Issue

Dropdown submenus had a 4px gap between the parent menu item and the dropdown, causing hover state to be lost when moving the mouse slowly from parent to dropdown. This made dropdowns close unexpectedly.

### Root Cause

CSS margin on submenu positioning:

```css
/* BROKEN - Creates gap */
.nav-submenu {
  position: absolute;
  top: 100%;
  margin: 4px 0 0 0 !important;
}
```

### Fix

Remove margin so submenu starts exactly at parent bottom edge:

```css
/* FIXED - No gap */
.nav-submenu {
  position: absolute;
  top: 100%;
  margin: 0 !important;
}
```

### Location

`header-clinical.module/module.html` line ~193

### Result

Users can now move their mouse from parent menu item to dropdown submenu without losing hover state, making navigation smoother and more forgiving.

## Creating New Brand Modules

When creating the Cellcolabs (green) modules:

1. Duplicate the Clinical module as starting point
2. Update `meta.json` label to reflect brand
3. Update logo image URLs to green brand assets
4. Update `data-brand` attribute to "cellcolabs"
5. Update menu references to use `_cellcolabs` suffix
6. Update default field values to Cellcolabs content
7. Ensure color variables use green brand colors
8. Upload to HubSpot: `hs upload growth-child/modules/[module].module "growth child/modules/[module].module"`

## Key Principles

- **Separate modules per brand** - Don't use conditional logic within a single module
- **Global modules only** - Ensures consistent branding across all pages
- **Hidden from picker** - Prevents accidental addition to pages outside template structure
- **Domain-based switching** - Automatic brand detection in base template
- **Editable content** - All text, links, and navigation managed through HubSpot UI

---

**Last Updated**: October 15, 2025
**Status**: Clinical brand complete, Cellcolabs brand pending
