# CSS Loading Troubleshooting Guide
*How We Solved CSS Loading Issues in HubSpot*

## Problem Summary

During the implementation of the Cellcolabs multi-brand HubSpot theme, we encountered several CSS loading issues that prevented proper styling and sticky navigation functionality.

## Issues Encountered & Solutions

### Issue 1: CSS @import Statements Causing 404 Errors

**Problem:**
```css
/* main.css */
@import url('./theme-variables.css'); /* 404 Not Found */
```

**Error in Browser:**
```
Request URL: https://144549987.hs-sites-eu1.com/hubfs/hub_generated/template_assets/1/278756836562/1758618072536/theme-variables.css
Status Code: 404 Not Found
```

**Root Cause:**
- HubSpot's CDN processes CSS files independently
- Relative paths in @import statements don't resolve correctly in HubSpot's CDN structure
- CSS files are served with generated URLs that break @import dependencies

**Solution:**
Replace CSS @import with HTML link tags using HubSpot's `get_asset_url()` function:

```html
<!-- base.html - CORRECT approach -->
<link rel="stylesheet" href="{{ get_asset_url('../css/theme-variables.css') }}" media="all">
<link rel="stylesheet" href="{{ get_asset_url('../css/main.css') }}" media="all">
```

### Issue 2: Duplicate Google Fonts Loading

**Problem:**
```html
<!-- base.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* main.css */
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,650;12..96,700&family=Inter:wght@400..700&display=swap');
```

**Result:** Two separate font requests with different font combinations.

**Solution:**
Remove duplicate fonts and keep only one loading method:

```html
<!-- base.html - Keep preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

```css
/* main.css - Single font loading -->
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,650;12..96,700&family=Inter:wght@400..700&display=swap');
```

### Issue 3: Sticky Navigation Not Working

**Problem:**
CSS was loading but sticky positioning wasn't working.

**Investigation Steps:**
1. **Checked CSS presence:** `position: sticky` was in main.css
2. **Checked HTML structure:** `<header class="site-header">` was correct
3. **Checked DevTools:** No `.site-header` styles were being applied

**Root Causes Found:**

#### A. Conflicting Inline CSS
**Problem:**
```html
<!-- base.html had conflicting inline styles -->
<style>
  .site-header {
    position: sticky;
    background-color: #ffffff; /* Hardcoded */
  }
</style>
```

**Solution:** Remove inline CSS and rely on external CSS files only.

#### B. CSS Variable Loading Order
**Problem:**
```css
/* main.css */
.site-header {
  background-color: var(--color-bg-primary); /* Variable not available */
}
```

**Debugging:**
CSS variables weren't loading because the variable files loaded after main.css.

**Solution:**
Correct loading order in base.html:
```html
<link rel="stylesheet" href="{{ get_asset_url('../css/shared-variables.css') }}" media="all">
<link rel="stylesheet" href="{{ get_asset_url('../css/cellcolabsclinical-theme-variables.css') }}" media="all">
<link rel="stylesheet" href="{{ get_asset_url('../css/main.css') }}" media="all">
```

#### C. Missing Utility Classes
**Problem:**
When splitting theme-variables.css, utility classes like `.container`, typography styles, and button styles were lost.

**Solution:**
Move utility classes to shared-variables.css:
```css
/* shared-variables.css */
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}

/* Typography base styles */
h1, h2, h3 {
  font-family: var(--font-heading);
  /* ... */
}
```

### Issue 4: Header Hiding During Scroll (90% Hidden)

**Problem:**
Navigation would stick but become 90% hidden when scrolling down.

**Debugging:**
- Inspected element during scroll
- Found potential transform/margin interference
- DevTools showed different behavior than normal browsing

**Solution:**
Add protective CSS to prevent interference:
```css
.site-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 99999998;
  background-color: var(--color-bg-primary);
  width: 100%;
  transform: none !important; /* Prevent transforms */
  margin-top: 0 !important; /* Prevent margin changes */
}
```

**Note:** The hiding only occurred in DevTools inspect mode, which is normal behavior.

## Debugging Process

### 1. Network Tab Analysis
**Check for:**
- 404 errors on CSS files
- Proper file loading order
- File sizes and load times

**Example of successful loading:**
```
✅ shared-variables.min.css - 200 OK
✅ cellcolabsclinical-theme-variables.min.css - 200 OK
✅ main.min.css - 200 OK
✅ Google Fonts - 200 OK
```

### 2. CSS Variable Inspection
**DevTools → Elements → Computed:**
- Check if CSS variables resolve to actual values
- Look for `var(--color-bg-primary)` showing as `#ffffff`

### 3. CSS Rule Application
**DevTools → Elements → Styles:**
- Check if `.site-header` rules are applied
- Look for crossed-out rules (overridden)
- Verify sticky positioning is computed

### 4. Console Validation
Added CSS loading validation script:
```javascript
// CSS Loading Validation
document.addEventListener('DOMContentLoaded', function() {
  const testElement = document.createElement('div');
  testElement.className = 'css-test';
  testElement.style.display = 'none';
  document.body.appendChild(testElement);

  const computedStyle = window.getComputedStyle(testElement);
  const cssLoaded = computedStyle.fontFamily && computedStyle.fontFamily.includes('Inter');

  if (!cssLoaded) {
    console.warn('Main CSS failed to load, applying fallback styles');
  } else {
    console.log('✅ Main CSS loaded successfully');
  }

  document.body.removeChild(testElement);
});
```

## HubSpot-Specific Best Practices

### 1. CSS Loading Methods

#### ✅ Recommended:
```html
<link rel="stylesheet" href="{{ get_asset_url('../css/file.css') }}" media="all">
```

#### ❌ Avoid:
```css
@import url('./file.css'); /* Causes 404s */
```

### 2. Asset URL Patterns
**HubSpot generates URLs like:**
```
https://[portalId].hs-sites-eu1.com/hubfs/hub_generated/template_assets/1/[templateId]/[timestamp]/template_[filename].min.css
```

**Key Points:**
- Files are automatically minified
- Timestamps change on upload
- Relative paths in @import don't work with this structure

### 3. Caching Considerations
- **Browser cache:** Use Ctrl+Shift+F5 for hard refresh
- **CDN cache:** Can take time to propagate changes
- **Development:** Upload entire theme to ensure fresh files

### 4. CSS Variable Dependencies
**Loading order matters:**
1. Variables must be defined before they're used
2. Brand variables should override shared variables
3. Component styles should load last

## Quick Troubleshooting Checklist

When CSS isn't loading properly:

- [ ] Check Network tab for 404 errors
- [ ] Verify loading order (shared → brand → main)
- [ ] Remove any @import statements
- [ ] Use `get_asset_url()` for all CSS references
- [ ] Hard refresh browser (Ctrl+Shift+F5)
- [ ] Re-upload entire theme with `hs upload hubspot-theme`
- [ ] Check CSS variables are resolving in DevTools
- [ ] Verify no conflicting inline CSS exists
- [ ] Test in normal browsing mode (not DevTools)

## Prevention Guidelines

### For Future Development:
1. **Always use HubSpot's native CSS loading methods**
2. **Test CSS loading immediately after file changes**
3. **Maintain proper file structure and loading order**
4. **Use CSS validation scripts in development**
5. **Document dependencies between CSS files**

---

*This guide documents the specific issues encountered and solutions implemented during the Cellcolabs HubSpot theme development in September 2025.*