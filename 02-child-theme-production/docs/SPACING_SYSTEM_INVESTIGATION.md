
# Spacing System Investigation - Section Spacing Issues

## Status: 🔴 On Hold - Awaiting Designer Input

**Date Started**: October 16, 2025
**Last Updated**: October 16, 2025
**Current State**: Investigation complete, implementation paused for design system clarification

---

## Problem Statement

The HubSpot site has **inconsistent spacing between sections** that does not match the Figma design. Specifically:
- Figma design shows consistent spacing between sections (64px, 96px, or 128px)
- HubSpot page shows excessive spacing (120px+) or in some cases modules touching (0px)
- Different module types have inconsistent built-in padding
- Mixing custom, standard, and marketplace modules creates unpredictable spacing

---

## Investigation Summary

### Initial Findings

**Figma Design Spacing**: Sections use consistent spacing tokens from design system
- 64px spacing between some sections
- 96px spacing between others
- 128px spacing for larger gaps
- Spacing controlled at module level, not container level

**HubSpot Implementation Issues**:
1. **DND Section Auto-Padding**: HubSpot's `.dnd-section` wrappers automatically added 60px top + 60px bottom padding
2. **Inconsistent Module Padding**: Different modules have different default padding
3. **Double-Padding Problem**: DND wrapper padding + module padding created 120px+ total spacing
4. **No Centralized Control**: Spacing determined by mix of container padding + module-level padding

### Diagnostic Process

#### Script 1: Initial Spacing Measurement
- Found 120px total spacing between Grid 2x2 Cards and Process Steps modules
- Identified DND section wrappers adding 60px + 60px = 120px padding
- Grid module had 64px bottom padding
- Process module had 0px top padding

#### Script 2: Container Hierarchy Analysis
Discovered multiple nested containers each potentially adding padding:
```
.row-fluid-wrapper.dnd-section (60px top, 60px bottom)
  └─ .row-fluid
      └─ .dnd-module
          └─ .hs_cos_wrapper_type_module
              └─ Actual module (.grid2x2-card-image, .process-steps, etc.)
```

---

## Changes Implemented

### File Modified: `child.css`

#### Change 1: Added Missing Spacing Variable (Line 27)
```css
--space-128: 8rem;     /* 128px */
```
**Reason**: Consistency with Figma spacing tokens (64px, 96px, 128px)

#### Change 2: Removed DND Section Auto-Padding (Lines 338-348)
```css
/***********************************************/
/* Remove HubSpot Default DND Section Padding */
/***********************************************/

/* Remove automatic DND section padding to use module-level spacing only.
   This prevents double-padding and allows brand variables to control all spacing.
   The data-attribute controls above can still be used to add padding when needed. */
.dnd-section {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
```
**Reason**: Eliminate double-padding and allow module-level control of spacing

**Status**: ✅ Uploaded to HubSpot theme "growth child"

---

## Current State After Changes

### DND Section Padding: ✅ Fixed
All DND sections now have **0px padding** (except intentional hero section 120px top)

### Module Spacing: ❌ Inconsistent

**Module Padding Audit Results**:

| Module | Padding Top | Padding Bottom | Total | Status |
|--------|-------------|----------------|-------|--------|
| Grid 2x2 Cards | 64px | 64px | 128px | ✅ Has padding |
| Process Steps | 0px | 0px | 0px | ❌ No padding |
| Section Builder | 48px | 48px | 96px | ✅ Has padding |
| Locations Carousel | Not tested | Not tested | ? | ⚠️ Unknown |
| Team Cards | Not tested | Not tested | ? | ⚠️ Unknown |
| Article TOC | Not tested | Not tested | ? | ⚠️ Unknown |

### Current Spacing Between Modules:

**Grid 2x2 Cards → Process Steps**:
- Expected (Figma): 64px, 96px, or 128px
- Actual (HubSpot): **0px** (modules touching)
- Root Cause: Grid has 64px bottom padding, Process has 0px top padding, no DND wrapper padding to separate them

---

## Root Cause Analysis

### The Core Problem: Inconsistent Padding Philosophy

**Custom Modules**: Mixed approaches
- Some modules (Grid 2x2, Section Builder) have built-in padding
- Other modules (Process Steps) have no padding
- No standardized padding strategy

