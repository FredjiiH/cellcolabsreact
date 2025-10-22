# CSS and Styling Guide

## Overview

This guide covers the complete CSS architecture for the dual-brand HubSpot theme, including file structure, brand variables, button/link styling, and form styling.

## Core Principles

- **ALWAYS use brand CSS variables** for all styling (colors, fonts, spacing)
- Brand variables are defined in `child.css` and automatically adjust for breakpoints
- Never hardcode values - variables enable centralized updates across all modules
- Test responsive behavior at all breakpoints (desktop 1024px+, tablet 768-1023px, mobile 767px and below)

## CSS File Structure

The project uses a clear separation of CSS files by module type:

### `child.css` - Core Theme Foundation

- CSS variables: colors, typography, spacing, brand system
- Global typography overrides (body, headings, links)
- Container widths and grid system
- HubSpot spacing system integration
- Mobile width fixes
- Utility classes
- **This is the single source of truth for all brand variables**
- Does NOT contain header/footer styles (those are in modules)

### `css/standard-modules.css` - Standard HubSpot Modules

- All built-in HubSpot module overrides in ONE file
- Forms (inputs, labels, buttons, validation)
- Accordion, tabs, cards, pricing tables
- Blog listing, pagination, related posts
- Image gallery, video modules
- Social follow, social sharing
- Any other default HubSpot modules
- Organized with clear comment sections per module
- Uses brand variables from `child.css`

### `css/marketplace-modules.css` - Marketplace Module Overrides

- Third-party marketplace module styling
- Only populated when marketplace modules are installed
- Uses brand variables from `child.css`

### `modules/[module].module/module.html` - Custom Theme Modules

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
- HubSpot automatically includes module.html (including `<style>` tags) when module is used
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

## Brand Variables and Responsive Typography

### Typography Scale (Figma-Aligned)

All font sizes automatically adjust across three breakpoints and match the Figma design system exactly:

**Desktop (1024px+):**
- Display: 64px (4rem)
- H1: 56px (3.5rem)
- H2: 40px (2.5rem)
- H3: 28px (1.75rem)
- H4: 20px (1.25rem)
- Body Large: 18px
- Body: 16px
- Body Small: 14px
- Eyebrow: 14px (0.875rem)
- Navigation: 14px (0.875rem)

**Tablet (768-1023px):**
- Display: 48px (3rem)
- H1: 36px (2.25rem)
- H2: 32px (2rem)
- H3: 28px (1.75rem)
- H4: 16px (1rem)
- Body Large: 16px
- Body: 16px
- Body Small: 14px

**Mobile (767px and below):**
- Display: 48px (3rem)
- H1: 36px (2.25rem)
- H2: 32px (2rem)
- H3: 28px (1.75rem)
- H4: 16px (1rem)
- Body Large: 16px
- Body: 16px
- Body Small: 14px

**Line Heights (Semantic System):**
- Display: 100% (1.0) with -2% letter-spacing
- Headings (H1-H4): 115% (1.15)
- Body text: 135% (1.35)
- Buttons/Navigation: 100% (1.0)

**Font Weights:**
- Regular: 400 (Inter Variable)
- Medium: 500 (used for headings in Barlow)
- Semibold: 650
- Bold: 700

### Using Typography Variables

```css
/* Heading uses responsive font size */
.my-heading {
  font-size: var(--font-size-h2); /* Auto-switches: 40px → 32px → 32px */
  line-height: var(--line-height-heading); /* 1.15 = 115% */
  font-weight: var(--font-weight-medium); /* 500 */
  font-family: var(--font-heading); /* Barlow */
}

/* Body text with semantic line-height */
.my-text {
  font-size: var(--font-size-body); /* 16px */
  line-height: var(--line-height-body); /* 1.35 = 135% */
  font-weight: var(--font-weight-regular); /* 400 */
  font-family: var(--font-body); /* Inter */
}

/* Display text with letter-spacing */
.my-display {
  font-size: var(--font-size-display); /* Auto-switches: 64px → 48px → 48px */
  line-height: var(--line-height-display); /* 1.0 = 100% */
  letter-spacing: var(--letter-spacing-display); /* -0.02em = -2% */
  font-weight: var(--font-weight-medium); /* 500 */
  font-family: var(--font-heading); /* Barlow */
}
```

