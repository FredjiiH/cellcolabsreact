# Cellcolabs Theme System Documentation

## Overview
This document describes the theme system implementation for Cellcolabs and Cellcolabs Clinical brands, based on the Figma design system.

## Theme Structure

### Typography System

#### Font Families
- **Headings (Display, H1-H3)**: Bricolage Grotesque (weight: 650)
- **Body & UI (H4, Body, Links)**: Inter Variable (weight: 450, 700)

#### Type Scale
| Style | Desktop | Tablet | Mobile | Line Height |
|-------|---------|--------|--------|-------------|
| Display | 5rem (80px) | 3rem (48px) | 2.5rem (40px) | 100% / 115% |
| H1 | 3.5rem (56px) | 2.25rem (36px) | 2.25rem (36px) | 115% |
| H2 | 3rem (48px) | 2rem (32px) | 2rem (32px) | 115% |
| H3 | 2.25rem (36px) | 1.75rem (28px) | 1.75rem (28px) | 115% |
| H4 | 1rem (16px) | 1rem (16px) | 1rem (16px) | 115% / 135% |
| Body L | 1.125rem (18px) | 1.125rem (18px) | 1.125rem (18px) | 135% |
| Body M | 1rem (16px) | 1rem (16px) | 1rem (16px) | 135% |
| Body S | 0.875rem (14px) | 0.875rem (14px) | 0.875rem (14px) | 135% |
| Button | 1rem (16px) | 1rem (16px) | 1.125rem (18px) | 150% |
| Link | 1rem (16px) | 1rem (16px) | 1.125rem (18px) | 150% |
| Eyebrow | 0.875rem (14px) | 0.875rem (14px) | 0.875rem (14px) | 200% |

#### Font Weights
- Regular: 450
- Medium: 500
- SemiBold: 650
- Bold: 700

#### Letter Spacing
- Display: -2% (-0.02em)
- All others: 0

### Spacing System

| Token | Rem Value | Pixel Value |
|-------|-----------|-------------|
| space-4 | 0.25rem | 4px |
| space-8 | 0.5rem | 8px |
| space-16 | 1rem | 16px |
| space-24 | 1.5rem | 24px |
| space-32 | 2rem | 32px |
| space-48 | 3rem | 48px |
| space-64 | 4rem | 64px |
| space-96 | 6rem | 96px |
| space-128 | 7.5rem | 120px |

### Color System (Cellcolabs Clinical)

#### Text Colors
- Primary: `#161616`
- Secondary: `#525252`
- Tertiary: `#8D8D8D`
- Disabled: `#C6C6C6`
- Inverse: `#FFFFFF`
- Link: `#4F65BE`

#### Gray Scale (0-1000)
- Gray 0: `#161616` (Black)
- Gray 100: `#262626`
- Gray 200: `#393939`
- Gray 300: `#525252`
- Gray 400: `#6F6F6F`
- Gray 500: `#8D8D8D`
- Gray 600: `#A8A8A8`
- Gray 700: `#C6C6C6`
- Gray 800: `#E0E0E0`
- Gray 900: `#F4F4F4`
- Gray 1000: `#FFFFFF` (White)

#### Background Colors
- White: `#FFFFFF`
- Beige: `#EDE9E1`
- Blue: `#D1DEED`

#### Brand Colors
- Brand 100: `#BECFFF` (Lightest)
- Brand 300: `#879ADF`
- Brand 500: `#4F65BE` (Primary)
- Brand 700: `#2F4283`
- Brand 900: `#0F2047` (Darkest)

#### Functional Colors
- Error: `#F94400`
- Warning: `#F9D400`

#### Dividers
- Dark: `#161616`
- Light: `#FFFFFF`

## Implementation

### React Theme Files
- **Location**: `src/themes/`
- **Files**:
  - `cellcolabsclinical.json` - Clinical brand tokens
  - `cellcolabs.json` - Main brand tokens (to be updated)

### HubSpot CSS Variables
- **Location**: `hubspot-theme/css/`
- **Files**:
  - `theme-variables.css` - CSS custom properties
  - `main.css` - Base styles and utilities

### CSS Variable Naming Convention
```css
/* Colors */
--color-text-[name]
--color-gray-[number]
--color-bg-[name]
--color-brand-[number]
--color-[functional]

/* Typography */
--font-size-[element]-[breakpoint]
--font-weight-[name]
--line-height-[name]
--letter-spacing-[name]

/* Spacing */
--space-[number]
```

## Usage Examples

### Typography
```css
h1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
}
```

### Spacing
```css
.card {
  padding: var(--space-24);
  margin-bottom: var(--space-16);
}
```

### Colors
```css
.button-primary {
  background-color: var(--color-brand-500);
  color: var(--color-text-inverse);
}

.button-primary:hover {
  background-color: var(--color-brand-700);
}
```

## Responsive Design

### Breakpoints
- Mobile: 0-767px
- Tablet: 768px-1023px
- Desktop: 1024px+

### Container Padding
- Mobile: 1rem (16px)
- Tablet: 1.5rem (24px)
- Desktop: 2rem (32px)

## Figma Design References
- **Typography**: https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=825-3231
- **Spacing**: https://www.figma.com/design/bqAkpCKE3msElSGDuVqIz2/Website-2.0?node-id=825-4897

## Future Considerations
1. Create matching `cellcolabs.json` theme file with different brand colors but same variable structure
2. Add dark mode support with inverted color scales
3. Consider adding intermediate spacing values if needed
4. Implement fluid typography scaling for better responsive behavior