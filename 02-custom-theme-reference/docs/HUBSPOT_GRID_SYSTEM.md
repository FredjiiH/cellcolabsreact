# Custom Figma Grid System for HubSpot

## Problem Solved
The HubSpot drag-and-drop editor was causing content to stack vertically regardless of column settings. This has been fixed by implementing a **custom Figma grid system** that completely replaces HubSpot's Bootstrap 2 grid with pixel-perfect Figma specifications.

## Custom Grid Strategy

### Complete Override Approach
1. **Removed HubSpot's `layout.css`**: No longer loads Bootstrap 2 grid mechanics
2. **Custom Figma Grid in `main.css`**: Direct implementation of Figma design system measurements
3. **Override HubSpot Classes**: `span*` classes now use Figma flexbox grid instead of Bootstrap percentages

### Result: Pure Figma Implementation
- ✅ **Pixel Perfect**: Exact Figma measurements, not approximations
- ✅ **Fixed Gutters**: 16px gutters (not percentage-based)
- ✅ **Responsive**: Follows Figma's mobile-first approach
- ✅ **HubSpot Compatible**: Drag-and-drop still works, but outputs Figma grid

## Grid System Breakdown

### Figma Design System (Visual Design)
- **Desktop (1024px+)**: 12 columns, 1440px max container, 152px margins
- **Tablet (768px-1023px)**: 8-column grid, 24px margins
- **Mobile (<768px)**: 4-column grid (stacks to single), 16px margins

### Custom Figma Grid Implementation
- **Container**: 1440px max-width, centered with auto margins
- **Fixed Gutters**: 16px gaps between all columns
- **Flexbox Layout**: `display: flex` with `gap` property
- **Column Classes**: `span1` through `span12` + `figma-col-*` alternatives

### Exact Figma Measurements

**Desktop (1024px+)**:
- **Container**: 1440px max-width, centered
- **Side margins**: 152px left/right padding
- **Content area**: 1136px (1440 - 304)
- **4-column** (`span3`): `calc(25% - 12px)` = ~272px each
- **3-column** (`span4`): `calc(33.333% - 10.67px)` = ~368px each
- **2-column** (`span6`): `calc(50% - 8px)` = ~560px each

**Tablet (768px-1023px)**:
- **Side margins**: 24px left/right padding
- **8-column grid**: Spans mapped to 8-column proportions

**Mobile (<768px)**:
- **Side margins**: 16px left/right padding
- **Stacked layout**: All columns become full width

## Practical Usage Examples

### Scenario 1: Content Editor Using HubSpot DND

```html
<!-- HubSpot automatically generates this structure -->
<div class="row-fluid-wrapper dnd-section">  <!-- 1440px max, 152px padding -->
  <div class="row-fluid">  <!-- Flexbox with 16px gap -->
    <div class="span4">Article 1</div>  <!-- calc(33.333% - 10.67px) -->
    <div class="span4">Article 2</div>  <!-- calc(33.333% - 10.67px) -->
    <div class="span4">Article 3</div>  <!-- calc(33.333% - 10.67px) -->
  </div>
</div>
```

**Result**: Pixel-perfect 3-column layout with exact Figma measurements

### Scenario 2: Developer Creating Custom Module (Option 1)

```html
<!-- Using HubSpot classes (styled with Figma measurements) -->
<div class="row-fluid">
  <div class="span8">  <!-- 2/3 width with Figma calculations -->
    <div class="figma-component">
      <h2>{{ module.heading }}</h2>
      <p>{{ module.description }}</p>
      <a href="{{ module.cta_url }}" class="btn btn-primary">{{ module.cta_text }}</a>
    </div>
  </div>
  <div class="span4">  <!-- 1/3 width with Figma calculations -->
    <div class="figma-component content-center">
      <img src="{{ module.image.src }}" alt="{{ module.image.alt }}">
    </div>
  </div>
</div>
```

### Scenario 3: Developer Creating Custom Module (Option 2)

```html
<!-- Using semantic Figma classes -->
<div class="figma-row">
  <div class="figma-col-8">
    <h2>{{ module.heading }}</h2>
    <p>{{ module.description }}</p>
  </div>
  <div class="figma-col-4">
    <img src="{{ module.image.src }}" alt="{{ module.image.alt }}">
  </div>
</div>
```

