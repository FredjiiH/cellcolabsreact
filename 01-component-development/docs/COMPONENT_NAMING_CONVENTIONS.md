# Component Naming Conventions

## Overview

This document establishes naming conventions for the Cellcolabs component library to ensure scalability, discoverability, and consistency across the design system.

## Naming Pattern

### **Format: `[Layout][Content][Variant]`**

Components follow a three-part naming structure that describes their visual layout, content type, and specific variant.

## Layout Types

| Name | Description | Example Use Cases |
|------|-------------|-------------------|
| `Grid2x2` | 2×2 grid layout (4 items) | Feature highlights, service areas |
| `Grid3x1` | 3 column layout (3 items) | Service trios, feature comparison |
| `Grid1x4` | Single column, 4 items | Process steps, timeline |
| `Hero` | Full-width hero sections | Landing page headers |
| `Split` | Two-column layouts | Image + text combinations |
| `Stack` | Vertical stacked layouts | Content lists, articles |

## Content Types

| Name | Description | Content Structure |
|------|-------------|-------------------|
| `Card` | Card-based content | Title, description, image, CTA |
| `Feature` | Feature highlights | Icon/image, title, description |
| `Service` | Service descriptions | Title, description, link |
| `Testimonial` | Customer testimonials | Quote, author, image |
| `Stat` | Statistics/metrics | Number, label, description |
| `CTA` | Call-to-action focused | Headline, description, button |

## Variants

| Name | Description | Visual Characteristics |
|------|-------------|------------------------|
| `Image` | Image-heavy | Background images, overlays |
| `Text` | Text-focused | Minimal images, typography emphasis |
| `Video` | Video content | Video backgrounds, players |
| `Icon` | Icon-based | SVG icons, minimal images |
| `Overlay` | Text overlay on images | Text over background images |

## Component Examples

### Current Components
- `Grid2x2CardImage` - 2×2 grid with card content and image backgrounds
- `ButtonMultiVariant` - Flexible button component with multiple style variants (primary, secondary, outline, outline-white)

### Multi-Variant Components
For components that support multiple style variants in a single component (especially those already integrated with HubSpot), use the `[Component]MultiVariant` pattern:
- `ButtonMultiVariant` - Single button component with multiple style options
- This approach is preferred for HubSpot integration where field configuration is already established

### Future Components
- `Grid3x1FeatureIcon` - 3 column feature grid with icons
- `HeroCTAVideo` - Hero section with video background and CTA
- `SplitServiceText` - Two-column service layout, text-focused
- `StackTestimonialCard` - Vertical testimonial cards

## File Structure

```
src/components/
├── Grid2x2CardImage/
│   ├── Grid2x2CardImage.tsx
│   ├── Grid2x2CardImage.module.css
│   └── index.ts
└── ButtonMultiVariant/
    ├── ButtonMultiVariant.tsx
    ├── ButtonMultiVariant.module.css
    └── index.ts
```

## Metadata System

Each component should include metadata for searchability:

```typescript
export const componentMetadata = {
  name: 'Grid2x2CardImage',
  category: 'Layout',
  tags: ['grid', '2x2', 'cards', 'images', 'overlay'],
  useCases: ['services', 'features', 'focus-areas'],
  responsive: true,
  accessibility: 'WCAG-AA',
  version: '1.0.0'
};
```

## Search Tags

### Layout Tags
- `2x2-grid`, `3x1-grid`, `1x4-grid`
- `hero`, `split`, `stack`
- `responsive`, `mobile-first`

### Content Tags
- `cards`, `features`, `services`
- `testimonials`, `statistics`, `cta`
- `images`, `text`, `video`, `icons`

### Visual Tags
- `overlay`, `background-image`, `text-heavy`
- `icon-based`, `minimal`, `rich-media`

## Implementation Guidelines

### 1. Component Development
- Create components in React with TypeScript
- Use CSS Modules for styling
- Follow established brand variables
- Ensure responsive design

### 2. HubSpot Integration

#### **Current Approach: HubSpot Theme Modules (Under Evaluation)**
- Create theme modules with `fields.json` for editable content
- Deploy via HubSpot CLI with child theme
- Integrate with brand variable system
- Version control module structure

#### **Alternative Approach: Custom Modules (Established)**
- Generate static fragments for manual integration
- Follow HubSpot field naming conventions
- Maintain brand variable consistency
- Document field mappings

> **Note**: We are currently exploring theme modules for better automation while keeping custom module workflow as a proven fallback.

### 3. Documentation
- Include component preview
- Document all props and variants
- Provide usage examples
- List accessibility considerations

## Brand Integration

All components must integrate with the established brand system:

### CSS Variables
```css
--color-primary: /* Brand primary color */
--color-text-link: /* Brand link color */
--font-family-heading: /* Brand heading font */
--font-family-body: /* Brand body font */
--spacing-md: /* Brand spacing values */
```

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `1024px+`
- Container: `1400px max-width`

## Quality Standards

### Required Features
- ✅ Responsive design across all breakpoints
- ✅ Accessibility compliance (WCAG AA)
- ✅ Brand variable integration
- ✅ TypeScript interfaces
- ✅ CSS Modules scoping
- ✅ Documentation and examples

### Testing Checklist
- [ ] Mobile, tablet, desktop layouts
- [ ] Both brand themes (Clinical/Cellcolabs)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Performance optimization

## Future Considerations

### Component Library Publication
- Online searchable component library
- Editor-friendly interface
- Preview and code generation
- Integration with HubSpot Design Manager

### Version Management
- Semantic versioning (1.0.0)
- Backward compatibility
- Migration guides
- Deprecation notices

---

**Last Updated**: September 29, 2025
**Status**: ✅ Active Standard
**Applies To**: All component development