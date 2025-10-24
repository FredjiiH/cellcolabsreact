# Width System & Vertical Alignment Guide

## Overview

This guide documents the width system implementation that ensures perfect vertical alignment across all HubSpot modules, regardless of type or origin.

## The Challenge

HubSpot's Growth theme and various module types apply inconsistent width constraints:
- Some sections expand to viewport width
- Custom modules used different container widths (1440px)
- UI-built modules used different content widths (1400px)
- Different viewing modes (inspect, preview, normal) showed different widths

## The Solution: Nuclear Width Override

We implemented a "nuclear" CSS override approach that forces ALL sections to respect our design system's 1136px maximum content width, matching the Figma design specifications exactly.

### Why "Nuclear"?

The term "nuclear" refers to the aggressive, all-encompassing nature of our CSS rules:
- Maximum specificity (`body .body-wrapper` prefix)
- Broad selector matching (`[class*="row-fluid"]`)
- Liberal use of `!important` declarations
- Overrides ALL HubSpot default settings

### Is This Bad Practice?

**Short answer**: No, it's a justified design system enforcement.

**Long answer**: While normally using such broad selectors and `!important` would be considered bad practice, in this case it's necessary because:
1. HubSpot's theme has inconsistent width rules we cannot directly modify
2. We need to guarantee alignment across ALL content types
3. The alternative would be manually fixing each module type
4. This approach is maintainable and future-proof

## Implementation Details

### Core CSS Rules

**CSS Variable (child.css line 14):**
```css
--content-max-width: 1136px; /* Figma-aligned visual content width (152px margins on desktop) */
```

**Universal Width Override (child.css lines 558-563):**
```css
/* Only target content-level row-fluid elements, not page containers */
.dnd-section .row-fluid,
.dnd-row .row-fluid {
  max-width: var(--content-max-width) !important; /* 1136px */
  margin: 0 auto !important;
  padding: 0 var(--space-16) !important; /* Mobile: 16px */
}

/* Exception: nested row-fluids in columns should use parent width */
body .body-wrapper [class*="span"] .row-fluid {
  max-width: 100% !important;
  width: 100% !important;
}
```

**Responsive Padding (child.css lines 652-676):**
```css
/* Tablet: 16px padding each side */
@media (min-width: 768px) and (max-width: 1023px) {
  .dnd-section .row-fluid,
  .dnd-row .row-fluid {
    padding: 0 var(--space-16) !important;
  }
}

/* Desktop & Wide: No horizontal padding (margins create spacing) */
@media (min-width: 1024px) {
  .dnd-section .row-fluid,
  .dnd-row .row-fluid {
    padding: 0 !important;
  }
}
```

### Responsive Breakpoints (Updated Oct 2025 - Figma-Aligned)

| Breakpoint | Viewport | Content Width | Left/Right Margins | Padding |
|------------|----------|---------------|-------------------|---------|
| Mobile (≤767px) | 375px | 343px | 16px each | 16px via .dnd-module |
| Tablet (768-1023px) | 768px | 736px | 16px each | 16px each side |
| Desktop (1024-1440px) | 1440px | 1136px | 152px each | 0 (margins only) |
| Wide (≥1441px) | Variable | 1136px | Auto (centered) | 0 (margins only) |

**Key Changes:**
- Desktop content width reduced from 1400px to **1136px** to match Figma
- Desktop margins increased from ~20px to **152px each side**
- Tablet padding reduced from 24px to **16px** to match Figma grid
- Desktop/wide screens use **no horizontal padding** - spacing created by margin: auto

## Module Development Guidelines

### For New Custom Modules

```css
/* ✅ CORRECT - Use relative widths */
.custom-module__container {
  max-width: 100%;
  width: 100%;
  padding: 0 var(--spacing-md);
}

/* ❌ INCORRECT - Don't use fixed widths */
.custom-module__container {
  max-width: 1440px; /* This will be overridden anyway */
  width: 1200px; /* Don't do this */
}
```

### For Special Width Requirements

#### Narrower Sections
Use HubSpot's built-in "center content" setting in the UI, or:
```css
.narrow-section .row-fluid {
  max-width: 1000px !important; /* Your desired width */
}
```

