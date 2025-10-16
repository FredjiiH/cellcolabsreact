# Spacing System Guide

## Overview

This guide documents the container-based spacing system that ensures consistent vertical rhythm and spacing control across all HubSpot modules and pages.

## The Problem We Solved

### Before: Inconsistent Spacing Chaos
- Modules had varying internal padding (48px, 64px, 96px)
- DND sections and modules both added vertical spacing, causing unpredictable gaps
- No standardized spacing scale across the site
- Difficult to achieve precise spacing between sections
- Extra spacing appeared above/below certain modules

### After: Container-Based Spacing System
- **Single source of truth**: Vertical spacing controlled by DND section container
- **Zero module padding**: Modules have `padding: 0` by default
- **Full spacing scale**: All spacing uses brand variables (4px-128px)
- **Predictable results**: What you set in DND section = what you get
- **Fine-grained control**: Per-block spacing overrides in Section Builder

## Core Principles

### 1. DND Section Container Controls Vertical Spacing

**The DND section container** is the single source of truth for vertical spacing between content sections.

```
┌─────────────────────────────────────┐
│   DND Section (64px padding)        │ ← Controls vertical spacing
│  ┌───────────────────────────────┐  │
│  │  Module (padding: 0)          │  │ ← No internal padding
│  │  ┌─────────────────────────┐  │  │
│  │  │  Content                │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 2. Modules Have Zero Vertical Padding

All custom modules should use `padding: 0` and let the DND section container handle spacing:

```css
.my-module {
  padding: 0; /* Spacing controlled by DND section container */
  width: 100%;
}
```

**Exception**: Modules with background colors may add padding for visual breathing room:

```css
.my-module[style*="background-color"] {
  padding: var(--space-48, 48px); /* Only when background color is set */
}
```

### 3. Full Brand Spacing Scale

All spacing values use brand CSS variables with fallbacks:

| Variable | Value | Common Use Cases |
|----------|-------|------------------|
| `--space-4` | 4px | Minimal gaps, tight spacing |
| `--space-8` | 8px | Small gaps between related items |
| `--space-12` | 12px | Compact spacing |
| `--space-16` | 16px | Standard small spacing |
| `--space-24` | 24px | Medium spacing (default content spacing) |
| `--space-32` | 32px | Large gaps within modules |
| `--space-48` | 48px | Section-level spacing |
| `--space-64` | 64px | Large section spacing (default DND) |
| `--space-96` | 96px | Extra large spacing |
| `--space-128` | 128px | Maximum spacing |

## Implementation Details

### DND Section Container Settings

Configure vertical spacing in HubSpot's page editor:

**Default Recommended Settings**:
- **Desktop**: 64px top/bottom
- **Tablet**: 48px top/bottom
- **Mobile**: 32px top/bottom

These can be adjusted per section based on design needs.

### Module Padding Guidelines

#### ✅ Correct: Zero Padding (Default)

```css
.locations-carousel-block-v2 {
  padding: 0; /* Spacing controlled by DND section container */
  width: 100%;
  box-sizing: border-box;
}

.locations-carousel-block-v2 .container {
  max-width: 100%;
  padding: 0; /* HubSpot already handles horizontal padding */
  /* NO internal vertical gap */
}
```

#### ✅ Correct: Conditional Padding (Background Colors)

```css
/* Section Builder with optional padding for background colors */
.section-builder {
  padding: 0; /* Default: no padding */
}

/* User can optionally add padding via module field when using background color */
.section-builder[data-padding="small"] {
  padding: var(--space-32, 32px);
}

.section-builder[data-padding="medium"] {
  padding: var(--space-48, 48px);
}

