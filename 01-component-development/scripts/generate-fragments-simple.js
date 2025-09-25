const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const prettier = require('prettier');

// Output directory for fragments
const FRAGMENTS_DIR = path.join(__dirname, '..', 'dist', 'fragments');

// Read CSS files and transform them for production
async function readAndTransformCSS(componentPath, componentId) {
  const cssPath = path.join(__dirname, '..', 'src', 'components', componentPath);

  if (await fs.pathExists(cssPath)) {
    let css = await fs.readFile(cssPath, 'utf8');

    // Replace CSS module classes with namespaced classes
    // This is a simplified approach - just prefixing classes
    css = css.replace(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g, `.${componentId}__$1`);

    // Add CSS variables (theme tokens) - these will be set by HubSpot
    const cssVariables = `
/* Theme Variables - will be set by HubSpot */
:root {
  --color-primary: #0066CC;
  --color-secondary: #00A86B;
  --color-text-primary: #161616;
  --color-text-secondary: #666666;
  --color-text-inverse: #FFFFFF;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8F9FA;
  --color-bg-section: #F5F5F5;
  --font-heading: 'Barlow', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1440px;
}
    `;

    return cssVariables + '\n\n' + css;
  }

  return '';
}

// Generate static HTML templates for each component
const COMPONENT_TEMPLATES = {
  navigation: {
    id: 'navigation',
    name: 'Navigation',
    html: `
<nav class="navigation__navigation" data-component="navigation" data-theme="{{theme}}">
  <div class="navigation__container">
    <div class="navigation__content">
      <div class="navigation__brand" data-placeholder="brand_text">
        <span class="navigation__brandBold">{{brand_text_bold}}</span>
        <span class="navigation__brandRegular">{{brand_text_regular}}</span>
      </div>

      <button class="navigation__mobileToggle" aria-label="Toggle menu" aria-expanded="false">
        <div class="navigation__dotsGrid">
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
          <span class="navigation__dot"></span>
        </div>
      </button>

      <ul class="navigation__menu" data-placeholder="menu_items">
        {{#menu_items}}
        <li class="navigation__menuItem">
          <a href="{{href}}" class="navigation__menuLink">{{label}}</a>
        </li>
        {{/menu_items}}
      </ul>
    </div>
  </div>
</nav>
    `,
    cssPath: 'Navigation/Navigation.module.css',
    placeholders: [
      { id: 'brand_text_bold', type: 'text', default: 'Cellcolabs', label: 'Brand Text (Bold)' },
      { id: 'brand_text_regular', type: 'text', default: 'Clinical', label: 'Brand Text (Regular)' },
      { id: 'menu_items', type: 'repeater', label: 'Menu Items', fields: [
        { id: 'label', type: 'text', default: 'Menu Item' },
        { id: 'href', type: 'url', default: '#' }
      ]},
      { id: 'theme', type: 'choice', default: 'cellcolabs', options: ['cellcolabs', 'cellcolabsclinical'], label: 'Theme' }
    ]
  },

  'content-section': {
    id: 'content-section',
    name: 'Content Section',
    html: `
<section class="content-section__contentSection" data-component="content-section" data-theme="{{theme}}">
  <div class="content-section__container">
    <div class="content-section__header">
      <h2 class="content-section__title" data-placeholder="title">{{title}}</h2>
      <p class="content-section__subtitle" data-placeholder="subtitle">{{subtitle}}</p>
    </div>
    <div class="content-section__cardsGrid">
      {{#cards}}
      <div class="content-section__card">
        <div class="content-section__cardImage">
          <img src="{{imageUrl}}" alt="{{imageAlt}}" />
        </div>
        <div class="content-section__cardContent">
          <div class="content-section__cardTextContent">
            <h3 class="content-section__cardHeadline">{{headline}}</h3>
            <p class="content-section__cardDescription">{{description}}</p>
          </div>
          <button class="content-section__readMoreButton" data-expand="false">
            Read more
          </button>
        </div>
      </div>
      {{/cards}}
    </div>
  </div>
</section>
    `,
    cssPath: 'ContentSection/ContentSection.module.css',
    placeholders: [
      { id: 'title', type: 'text', default: 'Our clinical research programs', label: 'Section Title' },
      { id: 'subtitle', type: 'richtext', default: 'We conduct patient-funded clinical trials...', label: 'Section Subtitle' },
      { id: 'cards', type: 'repeater', label: 'Content Cards', fields: [
        { id: 'headline', type: 'text', default: 'Headline' },
        { id: 'description', type: 'richtext', default: 'Description text...' },
        { id: 'imageUrl', type: 'image', default: 'https://via.placeholder.com/343x228' },
        { id: 'imageAlt', type: 'text', default: 'Image description' }
      ]},
      { id: 'theme', type: 'choice', default: 'cellcolabs', options: ['cellcolabs', 'cellcolabsclinical'], label: 'Theme' }
    ]
  },

  footer: {
    id: 'footer',
    name: 'Footer',
    html: `
<footer class="footer__footer" data-component="footer" data-theme="{{theme}}">
  <div class="footer__container">
    <div class="footer__content">
      <!-- Mobile Brand Section -->
      <div class="footer__mobileBrandSection">
        <h2 class="footer__brandTitle" data-placeholder="brand_text">{{brand_text}}</h2>
        <p class="footer__brandDescription" data-placeholder="brand_description">{{brand_description}}</p>
      </div>

      <!-- Desktop Logo -->
      <div class="footer__desktopLogo">
        <span class="footer__logoText">cell</span>
        <span class="footer__logoText">colabs</span>
        <span class="footer__logoSubtext">CLINICAL</span>
      </div>

      <!-- Footer Columns -->
      <div class="footer__sectionsGrid">
        {{#sections}}
        <div class="footer__section">
          <h3 class="footer__sectionTitle">{{title}}</h3>
          <ul class="footer__sectionLinks">
            {{#links}}
            <li><a href="{{href}}" class="footer__link">{{label}}</a></li>
            {{/links}}
          </ul>
        </div>
        {{/sections}}
      </div>

      <!-- Mobile Contact Section -->
      <div class="footer__mobileContactSection">
        <h3 class="footer__contactTitle">{{contact_title}}</h3>
        <address class="footer__address">{{contact_address}}</address>
      </div>

      <!-- Copyright -->
      <div class="footer__copyright" data-placeholder="copyright">{{copyright_text}}</div>
    </div>
  </div>
</footer>
    `,
    cssPath: 'Footer/Footer.module.css',
    placeholders: [
      { id: 'brand_text', type: 'text', default: 'Cellcolabs Clinical', label: 'Brand Text' },
      { id: 'brand_description', type: 'richtext', default: 'World-leading stem cell research...', label: 'Brand Description' },
      { id: 'sections', type: 'repeater', label: 'Footer Sections', fields: [
        { id: 'title', type: 'text', default: 'Section Title' },
        { id: 'links', type: 'repeater', fields: [
          { id: 'label', type: 'text', default: 'Link' },
          { id: 'href', type: 'url', default: '#' }
        ]}
      ]},
      { id: 'contact_title', type: 'text', default: 'Contact', label: 'Contact Title' },
      { id: 'contact_address', type: 'richtext', default: 'Address here...', label: 'Contact Address' },
      { id: 'copyright_text', type: 'text', default: '© 2025 Cellcolabs Clinical', label: 'Copyright Text' },
      { id: 'theme', type: 'choice', default: 'cellcolabsclinical', options: ['cellcolabs', 'cellcolabsclinical'], label: 'Theme' }
    ]
  },

  button: {
    id: 'button',
    name: 'Button',
    html: `<div class="button__buttonWrapper" data-component="button" data-theme="{{theme}}" style="text-align: {{alignment}};">
  <a href="{{url}}" class="button__button button__button-{{style}} button__button-{{size}}" target="_self">{{text}}</a>
</div>`,
    cssPath: 'Button/Button.module.css',
    placeholders: [
      { id: 'text', type: 'text', default: 'Click here', label: 'Button Text' },
      { id: 'url', type: 'url', default: '#', label: 'Button URL' },
      { id: 'style', type: 'choice', default: 'primary', options: ['primary', 'secondary', 'outline', 'outline-white'], label: 'Button Style' },
      { id: 'size', type: 'choice', default: 'default', options: ['small', 'default', 'large'], label: 'Button Size' },
      { id: 'alignment', type: 'choice', default: 'left', options: ['left', 'center', 'right'], label: 'Button Alignment' },
      { id: 'open_in_new_tab', type: 'boolean', default: false, label: 'Open in new tab' },
      { id: 'theme', type: 'choice', default: 'cellcolabsclinical', options: ['cellcolabs', 'cellcolabsclinical'], label: 'Theme' }
    ]
  }
};

