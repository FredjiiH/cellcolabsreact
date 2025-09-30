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
02-child-theme-production/
├── growth-child/              # Child theme (extends Growth theme)
│   ├── modules/               # Theme modules (CLI deployed)
│   │   ├── grid2x2-card-image.module/
│   │   ├── button-multi-variant.module/
│   │   └── content-text-image.module/
│   ├── templates/
│   │   ├── layouts/          # Page layouts
│   │   │   └── base.html
│   │   └── partials/         # Reusable components
│   │       └── header.html   # Navigation header
│   ├── child.css             # Brand system + overrides
│   ├── child.js              # Navigation JavaScript
│   └── theme.json            # Theme configuration
├── growth-theme/             # Parent theme reference (kept for debugging)
└── docs/                     # Implementation guides
```

## ⚡ Quick Deploy

### **Prerequisites**
- HubSpot CLI installed and configured
- Access to HubSpot portal (144549987)

### **Deploy to HubSpot**
```bash
cd 02-child-theme-production/
hs upload growth-child --dest="growth child"
```

### **HubSpot CLI Setup**
```bash
hs auth
# Follow prompts to authenticate with Personal Access Key
```

## 🔄 Production Workflow

### **Confirmed Approach: Theme Modules via CLI**

1. **Component Development**
   ```bash
   cd 01-component-development/
   npm run dev
   # Build and test React components locally
   ```

2. **Module Creation**
   Create in `growth-child/modules/[module-name].module/`:
   - `module.html` - HubL template with embedded CSS
   - `fields.json` - Editable content fields
   - `meta.json` - Module metadata

3. **Deployment**
   ```bash
   cd 02-child-theme-production/
   hs upload growth-child --dest="growth child"
   ```

4. **Content Management**
   - Marketing team uses modules in HubSpot page editor
   - Full field editing with HubSpot UI

## 📦 Current Modules

### **Production Ready**
- **grid2x2-card-image.module** - 2x2 grid with image cards and overlays
- **button-multi-variant.module** - Multi-style button (primary, secondary, outline)
- **content-text-image.module** - Content sections with text and images

### **Module Structure Example**
```
modules/grid2x2-card-image.module/
├── module.html    # HubL template + embedded CSS
├── fields.json    # Content fields configuration
└── meta.json      # Module metadata
```

## 🎨 Dual Brand System

### **Automatic Domain Detection**
```javascript
// In templates
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
- Typography: Bricolage Grotesque (headings), Inter (body)

**Cellcolabs** (Green Theme):
- Primary: `#00A651` (Green)
- Typography: Bricolage Grotesque (headings), Inter (body)

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
- ✅ Theme modules via CLI deployment
- ✅ URL/link fields with full HubSpot integration
- ✅ Dual-brand color switching
- ✅ Desktop navigation with HubSpot Menu Builder
- ✅ Mobile menu with proper toggle functionality
- ✅ Responsive design across all breakpoints
- ✅ Brand-aware button/link colors
- ✅ Inter + Bricolage Grotesque font system
- ✅ Domain-based automatic brand detection
- ✅ Three production-ready modules

### **Brand Switcher (Editor Mode)**
For testing purposes, includes a brand switcher visible only in editor mode:
- Positioned at top-left to avoid menu conflicts
- Switches between Clinical (Blue) and Cellcolabs (Green)
- Hidden on live websites

## 📚 Documentation

### **Key Guides**
- [URL_FIELD_IMPLEMENTATION_GUIDE.md](./docs/URL_FIELD_IMPLEMENTATION_GUIDE.md) - HubSpot link field implementation
- [THEME_MODULE_EVALUATION.md](./docs/THEME_MODULE_EVALUATION.md) - Module approach validation
- [DUAL_BRAND_SPACING_GUIDE.md](./docs/DUAL_BRAND_SPACING_GUIDE.md) - Spacing and layout system
- [WIDTH_SYSTEM_GUIDE.md](./docs/WIDTH_SYSTEM_GUIDE.md) - Width alignment with HubSpot

## 🛠️ Troubleshooting

### **Module Not Showing in HubSpot**
1. Check `meta.json` is valid JSON
2. Ensure `fields.json` has proper field types
3. Verify module uploaded successfully in Design Manager

### **CSS Not Applying**
1. Check specificity - may need `!important`
2. Verify brand data attribute is set
3. Check for Growth theme overrides

### **Link Fields Not Working**
1. Use `type: "link"` not `type: "url"`
2. Access via `module.field_name.url.href`
3. Handle email addresses with mailto prefix

## 📝 Next Steps

### **Upcoming Modules**
- Footer module (when design finalized)
- Hero/banner modules
- Additional content sections as needed

### **Maintenance**
- Monitor Growth theme updates
- Test modules after HubSpot updates
- Keep documentation current

---

**Last Updated**: September 30, 2025
**Theme**: growth child
**Status**: ✅ Production Ready with Theme Modules