.section-builder[data-padding="large"] {
  padding: var(--space-64, 64px);
}
```

#### ❌ Incorrect: Fixed Internal Gaps

```css
/* DON'T DO THIS */
.my-module .container {
  display: flex;
  flex-direction: column;
  gap: var(--space-64, 64px); /* This adds unexpected vertical spacing */
}
```

This creates double spacing (DND section + module gap) and makes spacing unpredictable.

### Responsive Padding Scaling

When modules DO have padding (for background colors), it should scale down for smaller screens:

```css
/* Desktop (default) */
.section-builder[data-padding="medium"] {
  padding: var(--space-48, 48px);
}

/* Tablet (768-1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .section-builder[data-padding="medium"] {
    padding: var(--space-32, 32px) var(--space-24, 24px);
  }
}

/* Mobile (767px and below) */
@media (max-width: 767px) {
  .section-builder[data-padding="medium"] {
    padding: var(--space-24, 24px) var(--space-16, 16px);
  }
}
```

## Advanced Features

### Per-Block Spacing Control (Section Builder)

The Section Builder module includes advanced per-block spacing:

#### Default Spacing
Set once for all blocks in the section:
```
Content Spacing: 24px (default between blocks)
```

#### Per-Block Override
Override spacing for individual blocks:
```
Block 1: Eyebrow
Block 2: Heading
  └─ Spacing After: 32px (override)
Block 3: Subheader
  └─ Spacing After: 64px (override)
Block 4: Accordion
  └─ Spacing After: default (uses 24px)
```

**Implementation**:
```html
<div class="section-builder__block-wrapper"
     style="margin-bottom: var(--space-{{ block.spacing_after }}, {{ block.spacing_after }}px);">
  <!-- Block content -->
</div>
```

**Available Values**:
- `default` - Uses section's content_spacing
- `none` - 0px (no spacing)
- `4` through `128` - Full brand spacing scale

### Full-Width Blocks

Blocks can break out of section padding while other blocks respect it:

**Use Case**: Full-width image within a padded section

```html
<div class="section-builder" data-padding="medium" style="padding: 48px;">
  <div class="section-builder__block-wrapper">
    <h2>Heading</h2> <!-- Respects 48px padding -->
  </div>

  <div class="section-builder__block-wrapper full-width-block">
    <img src="..." /> <!-- Breaks out to full width -->
  </div>

  <div class="section-builder__block-wrapper">
    <p>Description</p> <!-- Respects 48px padding -->
  </div>
</div>
```

**CSS Implementation**:
```css
/* Desktop */
.section-builder[data-padding="medium"] .full-width-block {
  margin-left: calc(-1 * var(--space-48, 48px));
  margin-right: calc(-1 * var(--space-48, 48px));
  width: calc(100% + 2 * var(--space-48, 48px));
}

/* Tablet */
@media (max-width: 1023px) and (min-width: 768px) {
  .section-builder[data-padding="medium"] .full-width-block {
    margin-left: calc(-1 * var(--space-24, 24px));
    margin-right: calc(-1 * var(--space-24, 24px));
    width: calc(100% + 2 * var(--space-24, 24px));
  }
}

/* Mobile */
@media (max-width: 767px) {
  .section-builder[data-padding="medium"] .full-width-block {
    margin-left: calc(-1 * var(--space-16, 16px));
    margin-right: calc(-1 * var(--space-16, 16px));
    width: calc(100% + 2 * var(--space-16, 16px));
  }
}
```

## Module Development Guidelines

### Creating New Modules

#### Step 1: Remove Vertical Padding
```css
.my-new-module {
  padding: 0; /* Spacing controlled by DND section container */
  width: 100%;
  box-sizing: border-box;
}
```

#### Step 2: Remove Internal Vertical Gaps
```css
/* ❌ WRONG - Creates unexpected spacing */
.my-new-module .container {
  display: flex;
  flex-direction: column;
  gap: var(--space-64, 64px); /* DON'T DO THIS */
}