#### Full-Bleed Sections
For edge-to-edge content:
```css
.full-bleed-section .row-fluid {
  max-width: 100vw !important;
  margin: 0 !important;
}
```

## Testing Checklist

When adding new modules or sections:

### 1. Width Verification
```javascript
// Run in browser console to verify all modules align at 1136px
const modules = [
  { name: 'Navigation', selector: '.nav-container' },
  { name: 'Grid 2x2', selector: '.grid2x2-container' },
  { name: 'Section Builder', selector: '.section-builder' },
  { name: 'Footer', selector: '.footer-container' }
];

modules.forEach(({ name, selector }) => {
  const el = document.querySelector(selector);
  if (el) {
    const width = el.offsetWidth;
    console.log(`${name}: ${width}px ${width === 1136 ? '✅' : '❌'}`);
  }
});
```

### 2. Alignment Check
- [ ] Left edges align with other sections
- [ ] Right edges align with other sections
- [ ] Content maintains consistent width
- [ ] Mobile responsiveness works

### 3. Test Across Viewing Modes
- [ ] Normal browser tab
- [ ] DevTools open
- [ ] HubSpot preview mode
- [ ] Different viewport sizes

## Common Issues & Solutions

### Issue: Section appears wider than others
**Solution**: Already fixed by nuclear override. Hard refresh if still seeing issues.

### Issue: Content looks cramped
**Solution**: Check if content has additional padding. Custom modules should use `padding: 0` on containers.

### Issue: Need different width for specific section
**Solution**: Add specific class and override:
```css
.special-width-section .row-fluid {
  max-width: 1200px !important; /* Your width */
}
```

## FAQ

### Q: Will this affect HubSpot marketplace modules?
**A**: Yes, positively. All marketplace modules will automatically align with your content.

### Q: Do I need to update this for new modules?
**A**: No, the nuclear override automatically applies to all new modules.

### Q: Can I still use HubSpot's width settings in the UI?
**A**: The "center content" setting still works for narrower sections. "Full width" is enforced at 1400px max.

### Q: What if HubSpot updates the Growth theme?
**A**: Our child theme overrides will continue to work. Monitor after major theme updates.

## Maintenance

### When to Update This System

1. **Major HubSpot theme updates** - Test alignment after Growth theme updates
2. **New section types** - Add specific overrides if new HubSpot section types don't comply
3. **Design system changes** - Update if moving away from 1400px standard

### How to Modify Width Limits

To change the maximum content width:

1. Update CSS variables in child.css (line 14):
```css
:root {
  --content-max-width: 1136px; /* Change this value */
}
```

2. **No padding changes needed** - The system uses `margin: 0 auto` to center content and create margins automatically

3. Test across all pages and module types

4. Verify header uses the variable:
```html
<div class="nav-container" style="max-width: var(--content-max-width) !important; ...">
```

5. Update this documentation

## Related Documentation

- [CSS Override Strategy](./CSS_OVERRIDE_STRATEGY.md) - General CSS override approach
- [Child Theme Architecture](./CHILD_THEME_ARCHITECTURE.md) - Theme structure
- [Dual Brand System](./DUAL_BRAND_SYSTEM.md) - Brand switching implementation

---

**Last Updated**: October 24, 2025
**Status**: ✅ Active and Working - Figma-Aligned
**Applies To**: All pages using "growth child" theme

## Recent Updates (October 2025)

### Figma Grid Alignment
Updated the entire width system to match Figma design specifications:

**Desktop (1440px viewport):**
- Visual content width: **1136px** (previously 1400px)
- Left/right margins: **152px each** (previously ~20px)
- No horizontal padding on row-fluids (previously 32px each side)

**Tablet (768px viewport):**
- Visual content width: **736px** (768px - 32px margins)
- Left/right margins: **16px each** (previously 24px padding)

**Mobile (375px viewport):**
- Visual content width: **343px** (375px - 32px margins)
- Left/right margins: **16px each** (unchanged)

**Benefits:**
- ✅ Matches Figma grid system exactly
- ✅ Consistent 152px margins on desktop create more focused, readable content
- ✅ All modules (custom, default, marketplace) align perfectly at 1136px
- ✅ Header navigation uses CSS variable for automatic adjustment
- ✅ Single variable change (`--content-max-width`) updates entire site