**Standard HubSpot Modules**: Unknown padding behavior
- Each standard module may have different default padding
- Cannot easily modify without global CSS overrides

**Marketplace Modules**: Unknown padding behavior
- Third-party modules may have their own padding systems
- Cannot control without per-module overrides

### The Mixing Problem

When combining different module types in the same page:
- **Custom + Custom**: Inconsistent (some padded, some not)
- **Custom + Standard**: Unpredictable (depends on standard module padding)
- **Custom + Marketplace**: Unpredictable (depends on marketplace module padding)
- **Multiple modules in one DND section**: Padding compounds or conflicts

---

## Potential Solutions to Consider

### Option 1: Symmetric Module Padding (Standardized Approach)
**Concept**: Every custom module has the same padding (e.g., 64px top + 64px bottom)

**Pros**:
- Consistent spacing when stacking modules (128px gaps)
- Simple to maintain (one padding rule for all modules)
- Predictable behavior

**Cons**:
- Inflexible (all gaps are the same size)
- Doesn't account for standard/marketplace modules
- First/last sections may need special handling (0px top/bottom)

**Implementation**:
- Set all custom modules to 64px top/bottom padding
- Results in 128px gaps between all sections
- Use negative margin or special classes for first/last sections

---

### Option 2: Configurable Module Padding (Section Builder Approach)
**Concept**: Add padding field controls to every custom module

**Pros**:
- Maximum flexibility for content editors
- Can adjust spacing per-instance
- Matches Section Builder pattern (already implemented)

**Cons**:
- Requires updating all custom module `fields.json` files
- More complex for editors (more decisions to make)
- Doesn't solve standard/marketplace module issue

**Implementation**:
```json
{
  "name": "padding_top",
  "label": "Padding Top",
  "type": "choice",
  "choices": [
    ["none", "None (0px)"],
    ["small", "Small (32px)"],
    ["medium", "Medium (48px)"],
    ["large", "Large (64px)"],
    ["xlarge", "X-Large (96px)"]
  ],
  "default": "large"
}
```

---

### Option 3: DND Section Padding Control (Container-Based)
**Concept**: Restore DND section padding but use brand variables instead of hardcoded 60px

**Pros**:
- Centralized spacing control (one place to adjust)
- Works regardless of module type (custom/standard/marketplace)
- Content editors control spacing via DND section settings

**Cons**:
- Relies on HubSpot's data-attribute system
- May not support all spacing values (64px, 96px, 128px)
- Currently limited options (none, small, medium, large, xlarge)

**Current DND Controls in child.css** (lines 300-315):
```css
.dnd-section[data-section-padding="none"] {
  padding: 0 !important;
}
.dnd-section[data-section-padding="small"] {
  padding: var(--space-32) 0 !important;  /* 32px */
}
.dnd-section[data-section-padding="medium"] {
  padding: var(--space-48) 0 !important;  /* 48px */
}
.dnd-section[data-section-padding="large"] {
  padding: var(--space-64) 0 !important;  /* 64px */
}
.dnd-section[data-section-padding="xlarge"] {
  padding: var(--space-96) 0 !important;  /* 96px */
}
```

**Potential Enhancement**: Add 2xlarge option
```css
.dnd-section[data-section-padding="2xlarge"] {
  padding: var(--space-128) 0 !important;  /* 128px */
}
```

**Implementation**:
- Revert `.dnd-section { padding: 0 !important; }` to allow data-attribute control
- Set all custom modules to 0 padding
- Use DND section padding settings to control spacing
- Challenge: How to handle multiple modules within one DND section?

---

### Option 4: Hybrid Approach (Module + Container)
**Concept**: Modules have minimal internal padding, DND sections control spacing between sections

**Pros**:
- Flexible for different spacing needs
- Can compensate for standard/marketplace modules
- Clear separation: modules handle internal spacing, containers handle external spacing

**Cons**:
- More complex mental model
- Requires coordination between module design and section settings

**Implementation**:
- Custom modules: Minimal or no vertical padding (focused on internal content spacing)
- DND sections: Control spacing between sections via data-attributes
- Special cases: Use custom padding fields when needed

---

## Developer's Perspective on Mixing Modules

