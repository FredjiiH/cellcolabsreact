# Navigation System Documentation

## Overview
The navigation system implements the Figma design specifications with full HubSpot integration for no-code editing by content editors.

## Design Implementation

### Desktop Navigation (1024px+)
- **Logo**: Text-based with Inter Semi Bold + Light styling
- **Menu**: Horizontal layout with 6 main items
- **Typography**: 14px Inter Medium with 12px horizontal padding
- **Layout**: 152px horizontal padding, 16px vertical padding
- **Features**: Hover effects, dropdown support for submenus

### Tablet & Mobile Navigation (767px and below)
- **Logo**: Compact "cellcolabs CLINICAL" styling
- **Menu**: 3x3 dot grid hamburger menu
- **Mobile Menu**: Slide-down overlay with vertical menu items
- **Divider**: Horizontal line below header
- **Features**: Touch-friendly interactions, escape key support

## HubSpot Integration

### Menu Management (No-Code)
1. **HubSpot Menu Builder Integration**:
   - Go to Content > Menus in HubSpot
   - Create/edit menus with drag-and-drop interface
   - Supports multi-level menu hierarchies
   - Automatic active state detection

2. **Theme Settings Configuration**:
   - Primary Menu selection in Design Manager
   - Logo type choice (Text/Image)
   - Brand text customization
   - Google Fonts URL management

### Module Structure
```
hubspot-theme/modules/navigation/
├── module.html      # Main navigation template
├── fields.json      # Module field configuration
└── meta.json        # Module metadata
```

## Theme Settings (Design Manager)

### Brand Settings
- **Active Brand**: Choose between Cellcolabs/Cellcolabs Clinical
- **Automatic Styling**: Theme variables update based on selection

### Navigation Settings
- **Primary Menu**: Select from HubSpot Menu Builder
- **Logo Type**: Text or Image options
- **Logo Image**: Upload with size recommendations
- **Brand Text**: Customizable bold/light text combination

### Typography Settings
- **Heading Font URL**: Google Fonts URL for Bricolage Grotesque
- **Body Font URL**: Google Fonts URL for Inter Variable

## CSS Architecture

### Variable-Based Styling
```css
/* Uses theme system variables */
--font-body: 'Inter Variable', 'Inter', sans-serif
--font-weight-semibold: 650
--font-weight-medium: 500
--space-8, --space-16, --space-24: Consistent spacing
--color-text-primary, --color-text-link: Theme colors
```

### Responsive Breakpoints
- **Mobile**: 0-767px
- **Tablet**: 768px-1023px
- **Desktop**: 1024px+

### Key Features
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: CSS-only animations, optimized selectors
- **SEO**: Semantic HTML structure, proper heading hierarchy

## Content Editor Workflow

### Adding/Editing Menu Items
1. Navigate to **Content > Menus** in HubSpot
2. Select or create a menu
3. Add/edit menu items with drag-and-drop
4. Set URLs, labels, and hierarchy
5. Save and publish

### Customizing Navigation
1. Go to **Design Manager > Theme Settings**
2. Configure under "Navigation Settings"
3. Choose menu, logo type, and brand text
4. Save settings - changes apply automatically

### Logo Management
- **Text Logo**: Edit brand text in theme settings
- **Image Logo**: Upload in theme settings (recommended: 200x50px)
- **Link**: Configure logo destination URL

## JavaScript Functionality

### Mobile Menu
- Toggle functionality with ARIA state management
- Body scroll lock when menu is open
- Click outside to close
- Escape key support

### Accessibility Features
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic markup

## Implementation Benefits

### For Developers
- **Figma-Aligned**: Exact implementation of design specifications
- **Variable-Based**: Easy theme customization and brand switching
- **Modular**: Reusable navigation module across templates

### For Content Editors
- **No-Code Menu Management**: Full menu control through HubSpot interface
- **Visual Settings**: Easy logo and branding customization
- **Immediate Preview**: Changes reflect instantly in Design Manager

### For Users
- **Responsive Design**: Optimal experience across all devices
- **Fast Loading**: Lightweight CSS and JavaScript
- **Accessible**: Full keyboard and screen reader support

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Performance Considerations
- CSS-only animations where possible
- Optimized JavaScript for mobile interactions
- Minimal DOM manipulation
- Efficient event handling

## Current Implementation Status (2025-09-22)

### ✅ **Completed Features**
- **Navigation Structure**: Complete HubSpot navigation module with responsive design
- **Logo Implementation**: Working text logo (desktop 1440px+) and image logo (mobile/tablet)
- **Menu Integration**: Successfully integrated with HubSpot Menu Builder ("main_navigation")
- **Responsive Design**: Proper breakpoint behavior (mobile, tablet, desktop)
- **Mobile Menu**: Functional hamburger menu with 3x3 dot pattern and slide-down behavior
- **CSS Variables**: All styling uses theme variables for consistent design system
- **HubSpot Classes**: Targeting actual HubSpot-generated menu classes (.hs-menu-wrapper, .hs-menu-item)
- **Theme Upload**: Successfully deployed to HubSpot Design Manager

### ⚠️ **Known Issues**
- **Sticky Navigation**: Despite multiple approaches (CSS sticky, !important, JavaScript fallbacks), navigation not sticking to top on scroll
  - Attempted CSS `position: sticky` on both nav and header elements
  - Tried `!important` declarations to override HubSpot defaults
  - Implemented JavaScript scroll-based fixed positioning fallback
  - Issue likely related to HubSpot's page structure or CSS interference

### 🎯 **Working Components**
- **Logo Display**: Cellcolabs Clinical logo image loads correctly from HubSpot File Manager
- **Text Logo**: Proper Barlow font styling with bold/light weight variation
- **Menu Items**: Styled correctly with theme colors (#0066CC) and proper spacing
- **Mobile Menu**: Toggle functionality works with proper ARIA states
- **Responsive Breakpoints**: Logo switching works correctly at 1440px threshold

### 🔧 **Technical Implementation**
- **File Structure**: Navigation embedded directly in base.html template rather than separate module
- **CSS Approach**: Inline styles in template for maximum control over HubSpot environment
- **Menu References**: Hard-coded "main_navigation" menu name in template
- **Asset URLs**: Using direct HubSpot File Manager URLs for reliable image loading

### 📋 **Next Steps for Tomorrow**
1. **Debug Sticky Navigation**: Investigate HubSpot page wrapper elements that may prevent sticky behavior
2. **Browser Testing**: Test sticky navigation in different browsers and HubSpot preview modes
3. **Alternative Approaches**: Consider IntersectionObserver API for more reliable scroll detection
4. **HubSpot Documentation**: Research HubSpot-specific CSS best practices for sticky headers
5. **Template Structure**: Investigate if moving navigation outside page wrapper resolves sticky issues

### 📝 **Documentation Status**
- Navigation system fully documented with current implementation
- All CSS variables and responsive breakpoints catalogued
- HubSpot integration workflow documented for content editors
- Known sticky navigation issue documented for future resolution

## Future Enhancements
- Mega menu support for complex navigation
- Animation preferences (reduced motion)
- Multi-language menu support
- Search integration in navigation
- **Sticky Navigation Resolution**: Priority item for next development session