/* ✅ RIGHT - No internal vertical spacing */
.my-new-module .container {
  display: flex;
  flex-direction: column;
  /* No gap property */
}
```

#### Step 3: Use Spacing Variables
```css
/* Internal horizontal or element-level spacing is fine */
.my-new-module .header {
  display: flex;
  gap: var(--space-32, 32px); /* Horizontal gap - OK */
  margin-bottom: var(--space-24, 24px); /* Within section - OK */
}
```

### Updating Existing Modules

Follow this checklist to migrate modules to the container-based system:

- [ ] **Remove module-level padding**: Set `padding: 0`
- [ ] **Remove internal gaps**: Remove `gap` from vertical flex/grid containers
- [ ] **Add comments**: `/* Spacing controlled by DND section container */`
- [ ] **Test spacing**: Verify no extra space above/below module
- [ ] **Upload to HubSpot**: `hs upload growth-child/modules/[module].module "growth child/modules/[module].module"`

## Modules Already Updated

### ✅ Aligned with Container-Based Spacing

| Module | Status | Notes |
|--------|--------|-------|
| Section Builder | ✅ Complete | Supports per-block spacing + full-width blocks |
| Locations Carousel V2 | ✅ Complete | Removed 64px internal gap |
| Content Text Image | ✅ Complete | Zero padding |
| Content Checklist Block Global | ✅ Complete | Zero padding |
| Process Steps | ✅ Complete | Zero padding |
| Team Cards | ✅ Complete | Zero padding |
| Grid 2x2 Card Image | ✅ Complete | Zero padding |
| Button Multi-Variant | ✅ Complete | Zero padding |
| Eligibility Checker | ✅ Complete | Zero padding |

### 🔍 Needs Verification

Check any marketplace or third-party modules for unexpected internal spacing.

## Testing Checklist

When adding or updating modules:

### 1. Visual Spacing Check
- [ ] No extra space above module (beyond DND section padding)
- [ ] No extra space below module (beyond DND section padding)
- [ ] Spacing matches adjacent modules
- [ ] Responsive scaling works correctly

### 2. Code Review
```bash
# Search for problematic patterns
grep -r "gap: var(--space-" modules/*/module.html | grep "flex-direction: column"
```

Look for:
- ❌ Vertical gaps in module containers
- ❌ Fixed padding values (should be 0 or configurable)
- ❌ Non-responsive padding (should scale for mobile)

### 3. Browser DevTools Check
```javascript
// Run in browser console to check module padding
document.querySelectorAll('[class*="module"], section').forEach(el => {
  const style = getComputedStyle(el);
  const pt = parseInt(style.paddingTop);
  const pb = parseInt(style.paddingBottom);
  if (pt > 0 || pb > 0) {
    console.log(el.className, `padding: ${pt}px / ${pb}px`);
  }
});
```

### 4. Multi-Device Testing
- [ ] Desktop (1440px+)
- [ ] Tablet (768-1023px)
- [ ] Mobile (375-767px)
- [ ] Small mobile (320-374px)

## Common Issues & Solutions

### Issue: Module has extra space above/below

**Cause**: Module has internal gap or padding

**Solution**:
```css
/* Find and remove: */
.module .container {
  gap: var(--space-64, 64px); /* REMOVE THIS */
}