**Quote from Developer**:
> "Since we are mixing custom modules with standard modules and marketplace modules, and sometimes also a combines more than one module in the same section, we need a solution that is flexible enough to let us compensate for this. If all modules were custom modules, and we had a standard padding between sections based on the brand spacing variables (REM variables for responsiveness), then we could basically work with 0 padding in the modules and set the DND wrapper (or whatever it was we changed from 60 to 0) to that padding. But since we are mixing, we need to think this through."

**Key Considerations**:
1. **Mixed Module Types**: Cannot assume all modules have same padding behavior
2. **Multiple Modules Per Section**: DND section can contain multiple modules (how to space them?)
3. **Responsive REM Values**: Spacing should use brand variables for consistency
4. **Editor Flexibility**: Content editors need ability to adjust spacing when needed
5. **Maintenance**: Solution must be maintainable as site grows

**Scenarios to Handle**:
- Custom module + Custom module (stacked in one DND section)
- Custom module + Standard module (side-by-side in columns)
- Standard module + Marketplace module (consecutive DND sections)
- Hero section (needs different spacing treatment)
- Footer approach (last section on page)

---

## Questions for Designer

### 1. Spacing Consistency
**Question**: Is spacing between sections always the same throughout the site, or does it vary?
- **Always 128px between sections?**
- **Varies by context** (e.g., 64px between related sections, 128px between major sections)?
- **Designer-specified per page** (flexible spacing)?

**Impact**: Determines if we can use a single standardized padding value or need flexible controls

---

### 2. Spacing Within Modules
**Question**: What is the logic for spacing WITHIN a module's content?
- **Example**: In Section Builder, spacing between heading and description
- **Example**: In Process Steps, spacing between step items

**Current Implementation**: Section Builder has "Content Spacing" field (2XS to 3XL)

**Design System Question**: Should internal content spacing use the same tokens as section spacing (64px, 96px, 128px)?

**Impact**: Helps distinguish between:
- External spacing (between modules/sections)
- Internal spacing (within module content)

---

### 3. Module Padding Philosophy
**Question**: Should modules have built-in vertical padding or not?

**Approach A - Modules Control Spacing**:
- Each module has standard padding (e.g., 64px top/bottom)
- Stacking modules creates consistent gaps
- Simpler for editors (no spacing settings to configure)

**Approach B - Containers Control Spacing**:
- Modules have no/minimal padding
- DND section settings control spacing between sections
- More flexible but requires more editor decisions

**Which aligns with the design system?**

---

### 4. First and Last Section Treatment
**Question**: How should spacing work for:
- **First section on page** (below header/hero): 0px top padding? Or standard padding?
- **Last section on page** (above footer): 0px bottom padding? Or standard padding?

**Current Behavior**: First section has 120px top padding (likely intentional for hero)

---

### 5. Multi-Module Sections
**Question**: When multiple modules are placed within one DND section:
- **Should they have spacing between them?** (e.g., 32px gap?)
- **Or should they touch?** (0px gap?)
- **Should this be configurable?**

**Example Scenario**:
```
DND Section 1:
  - Section Builder (heading + description)
  - Grid 2x2 Cards (feature grid)

<-- How much spacing here? -->

DND Section 2:
  - Process Steps
```

**Current Problem**: No clear strategy for this scenario

---

### 6. Standard & Marketplace Modules
**Question**: How should spacing work when mixing custom modules with HubSpot standard/marketplace modules?

**Challenge**: We cannot control padding of standard/marketplace modules without global CSS overrides

**Options**:
- **Option A**: Use DND section padding to compensate (flexible but requires editor awareness)
- **Option B**: Add global CSS overrides for common standard modules (brittle)
- **Option C**: Avoid mixing module types in consecutive sections (design constraint)

**Which approach fits the editorial workflow?**

---

## Recommended Next Steps

### 1. Designer Consultation ⏳ Pending
- [ ] Answer the 6 questions above
- [ ] Review Figma spacing system documentation
- [ ] Provide spacing specifications for all common module combinations
- [ ] Clarify internal vs external spacing logic

### 2. Document Design System Decision 📝
Once designer provides input:
- [ ] Document official spacing strategy in this file
- [ ] Update MODULE_CATALOG.md with spacing standards
- [ ] Create spacing decision tree for editors

### 3. Implement Chosen Solution 🔧
Based on designer's answers, implement one of the options:
- [ ] Update custom module padding (if module-based approach)
- [ ] Configure DND section padding system (if container-based approach)
- [ ] Add padding fields to all custom modules (if configurable approach)
- [ ] Create hybrid system (if mixed approach)

