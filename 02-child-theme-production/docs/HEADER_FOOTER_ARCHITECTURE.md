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

## Header Link Color Overrides

### Problem

Header navigation links need to be black (`#161616`), but the global brand-scoped link rule in `child.css` applies brand color (blue for Clinical, green for Cellcolabs) to all links site-wide.

### Current Solution (October 2025)

⚠️ **NOTE: This is a temporary specificity-based solution. We should look for a more maintainable architectural approach in the future.**

Due to the increasing number of link utility classes (`.link-white`, `.link-black`, `.link-gray`) being added to the global exclusion list, the global rule's specificity keeps growing. Each `:not()` pseudo-class adds +1 to the class/attribute count in specificity calculations.

**The Issue:**
- Global rule: `[data-brand] a:not(.button):not(.btn):not(.hs-button):not(button):not(.link-white):not(.link-black):not(.link-gray)`
- Specificity: `[0, 7, 1]` (7 classes/attributes, 1 element)
- Adding one more utility class would increase it to `[0, 8, 1]`

**Current Solution:**
Use repeated `[data-brand]` attribute selectors to artificially increase specificity:

```css
/* Desktop menu links - BLACK not brand color - INCREASED SPECIFICITY */
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-desktop ... a {
  color: var(--color-text-primary, #161616) !important;
}
```

**Specificity:** `[0, 12, 5]` (12 classes/attributes from 8×[data-brand] + 4 classes, 5 elements)

**Safety Margin:** Can accommodate up to **5 more link utility classes** before needing adjustment.

### Why This Approach

1. **Keeps child.css clean** - No header-specific exclusions or overrides in the global file
2. **Encapsulated module styling** - All header styling lives in the header module itself
3. **Higher specificity** - Repeated attribute selectors beat the global brand rule
4. **Future-proofed** - Comfortable margin for adding more utility classes

### Implementation

All header link selectors in `header-clinical.module/module.html` (and future `header-cellcolabs.module/module.html`) use `[data-brand]` repeated 8 times:

```css
/* Desktop menu links - BLACK not brand color */
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-desktop .hs-menu-wrapper > ul > li.hs-menu-item > a,
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-desktop .hs-menu-wrapper > ul > li.hs-menu-item > a[role="menuitem"] {
  color: var(--color-text-primary, #161616) !important;
  /* ... */
}

/* Desktop submenu links - BLACK not brand color */
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-desktop .hs-menu-wrapper .nav-submenu .nav-submenu-link,
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-desktop .hs-menu-wrapper .hs-menu-item ul li a {
  color: var(--color-text-primary, #161616) !important;
  /* ... */
}

/* Mobile menu links - BLACK not brand color */
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-mobile .hs-menu-item > a {
  color: var(--color-text-primary, #161616) !important;
  /* ... */
}

/* Mobile submenu links - BLACK not brand color */
html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-mobile .hs-menu-item ul li a {
  color: var(--color-text-primary, #161616) !important;
  /* ... */
}
```

### How It Works

1. **Global rule in child.css** applies brand color to all links:
   ```css
   [data-brand="cellcolabsclinical"] a:not(.button):not(.btn):not(.hs-button):not(button):not(.link-white):not(.link-black):not(.link-gray) {
     color: var(--color-text-link) !important;
   }
   ```
   - Specificity: `[0, 7, 1]` (7 classes/attributes, 1 element)

2. **Header module rule** has artificially higher specificity:
   ```css
   html body .header[data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand][data-brand] .nav-menu-desktop ... a {
     color: var(--color-text-primary) !important;
   }
   ```
   - Specificity: `[0, 12, 5]` (12 classes/attributes, 5 elements)
   - The repeated `[data-brand]` attribute + deeper nesting creates higher specificity
   - This rule wins over the global brand rule

3. **Result:** Header links display in black, all other site links display in brand color

### Maintenance Warning

⚠️ **If you add 6 or more new link utility classes** (e.g., `.link-purple`, `.link-green`, `.link-yellow`, `.link-orange`, `.link-blue`, `.link-red`) to the global exclusion list, the global rule will reach `[0, 12, 1]` specificity and tie with the header rule's class count. While the header would still win due to element count (5 vs 1), it's recommended to add more `[data-brand]` repetitions at that point for safety.

### Future Improvement Needed

🔧 **TODO: Find a more maintainable solution that doesn't rely on specificity wars.**

Potential approaches to explore:
- Use CSS custom properties/variables for link colors
- Restructure the global link rule to avoid growing specificity
- Use CSS layers (`@layer`) for better cascade control (when HubSpot supports it)
- Create a separate link color system that doesn't use exclusions

### Why NOT Use Other Approaches

❌ **Utility classes (`.link-black`):**
- HubSpot's `{% menu %}` tag doesn't apply custom classes from `link_class` parameter
- Classes are not rendered in the HTML output
- Would require manual HTML manipulation

❌ **child.css overrides:**
- Creates header-specific rules in the global file
- Clutters child.css with module-specific code
- Violates separation of concerns
- Goes against architectural preference for clean global files

❌ **Exclusions in global rule:**
- Would require adding header-specific exclusions to the brand-scoped link rule
- Makes the global rule complex and brittle
- Doesn't scale well as more modules need custom link colors

### Best Practice

When creating new header modules (e.g., `header-cellcolabs.module`), always include `[data-brand]` in all link selectors to ensure proper link color override.

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