/* Replace with: */
.module .container {
  /* Spacing controlled by DND section container */
}
```

### Issue: Content sections too close together

**Cause**: DND section padding too small

**Solution**: Increase DND section padding in HubSpot editor
- Recommended: 64px desktop, 48px tablet, 32px mobile

### Issue: Need different spacing between specific blocks

**Cause**: Using default module spacing

**Solution**: Use Section Builder with per-block spacing control
1. Set default content spacing (e.g., 24px)
2. Override specific blocks with "Spacing After This Block"

### Issue: Full-width image needed within padded section

**Cause**: All blocks respect section padding

**Solution**: Enable "Full Width (break out of padding)" on image block

### Issue: Background color section needs breathing room

**Cause**: Zero padding on all modules

**Solution**: Add padding field to module (like Section Builder)
```json
{
  "id": "padding",
  "type": "choice",
  "choices": [
    ["none", "None (use DND section padding)"],
    ["small", "Small (32px desktop)"],
    ["medium", "Medium (48px desktop)"],
    ["large", "Large (64px desktop)"]
  ],
  "default": "none"
}
```

## Migration Guide

### Phase 1: Identify Modules (✅ Complete)

Located all modules with internal spacing:
- Locations Carousel V2: 64px gap
- Section Builder: 48px default padding
- Others: Various padding values

### Phase 2: Update Modules (✅ Complete)

Updated all custom modules:
- Removed vertical padding
- Removed internal gaps
- Added responsive scaling for optional padding

### Phase 3: Test & Upload (✅ Complete)

All modules tested and uploaded to HubSpot "growth child" theme.

### Phase 4: Content Editor Training (📋 Pending)

Document for content editors:
- How to set DND section spacing
- When to use module padding (background colors)
- How to use per-block spacing in Section Builder

## FAQ

### Q: Should ALL modules have zero padding?
**A**: Most modules should have zero padding. Modules with background colors can optionally add padding for visual breathing room.

### Q: What if I need spacing between elements WITHIN a module?
**A**: Internal spacing (horizontal gaps, margins between elements) is fine. Only vertical container-level gaps should be avoided.

### Q: Can I still use gap for horizontal layouts?
**A**: Yes! Horizontal gaps are encouraged:
```css
.module .header {
  display: flex;
  gap: var(--space-32, 32px); /* ✅ Horizontal - OK */
}
```

### Q: What about spacing in multi-column layouts?
**A**: Column gaps are fine and controlled separately:
```css
.section-builder__columns {
  display: grid;
  gap: var(--space-24, 24px); /* ✅ Column gap - OK */
}
```

### Q: How do I space items within a flex column?
**A**: Use margin-bottom on individual items:
```css
.block-wrapper:not(:last-child) {
  margin-bottom: var(--space-24, 24px); /* ✅ Between items - OK */
}
```

### Q: What if HubSpot updates the theme?
**A**: Our child theme modules will maintain their spacing system. Test after updates.

### Q: Can editors break the spacing system?
**A**: Editors can adjust DND section padding, which is intentional. Module padding is controlled via module fields (when applicable).

## Best Practices

### ✅ DO

- Set module padding to 0 by default
- Use brand spacing variables (`--space-*`)
- Make padding responsive (scale down on smaller screens)
- Add comments explaining spacing control
- Use per-block spacing for fine control
- Test spacing on all breakpoints

### ❌ DON'T

- Add vertical gaps to module containers
- Use fixed pixel values (use variables)
- Create double spacing (DND + module)
- Forget responsive scaling
- Hide spacing controls from editors
- Assume internal gaps are harmless

## Related Documentation

- [Width System Guide](./WIDTH_SYSTEM_GUIDE.md) - Horizontal alignment system
- [CSS Styling Guide](./CSS_STYLING_GUIDE.md) - Complete CSS architecture
- [Module Catalog](./MODULE_CATALOG.md) - All custom modules
- [Dual Brand Spacing](./DUAL_BRAND_SPACING_GUIDE.md) - Brand-specific spacing

## Maintenance

### When to Update This System

1. **New modules** - Ensure they follow container-based spacing
2. **Design system changes** - Update spacing scale if design evolves
3. **HubSpot updates** - Test and adjust if theme behavior changes
4. **Editor feedback** - Adjust based on content editor needs

### How to Add New Spacing Values

To add a new spacing value to the brand scale:

1. Add CSS variable in `child.css`:
```css
:root {
  --space-20: 20px; /* New value */
}
```

2. Update Section Builder fields.json:
```json
{
  "choices": [
    ["20", "20px"], /* Add new option */
  ]
}
```

3. Update this documentation

---

**Last Updated**: January 2025
**Status**: ✅ Active and Enforced
**Applies To**: All custom modules in "growth child" theme
