# HubSpot Module Catalog

## Overview

This document catalogs all custom HubSpot modules with their complete specifications, features, and usage guidelines.

---

## Section Builder Module

The Section Builder is a flexible multi-column layout module supporting 1-3 column layouts with various content blocks.

### Status
✅ **Production Ready**

### Available Layouts
- Single column
- Two columns (50/50, 60/40, 40/60)
- Three columns

### Background Color System

The Section Builder supports Figma-aligned background colors using the dual-field preset system:

**Preset Options:**
- Background colors: White, Beige, Blue
- Brand colors: 5 shades each of Primary (brand-100 to brand-900) and Secondary (brand-secondary-100 to brand-secondary-900)
- Neutral colors: neutral-900 (light gray), neutral-0 (dark)
- Custom color picker for one-off colors

All colors automatically adapt to the current brand (Cellcolabs Clinical vs Cellcolabs AB).

### Content Block Types

#### 1. Eyebrow
Small label/badge above headings
- **Variants:** Default, Inverted, Glass
- **Styling:** Uses centralized eyebrow variables from child.css
  - Inverted: `--color-eyebrow-bg-primary` (dark semi-transparent for light backgrounds)
  - Glass: `--color-eyebrow-bg-secondary` (white semi-transparent for dark/image backgrounds)

#### 2. Heading
Responsive headings with multiple levels
- **Levels:** Display (hero), H1, H2, H3, H4
- Display heading: 80px desktop with -2% letter-spacing
- All sizes use brand variables and auto-adjust