**Result**: Both approaches produce identical Figma-perfect layouts

## Available Utility Classes for Developers

### Figma Component Classes
```css
.figma-component       /* Standard 24px padding */
.figma-component-sm    /* Small 16px padding */
.figma-component-lg    /* Large 32px padding */
```

### Content Alignment
```css
.content-center        /* Center align text */
.content-left          /* Left align text */
.content-right         /* Right align text */
```

### Vertical Spacing
```css
.v-space-sm           /* 16px bottom margin */
.v-space-md           /* 24px bottom margin */
.v-space-lg           /* 32px bottom margin */
.v-space-xl           /* 48px bottom margin */
```

### Semantic Layout Helpers
```css
.layout-third         /* Use with span4 - semantic 1/3 width */
.layout-half          /* Use with span6 - semantic 1/2 width */
.layout-two-thirds    /* Use with span8 - semantic 2/3 width */
.layout-full          /* Use with span12 - semantic full width */
```

## HubSpot DND Template Structure

### Standard Page Template
```html
{% dnd_area "main" %}
  {% dnd_section %}
    <!-- row-fluid-wrapper automatically constrained by our CSS -->
    {% dnd_column width=12 %}
      {% dnd_row %}
        <!-- Content automatically uses correct grid system -->
      {% end_dnd_row %}
    {% end_dnd_column %}
  {% end_dnd_section %}
{% end_dnd_area %}
```

### Custom Module Template
```html
<!-- modules/feature-section/module.html -->
<div class="row-fluid">
  <div class="span6 layout-half">
    <div class="figma-component">
      <h3>{{ module.title }}</h3>
      <p class="v-space-md">{{ module.description }}</p>
      <a href="{{ module.link.url }}" class="btn btn-primary">{{ module.link.text }}</a>
    </div>
  </div>
  <div class="span6 layout-half">
    <div class="figma-component content-center">
      {% if module.image.src %}
        <img src="{{ module.image.src }}" alt="{{ module.image.alt }}" class="img-responsive">
      {% endif %}
    </div>
  </div>
</div>
```

## HubSpot Column Mapping Guide

### Standard Layout Mappings
When using HubSpot's drag-and-drop editor, these layouts automatically map to spans:

- **2-Column (50%/50%)**: Maps to `span6` + `span6`
- **3-Column (33%/33%/33%)**: Maps to `span4` + `span4` + `span4`
- **4-Column (25%/25%/25%/25%)**: Maps to `span3` + `span3` + `span3` + `span3`
- **Sidebar (66%/33%)**: Maps to `span8` + `span4`
- **Sidebar (33%/66%)**: Maps to `span4` + `span8`

### Mobile Behavior
- All spans automatically stack to full width on mobile
- Maintains proper 16px margins from design system
- Text and images scale responsively within constraints
- Vertical spacing preserved between stacked elements

## Grid Measurements

### Desktop (1440px container)
- **Container**: 1440px max-width
- **Side margins**: 152px each side
- **Content area**: 1136px
- **Columns**: 12 columns × 80px = 960px
- **Gutters**: 11 gutters × 16px = 176px

### Tablet (768px-1023px)
- **Container**: 100% width
- **Side margins**: 24px each side
- **Columns**: 8-column simplified grid
- **Responsive breakpoint**: Maintains horizontal layout

### Mobile (<768px)
- **Container**: 100% width
- **Side margins**: 16px each side
- **Behavior**: Single column stack
- **Gutters**: Maintained for consistency

## CSS Implementation Details

### Grid Container
```css
.grid-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 1024px) {
  .grid-container {
    padding-left: 152px;
    padding-right: 152px;
  }
}
```

### Column System
```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
}

.col {
  padding-left: 8px;
  padding-right: 8px;
  min-width: 0;
}
```

## Testing Checklist

After implementing the grid system:

- [ ] **Desktop**: Content aligns to 12-column grid with 152px margins
- [ ] **Tablet**: Content uses 8-column grid with 24px margins
- [ ] **Mobile**: Content stacks properly with 16px margins
- [ ] **HubSpot Editor**: Drag-and-drop respects column widths
- [ ] **Modules**: Custom modules align to grid system
- [ ] **Responsive**: Proper breakpoint behavior across devices

## Common Issues & Solutions

### Issue: Content Still Stacking
**Solution**: Ensure `grid-container` wraps the content area and columns use proper responsive classes.

### Issue: Content Too Wide on Desktop
**Solution**: Check that `grid-container` class is applied and CSS variables are loaded.

### Issue: Mobile Layout Broken
**Solution**: Verify mobile-first responsive classes are applied (`col-sm-12` for full width).

### Issue: HubSpot Editor Not Respecting Layout
**Solution**: Check that DND areas use proper `dnd-column` and `dnd-row` structure with width constraints.

## Technical Implementation

### File Structure
1. **`hubspot-theme/css/main.css`**: Complete custom Figma grid system
2. **`hubspot-theme/templates/base.html`**: Loads only main.css (no layout.css)
3. **`hubspot-theme/css/layout.css`**: Still uploaded but not loaded (ignored)

### CSS Loading Strategy
```html
<!-- In base.html head section -->
<!-- Custom Figma Grid System - replaces HubSpot's layout.css -->
<link rel="stylesheet" href="{{ get_asset_url('../css/main.css') }}">
```

### Key CSS Implementation
```css
/* Container - Figma specifications */
.row-fluid-wrapper.dnd-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 152px; /* Desktop margins */
}

/* Row - Flexbox with fixed gutters */
.row-fluid {
  display: flex;
  gap: 16px; /* Fixed Figma gutters */
}

/* Columns - Exact Figma calculations */
.span3 { flex: 0 0 calc(25% - 12px); }       /* 4-column */
.span4 { flex: 0 0 calc(33.333% - 10.67px); } /* 3-column */
.span6 { flex: 0 0 calc(50% - 8px); }        /* 2-column */
```

## Success Metrics

✅ **HubSpot DND layouts display side-by-side with pixel-perfect spacing**
✅ **Container exactly 1440px max-width, centered on page**
✅ **Fixed 16px gutters between all columns (not percentage-based)**
✅ **Exact Figma measurements: 152px desktop margins, 24px tablet, 16px mobile**
✅ **All layout types (2-col, 3-col, 4-col) have identical content boundaries**
✅ **Custom modules use same grid system as DND layouts**
✅ **Mobile-first responsive behavior follows Figma specifications**

## Current Status: ✅ COMPLETE

The custom Figma grid system successfully replaces HubSpot's Bootstrap 2 grid with pixel-perfect Figma measurements while maintaining full drag-and-drop compatibility.

### Verified Working:
- **4-column layouts**: All columns display side-by-side
- **3-column layouts**: Perfect spacing and alignment
- **2-column layouts**: Exact 50/50 splits
- **Container alignment**: Properly centered with consistent boundaries
- **Responsive behavior**: Mobile stacking, tablet 8-column adaptation
- **Custom module compatibility**: Grid system doesn't interfere with custom modules

### Recent Updates (January 2025):
- **Mobile Stacking Fixed**: Added `flex-direction: column` for proper mobile behavior
- **Responsive Breakpoints**: Clarified tablet (768px-1023px) and desktop (1024px+) behavior
- **Custom Module Protection**: Added CSS exceptions to prevent grid interference with custom modules
- **Clean Implementation**: Removed unnecessary vertical centering attempts, keeping focus on working horizontal layouts

### Mobile/Tablet Behavior:
- **Mobile (<768px)**: All layouts stack vertically with 16px spacing
- **Tablet (768px-1023px)**: Layouts remain horizontal with 8-column proportions and 24px margins
- **Desktop (1024px+)**: Full 12-column Figma grid with 152px margins and 16px gutters

### Custom Module Compatibility:
Grid system now includes exceptions for custom modules to prevent CSS conflicts:
- Custom module containers maintain their own styling
- No interference with `content-section__*` classes
- Preserves intended custom widget layouts

### Next Steps:
- Ready for production use with all layout types working correctly
- Vertical centering can be revisited in future iterations if needed