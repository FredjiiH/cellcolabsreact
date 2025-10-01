# HubSpot Module Development Guide

## 🎯 Overview

This guide covers how to create new HubSpot modules for the Cellcolabs dual-brand system with the global theme detection implemented.

## 🌐 Global Theme System

**IMPORTANT**: Theme detection is now handled globally in `templates/layouts/base.html`. Individual modules DO NOT need theme selection fields.

### How It Works
1. The base template automatically detects the domain
2. Sets `data-brand` attribute on the `<body>` element
3. All CSS variables inherit the correct brand colors
4. Modules work on both brands without any configuration

## 📦 Module Structure

Each module consists of three files:

```
modules/[module-name].module/
├── module.html    # HubL template + embedded CSS
├── fields.json    # Content fields (NO theme field needed!)
└── meta.json      # Module metadata
```

## 🛠️ Creating a New Module

### Step 1: Create Module Directory
```bash
cd 02-child-theme-production/growth-child/modules/
mkdir my-new-component.module
```

### Step 2: Create `meta.json`
```json
{
  "global": false,
  "host_template_types": ["PAGE"],
  "module_id": "my-new-component",
  "label": "My New Component",
  "is_available_for_new_content": true,
  "icon": "fontawesome-5.14.0:solid:th-large"
}
```

### Step 3: Create `fields.json`
```json
[
  {
    "id": "title",
    "name": "title",
    "label": "Title",
    "required": false,
    "locked": false,
    "type": "text",
    "default": "Default Title"
  },
  {
    "id": "link",
    "name": "link",
    "label": "Link",
    "required": false,
    "locked": false,
    "type": "link",
    "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS"],
    "default": {
      "url": {
        "href": "",
        "type": "EXTERNAL"
      }
    }
  }
]
```

**NOTE**: Do NOT add a theme field! The global system handles it.

### Step 4: Create `module.html`
```html
<!-- Module HTML -->
<section class="my-component">
  <div class="my-component__container">
    {% if module.title %}
      <h2 class="my-component__title">{{ module.title }}</h2>
    {% endif %}

    {% if module.link.url.href %}
      <a href="{{ module.link.url.href }}"
         class="my-component__link"
         {% if module.link.open_in_new_tab %}target="_blank"{% endif %}>
        Learn More
      </a>
    {% endif %}
  </div>
</section>

<!-- Module CSS -->
<style>
.my-component {
  padding: var(--space-64, 64px) 0;
}

.my-component__container {
  max-width: 1460px;
  margin: 0 auto;
  padding: 0 24px;
}

.my-component__title {
  font-family: var(--font-heading, 'Bricolage Grotesque'), sans-serif;
  font-size: var(--font-size-h2-desktop, 48px);
  color: var(--color-text-primary, #161616);
  margin-bottom: var(--space-24, 24px);
}

.my-component__link {
  /* Brand colors automatically switch based on domain! */
  color: var(--color-primary);
  text-decoration: underline;
}

.my-component__link:hover {
  color: var(--color-primary-hover);
}

/* Mobile styles */
@media (max-width: 767px) {
  .my-component__title {
    font-size: var(--font-size-h2-mobile, 32px);
  }
}
</style>
```

## 🎨 Using Brand Colors

### Available CSS Variables
All modules have access to these CSS variables that automatically switch:

