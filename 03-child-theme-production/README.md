# Child Theme Production System

🟢 **ACTIVE PRODUCTION SYSTEM**

Production-ready child theme extending the Growth marketplace theme with dual-brand support for Cellcolabs and Cellcolabs Clinical websites.

## 🎯 Overview

This is the **active production system** powering both:
- `cellcolabsclinical.com` (Blue theme - `#4F65BE`)
- `cellcolabs.com` (Green theme - `#00A651`)

## 🏗️ Architecture

### **Child Theme Strategy**
- **Extends**: `@hubspot/growth` marketplace theme
- **Benefits**: Inherits updates, easier maintenance, proven foundation
- **Approach**: Override only what's needed, inherit the rest

### **Theme Structure**
```
03-child-theme-production/
├── growth-child/           # Child theme (extends Growth theme)
│   ├── theme.json         # Theme configuration
│   ├── child.css          # Brand system + overrides (~1000 lines)
│   ├── child.js           # Navigation JavaScript
│   └── templates/
│       └── partials/
│           └── header.html # Complete navigation template
├── growth-theme/          # Parent Growth theme reference
│   ├── css/               # Original Growth theme styles
│   ├── js/                # Original Growth theme scripts
│   └── templates/         # Original Growth theme templates
└── docs/                  # Child theme documentation
```

## ⚡ Quick Deploy

### **Prerequisites**
- HubSpot CLI installed and configured
- Access to HubSpot portal (144549987)

### **Deploy to HubSpot**
```bash
cd growth-child
hs upload . --dest="growth child"
```

### **Growth Theme Reference**
The `growth-theme/` directory contains the parent Growth marketplace theme files for reference when developing child theme overrides. This helps understand the original structure and CSS selectors that need to be overridden.

### **HubSpot CLI Setup**
```bash
hs auth
# Follow prompts to authenticate with Personal Access Key
```

## 🎨 Dual Brand System

### **Automatic Domain Detection**
```javascript
// In header.html template
{% set current_brand = "cellcolabsclinical" %}
{% if request.domain == "cellcolabs.com" %}
  {% set current_brand = "cellcolabs" %}
{% endif %}
```

### **CSS Variable System**
```css
/* Clinical Brand (Default) */
[data-brand="cellcolabsclinical"] {
  --color-primary: #4F65BE;
  --color-text-link: #4F65BE;
}

/* Cellcolabs Brand */
[data-brand="cellcolabs"] {
  --color-primary: #00A651;
  --color-text-link: #00A651;
}
```

### **Brand Colors**
**Cellcolabs Clinical** (Production):
- Primary: `#4F65BE` (Blue)
- Accent: `#F9D400` (Yellow)
- Text: `#161616` (Dark)
- Background: `#FFFFFF` (White)

**Cellcolabs** (Green Theme):
- Primary: `#00A651` (Green)
- Accent: `#F9D400` (Yellow)
- Text: `#161616` (Dark)
- Background: `#FFFFFF` (White)

## 🧭 Navigation System

### **Desktop Navigation**
- **Menu Integration**: HubSpot "main_navigation" menu
- **Typography**: Inter Medium 16px
- **Container**: 1460px max-width with 24px padding
- **Hover Colors**: Brand-specific (blue/green)

### **Mobile Navigation**
- **Button**: 2x3 dot grid (6 dots horizontal layout)
- **Menu**: Slide-down overlay
- **Toggle**: JavaScript-powered with ARIA support
- **Responsive**: Hidden on desktop (1024px+)

### **Logo System**
- **Clinical**: "Cellcolabs Clinical" image logo
- **Cellcolabs**: "Cellcolabs" image logo
- **Responsive**: Same logo across all breakpoints

## 🔧 CSS Override Strategy

### **Nuclear Specificity**
Defeat Growth theme with maximum specificity:
```css
html body .header .nav-menu-desktop .hs-menu-wrapper .hs-menu-item > a {
  font-family: 'Inter', sans-serif !important;
  font-weight: 500 !important;
  color: #161616 !important;
}
```

### **Responsive Breakpoints**
- **Mobile**: 0-767px
- **Tablet**: 768px-1023px
- **Desktop**: 1024px+
- **Wide**: 1460px+

## ✅ Production Features

### **Completed & Working**
- ✅ Dual-brand color switching
- ✅ Desktop navigation with HubSpot Menu Builder
- ✅ Mobile menu with proper toggle functionality
- ✅ Responsive design across all breakpoints
- ✅ Brand-aware button/link colors
- ✅ Inter font system with proper weights
- ✅ Domain-based automatic brand detection
- ✅ Custom module width alignment with UI-built modules

### **Brand Switcher (Editor Mode)**
For testing purposes, includes a brand switcher visible only in editor mode:
- Positioned at top-left to avoid menu conflicts
- Switches between Clinical (Blue) and Cellcolabs (Green)
- Hidden on live websites

## 🚀 Development Workflow

### **Current Approach: HubSpot Theme Modules (Under Evaluation)**

#### **For Component Development**
1. **React Development** - Build components in `01-component-development/`
2. **Theme Module Creation** - Generate theme modules in `growth-child/modules/`
3. **Field Configuration** - Create `fields.json` for editable content
4. **HubSpot Deployment** - Deploy entire theme including modules via CLI

#### **Module Creation Process**
```bash
# 1. Create module in React environment
cd 01-component-development/
npm run dev

# 2. Create theme module structure
mkdir growth-child/modules/component-name.module/
# - module.html (HubL template)
# - fields.json (editable fields)
# - meta.json (module metadata)

# 3. Deploy to HubSpot
cd growth-child/
hs upload . --dest="growth child"
```

