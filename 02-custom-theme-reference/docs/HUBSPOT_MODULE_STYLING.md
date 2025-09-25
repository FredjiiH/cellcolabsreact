# HubSpot Module Styling Documentation

## Overview
This document explains how typography and styling works for HubSpot standard modules (Rich Text and Header modules) in our multi-brand theme system.

## Font Loading System

### Google Fonts Integration
Fonts are loaded in `hubspot-theme/templates/base.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
```

### Font Variables
Font families are defined in `hubspot-theme/css/shared-variables.css`:
```css
--font-heading: 'Bricolage Grotesque', sans-serif;
--font-body: 'Inter Variable', 'Inter', sans-serif;
```

## HubSpot Module HTML Structure

### Rich Text Module
HubSpot generates HTML with these wrapper classes:
```html
<div class="hs_cos_wrapper hs_cos_wrapper_type_rich_text">
  <h1>Heading Text</h1>
  <p>Body text content</p>
  <a href="#">Link text</a>
</div>
```

### Header Module
HubSpot generates HTML with these wrapper classes:
```html
<div class="hs_cos_wrapper hs_cos_wrapper_type_header">
  <h1>Header Content</h1>
</div>
```

## CSS Targeting Strategy

### Multi-Class Targeting
Our CSS in `hubspot-theme/css/main.css` targets multiple classes to ensure styling applies across all contexts:

```css
/* Headings - targets rich text, header modules, and general content */
.hs-rich-text h1,
.hs_cos_wrapper_type_rich_text h1,
.hs_cos_wrapper_type_header h1,
h1 {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-h1);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
}

/* Body text - targets rich text modules and general content */
.hs-rich-text p,
.hs_cos_wrapper_type_rich_text p,
p {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
  color: var(--color-text-primary);
}

/* Links - targets rich text modules and general content */
.hs-rich-text a,
.hs_cos_wrapper_type_rich_text a,
a {
  color: var(--color-text-link);
  text-decoration: none;
  transition: color 0.2s ease;
}
```

## Typography Specifications

### Current Font Setup
- **Heading Font**: Bricolage Grotesque (weights: 200-800)
- **Body Font**: Inter Variable (weights: 100-900)

### Font Weights
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Font Sizes (Desktop)
```css
--font-size-h1-desktop: 3.5rem;
--font-size-h2-desktop: 3rem;
--font-size-h3-desktop: 2.25rem;
--font-size-h4-desktop: 1rem;
--font-size-body-medium-desktop: 1rem;
```

## Multi-Brand Theme System

### Brand Detection
Brands are detected and applied via JavaScript in `base.html`:
```javascript
// Detect brand based on domain
var hostname = window.location.hostname;
var brand = 'cellcolabs'; // Default brand

if (hostname.includes('cellcolabsclinical')) {
  brand = 'cellcolabsclinical';
}

// Apply brand as data attribute and class
document.documentElement.setAttribute('data-brand', brand);
document.documentElement.className += ' brand-' + brand;
```

### Brand-Specific Variables
Each brand has its own CSS file with brand-specific color variables:
- `cellcolabs-theme-variables.css`
- `cellcolabsclinical-theme-variables.css`

## HubSpot Design Manager Integration

### Settings Configuration
Typography settings are defined in `hubspot-theme/settings.json`:
```json
"typography": {
  "font_heading": {
    "value": "'Bricolage Grotesque', sans-serif",
    "label": "Heading Font"
  },
  "font_body": {
    "value": "'Inter', sans-serif",
    "label": "Body Font"
  }
}
```

### Typography Selector Availability
For fonts to appear in HubSpot's typography selector:
1. Fonts must be loaded via Google Fonts link
2. Font families must be defined in settings.json
3. CSS variables must reference the correct font names
4. Standard font weights must be used (400, 500, 600, 700)

## Troubleshooting

### Common Issues
1. **Fonts not loading**: Check Google Fonts link in base.html
2. **Styling not applying**: Verify CSS targets correct wrapper classes
3. **Wrong font weights**: Ensure standard font weights (avoid custom weights like 650)
4. **Fonts not in typography selector**: Check settings.json configuration

### CSS Validation
The theme includes CSS loading validation:
```javascript
// Check if main CSS loaded properly
const computedStyle = window.getComputedStyle(testElement);
const cssLoaded = computedStyle.fontFamily && computedStyle.fontFamily.includes('Inter');
```

## File Structure
```
hubspot-theme/
├── templates/
│   └── base.html (font loading, brand detection)
├── css/
│   ├── shared-variables.css (typography variables)
│   ├── main.css (module targeting styles)
│   ├── cellcolabs-theme-variables.css
│   └── cellcolabsclinical-theme-variables.css
└── settings.json (HubSpot design manager config)
```

## Recent Fixes Applied
1. Added missing Google Fonts loading link in base.html
2. Extended CSS selectors to target HubSpot wrapper classes
3. Fixed font weights from custom (650) to standard (600) values
4. Corrected heading font definition in settings.json from "Barlow" to "Bricolage Grotesque"