#### Colors (Auto-switching)
- `var(--color-primary)` - Blue (#4F65BE) or Green (#00A651)
- `var(--color-primary-hover)` - Darker shade of primary
- `var(--color-text-primary)` - Main text color (#161616)
- `var(--color-text-secondary)` - Secondary text (#525252)

#### Typography
- `var(--font-heading)` - 'Bricolage Grotesque'
- `var(--font-body)` - 'Inter'

#### Spacing
- `var(--space-8)` through `var(--space-128)`

## 🔗 Link Field Implementation

Always use HubSpot's `link` field type (not `url`):

### In fields.json:
```json
{
  "id": "button_link",
  "name": "button_link",
  "label": "Button Link",
  "type": "link",
  "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS"]
}
```

### In module.html:
```html
{% if module.button_link.url.href %}
  <a href="{{ module.button_link.url.href }}"
     {% if module.button_link.open_in_new_tab %}target="_blank"{% endif %}
     {% if module.button_link.rel %}rel="{{ module.button_link.rel|join(' ') }}"{% endif %}>
    Button Text
  </a>
{% endif %}
```

## 🚀 Deployment

### Deploy Module to HubSpot
```bash
cd 02-child-theme-production/
hs upload growth-child growth-child
```

### Test in HubSpot
1. Go to Marketing > Files and Templates > Design Tools
2. Navigate to growth-child/modules/
3. Find your module and preview it
4. Use the preview brand selector to test both themes

## ✅ Module Checklist

Before deploying a new module:

- [ ] NO theme field in fields.json
- [ ] Uses CSS variables for all brand colors
- [ ] Responsive styles included
- [ ] Link fields use `type: "link"` not `type: "url"`
- [ ] Container max-width: 1460px with padding: 0 24px
- [ ] Typography uses var(--font-heading) and var(--font-body)
- [ ] Tested with preview brand selector in HubSpot

## 🎯 Best Practices

### DO:
- ✅ Use CSS variables for all colors
- ✅ Let the global system handle theme detection
- ✅ Test both brands using HubSpot's preview selector
- ✅ Follow the existing module patterns

### DON'T:
- ❌ Add theme selection fields to modules
- ❌ Use domain detection in individual modules
- ❌ Hard-code brand colors
- ❌ Create duplicate modules for different brands

## 📚 Reference Modules

Look at these existing modules for examples:
- `grid2x2-card-image.module` - Grid layouts
- `button-multi-variant.module` - Button variations
- `content-text-image.module` - Content sections

## 🔧 Overriding Global Brand Styles

### When You Need Module-Specific Overrides

**The Global Rule**: All links on the site use brand colors via this global rule in `header.html`:
```css
[data-brand] a:not(.button):not(.btn):not(button) {
  color: var(--color-text-link) !important;
}
```

**When to Override**: Sometimes you need different styling in your module (e.g., white links on dark backgrounds).

**How to Override**: Use higher CSS specificity **within your module's CSS**:

```css
/* Example: White links on image overlay */
[data-brand] .your-module-overlay .your-link-class,
[data-brand] .your-module-overlay .your-link-class:link,
[data-brand] .your-module-overlay .your-link-class:visited,
[data-brand] .your-module-overlay .your-link-class:hover {
  color: #ffffff !important;
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}
```

**Key Points**:
- ✅ Use `[data-brand]` selector to increase specificity
- ✅ Target your specific module container (e.g., `.your-module-overlay`)
- ✅ Keep overrides in the module CSS, not in global `child.css`
- ✅ Add all link states (`:link`, `:visited`, `:hover`, `:active`)
- ✅ Use `!important` to ensure override works

**Example**: See `grid2x2-card-image.module` for a working example of white links on image overlays.

## 🆘 Troubleshooting

### Module doesn't switch brands
- Check that you're NOT setting `data-brand` in your module
- Verify CSS uses variables like `var(--color-primary)`
- Clear HubSpot cache and refresh

### Colors not applying correctly
- Make sure you're using the CSS variable names exactly
- Check that child.css is loading (should be automatic)
- Use browser DevTools to inspect computed styles

### Link fields not working
- Must use `type: "link"` not `type: "url"`
- Access via `module.field_name.url.href`
- Check supported_types array includes needed types

### Links showing wrong color
- Global brand link color is applied via `[data-brand] a:not(.button)` rule
- To override, use higher specificity in your module CSS (see "Overriding Global Brand Styles" above)
- Do NOT add overrides to global `child.css` - keep them in the module

---

**Last Updated**: October 1, 2025
**Theme System**: Global domain-based detection using `data-brand` attribute
**Brand Attribute**: `data-brand` (NOT `data-theme` - we use `data-brand` consistently)