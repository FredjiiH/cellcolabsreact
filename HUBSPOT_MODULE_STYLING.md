# HubSpot Standard Module Styling Guide
*How to Style Standard Modules in Custom Themes*

## Overview

When using a custom HubSpot theme, you have control over how standard HubSpot modules (buttons, forms, rich text, etc.) are styled. This guide explains the integration between HubSpot's standard modules and your custom theme.

## How It Works

### Theme vs Module Styling
- **HubSpot provides:** Base module structure and default styles
- **Your theme controls:** Visual appearance through CSS
- **Content creators get:** Easy customization through the content editor

### CSS Class Hierarchy
```
HubSpot Module Classes (provided by HubSpot)
└── Your Theme Styles (in main.css)
    └── Content Creator Overrides (via content editor)
```

## Standard Modules to Style

### 1. Button Module

**HubSpot generates:**
```html
<div class="hs-button-wrapper">
  <a href="#" class="hs-button hs-button-primary">
    Button Text
  </a>
</div>
```

**Your CSS should include:**
```css
/* Button base styles */
.hs-button {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-button);
  padding: var(--space-8) var(--space-24);
  border-radius: var(--radius-md);
  text-decoration: none;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

/* Button variants */
.hs-button-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.hs-button-primary:hover {
  background-color: var(--color-brand-700, var(--color-primary));
  border-color: var(--color-brand-700, var(--color-primary));
}

.hs-button-secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
  border-color: var(--color-secondary);
}

.hs-button-outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.hs-button-outline:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
}

/* Button sizes */
.hs-button-small {
  padding: var(--space-4) var(--space-16);
  font-size: var(--font-size-body-small);
}

.hs-button-large {
  padding: var(--space-16) var(--space-32);
  font-size: var(--font-size-body-large);
}
```

### 2. Form Module

**HubSpot generates:**
```html
<div class="hs-form">
  <form>
    <div class="hs-field-wrapper">
      <label class="hs-label">
        <span>Field Label</span>
        <input class="hs-input" type="text">
      </label>
    </div>
    <div class="hs-submit">
      <input type="submit" class="hs-button hs-button-primary">
    </div>
  </form>
</div>
```

**Your CSS should include:**
```css
/* Form container */
.hs-form {
  max-width: 600px;
  margin: 0 auto;
}

/* Form fields */
.hs-field-wrapper {
  margin-bottom: var(--space-16);
}

.hs-label {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.hs-input,
.hs-input[type="text"],
.hs-input[type="email"],
.hs-input[type="tel"],
.hs-textarea {
  width: 100%;
  padding: var(--space-8) var(--space-16);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s ease;
}

.hs-input:focus,
.hs-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(79, 101, 190, 0.1);
}

/* Error states */
.hs-input.error,
.hs-textarea.error {
  border-color: var(--color-error);
}

.hs-error-msgs {
  color: var(--color-error);
  font-size: var(--font-size-body-small);
  margin-top: var(--space-4);
}

/* Submit button inherits button styles */
.hs-submit .hs-button {
  width: 100%;
}

@media (min-width: 768px) {
  .hs-submit .hs-button {
    width: auto;
    min-width: 150px;
  }
}
```

### 3. Rich Text Module

**HubSpot generates:**
```html
<div class="hs-rich-text">
  <h2>Heading</h2>
  <p>Paragraph text with <a href="#">links</a></p>
  <ul>
    <li>List items</li>
  </ul>
</div>
```

**Your CSS should include:**
```css
/* Rich text container */
.hs-rich-text {
  line-height: var(--line-height-body);
  color: var(--color-text-primary);
}

/* Typography hierarchy */
.hs-rich-text h1,
.hs-rich-text h2,
.hs-rich-text h3,
.hs-rich-text h4,
.hs-rich-text h5,
.hs-rich-text h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
  margin-bottom: var(--space-16);
}

.hs-rich-text h1 { font-size: var(--font-size-h1); }
.hs-rich-text h2 { font-size: var(--font-size-h2); }
.hs-rich-text h3 { font-size: var(--font-size-h3); }
.hs-rich-text h4 { font-size: var(--font-size-h4); }

.hs-rich-text p {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  margin-bottom: var(--space-16);
}

.hs-rich-text a {
  color: var(--color-text-link);
  text-decoration: none;
  transition: color 0.2s ease;
}

.hs-rich-text a:hover {
  color: var(--color-brand-700, var(--color-text-link));
  text-decoration: underline;
}

/* Lists */
.hs-rich-text ul,
.hs-rich-text ol {
  margin-bottom: var(--space-16);
  padding-left: var(--space-24);
}

.hs-rich-text li {
  margin-bottom: var(--space-4);
}

/* Images */
.hs-rich-text img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
}

/* Tables */
.hs-rich-text table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-16);
}

.hs-rich-text th,
.hs-rich-text td {
  padding: var(--space-8) var(--space-16);
  border: 1px solid var(--color-border-light);
  text-align: left;
}

.hs-rich-text th {
  background-color: var(--color-bg-secondary);
  font-weight: var(--font-weight-medium);
}
```