## Background Color System

All modules with background color options use a **dual-field system** that combines Figma design system presets with custom color flexibility.

### Available Figma Preset Colors

**Brand-Adaptive Background Colors:**
- `$bg-white` - #FFFFFF (white background)
- `$bg-beige` - #EDE9E1 (beige/cream background)
- `$bg-blue` - #E1EBF5 (brand-colored background, adapts per brand)

**Neutral Background Colors:**
- `neutral-900` - #F4F4F4 (light gray)
- `neutral-0` - #161616 (dark/black)

**Custom Option:**
- **Custom Color** - Allows one-off custom colors when needed

### Dual-Field Implementation Pattern

Modules with background color options implement a two-field system:

**1. Preset Selector (fields.json):**
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
  "default": "none",
  "help_text": "Select a Figma design system color or choose Custom for one-off colors"
}
```

**2. Custom Color Picker (fields.json):**
```json
{
  "name": "background_color_custom",
  "label": "Custom Background Color",
  "type": "color",
  "default": {
    "color": "#FFFFFF",
    "opacity": 100
  },
  "visibility": {
    "controlling_field": "background_color_preset",
    "controlling_value_regex": "custom"
  }
}
```

**3. Background Color Logic (module.html):**
```hubl
{# Background Color Logic - Map Figma presets to CSS variables #}
{% set bg_preset = module.background_color_preset %}
{% if bg_preset == "custom" %}
  {% set bg_color = module.background_color_custom.color %}
{% elif bg_preset == "bg-white" %}
  {% set bg_color = "var(--color-bg-white, #FFFFFF)" %}
{% elif bg_preset == "bg-beige" %}
  {% set bg_color = "var(--color-bg-beige, #EDE9E1)" %}
{% elif bg_preset == "bg-blue" %}
  {% set bg_color = "var(--color-bg-blue, #E1EBF5)" %}
{% elif bg_preset == "neutral-900" %}
  {% set bg_color = "var(--color-gray-900, #F4F4F4)" %}
{% elif bg_preset == "neutral-0" %}
  {% set bg_color = "var(--color-gray-0, #161616)" %}
{% else %}
  {% set bg_color = "transparent" %}
{% endif %}

<section class="my-module" style="background-color: {{ bg_color }};">
  <!-- Module content -->
</section>
```

### Why This Approach?

✅ **Benefits:**
- Users see Figma variable names matching the design system
- Brand colors automatically adapt (e.g., `$bg-blue` changes per brand)
- Custom color option maintains flexibility for edge cases
- Centralized color management through CSS variables
- Design system consistency across all modules

### Modules with Background Color System

- ✅ **Section Builder Module** - Full implementation
- ✅ **Content Checklist Block Global Module** - Full implementation

### CSS Variables in child.css

Background color CSS variables are defined in `child.css`:

```css
/* Background Colors */
--color-bg-white: #FFFFFF;
--color-bg-beige: #EDE9E1;
--color-bg-blue: #E1EBF5;  /* Brand-adaptive: Clinical = light blue, Cellcolabs = light green (future) */
```

**Note:** When Cellcolabs (green brand) is implemented, `--color-bg-blue` will be overridden in the brand-specific section to use a light green color for the Cellcolabs brand.

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

Link colors are managed in `child.css` with proper button and utility exclusions:

```css
/* Base link styling (weak, for fallback) */
a {
  color: var(--color-text-link);
  font-weight: var(--font-weight-medium);
}

/* Brand-scoped links with proper specificity - exclude buttons, white links, and black links */
[data-brand="cellcolabsclinical"] a:not(.button):not(.btn):not(.hs-button):not(button):not(.link-white):not(.link-black),
[data-brand="cellcolabs"] a:not(.button):not(.btn):not(.hs-button):not(button):not(.link-white):not(.link-black) {
  color: var(--color-text-link) !important;
  font-weight: var(--font-weight-medium);
}
```

**IMPORTANT:** Global link styling must be in `child.css`, NOT in individual modules. This ensures:
- Centralized link color management
- Proper button and utility exclusions apply site-wide
- No conflicts between module-level and global styling

## Link Color Override System

**✅ FULLY MIGRATED:** All modules have been converted to the **CSS Custom Property Override System**. Legacy utility classes (`.link-white`, `.link-black`, `.link-gray`) have been **removed** from `child.css`.

**Migration Status:**
- ✅ **All modules**: Fully converted to CSS Custom Property Override System
- ✅ **Header modules**: Using override system
- ✅ **Footer modules**: Using override system
- ✅ **Image overlay modules**: Converted to override system
- ✅ **All other modules**: Converted to override system
- 🗑️ **Utility classes**: Removed from codebase (October 2025)

### CSS Custom Property Override System (Current Approach)

**Example - Header Module (Converted):**

```css
/* header-clinical.module */
.header {
  --link-color: var(--color-text-primary);  /* Override to black */
}

/* Links automatically inherit the override - no classes needed in HTML */
.header .nav-menu-link {
  /* Color comes from --link-color custom property */
  font-size: var(--font-size-body, 16px);
  transition: color 0.2s ease;
}
```

**Example - Footer Module (Converted):**

```css
/* footer-clinical.module */
.site-footer {
  --link-color: var(--color-text-inverse);  /* Override to white */
}

/* Links automatically inherit the override - no classes needed in HTML */
.footer-menu-link {
  /* Color comes from --link-color custom property */
  font-size: var(--font-size-body, 16px);
  transition: opacity 0.2s ease;
}
```

**Example - Image Overlay Module (Converted):**

```css
/* image-card-overlay.module */
.image-card-overlay {
  --link-color: var(--color-text-inverse);  /* Override to white */
}

/* Links automatically inherit the override - no classes needed in HTML */
.overlay-link {
  text-decoration: underline;
  font-size: var(--font-size-body, 16px);
  transition: opacity 0.2s ease;
}
```

```html
<!-- HTML - Clean, no utility classes needed -->
<a href="{{ url }}" class="overlay-link">
  Learn more ↗
</a>
```

### Best Practices for Link Color Overrides

✅ **DO:**
- Use CSS Custom Property Override System for all modules
- Set `--link-color` at module container level
- Links automatically inherit without HTML class changes
- Keep module CSS focused on layout and typography
- See "CSS Custom Property Override System" section below for full details

❌ **DON'T:**
- Create utility classes for link colors (system has been removed)
- Try to override link colors in module CSS with high specificity
- Fight specificity wars with `!important` in modules
- Hardcode colors - always use CSS variables

## CSS Custom Property Override System

### Overview

The **CSS Custom Property Override System** is a scalable architecture for handling CSS overrides in modules without specificity conflicts. It uses CSS custom properties (CSS variables) as intermediary override points, allowing modules to customize global styles cleanly and maintainably.

**Status:** ✅ Implemented and Production Ready (October 2025)

### The Problem This Solves

When working with HubSpot themes, modules often need to override global styles set in `child.css`:
- ❌ **Specificity wars** - Using `!important` everywhere creates maintenance nightmares
- ❌ **Utility class bloat** - Creating `.link-white`, `.link-black`, `.link-gray`, etc. is not scalable
- ❌ **Cascade conflicts** - Nested elements inherit colors from wrong sources
- ❌ **Module coupling** - Modules become dependent on specific global rule structures

The CSS Custom Property Override System solves all of these issues with a three-part architecture.

### The Three-Part Architecture

**Part 1: Create Intermediary Override Variables**

In `child.css` `:root`, add intermediary variables that sit between elements and brand colors:

```css
/* child.css - :root variables section */
:root {
  /* Brand colors (source of truth) */
  --color-text-primary: #161616;
  --color-text-link: #4F65BE;
  --color-text-inverse: #ffffff;

  /* Intermediary Override Variables */
  --link-color: var(--color-text-link);        /* Link color override */
  --heading-color: var(--color-text-primary);  /* Heading color override */
  --button-bg: var(--button-primary-bg);       /* Button background override */
  /* Add more as needed... */
}
```

**Part 2: Apply Custom Properties to Elements**

In `child.css` in the "CSS Custom Property Override System" section, apply these variables to global elements:

```css
/* child.css - CSS Custom Property Override System section */

/***********************************************/
/* CSS Custom Property Override System        */
/***********************************************/
/* This section applies intermediary override variables to elements.
   Modules can override these variables without specificity conflicts.
   Organized by element type for easy maintenance. */

/* Links */
a {
  color: var(--link-color);
  font-weight: var(--font-weight-medium);
}

[data-brand="cellcolabsclinical"] a:not(.button):not(.btn):not(.hs-button):not(button),
[data-brand="cellcolabs"] a:not(.button):not(.btn):not(.hs-button):not(button) {
  color: var(--link-color);
  font-weight: var(--font-weight-medium);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: var(--heading-color);
}

/* Buttons */
.custom-button {
  background-color: var(--button-bg);
}

/* Add more as needed... */
```

**Part 3: Modules Override Locally**

In module CSS (within `module.html` `<style>` tags), modules set their own values for the intermediary variables:

```css
/* breadcrumb.module - module.html */
.breadcrumb-navigation {
  --link-color: var(--color-gray-600);  /* Override links to gray */
}

/* image-overlay.module - module.html */
.image-overlay {
  --link-color: var(--color-text-inverse);  /* Override links to white */
  --heading-color: var(--color-text-inverse);  /* Override headings to white */
}

/* special-section.module - module.html */
.special-section {
  --button-bg: var(--color-brand-secondary);  /* Override button to secondary color */
}
```

### Why This Architecture Works

**CSS Inheritance + Cascade = Clean Overrides:**
1. Intermediary variables are set at module container level
2. Variables cascade down through all child elements
3. Child elements use `var(--link-color)` which reads from closest parent
4. No specificity conflicts - just clean inheritance
5. Nested elements automatically inherit the override

**Benefits:**
- ✅ **No specificity wars** - Variables don't have specificity, they just cascade
- ✅ **Works with any CSS property** - Colors, fonts, sizes, spacing, anything
- ✅ **Scales infinitely** - Add new override points as needed
- ✅ **Module independence** - Modules don't need to know global rule structure
- ✅ **Maintains centralized control** - Brand colors still defined in one place
- ✅ **Works with dual brand system** - Overrides work within any brand context
- ✅ **Self-documenting** - Variable names make intent clear

### When to Use This System

**✅ Use CSS Custom Property Override System when:**
- Module needs to override a global style from `child.css`
- The override is for a CSS property that's set globally (links, headings, buttons, etc.)
- You want the override to cascade through nested elements
- Multiple modules need similar overrides (gray links, white text, etc.)
- You want to avoid specificity conflicts

**❌ Don't use this system when:**
- Styling is module-specific and not overriding anything global
- One-off styling that won't be reused
- CSS property is not set globally in `child.css`

### Decision Tree: Adding New Override Types

**Step 1: Does the element have global styling in child.css?**
- **No** → Style directly in module, no override system needed
- **Yes** → Continue to Step 2

**Step 2: Do multiple modules need to override this?**
- **No** → Consider direct styling in module (but override system still works)
- **Yes** → Continue to Step 3

**Step 3: Should nested elements inherit the override?**
- **No** → Use direct CSS rules with high specificity
- **Yes** → Use CSS Custom Property Override System ✅

**Example: Adding Button Color Override**

1. **Add intermediary variable to `:root`:**
```css
/* child.css - :root */
--button-bg: var(--button-primary-bg);
--button-text: var(--button-primary-text);
```

2. **Apply to elements in Override System section:**
```css
/* child.css - CSS Custom Property Override System */
.site-button,
.hs-button {
  background-color: var(--button-bg);
  color: var(--button-text);
}
```

3. **Modules override locally:**
```css
/* hero-section.module */
.hero-section {
  --button-bg: var(--color-brand-secondary);
  --button-text: var(--color-text-inverse);
}
```

### File Locations in child.css

**Location 1: `:root` variables (lines ~110-125)**
```css
:root {
  /* Brand Colors */
  --color-text-primary: #161616;
  --color-text-link: #4F65BE;

  /* Intermediary Override Variables */
  --link-color: var(--color-text-link);
  --heading-color: var(--color-text-primary);
  /* Add new intermediary variables here */
}
```

**Location 2: CSS Custom Property Override System section (lines ~440-475)**
```css
/***********************************************/
/* CSS Custom Property Override System        */
/***********************************************/

/* Links */
a {
  color: var(--link-color);
}

/* Headings */
h1, h2, h3 {
  color: var(--heading-color);
}

/* Add new element applications here */
```

**Keep organized:**
- Group related variables together in `:root`
- Group related element applications in Override System section
- Add comments explaining purpose of each override type
- Document usage in this guide

### Common Use Cases

**Use Case 1: Header Navigation - Black Links** ✅ **IMPLEMENTED**
```css
/* header-clinical.module */
.header {
  --link-color: var(--color-text-primary);  /* Override to black for navigation */
}

/* All navigation links automatically inherit black color */
.header .nav-menu-link {
  /* Color comes from --link-color, no class needed */
}
```

**Use Case 2: Footer Navigation - White Links** ✅ **IMPLEMENTED**
```css
/* footer-clinical.module */
.site-footer {
  --link-color: var(--color-text-inverse);  /* Override to white for dark background */
}

/* All footer links automatically inherit white color */
.footer-menu-link {
  /* Color comes from --link-color, no class needed */
}
```

**Use Case 3: Override Link Colors in Image Overlays**
```css
.image-card-overlay {
  --link-color: var(--color-text-inverse);  /* White links on dark background */
}
```

**Use Case 4: Override Heading Colors for Dark Sections**
```css
.dark-section {
  --heading-color: var(--color-text-inverse);  /* White headings on dark background */
}
```

**Use Case 5: Override Button Styling in Special Sections**
```css
.promo-section {
  --button-bg: var(--color-accent);
  --button-text: var(--color-text-inverse);
}
```

**Use Case 6: Override Multiple Properties at Once**
```css
.inverted-section {
  --link-color: var(--color-text-inverse);
  --heading-color: var(--color-text-inverse);
  --text-color: var(--color-text-inverse);
}
```

### Best Practices

1. **Name intermediary variables clearly** - Use descriptive names like `--link-color`, not `--override-1`
2. **Keep defaults in `:root`** - Default should point to standard brand color
3. **Document in this guide** - Add usage examples when creating new override types
4. **Test cascade** - Ensure nested elements inherit correctly
5. **Group logically** - Keep related variables together in `:root` and Override System section
6. **Don't over-use** - Only create overrides for properties that are actually overridden by modules

### ✅ RESOLVED: Link Color Override System

**Status:** ✅ Fully implemented and production ready
- **Phase 1 (October 2025):** Core system implemented in `child.css`
- **Phase 2 (October 2025):** Header and footer modules converted to use override system

**What Was the Problem:**
The original approach had multiple issues:
1. **Utility class system** (`.link-white`, `.link-black`, `.link-gray`) had specificity conflicts
2. **Nuclear specificity** in header module (repeated `[data-brand]` attributes 8x) was unmaintainable
3. **Typography Override section** applied `color: var(--color-text-primary)` to too many elements:
   - `a` elements (links themselves)
   - `span` elements (text inside links)
   - `div`, `li`, `td`, `th` (other inline/nested elements)

This created cascade conflicts where nested elements inside links would inherit black color instead of the link color.

**The Solution: CSS Custom Property Inheritance System**

Implemented a three-part solution:

**1. Created Intermediary Override Variable** (child.css line ~118)
```css
:root {
  --link-color: var(--color-text-link);  /* Intermediary variable */
}
```

**2. Applied Custom Property to Links** (child.css lines ~450-460)
```css
/* Links */
a {
  color: var(--link-color);
  font-weight: var(--font-weight-medium);
}

[data-brand="cellcolabsclinical"] a:not(.button):not(.btn):not(.hs-button):not(button),
[data-brand="cellcolabs"] a:not(.button):not(.btn):not(.hs-button):not(button) {
  color: var(--link-color);
  font-weight: var(--font-weight-medium);
}
```

**3. Cleaned Up Typography Override** (child.css lines ~367-378)
Removed elements that should inherit naturally from `body`:
```css
/* Before: */
body, p, a, button, input, textarea, select, div, span, li, td, th { ... }

/* After: */
body, p, button, input, textarea, select { ... }
```

**Why This Works:**
- `span`, `div`, `li`, `td`, `th` now inherit color from their parent `<a>` element
- `<a>` elements use `--link-color` custom property
- Modules can override `--link-color` without specificity conflicts
- No need for utility classes like `.link-gray`

**Module Implementation Example:**
```css
/* breadcrumb.module */
.breadcrumb-navigation {
  --link-color: var(--color-gray-600);  /* Override to gray */
}

.breadcrumb-link {
  font-size: 13px;
  /* Color automatically inherited from --link-color */
}
```

**Benefits:**
- ✅ Avoids specificity wars entirely
- ✅ Works with HubSpot's CSS loading order
- ✅ Allows easy theming via variable changes
- ✅ Scales across multiple modules
- ✅ Maintains centralized color management
- ✅ Elements inside links properly inherit link color

**Phase 2: Header and Footer Module Conversion**

**Header Module Refactor (header-clinical.module):**
The header module required a complete refactor to enable CSS Custom Property Override System:

1. **Replaced HubSpot `{% menu %}` tag with manual loops:**
   - `{% menu %}` auto-generates HTML, preventing custom class control
   - Converted to `{% set main_menu = menu("main_navigation_clinical") %}`
   - Manual loops with conditional logic for submenus and chevron icons
   - Filter to show only top-level items: `{% if item.label and item.level == 1 %}`

2. **Removed nuclear specificity selectors:**
   ```css
   /* Before: */
   [data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"][data-brand="cellcolabsclinical"] .nav-menu-link {
     color: #161616 !important;
   }

   /* After: */
   .header {
     --link-color: var(--color-text-primary);
   }
   ```

3. **Fixed mobile menu toggle with event capture:**
   - Mobile toggle conflicted with `template_child.js`
   - Used `addEventListener(..., true)` for capture phase
   - Added `e.stopImmediatePropagation()` to prevent other handlers

4. **Results:**
   - Reduced code from ~700 to ~565 lines
   - Eliminated 8x repeated attribute selectors
   - Clean, maintainable CSS Custom Property Override
   - All navigation links (desktop, mobile, submenus) inherit correctly

**Footer Module Conversion (footer-clinical.module):**
Simpler conversion since footer already used manual `menu()` loops:

1. **Removed `.link-white` utility classes from HTML:**
   ```html
   <!-- Before: -->
   <a href="{{ item.url }}" class="footer-menu-link link-white">{{ item.label }}</a>

   <!-- After: -->
   <a href="{{ item.url }}" class="footer-menu-link">{{ item.label }}</a>
   ```

2. **Added CSS Custom Property Override:**
   ```css
   .site-footer {
     --link-color: var(--color-text-inverse);  /* White links */
   }
   ```

3. **Results:**
   - No utility classes needed in HTML
   - All footer links inherit white color automatically
   - Consistent with header architecture

**Implementation Date:** October 2025

---

### Button Styling Checklist

When creating or updating buttons:
1. ✅ Use button brand variables (never hardcode colors)
2. ✅ Ensure buttons are excluded from link styling with `:not()` selectors
3. ✅ Test all states (default, hover, active, disabled)
4. ✅ Verify text color is black (#161616), not link blue
5. ✅ Check border-radius is 24px via `var(--button-border-radius)`
6. ✅ Test on all breakpoints

## HubSpot Form Styling

Comprehensive styling system for all HubSpot forms across the site, managed centrally in `css/standard-modules.css`.

**Status:** ✅ Complete - All form elements styled with brand variables and responsive behavior

### Overview

Forms are styled centrally to ensure consistency across all HubSpot forms without per-form customization. The styling system handles:
- Single-column forms
- Multi-column layouts (2 and 3 columns)
- All field types with standardized widths
- Validation states and error messages
- Responsive behavior across breakpoints

### Form Container Styling

```css
form.hs-form,
form.hs-form-private,
.hs-form {
  border-radius: 16px !important;
  padding: var(--space-32, 32px) !important;
}
```

- **Border Radius:** 16px (matches other module sections)
- **Padding:** 32px on desktop, 24px/16px on mobile
- **NO background color** - forms are transparent by default
- Reduces responsively on mobile (12px border-radius)

### Field Width Standardization

Different field types use standardized max-widths based on their content:

**Narrow Fields (300px):**
- Date fields
- Number fields

**Medium Fields (400px):**
- Email fields
- Select dropdowns

**Phone Fields (500px):**
- International phone fields (country selector + phone input)
- Country selector: 200px
- Phone input: ~280px remaining

**Medium-Large Fields (500px):**
- Text fields (single line)

**Full Width:**
- Textareas (multi-line)
- Checkboxes (20px with flex-wrap text)
- Radio buttons (20px with flex-wrap text)

**Multi-Column Override:**
All fields use 100% width of their grid cell when in 2 or 3 column layouts:

```css
fieldset.form-columns-2 .hs-form-field.hs-fieldtype-text,
fieldset.form-columns-3 .hs-form-field.hs-fieldtype-text {
  max-width: none !important;
  width: 100% !important;
}
```

### Field Type Implementation

Field widths are applied using field type classes:

```css
/* Narrow fields - date, number */
.hs-form-field.hs-fieldtype-date,
.hs-form-field.hs-fieldtype-number {
  max-width: 300px !important;
}

/* Medium fields - phone, email, select */
.hs-form-field.hs-fieldtype-phonenumber,
.hs-form-field.hs-fieldtype-email,
.hs-form-field.hs-fieldtype-select {
  max-width: 400px !important;
}

/* Phone field special case */
.hs-form-field.hs-fieldtype-phonenumber {
  max-width: 500px !important;
}
```

**IMPORTANT:** Use same-element class chaining, not descendant selectors:
- ✅ Correct: `.hs-form-field.hs-fieldtype-text`
- ❌ Wrong: `.hs-fieldtype-text .hs-form-field`

### Checkbox and Radio Button Styling

Checkboxes and radios require special handling to prevent layout issues:

**Width Exclusion:**
```css
/* Exclude checkboxes/radios from general input width rule */
.hs-form .hs-input:not([type='checkbox']):not([type='radio']) {
  width: 100% !important;
}
```

**Text Wrapping:**
```css
.hs-form-checkbox-display span,
.hs-form-radio-display span {
  flex: 1 !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  hyphens: auto !important;
}
```

**Why This Matters:**
- Checkboxes have `.hs-input` class, which matched general input width rules
- This made checkboxes 384px wide instead of 20px
- Text had no room and overflowed columns
- Excluding them with `:not()` selectors fixes this

### International Phone Field Layout

Special flexbox layout for country selector + phone input:

```css
.hs-fieldtype-intl-phone .hs-form-field > div {
  display: flex !important;
  gap: var(--space-8, 8px) !important;
}

.hs-fieldtype-intl-phone select {
  flex: 0 0 200px !important;
  width: 200px !important;
  padding-right: 44px !important;
  background-position: right 12px center !important;
}

.hs-fieldtype-intl-phone input[type='tel'] {
  flex: 1 !important;
  min-width: 0 !important;
}
```

- Container: 500px total width
- Country selector: Fixed 200px with proper arrow padding
- Phone input: Flexible remaining space (~280px)
- 8px gap between elements

### Multi-Column Form Support

HubSpot generates grid layouts for multi-column forms. Our overrides ensure proper behavior:

**Issue:** HubSpot generates form-specific CSS with high specificity:
```css
.hs-form-{formId} fieldset.form-columns-3 .hs-form-field {
  width: 32.7%;
}
```

**Solution:** Override with `!important` for all field types:
```css
fieldset.form-columns-2 .hs-form-field.hs-fieldtype-text,
fieldset.form-columns-2 .hs-form-field.hs-fieldtype-email,
/* ... all field types ... */
fieldset.form-columns-3 .hs-form-field.hs-fieldtype-text,
fieldset.form-columns-3 .hs-form-field.hs-fieldtype-email {
  max-width: none !important;
  width: 100% !important;
  min-width: 0 !important;
}
```

### Input Styling

All form inputs use consistent styling:

```css
form input[type='text'],
form input[type='email'],
/* ... all input types ... */
form textarea {
  font-family: var(--font-body, 'Inter', sans-serif) !important;
  font-size: var(--font-size-body, 16px) !important;
  font-weight: var(--font-weight-regular, 400) !important;
  line-height: var(--line-height-body, 1.35) !important;
  color: var(--color-text-primary) !important;
  background-color: #ffffff !important;
  border: 1px solid var(--color-gray-300, #d1d1d1) !important;
  border-radius: var(--border-radius-sm, 4px) !important;
  padding: var(--space-12, 12px) var(--space-16, 16px) !important;
  width: 100% !important;
  box-sizing: border-box !important;
}
```

**Key Points:**
- Uses brand variables for all styling
- 16px font size prevents iOS zoom on focus
- Proper padding for touch targets
- Box-sizing prevents overflow issues

### Label Styling

```css
.hs-form label,
.hs-form-field > label {
  font-family: var(--font-body) !important;
  font-size: var(--font-size-body-small, 14px) !important;
  font-weight: var(--font-weight-medium, 500) !important;
  line-height: var(--line-height-normal, 1.5) !important;
  color: var(--color-text-primary) !important;
  margin-bottom: var(--space-8, 8px) !important;
}
```

### Submit Button Styling

Submit buttons use the same button brand variables as all site buttons:

```css
.hs-form input[type='submit'],
.hs-form button[type='submit'] {
  background-color: var(--button-primary-bg) !important;
  color: var(--button-primary-text) !important;
  border: 0.5px solid var(--button-primary-border) !important;
  border-radius: var(--button-border-radius, 24px) !important;
  /* ... */
}

.hs-form input[type='submit']:hover {
  background-color: var(--button-primary-bg-hover) !important;
}
```

### Error and Validation Styling

```css
.hs-error-msgs {
  color: var(--color-error, #e41e1e) !important;
  font-size: var(--font-size-body-small, 14px) !important;
  margin-top: var(--space-4, 4px) !important;
}

.hs-form-field.error input,
.hs-form-field.error textarea,
.hs-form-field.error select {
  border-color: var(--color-error, #e41e1e) !important;
}
```

### Responsive Behavior

**Desktop (1024px+):**
- Full padding (32px)
- Type-based field widths apply
- Multi-column layouts supported

**Tablet (768-1023px):**
- Same as desktop
- Field widths scale within grid cells

**Mobile (767px and below):**
- Reduced padding (24px/16px)
- Reduced border-radius (12px)
- All fields stack to single column
- Touch-friendly sizing maintained

### Best Practices

1. **Never style individual forms** - All styling is centralized
2. **Use field type classes** - Widths are controlled by field type
3. **Test multi-column layouts** - Ensure overrides apply correctly
4. **Check checkbox/radio wrapping** - Text should wrap within columns
5. **Verify phone field layout** - Country selector and input should fit properly
6. **Use brand variables** - All colors, fonts, spacing from CSS variables
7. **Test validation states** - Error messages and field highlights should work

### Common Issues and Fixes

**Issue: Field widths not applying**
- Check selector specificity (use same-element class chaining)
- Ensure `!important` flag is present
- Verify field type class matches HubSpot's generated class

**Issue: Checkboxes overflowing columns**
- Confirm checkboxes excluded from general input width rule
- Check text wrapping styles applied to label span
- Verify flex layout on checkbox container

**Issue: Multi-column fields too narrow**
- Confirm multi-column overrides present for all field types
- Check `width: 100% !important` applied
- Verify `max-width: none !important` removes type-based constraint

**Issue: Phone field crowded**
- Check container is 500px (not 400px)
- Verify country selector is 200px with proper padding
- Ensure 8px gap between elements

---

**Last Updated**: October 15, 2025
**Status**: ✅ Complete and Production Ready
