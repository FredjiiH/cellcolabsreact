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

We implemented a "nuclear" CSS override approach that forces ALL sections to respect our design system's 1400px maximum width.

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

### Core CSS Rules (child.css lines 946-968)

```css
/* ABSOLUTE MAXIMUM WIDTH ENFORCEMENT */
body .body-wrapper [class*="row-fluid"] {
  max-width: var(--content-max-width) !important; /* 1400px */
  margin-left: auto !important;
  margin-right: auto !important;
}

/* Exception: nested row-fluids in columns should use parent width */
body .body-wrapper [class*="span"] .row-fluid {
  max-width: 100% !important;
  width: 100% !important;
}
```

### Responsive Breakpoints

| Breakpoint | Container Max | Content Max | Padding |
|------------|---------------|-------------|---------|
| Mobile (<768px) | 100% | 100% | 16px |
| Tablet (768-1023px) | 100% | 100% | 24px |
| Desktop (1024-1440px) | 1400px | 1400px | 32px |
| Wide (1441-1919px) | 1440px | 1400px | 48px |
| Ultra-wide (≥1920px) | 1440px | 1400px | 48px |

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
// Run in browser console
const widths = [...document.querySelectorAll('.row-fluid')].map(el => parseInt(getComputedStyle(el).width));
console.log('Max width:', Math.max(...widths), widths.filter(w => w > 1450).length > 0 ? '❌ Issues' : '✅ Good');
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

1. Update CSS variables in child.css:
```css
:root {
  --content-max-width: 1400px; /* Change this value */
}
```

2. Test across all pages and module types
3. Update this documentation

## Related Documentation

- [CSS Override Strategy](./CSS_OVERRIDE_STRATEGY.md) - General CSS override approach
- [Child Theme Architecture](./CHILD_THEME_ARCHITECTURE.md) - Theme structure
- [Dual Brand System](./DUAL_BRAND_SYSTEM.md) - Brand switching implementation

---

**Last Updated**: September 26, 2025
**Status**: ✅ Active and Working
**Applies To**: All pages using "growth child" theme