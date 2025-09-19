# HubSpot Setup - Step by Step Guide

## Prerequisites
✅ Fragment server running at: http://localhost:8080
✅ Test page working at: http://localhost:8081/test-fragments.html
✅ HubSpot account with Design Manager access

## Step 1: Get Public URL for Fragments

Since HubSpot needs to access your fragments from the internet, you have several options:

### Option A: Use ngrok (Temporary Testing)
```bash
# If ngrok is running, look for the URL in terminal
# It will look like: https://abc123.ngrok.io

# Or manually start it:
ngrok http 8080
```

### Option B: Deploy to GitHub Pages (Quick & Free)
1. Push fragments to a GitHub Pages branch
2. Access at: https://[username].github.io/cellcolabsreact/dist/fragments/

### Option C: Upload to HubSpot File Manager (Simplest)
1. Go to Marketing > Files and Templates > Files
2. Create folder: `cellcolabs-fragments`
3. Upload contents of `/dist/fragments/`
4. Use HubSpot file URLs in modules

## Step 2: Access HubSpot Design Manager

1. Log into HubSpot
2. Navigate to: **Marketing > Files and Templates > Design Tools**
3. Or direct link: `https://app.hubspot.com/design-manager/[your-portal-id]/`

## Step 3: Create Custom Modules in HubSpot

### Create Navigation Module:

1. **In Design Manager:**
   - Click `File > New file > Module`
   - Name: `cellcolabs-navigation`

2. **Add Module HTML:**
   ```html
   <!-- Copy content from hubspot-modules/navigation.module/module.html -->
   ```

3. **Add Module Fields:**
   - Click "Add field" button
   - Create these fields:
     - `fragment_url` (Text) - Default: Your ngrok/CDN URL
     - `theme` (Choice) - Options: cellcolabs, cellcolabsclinical
     - `brand_text_bold` (Text) - Default: Cellcolabs
     - `brand_text_regular` (Text) - Default: Clinical
     - `menu_items` (Group/Repeater) with:
       - `label` (Text)
       - `href` (Link)

4. **Save Module**

### Create Content Section Module:

1. **Create new module:** `cellcolabs-content-section`

2. **Add fields:**
   - `fragment_url` (Text)
   - `theme` (Choice)
   - `title` (Text)
   - `subtitle` (Rich Text)
   - `cards` (Group/Repeater) with:
     - `headline` (Text)
     - `description` (Rich Text)
     - `imageUrl` (Image)

### Create Footer Module:

1. **Create new module:** `cellcolabs-footer`

2. **Add fields:**
   - `fragment_url` (Text)
   - `theme` (Choice)
   - `brand_text` (Text)
   - `brand_description` (Rich Text)
   - `copyright_text` (Text)

## Step 4: Create Test Page

1. **Go to:** Marketing > Website > Website Pages
2. **Click:** Create > Website page
3. **Choose:** Blank template or any template
4. **Page name:** "Cellcolabs Fragment Test"

## Step 5: Add Modules to Page

1. **In page editor:**
   - Drag your custom modules onto the page
   - Order: Navigation → Content Section → Footer

2. **Configure each module:**
   - Set `fragment_url` to your public URL
   - Choose appropriate theme
   - Add content

3. **Preview the page**

## Step 6: Test Functionality

### Check These Items:
- [ ] Fragments load correctly
- [ ] CSS styles apply properly
- [ ] Mobile menu works (preview in mobile view)
- [ ] Read more/less buttons function
- [ ] Theme switching works
- [ ] Content is editable

## Troubleshooting

### If Fragments Don't Load:

1. **Check Console (F12):**
   - CORS errors? → Add CORS headers to server
   - 404 errors? → Verify fragment URL path
   - Mixed content? → Ensure HTTPS if HubSpot uses HTTPS

2. **Test Fragment URL:**
   ```bash
   # In browser, try accessing:
   [your-fragment-url]/navigation/v1/fragment.html
   [your-fragment-url]/navigation/v1/styles.css
   ```

3. **HubSpot Settings:**
   - Check if custom code is allowed
   - Verify module is published
   - Clear HubSpot cache

### If Styles Are Broken:

1. Check CSS is loading:
   - View page source
   - Look for `<link>` tag with your CSS

2. Fix CSS conflicts:
   - Add more specific selectors
   - Use `!important` if needed
   - Namespace your classes better

## Alternative: Simple HTML Module

If custom modules are complex, use a simpler approach:

1. **Create HTML module**
2. **Paste this code:**

```html
<!-- Simple Fragment Loader -->
<div id="nav-fragment"></div>

<script>
fetch('YOUR_FRAGMENT_URL/navigation/v1/fragment.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('nav-fragment').innerHTML = html;
  });
</script>

<link rel="stylesheet" href="YOUR_FRAGMENT_URL/navigation/v1/styles.css">
```

## Success Indicators

✅ Page loads without errors
✅ Components display correctly
✅ Responsive design works
✅ Content can be edited in HubSpot
✅ Theme applies correctly

## Next Steps After Testing

1. **Production Deployment:**
   - Set up permanent CDN
   - Update fragment URLs
   - Version your fragments

2. **Create Templates:**
   - Build page templates with your modules
   - Create theme with default settings
   - Document for marketing team

3. **Training:**
   - Show marketing team how to use modules
   - Document content guidelines
   - Create component style guide