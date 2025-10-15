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

## Link Color Override Utilities

For cases where links need to be a different color than the brand color, use centralized utility classes instead of module-specific overrides:

### `.link-white` - White links on dark backgrounds

```css
/* In child.css */
.link-white,
.link-white:link,
.link-white:visited,
.link-white:active,
.link-white:hover,
.link-white:focus {
  color: var(--color-text-inverse, #ffffff) !important;
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}
```

**Usage:**
- Image overlay modules (image-card-overlay-3col, image-card-overlay-4col, grid2x2-card-image)
- Links on dark background sections
- Footer links (if footer has dark background)

### `.link-black` - Black links instead of brand color

```css
/* In child.css */
.link-black,
.link-black:link,
.link-black:visited,
.link-black:active,
.link-black:hover,
.link-black:focus {
  color: var(--color-text-primary, #161616) !important;
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}
```

**Usage:**
- Locations carousel "Get directions" links
- Any link that should be black for design purposes
- Secondary navigation or subtle links

### How the Exclusion System Works

1. **Global rule applies brand color** to all links by default
2. **Exclusions prevent override** for buttons and utility classes
3. **Utility classes win** because they're excluded from global rule
4. **Modules stay clean** - no color overrides needed in module CSS

**Example - Image Overlay Module:**

```html
<!-- HTML - Just add the utility class -->
<a href="{{ url }}" class="overlay-link link-white">
  Learn more ↗
</a>
```

```css
/* Module CSS - Only layout/typography, no color overrides needed */
.overlay-link {
  text-decoration: underline;
  font-size: var(--font-size-body, 16px);
  transition: opacity 0.2s ease;
}

.overlay-link:hover {
  opacity: 0.8;
}
```

### Best Practices for Link Color Overrides

✅ **DO:**
- Use `.link-white` for white links on dark backgrounds
- Use `.link-black` for black links instead of brand color
- Add these utilities to the HTML class attribute
- Keep module CSS focused on layout and typography

❌ **DON'T:**
- Try to override link colors in module CSS with high specificity
- Create new utility classes for other link colors (extend the system if needed)
- Hardcode colors - utilities use brand variables
- Fight specificity wars with `!important` in modules

### Adding New Link Color Utilities

If you need a new link color utility:

1. **Add the utility to `child.css`:**
```css
.link-secondary {
  color: var(--color-text-secondary, #525252) !important;
  /* ... */
}
```

2. **Add exclusion to global rule:**
```css
a:not(.button):not(.btn):not(.link-white):not(.link-black):not(.link-secondary)
```

3. **Document it** in this section with usage examples

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
  font-weight: var(--font-weight-regular, 450) !important;
  line-height: var(--line-height-normal, 1.5) !important;
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
