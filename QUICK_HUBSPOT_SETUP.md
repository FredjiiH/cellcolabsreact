# Quick HubSpot Setup Options

## Option 1: Upload Fragments to HubSpot (Easiest!)

### Step 1: Upload to HubSpot File Manager
1. Go to **Marketing > Files and Templates > Files**
2. Create a new folder called `cellcolabs-fragments`
3. Upload these folders from `/dist/fragments/`:
   - `navigation/v1/` (all files)
   - `content-section/v1/` (all files)
   - `footer/v1/` (all files)

### Step 2: Get HubSpot File URLs
After upload, your files will be at URLs like:
```
https://[your-portal].hs-sites.com/hubfs/cellcolabs-fragments/navigation/v1/fragment.html
https://[your-portal].hs-sites.com/hubfs/cellcolabs-fragments/navigation/v1/styles.css
```

### Step 3: Create Simple HTML Module
1. In Design Manager, create new **Custom Module**
2. Name it: `cellcolabs-components`
3. In the HTML section, paste:

```html
<!-- Navigation Component -->
<div class="cellcolabs-nav-wrapper">
  <!-- Load CSS -->
  <link rel="stylesheet" href="https://[your-portal].hs-sites.com/hubfs/cellcolabs-fragments/navigation/v1/styles.css">

  <!-- Navigation HTML -->
  <nav class="navigation__navigation" data-component="navigation" data-theme="{{ module.theme }}">
    <div class="navigation__container">
      <div class="navigation__content">
        <div class="navigation__brand">
          <span class="navigation__brandBold">{{ module.brand_bold }}</span>
          <span class="navigation__brandRegular">{{ module.brand_regular }}</span>
        </div>

        <button class="navigation__mobileToggle" aria-label="Toggle menu">
          <div class="navigation__dotsGrid">
            {% for i in range(15) %}
            <span class="navigation__dot"></span>
            {% endfor %}
          </div>
        </button>

        <ul class="navigation__menu">
          {% for item in module.menu_items %}
          <li class="navigation__menuItem">
            <a href="{{ item.url }}" class="navigation__menuLink">{{ item.label }}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </nav>
</div>

<script>
// Mobile menu toggle
document.querySelectorAll('.navigation__mobileToggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var menu = btn.parentElement.querySelector('.navigation__menu');
    menu.classList.toggle('navigation__menuOpen');
  });
});
</script>
```

### Step 4: Add Module Fields
Add these fields to your module:
- `theme` (Choice field): cellcolabs / cellcolabsclinical
- `brand_bold` (Text): "Cellcolabs"
- `brand_regular` (Text): "Clinical"
- `menu_items` (Repeater):
  - `label` (Text)
  - `url` (URL)

---

## Option 2: Deploy to GitHub Pages (Free CDN)

### Step 1: Create GitHub Pages Branch
```bash
# Create gh-pages branch
git checkout -b gh-pages

# Copy fragments to root for GitHub Pages
cp -r dist/fragments/* .

# Commit and push
git add .
git commit -m "Deploy fragments to GitHub Pages"
git push origin gh-pages
```

### Step 2: Enable GitHub Pages
1. Go to your repo: https://github.com/FredjiiH/cellcolabsreact
2. Settings > Pages
3. Source: Deploy from branch
4. Branch: gh-pages
5. Save

Your fragments will be available at:
```
https://fredjiih.github.io/cellcolabsreact/navigation/v1/fragment.html
```

---

## Option 3: Use Netlify Drop (Instant Deploy)

### Step 1: Prepare Fragments
```bash
# Create deployment folder
mkdir deploy-fragments
cp -r dist/fragments/* deploy-fragments/
```

### Step 2: Deploy to Netlify
1. Go to: https://app.netlify.com/drop
2. Drag your `deploy-fragments` folder onto the page
3. Get instant URL like: `https://amazing-name-123.netlify.app`

### Step 3: Use in HubSpot
Use the Netlify URL as your fragment base URL

---

## Quick Test in HubSpot

### Create a Test HTML Module:
1. Go to Design Manager
2. Create new HTML module
3. Paste this test code:

```html
<style>
  /* Basic theme variables */
  :root {
    --color-primary: #0066CC;
    --color-text-primary: #161616;
    --font-body: 'Inter', sans-serif;
    --spacing-md: 16px;
    --spacing-lg: 24px;
  }
</style>

<div style="padding: 20px; border: 2px dashed #ccc; text-align: center;">
  <h3>Fragment Test</h3>
  <p>If you see a navigation bar below, fragments are working!</p>
</div>

<!-- Your fragment HTML goes here -->
<!-- Copy the HTML from your fragment files -->
```

---

## Which Option to Choose?

- **HubSpot File Manager**: Best for production, fully integrated
- **GitHub Pages**: Good for persistent testing, version controlled
- **Netlify Drop**: Quick testing, no setup required

Choose based on your immediate needs. For testing today, I recommend **Option 1** (HubSpot File Manager) as it's the simplest and doesn't require external services.