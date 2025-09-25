# CSS Architecture Documentation
*Cellcolabs Multi-Brand HubSpot Theme*

## Overview

This document outlines the CSS architecture for the Cellcolabs multi-brand HubSpot theme and the solution for proper CSS loading in HubSpot's CDN environment.

## CSS File Structure

### 1. **shared-variables.css** - Foundation Layer
**Purpose:** Variables and utilities shared across all brands

**Contains:**
- Grayscale palette (consistent across brands)
- Typography scales (font sizes, weights, line heights)
- Spacing system (margins, padding, containers)
- Breakpoints (mobile, tablet, desktop)
- Border radius and shadows
- Utility classes (.container, .text-primary, etc.)
- Typography base styles (h1, h2, body, etc.)
- Button base styles
- Responsive typography rules

**Location:** `hubspot-theme/css/shared-variables.css`

### 2. **Brand-Specific Variables** - Theme Layer
**Purpose:** Brand-specific color schemes and visual identity

**Current Files:**
- `cellcolabsclinical-theme-variables.css` - Cellcolabs Clinical brand colors

**Contains:**
- Primary, secondary, and accent colors
- Text colors (primary, secondary, tertiary, disabled, inverse, link)
- Background colors (primary, secondary, section, dark, white, beige, blue)
- Border colors (light, medium)
- Functional colors (error, warning)
- Brand-specific color palette (brand-100 through brand-900)

**Location:** `hubspot-theme/css/cellcolabsclinical-theme-variables.css`

**Future Expansion:**
```
hubspot-theme/css/
├── shared-variables.css
├── cellcolabs-theme-variables.css          (future)
├── cellcolabsclinical-theme-variables.css  (current)
└── main.css
```

### 3. **main.css** - Component Layer
**Purpose:** All component styles and layout

**Contains:**
- Reset and base styles
- Layout components (.page-wrapper, .main-content)
- Grid system
- Form elements
- Tables
- Cards
- Display utilities
- Navigation system (including sticky header)
- Responsive styles
- Print styles

**Location:** `hubspot-theme/css/main.css`

## Loading Order

The CSS files are loaded in a specific order in `base.html`:

```html
<!-- Theme CSS -->
<link rel="stylesheet" href="{{ get_asset_url('../css/shared-variables.css') }}" media="all">
<link rel="stylesheet" href="{{ get_asset_url('../css/cellcolabsclinical-theme-variables.css') }}" media="all">
<link rel="stylesheet" href="{{ get_asset_url('../css/main.css') }}" media="all">
```

**Why This Order Matters:**
1. **Shared variables first** - Establishes foundation variables
2. **Brand variables second** - Overrides/extends with brand-specific colors
3. **Main styles last** - Uses all the variables defined above

## CSS Loading Solution

### The Problem
Initially encountered 404 errors when trying to use CSS `@import` statements in HubSpot's CDN environment:

```css
/* This caused 404 errors in HubSpot */
@import url('./theme-variables.css');
```

### The Solution
**Use HubSpot's native CSS loading methods instead of @import:**

#### ❌ Wrong Approach:
```css
/* main.css */
@import url('./theme-variables.css'); /* 404 error */
```

#### ✅ Correct Approach:
```html
<!-- base.html -->
<link rel="stylesheet" href="{{ get_asset_url('../css/theme-variables.css') }}" media="all">
<link rel="stylesheet" href="{{ get_asset_url('../css/main.css') }}" media="all">
```

### Why HubSpot @import Fails
1. **CDN URL Structure** - HubSpot serves CSS from CDN with complex URLs that don't resolve relative @import paths
2. **Processing Pipeline** - HubSpot processes CSS files independently, breaking @import dependencies
3. **Caching** - CDN caching can serve stale @import references

### Best Practices for HubSpot CSS

1. **Use `get_asset_url()` for all CSS loading**
2. **Load CSS files separately in HTML** rather than using @import
3. **Order matters** - Load foundation files before dependent files
4. **Use relative paths from template location** (`../css/file.css`)
5. **Avoid hardcoded CDN URLs** - They can change

## Multi-Brand Implementation

### Current Structure
```
Cellcolabs Clinical Theme:
├── shared-variables.css           (foundation)
├── cellcolabsclinical-theme-variables.css  (brand colors)
└── main.css                      (components)
```

### Adding New Brands
To add a new brand (e.g., regular Cellcolabs):

1. **Create brand CSS file:**
   ```
   hubspot-theme/css/cellcolabs-theme-variables.css
   ```

2. **Define brand-specific colors:**
   ```css
   :root,
   [data-brand="cellcolabs"],
   .brand-cellcolabs {
     --color-primary: #0066CC;
     --color-secondary: #00A86B;
     /* ... other brand colors ... */
   }
   ```

3. **Update base.html conditionally:**
   ```html
   <!-- Load appropriate brand CSS -->
   {% if theme.brand_settings.active_brand == 'cellcolabs' %}
     <link rel="stylesheet" href="{{ get_asset_url('../css/cellcolabs-theme-variables.css') }}" media="all">
   {% else %}
     <link rel="stylesheet" href="{{ get_asset_url('../css/cellcolabsclinical-theme-variables.css') }}" media="all">
   {% endif %}
   ```

## Troubleshooting

### Common Issues

1. **404 Errors for CSS Files**
   - **Cause:** Using @import instead of proper HubSpot loading
   - **Solution:** Use `get_asset_url()` in HTML templates

2. **CSS Variables Not Working**
   - **Cause:** Wrong loading order or missing variable definitions
   - **Solution:** Check loading order and ensure variables are defined in brand files

3. **Sticky Navigation Not Working**
   - **Cause:** CSS conflicts or missing variables
   - **Solution:** Ensure variables load before main.css and check for conflicting inline CSS

4. **Cache Issues**
   - **Cause:** Browser or HubSpot CDN caching old CSS
   - **Solution:** Hard refresh (Ctrl+Shift+F5) and re-upload theme

### Debugging Steps

1. **Check Network Tab** - Verify all CSS files load with 200 status
2. **Inspect CSS Variables** - Check computed styles for variable values
3. **Check Loading Order** - Ensure shared → brand → main order
4. **Upload Fresh** - Use `hs upload hubspot-theme` to refresh all files

## Performance Considerations

- **Minification:** HubSpot automatically minifies CSS files
- **CDN Delivery:** Files served from HubSpot's global CDN
- **Caching:** Aggressive caching means changes may take time to propagate
- **File Size:** Modular approach allows for better caching strategies

## Maintenance

### When Adding New Variables
1. **Shared variables** → Add to `shared-variables.css`
2. **Brand-specific variables** → Add to appropriate brand file
3. **Component styles** → Add to `main.css`

### When Updating Styles
1. **Always test locally first**
2. **Upload entire theme** with `hs upload hubspot-theme`
3. **Test across different brands**
4. **Verify responsive behavior**

---

*Last updated: September 2025*
*Architecture implemented for Cellcolabs HubSpot multi-brand theme*