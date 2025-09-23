# HubSpot Standard Modules Implementation Guide
*9 Modules That Need Styling - Priority & Quick Implementation*

## Summary

**Total Modules to Style: 9**
**CSS Variables Coverage: ✅ 100% (added missing variables)**
**Implementation Priority: High → Medium → Low**

## Implementation Plan

### 🔴 **HIGH PRIORITY (Implement First)**

#### 1. Button Module
```css
.hs-button {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-medium);
  padding: var(--space-8) var(--space-24);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  text-decoration: none;
  transition: var(--transition-default);
  cursor: pointer;
}

.hs-button-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.hs-button-secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
  border-color: var(--color-secondary);
}
```

#### 2. Form Module
```css
.hs-form {
  max-width: 600px;
}

.hs-input,
.hs-textarea {
  width: 100%;
  padding: var(--space-8) var(--space-16);
  font-family: var(--font-body);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  transition: var(--transition-default);
}

.hs-input:focus {
  border-color: var(--color-primary);
  box-shadow: var(--input-focus-shadow);
}

.hs-error-msgs {
  color: var(--color-error);
  font-size: var(--font-size-body-small);
}
```

#### 3. Rich Text Module
```css
.hs-rich-text h1 { font-size: var(--font-size-h1); }
.hs-rich-text h2 { font-size: var(--font-size-h2); }
.hs-rich-text h3 { font-size: var(--font-size-h3); }

.hs-rich-text p {
  font-family: var(--font-body);
  margin-bottom: var(--space-16);
}

.hs-rich-text a {
  color: var(--color-text-link);
  transition: var(--transition-default);
}
```

#### 4. CTA Module
```css
.hs-cta-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-12) var(--space-32);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-default);
  box-shadow: var(--shadow-sm);
}
```

### 🟡 **MEDIUM PRIORITY (Implement Second)**

#### 5. Image Module
```css
.hs-image {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}
```

#### 6. Header Module
```css
.hs-header h1,
.hs-header h2,
.hs-header h3 {
  font-family: var(--font-heading);
  color: var(--color-text-primary);
}
```

#### 7. Image Gallery Module
```css
.hs-gallery {
  display: grid;
  gap: var(--gallery-gap);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.hs-gallery img {
  width: 100%;
  aspect-ratio: var(--image-aspect-ratio);
  object-fit: cover;
  border-radius: var(--radius-md);
}
```

### 🟢 **LOW PRIORITY (Implement Last)**

#### 8. Divider Module
```css
.hs-divider {
  width: 100%;
  height: var(--divider-width);
  background-color: var(--color-border-light);
  opacity: var(--divider-opacity);
  margin: var(--space-32) 0;
}
```

#### 9. Spacer Module
```css
.hs-spacer {
  display: block;
  width: 100%;
  height: var(--space-32); /* Default spacing */
}
```

## Quick Implementation Steps

### Step 1: Add Missing Variables ✅
*Already completed - added to shared-variables.css*

### Step 2: Add Module Styles to main.css
Add this section to your `main.css`:

```css
/* ===================================
   HubSpot Standard Module Styles
   =================================== */

/* HIGH PRIORITY MODULES */
/* Button Module */
.hs-button { /* ... copy from above ... */ }

/* Form Module */
.hs-form { /* ... copy from above ... */ }

/* Rich Text Module */
.hs-rich-text { /* ... copy from above ... */ }

/* CTA Module */
.hs-cta-button { /* ... copy from above ... */ }

/* MEDIUM PRIORITY MODULES */
/* Image Module */
.hs-image { /* ... copy from above ... */ }

/* Header Module */
.hs-header { /* ... copy from above ... */ }

/* Image Gallery */
.hs-gallery { /* ... copy from above ... */ }

/* LOW PRIORITY MODULES */
/* Divider Module */
.hs-divider { /* ... copy from above ... */ }

/* Spacer Module */
.hs-spacer { /* ... copy from above ... */ }
```

### Step 3: Upload and Test
```bash
hs upload hubspot-theme
```

### Step 4: Test Each Module
- Create test page in HubSpot
- Add each module type
- Verify styling matches your brand
- Test responsive behavior

## Variable Coverage ✅

You now have **100% variable coverage** for all 9 modules:

| Variable Category | Status | Count |
|------------------|--------|-------|
| Typography | ✅ Complete | 25+ |
| Colors | ✅ Complete | 20+ |
| Spacing | ✅ Complete | 10+ |
| Shadows | ✅ Complete | 3 |
| Borders/Radius | ✅ Complete | 4 |
| Transitions | ✅ Complete | 2 |
| Module-Specific | ✅ Complete | 5 |

## Estimated Implementation Time

- **High Priority (4 modules):** ~2-3 hours
- **Medium Priority (3 modules):** ~1-2 hours
- **Low Priority (2 modules):** ~30 minutes

**Total:** ~4-6 hours for complete module styling

## Testing Checklist

- [ ] Button variants (primary, secondary, outline)
- [ ] Form inputs, textareas, validation states
- [ ] Rich text formatting (headers, links, lists)
- [ ] CTA button styling and hover states
- [ ] Image responsiveness and borders
- [ ] Header typography hierarchy
- [ ] Gallery grid layout and responsiveness
- [ ] Divider appearance and spacing
- [ ] Spacer height variations
- [ ] Mobile responsive behavior for all modules
- [ ] Brand switching (if applicable)

---

*With your current CSS variable setup, you have everything needed to style all 9 HubSpot standard modules consistently across your multi-brand theme.*