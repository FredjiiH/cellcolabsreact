# HubSpot Integration Guide

## Overview
This guide explains how to integrate the Cellcolabs component fragments into HubSpot CMS.

## Current Status

### ✅ Completed
1. **Fragment Generation System**
   - Static HTML/CSS fragments generated from React components
   - Component manifests with placeholder definitions
   - Theme-aware styling with CSS variables

2. **Local Testing Environment**
   - Fragments served at: http://localhost:8080
   - Test page available at: http://localhost:8081/test-fragments.html
   - Three components ready: Navigation, Content Section, Footer

3. **HubSpot Module Templates**
   - Custom module structure created
   - Field definitions for content editors
   - HubL templates for fragment integration

### 🚀 Available Servers
- **React Dev**: http://localhost:5173 (Component development)
- **Fragment CDN**: http://localhost:8080 (Static fragments)
- **Test Page**: http://localhost:8081/test-fragments.html

## HubSpot Setup Instructions

### Step 1: Access HubSpot Design Manager
1. Log into your HubSpot account
2. Navigate to: **Marketing > Files and Templates > Design Tools**
3. Or use direct link: `https://app.hubspot.com/design-manager/[your-hub-id]`

### Step 2: Upload Custom Modules

#### Option A: Manual Creation
1. In Design Manager, click **File > New file**
2. Choose **Module** as file type
3. Name it: `cellcolabs-navigation`
4. Copy content from `hubspot-modules/navigation.module/`

#### Option B: Using HubSpot CLI (Recommended)
```bash
# Install HubSpot CLI
npm install -g @hubspot/cli

# Initialize HubSpot connection
hs init

# Upload modules
hs upload hubspot-modules hubspot-modules
```

### Step 3: Configure Module Settings

In HubSpot Design Manager, for each module:

1. **Navigation Module**
   - Set Fragment URL to your CDN (or use ngrok for testing)
   - Choose theme (cellcolabs or cellcolabsclinical)
   - Configure menu items

2. **Content Section Module**
   - Add title and subtitle
   - Configure content cards (3 by default)
   - Set images and descriptions

3. **Footer Module**
   - Set brand information
   - Configure footer sections
   - Add contact details

### Step 4: Create Test Page

1. Go to **Marketing > Website > Website Pages**
2. Create new page
3. Choose a template with drag-and-drop areas
4. Add custom modules:
   - Drag "Cellcolabs Navigation" to header
   - Add "Content Section" to main content
   - Place "Footer" at bottom

### Step 5: Configure Fragment URLs

#### For Local Testing (with ngrok)
```bash
# Install ngrok
npm install -g ngrok

# Expose local fragment server
ngrok http 8080

# Use the ngrok URL in HubSpot modules
# Example: https://abc123.ngrok.io
```

#### For Production
1. Deploy fragments to CDN (Google Cloud Storage, AWS S3, etc.)
2. Update module fragment_url field with CDN URL
3. Ensure CORS headers are configured

## Module Field Mappings

### Navigation Module
| Field | Type | HubSpot Usage |
|-------|------|---------------|
| brand_text_bold | Text | Main brand name |
| brand_text_regular | Text | Sub-brand text |
| menu_items | Repeater | Navigation links |
| theme | Choice | Brand theme selection |

### Content Section Module
| Field | Type | HubSpot Usage |
|-------|------|---------------|
| title | Text | Section headline |
| subtitle | Rich Text | Section description |
| cards | Repeater | Content cards (3-6) |
| theme | Choice | Brand theme selection |

### Footer Module
| Field | Type | HubSpot Usage |
|-------|------|---------------|
| brand_text | Text | Footer brand name |
| brand_description | Rich Text | Company description |
| sections | Repeater | Footer link sections |
| copyright_text | Text | Copyright notice |

## Testing Checklist

- [ ] Fragments load correctly in HubSpot preview
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Theme switching applies correct styles
- [ ] Menu items are editable in HubSpot
- [ ] Content placeholders update dynamically
- [ ] Mobile menu functions properly
- [ ] Read more/less buttons work in content cards

## Troubleshooting

### Fragments Not Loading
- Check Fragment URL is accessible
- Verify CORS headers if using external CDN
- Check browser console for errors

### Styles Not Applied
- Ensure CSS file paths are correct
- Check theme variables are defined
- Verify no CSS conflicts with HubSpot theme

### JavaScript Not Working
- Check if HubSpot allows custom JS
- Verify script tags are included
- Check for console errors

## Next Steps

1. **Production Deployment**
   - Set up Google Cloud Storage bucket
   - Configure Cloud CDN
   - Update fragment URLs in modules

2. **CI/CD Pipeline**
   - Automate fragment generation
   - Deploy to CDN on git push
   - Version control for fragments

3. **Advanced Features**
   - A/B testing with different fragments
   - Analytics integration
   - Dynamic content loading

## Support Files

- `/hubspot-modules/` - HubSpot custom module templates
- `/dist/fragments/` - Generated static fragments
- `/scripts/generate-fragments-simple.js` - Fragment generator
- `/test-fragments.html` - Local testing page

## Commands Reference

```bash
# Generate fragments
npm run build:fragments

# Serve fragments locally
npm run serve:fragments

# View test page
open http://localhost:8081/test-fragments.html

# Start React dev server
npm run dev
```

## Contact

For questions about HubSpot integration, refer to:
- HubSpot Developer Docs: https://developers.hubspot.com/
- This repository: https://github.com/FredjiiH/cellcolabsreact