# CRITICAL INSTRUCTIONS FOR CLAUDE CODE

## HubSpot Theme Management - IMPORTANT

### ⚠️ NEVER CREATE DUPLICATE THEMES
**The production theme is named "growth child" (with space)**

- **ALWAYS** upload to the existing "growth child" theme
- **NEVER** create a duplicate theme unless explicitly requested
- **NEVER** upload with a different name like "growth-child" (with hyphen)
- Duplicate themes will break existing pages that reference the original theme

### Correct Upload Process

When uploading HubSpot modules or theme updates:

1. **For individual module updates** (PREFERRED):
   ```bash
   # Upload only the specific module that changed
   hs upload growth-child/modules/[module-name].module "growth child/modules/[module-name].module"
   ```

2. **For multiple file updates**:
   ```bash
   # Upload specific files or folders
   hs upload growth-child/child.css "growth child/child.css"
   hs upload growth-child/templates "growth child/templates"
   ```

3. **Full theme upload** (ONLY when necessary):
   ```bash
   # This should rarely be needed
   hs upload growth-child "growth child"
   ```

### Key Points to Remember

- The local folder is named `growth-child` (with hyphen) for file system compatibility
- The HubSpot theme is named `"growth child"` (with space) - note the quotes when uploading
- Only upload changed files to minimize risk and improve upload speed
- Always verify the theme name in HubSpot with `hs list` before uploading

### Why This Matters

Pages in HubSpot are linked to specific themes. If you create a duplicate theme:
- Existing pages lose their template connection
- Modules disappear from pages
- Site functionality breaks
- Recovery requires restoring the original theme name

## Testing and Development Workflow

1. Develop components locally in `01-component-development`
2. Test thoroughly with `npm run dev`
3. Convert to HubSpot module in `02-child-theme-production/growth-child/modules`
4. Upload ONLY the new/changed module to "growth child" theme
5. Never upload the entire theme unless absolutely necessary

## Module Naming Conventions

- Use kebab-case for module folder names: `locations-carousel-block.module`
- Ensure module names are descriptive and consistent
- Include `.module` extension in folder names

## CSS and Styling

- **ALWAYS use brand CSS variables** for all styling (colors, fonts, spacing)
- Brand variables are defined in `child.css` and automatically adjust for breakpoints
- Never hardcode values - variables enable centralized updates across all modules
- Test responsive behavior at all breakpoints (desktop 1024px+, tablet 768-1023px, mobile 767px and below)

## Brand Variables and Responsive Typography

### Typography Scale (Updated to Match Figma)
All font sizes automatically adjust across three breakpoints:

**Desktop (1024px+):**
- Display: 80px
- H1: 56px
- H2: 48px
- H3: 36px
- H4: 16px
- Body Large: 18px
- Body: 16px
- Body Small: 14px

**Tablet (768-1023px):**
- Display: 48px
- H1: 36px
- H2: 32px
- H3: 28px
- H4: 16px
- Body Large: 16px
- Body: 16px
- Body Small: 14px

**Mobile (767px and below):**
- Display: 40px
- H1: 36px
- H2: 32px
- H3: 28px
- H4: 16px
- Body Large: 16px
- Body: 16px
- Body Small: 14px

### Using Typography Variables
```css
/* Heading uses responsive font size */
.my-heading {
  font-size: var(--font-size-h2); /* Auto-switches: 48px → 32px → 32px */
  line-height: var(--line-height-tight, 1.15);
  font-weight: var(--font-weight-medium, 580);
}
```

## Section Builder Module

The Section Builder is a flexible multi-column layout module supporting 1-3 column layouts with various content blocks.

### Available Layouts
- Single column
- Two columns (50/50, 60/40, 40/60)
- Three columns

### Content Block Types

1. **Eyebrow** - Small label/badge above headings
   - Variants: Default, Inverted, Glass

2. **Heading** - Responsive headings with multiple levels
   - Levels: Display (hero), H1, H2, H3, H4
   - Display heading: 80px desktop with -2% letter-spacing
   - All sizes use brand variables and auto-adjust

3. **Subheader** - Subtitle/tagline text
   - Font: Body Large (18px desktop, 16px tablet/mobile)
   - Weight: Medium (500)
   - Color: Secondary text (#525252)
   - Max-width options: None, Narrow (480px), Medium (640px), Wide (800px)

4. **Description** - Body text
   - Sizes: Small (14px), Medium (16px), Large (18px)

5. **Button** - Call-to-action buttons
   - Variants: Primary, Outline
   - Sizes: Small, Medium, Large

6. **Rich Text** - WYSIWYG content

7. **Feature List** - Checkmark or numbered list
   - Supports title + description per item
   - Matches Content Checklist Block styling

### Spacing Controls

**Content Spacing** (between blocks within columns):
- 2XS (4px), XS (8px), Small (12px), Medium (16px)
- Large (24px), XL (32px), 2XL (48px), 3XL (64px)

**Column Gap** (space between columns):
- 2XS (4px), XS (8px), Small (12px), Medium (16px)
- Large (24px), XL (32px), 2XL (48px), 3XL (64px), 4XL (96px)

**Padding** (section outer padding):
- None, Small (32px), Medium (48px), Large (64px)
- XLarge (96px), 2XLarge (96px/48px top-bottom/left-right)
- All padding options reduce responsively on tablet/mobile

### Usage Example - Hero Section
```
Layout: Single Column
Content Spacing: XL (32px)
Padding: XLarge (96px)

Blocks:
1. Eyebrow (centered) - "Powered by Cellcolabs"
2. Heading Display (centered) - Main headline
3. Subheader (centered, Narrow width) - Tagline
4. Button (centered) - CTA
```

### Key Features
- All styling uses brand CSS variables
- Fully responsive with automatic breakpoint adjustments
- Instance-specific styles (background, padding) use inline styles to prevent inheritance
- Each block has alignment options (left, center, right)
- Columns stack vertically on mobile (767px and below)