### 4. Audit All Modules 🔍
- [ ] Test all custom modules for consistent padding behavior
- [ ] Identify standard modules used on site and document their padding
- [ ] Test all common module combinations (custom + standard, etc.)

### 5. Create Editor Guidelines 📖
- [ ] Document how to control spacing between sections
- [ ] Provide examples of correct spacing usage
- [ ] Add troubleshooting guide for spacing issues

---

## Technical Reference

### Brand Spacing Variables (child.css lines 18-27)
```css
--space-4: 0.25rem;    /* 4px */
--space-8: 0.5rem;     /* 8px */
--space-12: 0.75rem;   /* 12px */
--space-16: 1rem;      /* 16px */
--space-24: 1.5rem;    /* 24px */
--space-32: 2rem;      /* 32px */
--space-48: 3rem;      /* 48px */
--space-64: 4rem;      /* 64px */
--space-96: 6rem;      /* 96px */
--space-128: 8rem;     /* 128px */
```

### DND Section Padding Controls (child.css lines 300-315)
Currently maps to HubSpot's section padding UI:
- `data-section-padding="none"` → 0px
- `data-section-padding="small"` → 32px
- `data-section-padding="medium"` → 48px
- `data-section-padding="large"` → 64px
- `data-section-padding="xlarge"` → 96px
- *(Could add `2xlarge` → 128px)*

### Current Global DND Section Override (child.css lines 338-348)
```css
.dnd-section {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
```
**Status**: Active (removes all DND section padding)
**May Need**: Modification based on final spacing strategy

---

## Diagnostic Scripts for Testing

### Script 1: Check Section Spacing
```javascript
// Run in browser console to measure spacing between all sections
(function() {
  console.log('MODULE SPACING DIAGNOSTIC');
  const sections = document.querySelectorAll('.row-fluid-wrapper.dnd-section');
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const styles = window.getComputedStyle(section);
    console.log(`Section ${index + 1}:`);
    console.log(`  Padding: ${styles.paddingTop} / ${styles.paddingBottom}`);
    if (index < sections.length - 1) {
      const nextRect = sections[index + 1].getBoundingClientRect();
      const gap = Math.round((nextRect.top + window.scrollY) - (rect.bottom + window.scrollY));
      console.log(`  Gap to next: ${gap}px`);
    }
  });
})();
```

### Script 2: Audit Module Padding
```javascript
// Check padding on all custom modules
(function() {
  const modules = [
    { selector: '.grid2x2-card-image', name: 'Grid 2x2 Cards' },
    { selector: '.process-steps', name: 'Process Steps' },
    { selector: '.section-builder', name: 'Section Builder' },
    { selector: '.locations-carousel', name: 'Locations Carousel' },
    { selector: '.team-cards', name: 'Team Cards' }
  ];
  modules.forEach(mod => {
    const el = document.querySelector(mod.selector);
    if (el) {
      const s = window.getComputedStyle(el);
      console.log(`${mod.name}: ${s.paddingTop} / ${s.paddingBottom}`);
    }
  });
})();
```

---

## Figma Design Analysis - Padding Standards

**Analysis Date**: October 16, 2025
**Figma Page Analyzed**: [Desktop / Treatments](https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=983-2047)

### Brand Spacing Variables (From Figma)

Figma uses the following spacing tokens, which **perfectly match our CSS variables**:

```
spacing-8: 8px (0.5rem) = --space-8
spacing-16: 16px (1rem) = --space-16
spacing-32: 32px (2rem) = --space-32
spacing-64: 64px (4rem) = --space-64
spacing-96: 96px (6rem) = --space-96
spacing-128: 128px (8rem) = --space-128
```

✅ **Confirmation**: Our CSS variable system is correctly aligned with Figma design tokens.

### Padding Patterns by Content Type

**1. Hero Sections:**
```
Vertical padding: py-[128px] (128px top/bottom)
Horizontal padding: px-0 (no left/right padding)
Content width: 1136px centered in 1440px canvas (152px margins)
```

**2. Standard Content Sections:**
```
Vertical padding: py-[64px], py-[96px], or py-[128px]
Horizontal padding: px-0 (full width to content container)
Content width: 1136px max
```