#### **Advantages**
✅ Editable fields via `fields.json`
✅ CLI-based deployment
✅ Integrated with child theme
❓ URL field integration (outstanding issue)
❓ More complex debugging

---

### **Alternative Approach: Custom Modules (Previous Method)**

#### **For Component Development**
1. **React Development** - Build components in `01-component-development/`
2. **Manual Integration** - Copy component code to HubSpot custom modules
3. **Child Theme Updates** - Deploy theme-level changes separately

#### **Integration Process**
```bash
# 1. Component development
cd 01-component-development/
npm run dev

# 2. Copy to HubSpot manually
# - Copy HTML/CSS from React component
# - Create custom module in HubSpot UI
# - Configure fields manually

# 3. Deploy theme changes
cd growth-child/
hs upload . --dest="growth child"
```

#### **Advantages**
✅ Direct HubSpot UI field control
✅ Familiar workflow
✅ Easy debugging
❌ Manual integration steps
❌ No version control for module structure

---

### **Current Status & Decision Points**

> **🔄 We are currently evaluating the theme module approach** while keeping the custom module workflow as a fallback. Key issues to resolve:
>
> - **URL Field Integration**: Theme modules need proper URL field handling
> - **Field Type Support**: Ensure all required field types work correctly
> - **Deployment Complexity**: Balance between automation and simplicity
>
> **Decision Timeline**: Will finalize approach after resolving URL field issues and completing Grid2x2CardImage module.

## 📚 Documentation

Detailed documentation in the `docs/` folder:

- **[CHILD_THEME_ARCHITECTURE.md](./docs/CHILD_THEME_ARCHITECTURE.md)** - How child themes work
- **[DUAL_BRAND_SYSTEM.md](./docs/DUAL_BRAND_SYSTEM.md)** - Brand switching implementation
- **[NAVIGATION_FIXES.md](./docs/NAVIGATION_FIXES.md)** - Mobile menu troubleshooting
- **[CSS_OVERRIDE_STRATEGY.md](./docs/CSS_OVERRIDE_STRATEGY.md)** - How to override Growth theme
- **[DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md)** - HubSpot CLI and deployment

## 🐛 Troubleshooting

### **Mobile Menu Issues**
If mobile menu doesn't appear:
1. Check JavaScript console for errors
2. Verify `.is-active` class is applied
3. Check CSS specificity conflicts
4. Ensure HubSpot menu exists ("main_navigation")

### **Brand Colors Not Switching**
If colors don't change:
1. Check `data-brand` attribute on elements
2. Verify CSS variables are loaded
3. Hard refresh browser (Ctrl+Shift+F5)
4. Check brand switcher functionality

### **Navigation Menu Missing**
If navigation items don't appear:
1. Verify "main_navigation" menu exists in HubSpot
2. Check Menu Builder configuration
3. Ensure menu has navigation items
4. Test menu rendering in HubSpot

## 🎯 Current Status

**Production Status**: ✅ Live and Working
**Last Deployed**: September 25, 2025
**Active Issues**: None
**Portal ID**: 144549987

## 🔧 Custom Module Integration & Width System

### **Universal Width Alignment System**
All modules (custom, UI-built, and marketplace) now follow a consistent 1400px width system:

- **Problem Solved**: Inconsistent widths across different module types and viewing modes
- **Solution**: Nuclear CSS override approach that enforces maximum width on all sections
- **Result**: Perfect vertical alignment across all content, regardless of module type or HubSpot settings

### **Width System Rules**

#### **Default Behavior (Automatic)**
- **All sections**: Maximum 1400px width, centered
- **All modules**: Inherit parent width automatically
- **Custom modules**: Use 100% width of parent container
- **Downloaded modules**: Automatically comply with width system

#### **Special Cases**
- **Narrower content**: Use HubSpot's "center content" setting in UI
- **Full-bleed sections**: Add class `full-bleed-section` for edge-to-edge layouts
- **Column layouts**: Automatically adjust to appropriate column widths

#### **No Action Needed For**
- ✅ New HubSpot modules
- ✅ New custom modules
- ✅ Downloaded marketplace modules
- ✅ Existing content

### **Technical Implementation**
```css
/* Nuclear width enforcement - lines 946-968 in child.css */
body .body-wrapper [class*="row-fluid"] {
  max-width: var(--content-max-width) !important; /* 1400px */
  margin-left: auto !important;
  margin-right: auto !important;
}
```

### **Design Guidelines**
- **Figma designs**: Create at 1440px container width
- **Content area**: Design for 1400px maximum content width
- **Padding/margins**: Handled automatically by the theme
- **Responsive**: System maintains alignment across all breakpoints

### **Why This Approach Works**
1. **Consistency**: Guarantees alignment across ALL content types
2. **Future-proof**: New modules automatically comply
3. **Maintainable**: Single rule controls all widths
4. **Override-able**: Can create exceptions when specifically needed
5. **Team-friendly**: No special setup or knowledge required

## 🔮 Future Enhancements

- **Footer Template**: Create branded footer with dual themes
- **Page Templates**: Override additional Growth templates as needed
- **Performance Optimization**: Minimize CSS/JS bundle sizes

---

**Status**: 🟢 Active Production System
**Portal**: HubSpot 144549987
**Domains**: cellcolabsclinical.com, cellcolabs.com
**Last Updated**: September 26, 2025