# URL Field Implementation Guide for Theme Modules

**Status**: ✅ Working Solution
**Last Updated**: September 29, 2025
**Tested With**: Grid2x2CardImage module

## 🎯 Overview

This guide documents the correct implementation of URL/link fields in HubSpot theme modules using `fields.json` and HubL templates.

## 📋 Problem & Solution

### **Problem**
Initial implementation used `"type": "text"` for URL fields, which only provided a simple text input without HubSpot's link picker functionality, validation, or additional options.

### **Solution**
Use `"type": "link"` with proper configuration and HubL template syntax to get full HubSpot link functionality.

## 🔧 Implementation Steps

### **1. fields.json Configuration**

#### **Before (Incorrect)**
```json
{
  "id": "link_url",
  "name": "link_url",
  "label": "Link URL",
  "type": "text",
  "default": "#"
}
```

#### **After (Correct)**
```json
{
  "id": "link_url",
  "name": "link_url",
  "label": "Link",
  "required": false,
  "locked": false,
  "type": "link",
  "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
  "default": {
    "url": {
      "content_id": null,
      "type": "EXTERNAL",
      "href": ""
    },
    "open_in_new_tab": false,
    "no_follow": false
  }
}
```

### **2. HubL Template Implementation**

#### **Before (Incorrect)**
```html
{% if card.link_url %}
  <a href="{{ card.link_url }}" class="grid2x2-card-link">
    {{ card.link_text or "Learn more" }} ↗
  </a>
{% endif %}
```

#### **After (Correct)**
```html
{% if card.link_url.url.href %}
  {% set href = card.link_url.url.href %}
  {% if card.link_url.url.type is equalto "EMAIL_ADDRESS" %}
    {% set href = "mailto:" + href %}
  {% endif %}
  <a href="{{ href }}" class="grid2x2-card-link"
     {% if card.link_url.open_in_new_tab %}target="_blank"{% endif %}
     {% if card.link_url.no_follow %}rel="nofollow"{% endif %}>
    {{ card.link_text or "Learn more" }} ↗
  </a>
{% endif %}
```

## 📖 Field Configuration Options

### **Field Type**
```json
"type": "link"
```
This provides HubSpot's full link picker interface instead of a simple text input.

### **Supported Types**
```json
"supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"]
```

Available options:
- **EXTERNAL**: External URLs (https://example.com)
- **CONTENT**: HubSpot pages and landing pages
- **FILE**: File manager assets
- **EMAIL_ADDRESS**: Email addresses (auto-prefixed with mailto:)
- **BLOG**: Blog listing pages

### **Default Configuration**
```json
"default": {
  "url": {
    "content_id": null,        // Internal content ID (for CONTENT type)
    "type": "EXTERNAL",        // Default link type
    "href": ""                 // Default URL value
  },
  "open_in_new_tab": false,    // Target="_blank" option
  "no_follow": false           // rel="nofollow" option
}
```

## 🎨 HubSpot Interface Features

With the correct implementation, content editors see:

### **Link Picker Interface**
- **Dropdown**: Link type selection (External, Content, etc.)
- **URL Input**: Context-appropriate input field
- **Content Picker**: For internal HubSpot content
- **File Browser**: For file manager assets
- **Email Validation**: For email addresses

### **Additional Options**
- ☐ **Open in new tab**: Adds `target="_blank"`
- ☐ **Tell search engines not to follow**: Adds `rel="nofollow"`

## 🔗 HubL Template Variables

### **Core Link Data**
```html
{{ module.field_name.url.href }}        <!-- The actual URL -->
{{ module.field_name.url.type }}        <!-- Link type (EXTERNAL, CONTENT, etc.) -->
{{ module.field_name.url.content_id }}  <!-- HubSpot content ID (for internal links) -->
```

### **Link Options**
```html
{{ module.field_name.open_in_new_tab }}  <!-- Boolean: true/false -->
{{ module.field_name.no_follow }}        <!-- Boolean: true/false -->
```

### **Conditional Logic Examples**

#### **Email Address Handling**
```html
{% set href = module.link_field.url.href %}
{% if module.link_field.url.type is equalto "EMAIL_ADDRESS" %}
  {% set href = "mailto:" + href %}
{% endif %}
```

#### **Target and Rel Attributes**
```html
<a href="{{ href }}"
   {% if module.link_field.open_in_new_tab %}target="_blank"{% endif %}
   {% if module.link_field.no_follow %}rel="nofollow"{% endif %}>
```

#### **Link Existence Check**
```html
{% if module.link_field.url.href %}
  <!-- Link content here -->
{% endif %}
```

## ✅ Testing Checklist

After implementation, verify:

- [ ] **Link Picker UI**: Dropdown shows all supported types
- [ ] **External Links**: Can enter and save external URLs
- [ ] **Content Picker**: Shows HubSpot pages when "Content" selected
- [ ] **File Picker**: Shows file manager when "File" selected
- [ ] **Email Handling**: Email addresses get mailto: prefix
- [ ] **New Tab Option**: Checkbox adds target="_blank"
- [ ] **No Follow Option**: Checkbox adds rel="nofollow"
- [ ] **Template Rendering**: Links work correctly on published pages

## 🚨 Common Pitfalls

### **1. Incorrect Field Access**
```html
<!-- Wrong -->
{{ module.link_field }}

<!-- Correct -->
{{ module.link_field.url.href }}
```

### **2. Missing Email Handler**
```html
<!-- Without email handling - emails won't work -->
<a href="{{ module.link_field.url.href }}">

<!-- With email handling - emails work correctly -->
{% set href = module.link_field.url.href %}
{% if module.link_field.url.type is equalto "EMAIL_ADDRESS" %}
  {% set href = "mailto:" + href %}
{% endif %}
<a href="{{ href }}">
```

### **3. Ignoring Additional Options**
```html
<!-- Basic implementation -->
<a href="{{ href }}">Link</a>

<!-- Full implementation with all options -->
<a href="{{ href }}"
   {% if module.link_field.open_in_new_tab %}target="_blank"{% endif %}
   {% if module.link_field.no_follow %}rel="nofollow"{% endif %}>
  Link
</a>
```

## 📚 Additional Resources

- **[HubSpot Developer Docs](https://developers.hubspot.com/docs/cms/building-blocks/modules/configuration)** - Module configuration
- **[HubSpot Field Types](https://developers.hubspot.com/docs/cms/start-building/building-blocks/fields/write-fields-using-javascript)** - All available field types
- **[HubL Variables](https://developers.hubspot.com/docs/cms/hubl)** - HubL template syntax

## 🎉 Success!

With this implementation:
- ✅ Marketing team gets full HubSpot link picker interface
- ✅ All link types supported (external, internal, files, emails)
- ✅ SEO options available (new tab, no follow)
- ✅ Proper validation and error handling
- ✅ Future-proof and maintainable code

---

**Implementation Status**: ✅ Complete and Working
**Tested Module**: Grid2x2CardImage
**HubSpot Account**: 144549987
**Deployment**: September 29, 2025