**3. Cards with Backgrounds:**
```
Small cards (image overlay): p-[32px] (32px all around)
Large content cards: p-[96px] (96px all around)
CTA sections: py-[64px] px-0 (vertical only)
```

**4. Images - THE CRITICAL PATTERN:**
```
Images: w-full (100% width within parent)
Image padding: 0px (NO horizontal padding)
Image containers: Full width edge-to-edge within section
Border radius: 8px (rounded-[8px]) on location carousel images
```

### Page Structure in Figma

```
Browser viewport: 1440px
├─ Outer margins: 152px (left) + 152px (right)
├─ Content container: 1136px
    ├─ Section vertical padding: 64px / 96px / 128px
    ├─ Text content: May have internal width constraints
    └─ Images: Full width (1136px) - NO horizontal padding
```

### Key Findings: Image Handling

**Critical Discovery**: In Figma, **images are always full-width within their content container** and do not respect section padding for text content.

**Example from Location Carousel Section:**
- Outer container: 1136px
- Section padding: `py-[128px] px-0`
- Eyebrow, heading, description: Have internal width constraints
- **Carousel images**: `w-[1136px]` (full width) with `rounded-[8px]`
- Image padding: **0px** (edge-to-edge within 1136px container)

**Example from Process Steps Section:**
- Two-column layout with `gap-[16px]`
- Left column: Text content
- Right column: Step items
- No horizontal padding on columns
- Content flows to full width of column

### The Section Builder Image Problem

**Current Issue:**
- Section Builder has configurable padding (e.g., `padding: 48px`)
- Section Builder outer width: 1272px
- With 48px padding left+right: **1176px content area**
- Image constrained to: **1176px** (not full width of section)

**Figma Pattern:**
- Images should be **1272px** (full section width, ignoring text padding)
- Text content: **1176px** (respects section padding)

**Root Cause:**
Images in Section Builder currently respect the section's padding, but in Figma they break out to be edge-to-edge within the section container.

### Figma Padding Philosophy

Based on analysis, the design follows this pattern:

**Module/Section Level:**
- **Vertical padding**: Controlled per section type (64px/96px/128px)
- **Horizontal padding**: None (content handled by 1136px max-width container)

**Content Level:**
- **Text blocks**: May have internal width constraints (e.g., 480px for centered subheaders)
- **Images**: Always full-width within parent container
- **Cards with backgrounds**: Internal padding (32px or 96px)

**Key Principle:**
> Padding serves text readability, but images extend to full container width for visual impact.

### Implications for Implementation

**For Section Builder Image Block:**
1. **Option A**: Add "Full Width" toggle that uses negative margins to break out of section padding
2. **Option B**: Make all images full-width by default, ignore section padding
3. **Option C**: Separate "Content Padding" (for text) from "Section Padding" (for outer container)

**For General Spacing System:**
- Vertical spacing between sections: Controlled by module padding or DND section settings
- Horizontal spacing: Should be 0px for most modules (rely on 1136px content container)
- Images: Should always be full-width within their semantic container

### Design System Questions for Designer

**7. Image Padding Behavior** ⭐ NEW
**Question**: How should images behave within modules that have padding?

**Current Figma Pattern**: Images are full-width edge-to-edge, ignoring text content padding

**Options for Implementation**:
- **A**: All images full-width by default (add negative margins to break out of padding)
- **B**: Images have "Full Width" toggle option (user decides per instance)
- **C**: Different padding for text vs images (complex to implement)

**Example Scenario**:
```
Section Builder with 48px padding:
├─ Heading (respects 48px padding)
├─ Description (respects 48px padding)
└─ Image (should it respect padding or go edge-to-edge?)
```

**In Figma**: Image goes edge-to-edge
**Current HubSpot**: Image respects padding (narrower than intended)

---

## Related Documentation

- **MODULE_CATALOG.md** - Documents all custom modules and their specifications
- **HEADER_FOOTER_ARCHITECTURE.md** - Header/footer implementation patterns
- **child.css** - Brand variables and spacing system
- **CLAUDE.md** - Project instructions and architecture decisions

---

**Last Updated**: October 16, 2025
**Status**: 🔴 Awaiting designer input before proceeding
**Next Action**: Designer to answer 7 questions above (including new image padding question)