### 4. Image Module

**HubSpot generates:**
```html
<div class="hs-image-widget">
  <img src="image.jpg" alt="Alt text" class="hs-image">
</div>
```

**Your CSS should include:**
```css
.hs-image-widget {
  text-align: center;
  margin-bottom: var(--space-24);
}

.hs-image {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

/* Image alignment classes */
.hs-image-widget.align-left {
  text-align: left;
}

.hs-image-widget.align-right {
  text-align: right;
}

.hs-image-widget.align-center {
  text-align: center;
}
```

### 5. CTA Module

**HubSpot generates:**
```html
<div class="hs-cta-wrapper">
  <div class="hs-cta-embed">
    <a href="#" class="hs-cta-button">
      CTA Text
    </a>
  </div>
</div>
```

**Your CSS should include:**
```css
.hs-cta-wrapper {
  text-align: center;
  margin: var(--space-24) 0;
}

.hs-cta-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-medium);
  padding: var(--space-12) var(--space-32);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.hs-cta-button:hover {
  background-color: var(--color-brand-700, var(--color-primary));
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

## Theme Integration Strategy

### 1. Add Module Styles to main.css

Add all HubSpot module styles to your `main.css` file in a dedicated section:

```css
/* ===================================
   HubSpot Module Styles
   =================================== */

/* Button Module */
.hs-button { /* ... */ }

/* Form Module */
.hs-form { /* ... */ }

/* Rich Text Module */
.hs-rich-text { /* ... */ }

/* Image Module */
.hs-image-widget { /* ... */ }

/* CTA Module */
.hs-cta-wrapper { /* ... */ }
```

### 2. Use Your CSS Variables

All module styles should use your existing CSS variables for consistency:

```css
.hs-button {
  background-color: var(--color-primary);    /* From brand CSS */
  font-family: var(--font-body);             /* From shared CSS */
  padding: var(--space-8) var(--space-24);   /* From shared CSS */
  border-radius: var(--radius-md);           /* From shared CSS */
}
```

### 3. Responsive Design

Ensure all module styles work across your breakpoints:

```css
@media (max-width: 767px) {
  .hs-button {
    width: 100%;
    padding: var(--space-12) var(--space-16);
  }

  .hs-form {
    margin: 0 var(--space-16);
  }
}
```

## Content Creator Experience

With proper styling, content creators can:

1. **Add standard modules** through the content editor
2. **Customize content** (text, links, images) easily
3. **Choose from predefined styles** (button variants, etc.)
4. **Get consistent design** that matches your brand automatically

## Testing Checklist

When styling HubSpot modules:

- [ ] Test button module with different variants (primary, secondary, outline)
- [ ] Test form module with various field types
- [ ] Test rich text with all formatting options (headings, lists, links, tables)
- [ ] Test image module with different sizes and alignments
- [ ] Test CTA module styling
- [ ] Verify responsive behavior on all devices
- [ ] Check that styles work with brand switching
- [ ] Test in HubSpot content editor preview mode

## Best Practices

1. **Use CSS variables** for all colors, fonts, and spacing
2. **Follow your existing design system** patterns
3. **Test thoroughly** in HubSpot's content editor
4. **Provide multiple button/CTA styles** for content creator flexibility
5. **Ensure accessibility** with proper contrast and focus states
6. **Document the available styles** for content creators

---

*This guide ensures HubSpot standard modules integrate seamlessly with your custom theme while maintaining design consistency and content creator flexibility.*