#### 3. Subheader
Subtitle/tagline text
- **Font:** Body Large (18px desktop, 16px tablet/mobile)
- **Weight:** Medium (500)
- **Color:** Secondary text (#525252)
- **Max-width options:** None, Narrow (480px), Medium (640px), Wide (800px)

#### 4. Description
Body text
- **Sizes:** Small (14px), Medium (16px), Large (18px)

#### 5. Button
Call-to-action buttons
- **Variants:** Primary, Outline
- **Sizes:** Small, Medium, Large

#### 6. Rich Text
WYSIWYG content

#### 7. Feature List
Checkmark or numbered list
- Supports title + description per item
- Matches Content Checklist Block styling

#### 8. Accordion
Expandable/collapsible content sections
- Supports multiple items with title + rich text content
- Options: Allow multiple open, First item open by default
- Smooth animations with rotating chevron icons
- Fully responsive and accessible

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

---

## Process Steps Module

A scroll-activated module displaying a step-by-step process with numbered circles and connecting vertical line.

### Status
✅ **Production Ready**

### Layout Structure

**Desktop/Tablet (768px+):** Two-column layout
- Left: Sticky header with eyebrow, heading, and subheader
- Right: Steps with numbered circles and descriptions

**Mobile (767px and below):** Single column, stacked layout
- Header content at top
- Steps below with smaller circles

### Features

**Numbered Circles:** Auto-numbered (1-10) with top-down fill animation
- Desktop/Tablet: 64px × 64px, H3 font size (36px/28px)
- Mobile: 48px × 48px, responsive H3 sizing
- Fill color: Brand 100 (light blue)
- Border color: Gray 100 default, Brand 100 when active

**Connecting Line:** Vertical line connects all circles, dynamically stops at last circle top
- Background line: Gray 100
- Progressive fill line: Brand 900 (dark blue)
- Fills to bottom of last activated circle with smooth transitions

**Progressive Scroll Effects:**
- Circles fill from top-down as they reach trigger point
- All previous circles stay filled (progressive activation)
- Unfills when scrolling back up
- Line progressively fills ahead of current position (200px lookahead)
- Text opacity increases when step becomes active

**Sticky Header:** Left column header sticks at 128px from top (desktop/tablet only)

**Brand Variables:** All typography, colors, and spacing uses CSS variables

### Fields

- **Eyebrow Text:** Optional label (e.g., "Process")
  - Uses `--color-eyebrow-bg-primary` variable for consistent styling across all modules
- **Heading:** Main section heading (H2)
- **Subheader:** Supporting text (Body Large)
- **Steps (repeater, 1-10 items):**
  - Step Title (H3)
  - Step Description (Rich text)

### Responsive Behavior

- **Desktop (1024px+):** Header sticks at 128px, circles 64px, trigger point 250px from top
- **Tablet (768-1023px):** Header sticks at 64px, circles 64px, trigger point 250px from top
- **Mobile (767px and below):** No sticky header, circles 48px, dynamic trigger point (header height + 40px)

### Colors

- Circle fill: `var(--color-brand-100)` - #becfff
- Active border: `var(--color-brand-100)` - #becfff
- Progressive line: `var(--color-brand-900)` - #0f2047
- Background line: `var(--color-gray-100)` - #262626

### Known Issues / TODO

- **Mobile:** Sticky header (eyebrow + heading + subheader) not working - needs investigation of HubSpot page context preventing `position: sticky` from functioning correctly

---

## Article with Table of Contents Module

A long-form article module with automatic table of contents navigation and scroll spy functionality.

### Status
⚠️ **First draft created - substantial styling work needed to match Figma design on both desktop and mobile**

### Current Implementation

- Two-column layout (desktop/tablet)
- Auto-generated table of contents from article sections
- Scroll spy to highlight active section
- Smooth scroll navigation
- Sticky TOC positioning (desktop left, mobile top)
- References accordion
- Up to 20 article sections

### Layout Structure

**Desktop/Tablet (768px+):** Two-column layout
- Left: Sticky table of contents (560px width)
- Right: Article content sections (560px width)

**Mobile (767px and below):** Single column
- Sticky horizontal scrolling TOC at top
- Article sections stacked below

### Fields

- **Article Sections (repeater, 1-20 items):**
  - Section Title (text) - becomes H3 heading and TOC link
  - Section Content (rich text) - supports paragraphs, lists, links, formatting
  - Section Image (optional) - displays below section content
- **Show References** (boolean) - toggle references section
- **References Content** (rich text) - expandable accordion

### Features

**Table of Contents:**
- Auto-generated from section titles
- Active section highlighting via scroll spy
- Smooth scroll on link click
- Desktop: Vertical list, sticky left column
- Mobile: Horizontal pills, sticky top bar

**Article Sections:**
- Rich text content with full formatting support
- Optional images between sections
- Scroll spy tracking

**References Accordion:**
- Optional expandable section
- Plus icon (rotates to X when open)
- Smooth height transition

### TODO - Styling Refinement Needed

**Desktop:**
- Match exact spacing from Figma (128px top padding, 96px right padding on TOC)
- Verify typography sizing and weights match design
- Check image border radius and spacing
- Fine-tune TOC link hover states and transitions

**Mobile:**
- Implement horizontal scroll TOC design (not in Figma, needs to be added)
- Adjust pill button styling for active/inactive states
- Verify spacing and padding matches mobile design patterns
- Test sticky TOC behavior and scroll performance

**General:**
- Test with real content and long articles
- Verify scroll spy accuracy with different section heights
- Check accessibility (keyboard navigation, screen readers)
- Test References accordion interaction

---

## Team Cards Module

A responsive grid module displaying team members with photos and expandable biographies.

### Status
✅ **Complete** - Desktop and mobile layouts implemented with accordion expansion

### Current Implementation

- 3-column grid (desktop) → 2-column (tablet) → 1-column (mobile)
- Team member photos with 4:5 aspect ratio
- Name and credentials displayed on single line with comma separator
- Expandable biography content via accordion
- Plus/minus icon toggle (matches accordion pattern)
- Full keyboard accessibility

### Layout Structure

- **Desktop (1024px+):** 3-column grid with 24px gap
- **Tablet (768-1023px):** 2-column grid with 16px gap
- **Mobile (767px and below):** Single column with 24px gap

### Fields

- **Team Members (repeater, 1-20 items):**
  - Photo (image, 4:5 aspect ratio recommended)
  - Member Name (text)
  - Title/Credentials (text)
  - Bio/Details (rich text, expandable)

### Features

**Card Structure:**
- Image with 4:5 aspect ratio and 8px border-radius
- Header row with name/credentials and expand icon side-by-side
- Name and credentials displayed as: "Name, Credentials"
- Both use bold body text (16px, semibold 600)

**Expand/Collapse:**
- Entire header row is clickable
- Plus icon (collapsed) switches to minus icon (expanded)
- Icon uses heavier dots (r="2") to match text weight
- Smooth max-height transition (0.3s)
- Keyboard support (Enter/Space)

**Biography Content:**
- Rich text with full formatting support
- Paragraphs, lists, links automatically styled
- Body Small font size (14px)
- Secondary text color

**Responsive Grid:**
- Desktop: 3 columns for team overview
- Tablet: 2 columns for better readability
- Mobile: 1 column stacked vertically

**Brand Variables:**
- All typography, colors, spacing uses CSS variables
- Icon colors controlled via CSS (not hardcoded in SVG)
- Transitions use `var(--transition-duration)`

### Typography

**Name & Credentials:**
- Font: Body (16px)
- Weight: Semibold (600)
- Line-height: Normal (1.5)
- Color: Primary text (#161616)
- Format: "Name, Credentials" on single line

**Bio Content:**
- Font: Body Small (14px)
- Weight: Regular (450)
- Line-height: Relaxed (1.6)
- Color: Secondary text (#525252)

### Accessibility

- Header row has `role="button"` and `tabindex="0"`
- `aria-expanded` attribute toggles between "true"/"false"
- `aria-label` provides context for screen readers
- Keyboard navigation (Enter and Space keys)
- Focus states for interactive elements

### Usage

Typically paired with Section Builder module for page structure:

```
Section Builder:
- Eyebrow: "Our Team"
- Heading: "Meet the Experts"
- Subheader: "Board-certified specialists..."

Team Cards Module:
- Add 3-6 team member cards
- Each with photo, name, credentials, bio
```

---

## Grid 2x2 Card Image Module

A 2x2 grid displaying four image cards with eyebrows, headings, descriptions, and optional buttons. Supports both image backgrounds and solid background colors.

### Status
✅ **Production Ready**

### Layout Structure

**Desktop/Tablet (768px+):** 2x2 grid layout with 16px gap
**Mobile (767px and below):** Single column stacked layout with 16px gap

### Background Options

Each card can use either:
1. **Image Background** - Traditional card with image overlay
2. **Background Color** - Solid color from Figma preset system with user-controlled text/eyebrow styles

### Background Color System

**Preset Options:**
- Background colors: White, Beige, Blue
- Brand colors: 5 shades each of Primary (brand-100 to brand-900) and Secondary (brand-secondary-100 to brand-secondary-900)
- Neutral colors: neutral-900 (light gray), neutral-0 (dark)
- Custom color picker for one-off colors

**User-Controlled Styling (when using background color):**
- **Text Color Style:** Primary (dark text) or Inverse (white text)
- **Eyebrow Style:** Primary (dark semi-transparent) or Secondary (white semi-transparent)

These fields only appear when a background color is selected (not images).

### Fields

**Per Card (4 cards total):**
- **Background Option:**
  - Background Color Preset (dropdown)
  - Custom Background Color (color picker, shown when "Custom" selected)
  - Image (fallback if no color selected)
- **Text Color Style:** Primary or Inverse (conditional field)
- **Eyebrow Style:** Primary or Secondary (conditional field)
- **Eyebrow Text:** Optional badge text
- **Title:** Card heading (H3)
- **Description:** Rich text content
- **Button Text:** Optional CTA text
- **Button Link:** URL field with link picker

### Features

**Flexible Background System:**
- All Figma colors available as presets
- Automatic brand color adaptation
- Custom color option for one-offs
- Backwards compatible with existing image-based cards

**User-Controlled Text Styling:**
- No hardcoded light/dark logic
- Users select appropriate text color for their background
- Users select appropriate eyebrow style for their background
- Future-proof as new colors are added

**Card Structure:**
- Eyebrow badge at top (optional)
- H3 heading
- Rich text description
- Optional button CTA
- Minimum height 540px (desktop), 400px (mobile)

**Brand Variables:**
- All typography, colors, spacing uses CSS variables
- Fully responsive with automatic breakpoint adjustments

### Typography

**Eyebrow:**
- Font: Body Small (14px)
- Weight: Regular (400)
- Transform: Uppercase
- Color: Controlled by eyebrow style selection

**Card Title:**
- Font: H3 (36px desktop, 28px tablet/mobile)
- Weight: Medium (500)
- Line-height: 1.15
- Color: Controlled by text color style selection

**Card Description:**
- Font: Body (16px)
- Weight: Regular (400)
- Line-height: 1.35
- Color: Controlled by text color style selection

### Usage Example

```
Card 1: Image Background
- Image: team-photo.jpg
- Eyebrow: "Our Team"
- Title: "Expert Care"
- Description: "Board-certified physicians..."

Card 2: Brand Color Background
- Background: brand-500 (Medium Brand)
- Text Color Style: Inverse (white text)
- Eyebrow Style: Secondary (white semi-transparent)
- Title: "Advanced Technology"
- Description: "State-of-the-art facilities..."
```

---

## Image Card Overlay 3 Column Module

A 3-column grid displaying image cards with eyebrows, headings, descriptions, and optional links. Supports both image backgrounds and solid background colors.

### Status
✅ **Production Ready**

### Layout Structure

**Desktop (1024px+):** 3-column grid with 16px gap
**Tablet (768-1023px):** 2-column grid with 16px gap
**Mobile (767px and below):** Single column stacked layout with 16px gap

### Background Color System

Same as Grid 2x2 Card Image Module:
- Figma preset colors (background, brand, neutral)
- Custom color option
- User-controlled text and eyebrow styling
- All colors brand-adaptive

### Fields

**Per Card (3 cards total):**
- **Background Option:**
  - Background Color Preset (dropdown)
  - Custom Background Color (color picker, conditional)
  - Image (fallback)
- **Text Color Style:** Primary or Inverse (conditional)
- **Eyebrow Style:** Primary or Secondary (conditional)
- **Eyebrow Text:** Optional badge
- **Title:** Card heading (H3)
- **Description:** Rich text content
- **Link Text:** Optional link text
- **Link URL:** URL field with link picker

### Features

- Flexible background system (images or colors)
- User-controlled text/eyebrow styling
- 3-column responsive grid
- Minimum height 480px per card
- Optional link at bottom of each card
- Brand variables for all styling

### Differences from Grid 2x2

- 3 cards instead of 4
- 3-column layout (desktop) vs 2x2 grid
- Links instead of buttons
- Slightly shorter minimum height (480px vs 540px)

---

## Image Card Overlay 4 Column Module

A 4-column grid displaying image cards with eyebrows, headings, descriptions, and optional links. Supports both image backgrounds and solid background colors.

### Status
✅ **Production Ready**

### Layout Structure

**Desktop (1024px+):** 4-column grid with 16px gap
**Tablet (768-1023px):** 2-column grid with 16px gap
**Mobile (767px and below):** Single column stacked layout with 16px gap

### Background Color System

Same as Grid 2x2 Card Image Module:
- Figma preset colors (background, brand, neutral)
- Custom color option
- User-controlled text and eyebrow styling
- All colors brand-adaptive

### Fields

**Per Card (4 cards total):**
- **Background Option:**
  - Background Color Preset (dropdown)
  - Custom Background Color (color picker, conditional)
  - Image (fallback)
- **Text Color Style:** Primary or Inverse (conditional)
- **Eyebrow Style:** Primary or Secondary (conditional)
- **Eyebrow Text:** Optional badge
- **Title:** Card heading (H3)
- **Description:** Rich text content
- **Link Text:** Optional link text
- **Link URL:** URL field with link picker

### Features

- Flexible background system (images or colors)
- User-controlled text/eyebrow styling
- 4-column responsive grid
- Minimum height 360px per card
- Optional link at bottom of each card
- Brand variables for all styling

### Differences from 3 Column

- 4 cards instead of 3
- 4-column layout (desktop) vs 3-column
- Shorter minimum height (360px vs 480px)
- More compact card design for overview layouts

---

## Content Checklist Block Module

A content block displaying a feature list with checkmarks, eyebrow, heading, and description. Supports Figma-aligned background colors.

### Status
✅ **Production Ready**

### Layout Structure

Single-column layout with:
- Eyebrow badge (optional)
- Heading (H2)
- Description (rich text)
- Feature list with checkmarks (up to 10 items)

### Background Color System

**Preset Options:**
- Background colors: White, Beige, Blue
- Brand colors: 5 shades each of Primary (brand-100 to brand-900) and Secondary (brand-secondary-100 to brand-secondary-900)
- Neutral colors: neutral-900 (light gray), neutral-0 (dark)
- Custom color picker for one-off colors

**Backwards Compatibility:**
- Checks for old `background_color` field first
- Falls back to new preset system if old field doesn't exist
- Ensures existing pages continue working

### Fields

- **Eyebrow Text:** Optional label
- **Heading:** Main section heading (H2)
- **Description:** Rich text content
- **Background Color Preset:** Dropdown with Figma colors
- **Custom Background Color:** Color picker (conditional, shown when "Custom" selected)
- **Feature List Items (repeater, 1-10 items):**
  - Feature Text (text)

### Features

**Checkmark List:**
- Up to 10 feature items
- Green checkmark icons
- Responsive typography
- Clean vertical spacing

**Background System:**
- All Figma preset colors available
- Automatic brand adaptation
- Custom color fallback
- Transparent option supported

**Brand Variables:**
- All typography, colors, spacing uses CSS variables
- Fully responsive design

### Typography

**Eyebrow:**
- Font: Body Small (14px)
- Weight: Regular (400)
- Transform: Uppercase

**Heading:**
- Font: H2 (48px desktop, 32px tablet/mobile)
- Weight: Medium (500)
- Line-height: 1.15

**Description:**
- Font: Body (16px)
- Weight: Regular (400)
- Line-height: 1.35

**Feature Items:**
- Font: Body (16px)
- Weight: Regular (400)
- Color: Primary text

### Usage Example

```
Eyebrow: "Benefits"
Heading: "Why Choose Cellcolabs"
Description: "Our comprehensive approach ensures..."
Background: brand-100 (Lightest Brand)

Features:
- Board-certified physicians
- State-of-the-art facilities
- Personalized treatment plans
- 24/7 patient support
```

---

## Eyebrow Block Module

A standalone eyebrow/badge component with multiple style variants and alignment options.

### Status
✅ **Production Ready**

### Variants

**Default:** Dark semi-transparent background on light backgrounds
- Background: `--color-gray-900` (#F4F4F4)
- Text: Secondary text color

**Inverted:** Dark semi-transparent for light backgrounds (Figma-aligned)
- Background: `--color-eyebrow-bg-primary` (rgba(22, 22, 22, 0.08))
- Text: Secondary text color
- Uses centralized variable

**Glass:** White semi-transparent for dark/image backgrounds (Figma-aligned)
- Background: `--color-eyebrow-bg-secondary` (rgba(255, 255, 255, 0.12))
- Backdrop filter: blur(8px)
- Text: Inverse text color (white)
- Uses centralized variable

### Alignment Options

- **Left:** Aligned to left edge
- **Left-Center:** Aligned left with 25% left padding (15% on mobile)
- **Center:** Centered
- **Right-Center:** Aligned right with 25% right padding (15% on mobile)
- **Right:** Aligned to right edge

### Fields

- **Text:** Eyebrow content
- **Variant:** Default, Inverted, or Glass
- **Alignment:** Left, Left-Center, Center, Right-Center, or Right

### Features

**Centralized Styling:**
- Uses shared eyebrow variables from child.css
- Consistent with eyebrows in Section Builder, Process Steps, and other modules
- Single source of truth for eyebrow backgrounds

**Responsive Design:**
- Alignment offsets reduce on mobile
- Font size and padding use CSS variables
- Auto-adjusts to breakpoints

**Typography:**
- Font: Body Small (14px)
- Weight: Regular (400)
- Transform: Uppercase
- Line-height: 1.35

### Usage

Can be used standalone or within Section Builder for more control over eyebrow placement and alignment.

```
Text: "New Feature"
Variant: Glass
Alignment: Center
```

---

## Locations Carousel Block V2 Module

A two-column section displaying location information with multi-image carousels per location. Supports tab navigation, auto-play, and mobile-specific images.

### Status
✅ **Complete** - Ready for production use

⚠️ **CLEANUP NEEDED:** Once V2 is fully tested and implemented in production, the original `locations-carousel-block.module` should be deprecated and removed.

### Layout Structure

**Desktop/Tablet (768px+):** Two-column layout
- Left: Eyebrow, heading, and description content
- Right: Location tabs and image carousel

**Mobile (767px and below):** Stacked layout
- Content section at top
- Location tabs and carousel below

### Fields

**Global Settings:**
- **Eyebrow Text:** Optional label (default: "Locations")
  - Uses `--color-eyebrow-bg-primary` variable for consistent styling
- **Main Title:** Section heading (default: "Stem cell therapy in the Bahamas")
- **Main Description:** Rich text description
- **Auto-play Image Carousel:** Boolean toggle for automatic image cycling
- **Auto-play Interval:** Milliseconds between transitions (default: 5000ms)

**Per Location (supports 2 locations):**
- **Location Name:** Short name for tab button
- **Location Title:** Full title displayed above description
- **Location Description:** Rich text content
- **Location Images:** Group field supporting 1-10 images per location
  - Desktop Image (required)
  - Mobile Image (optional - falls back to desktop if not provided)
  - Responsive visibility controls (show_on_desktop, show_on_tablet, show_on_mobile)
- **Link Text:** Call-to-action text (default: "Get directions ↗")
- **Link URL:** Destination URL

### Features

**Multi-Image Carousel:**
- Up to 10 images per location
- Navigation dots for manual control
- Optional auto-play with configurable interval
- Smooth transitions between images
- Pauses on hover (when auto-play enabled)

**Responsive Images:**
- Separate desktop and mobile image uploads
- Automatic fallback to desktop image if mobile not provided
- Per-image visibility controls for each breakpoint
- Lazy loading for performance

**Tab Navigation:**
- Switch between locations with tab buttons
- Active state styling
- Smooth content transitions
- Keyboard accessible

**Link Styling:**
- Uses `.link-black` utility class for consistent black link color
- Arrow indicator (↗) for external/direction links
- Hover states

### Key Improvements Over V1

1. **Multiple Images Per Location:** V1 only supported single image per location, V2 supports up to 10
2. **Auto-play Functionality:** Automatic carousel rotation with configurable timing
3. **Responsive Images:** Separate mobile/desktop images for optimized display
4. **Visibility Controls:** Show/hide specific images on specific breakpoints
5. **Better Performance:** Image lazy loading and optimized carousel logic

### Migration from V1

When migrating from `locations-carousel-block.module` to V2:
1. **Images:** Convert single image field to images array (1 item)
2. **Auto-play:** Decide if auto-play should be enabled (default: false)
3. **Mobile Images:** Add mobile-optimized images if needed
4. **Test Thoroughly:** Ensure carousel navigation and transitions work as expected
5. **Update Pages:** Replace V1 module instances with V2
6. **Remove V1:** After all pages migrated, delete `locations-carousel-block.module` folder

### Brand Variables

- All typography uses CSS variables
- Link colors use utility classes
- Spacing uses brand spacing system
- Fully responsive with automatic breakpoint adjustments

### TODO - Cleanup

🧹 **IMPORTANT:** Once V2 is confirmed working in production:
1. Search for all pages using `locations-carousel-block.module` (V1)
2. Migrate those pages to V2
3. Delete the V1 module folder: `modules/locations-carousel-block.module/`
4. Remove V1 documentation from this catalog
5. Update module references in any tutorials or guides

---

## Locations Carousel Block (V1) - DEPRECATED

⚠️ **DEPRECATED:** This module is being replaced by `locations-carousel-blockv2.module`. See above for migration instructions.

### Why V2 Was Created

V1 limitations:
- Single image per location only
- No auto-play functionality
- No separate mobile images
- No per-image visibility controls
- Less flexible for content editors

**Action Required:** Migrate all instances to V2 and remove this module once migration is complete.

---

## Module Development Guidelines

### For All Modules

1. **Use Brand Variables**
   - All colors: `var(--color-*)`
   - All typography: `var(--font-*)`
   - All spacing: `var(--space-*)`

2. **Responsive Design**
   - Desktop: 1024px+
   - Tablet: 768-1023px
   - Mobile: 767px and below

3. **Accessibility**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support
   - Focus states for interactive elements

4. **Module Structure**
   ```
   modules/[module-name].module/
   ├── module.html    # HubL template + embedded CSS
   ├── fields.json    # Content fields
   └── meta.json      # Module metadata
   ```

5. **Testing Checklist**
   - [ ] Desktop layout
   - [ ] Tablet layout
   - [ ] Mobile layout
   - [ ] Brand color switching
   - [ ] Keyboard accessibility
   - [ ] Screen reader support
   - [ ] Rich text formatting
   - [ ] Image handling

---

**Last Updated**: October 23, 2025
**Maintained By**: Development Team

## Adding New Modules

When documenting a new module:

1. Add module section following the template above
2. Include status badge (✅ Complete, ⚠️ In Progress, ❌ Planned)
3. Document all fields and their types
4. List all features and interactions
5. Include responsive behavior details
6. Note any known issues or TODOs
7. Add usage examples where helpful
8. Update the date at the bottom