// Add minimal JS for interactivity
const FRAGMENT_JS = `
<script>
(function() {
  // Mobile menu toggle
  document.querySelectorAll('.navigation__mobileToggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var menu = btn.parentElement.querySelector('.navigation__menu');
      var isOpen = menu.classList.contains('navigation__menuOpen');
      menu.classList.toggle('navigation__menuOpen');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // Read more/less toggle
  document.querySelectorAll('.content-section__readMoreButton').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var desc = btn.parentElement.querySelector('.content-section__cardDescription');
      var isExpanded = desc.classList.contains('content-section__expanded');
      desc.classList.toggle('content-section__expanded');
      btn.textContent = isExpanded ? 'Read more' : 'Read less';
    });
  });
})();
</script>
`;

// Generate fragment files
async function generateFragment(componentId) {
  const template = COMPONENT_TEMPLATES[componentId];
  if (!template) {
    console.error(`Template not found for component: ${componentId}`);
    return;
  }

  console.log(`Generating fragment for ${template.name}...`);

  const outputDir = path.join(FRAGMENTS_DIR, componentId, 'v1');
  await fs.ensureDir(outputDir);

  // Format HTML
  const formattedHtml = await prettier.format(template.html.trim(), {
    parser: 'html',
    printWidth: 120,
    tabWidth: 2
  });

  // Write HTML fragment
  await fs.writeFile(
    path.join(outputDir, 'fragment.html'),
    `<!-- Fragment: ${template.name} -->
<!-- Generated: ${new Date().toISOString()} -->
${formattedHtml}
${FRAGMENT_JS}
<!-- End Fragment: ${template.name} -->`
  );

  // Generate and write CSS
  const css = await readAndTransformCSS(template.cssPath, componentId);
  await fs.writeFile(path.join(outputDir, 'styles.css'), css);

  // Generate manifest
  const manifest = {
    id: template.id,
    name: template.name,
    version: '1.0.0',
    generated: new Date().toISOString(),
    placeholders: template.placeholders,
    files: {
      html: 'fragment.html',
      css: 'styles.css'
    },
    responsive: true,
    themes: ['cellcolabs', 'cellcolabsclinical']
  };

  await fs.writeJson(path.join(outputDir, 'manifest.json'), manifest, { spaces: 2 });

  console.log(`✓ Generated fragment: ${componentId}`);
}

// Main function
async function generateAllFragments() {
  console.log('Starting fragment generation...\n');

  await fs.ensureDir(FRAGMENTS_DIR);

  // Generate fragments for all components
  for (const componentId of Object.keys(COMPONENT_TEMPLATES)) {
    await generateFragment(componentId);
  }

  // Create main manifest
  const mainManifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    components: Object.values(COMPONENT_TEMPLATES).map(t => ({
      id: t.id,
      name: t.name,
      path: `${t.id}/v1/manifest.json`
    }))
  };

  await fs.writeJson(path.join(FRAGMENTS_DIR, 'manifest.json'), mainManifest, { spaces: 2 });

  console.log('\n✅ Fragment generation complete!');
  console.log(`📁 Output directory: ${FRAGMENTS_DIR}`);
}

// Run if called directly
if (require.main === module) {
  generateAllFragments().catch(console.error);
}

module.exports = { generateAllFragments };