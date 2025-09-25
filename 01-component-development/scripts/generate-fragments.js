const fs = require('fs-extra');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const cheerio = require('cheerio');

// Import components
const { Navigation } = require('../dist-ssr/components/Navigation/Navigation');
const { ContentSection } = require('../dist-ssr/components/ContentSection/ContentSection');
const { Footer } = require('../dist-ssr/components/Footer/Footer');

// Output directory for fragments
const FRAGMENTS_DIR = path.join(__dirname, '..', 'dist', 'fragments');

// Component configurations
const COMPONENTS = [
  {
    id: 'navigation',
    name: 'Navigation',
    component: Navigation,
    props: {
      brandText: '{{brand_text}}',
      menuItems: [
        { label: '{{menu_item_1}}', href: '{{menu_href_1}}' },
        { label: '{{menu_item_2}}', href: '{{menu_href_2}}' },
        { label: '{{menu_item_3}}', href: '{{menu_href_3}}' },
        { label: '{{menu_item_4}}', href: '{{menu_href_4}}' }
      ],
      theme: '{{theme}}'
    },
    placeholders: [
      { id: 'brand_text', type: 'text', default: 'Cellcolabs Clinical' },
      { id: 'menu_item_1', type: 'text', default: 'Treatments' },
      { id: 'menu_item_2', type: 'text', default: 'About' },
      { id: 'menu_item_3', type: 'text', default: 'Partners' },
      { id: 'menu_item_4', type: 'text', default: 'Contact' },
      { id: 'theme', type: 'choice', default: 'cellcolabs', options: ['cellcolabs', 'cellcolabsclinical'] }
    ]
  },
  {
    id: 'content-section',
    name: 'Content Section',
    component: ContentSection,
    props: {
      title: '{{section_title}}',
      subtitle: '{{section_subtitle}}',
      cards: [
        {
          id: '1',
          headline: '{{card_1_headline}}',
          description: '{{card_1_description}}',
          imageUrl: '{{card_1_image}}',
          imageAlt: '{{card_1_image_alt}}'
        },
        {
          id: '2',
          headline: '{{card_2_headline}}',
          description: '{{card_2_description}}',
          imageUrl: '{{card_2_image}}',
          imageAlt: '{{card_2_image_alt}}'
        },
        {
          id: '3',
          headline: '{{card_3_headline}}',
          description: '{{card_3_description}}',
          imageUrl: '{{card_3_image}}',
          imageAlt: '{{card_3_image_alt}}'
        }
      ],
      theme: '{{theme}}'
    },
    placeholders: [
      { id: 'section_title', type: 'text', default: 'Our clinical research programs' },
      { id: 'section_subtitle', type: 'richtext', default: 'We conduct patient-funded clinical trials...' },
      { id: 'card_1_headline', type: 'text', default: 'Headline' },
      { id: 'card_1_description', type: 'richtext', default: 'Description text...' },
      { id: 'card_1_image', type: 'image', default: 'https://via.placeholder.com/343x228' },
      { id: 'theme', type: 'choice', default: 'cellcolabs', options: ['cellcolabs', 'cellcolabsclinical'] }
    ]
  },
  {
    id: 'footer',
    name: 'Footer',
    component: Footer,
    props: {
      brandText: '{{brand_text}}',
      brandDescription: '{{brand_description}}',
      copyrightText: '{{copyright_text}}',
      theme: '{{theme}}'
    },
    placeholders: [
      { id: 'brand_text', type: 'text', default: 'Cellcolabs Clinical' },
      { id: 'brand_description', type: 'richtext', default: 'World-leading stem cell research...' },
      { id: 'copyright_text', type: 'text', default: '© 2025 Cellcolabs Clinical' },
      { id: 'theme', type: 'choice', default: 'cellcolabsclinical', options: ['cellcolabs', 'cellcolabsclinical'] }
    ]
  }
];

// Generate HTML fragment for a component
function generateFragment(config) {
  console.log(`Generating fragment for ${config.name}...`);

  // Create React element
  const element = React.createElement(config.component, config.props);

  // Render to static HTML
  const html = ReactDOMServer.renderToStaticMarkup(element);

  // Parse HTML with cheerio for cleanup
  const $ = cheerio.load(html);

  // Add fragment wrapper with metadata
  const wrappedHtml = `
<!-- Fragment: ${config.name} -->
<!-- Generated: ${new Date().toISOString()} -->
<div class="fragment-${config.id}" data-fragment="${config.id}" data-version="1.0.0">
${$.html()}
</div>
<!-- End Fragment: ${config.name} -->
  `.trim();

  return wrappedHtml;
}

// Extract CSS for a component
async function extractCSS(componentId) {
  const cssPath = path.join(__dirname, '..', 'src', 'components');
  const cssFiles = [];

  // Map component IDs to their CSS module paths
  const cssMap = {
    'navigation': 'Navigation/Navigation.module.css',
    'content-section': 'ContentSection/ContentSection.module.css',
    'footer': 'Footer/Footer.module.css'
  };

  if (cssMap[componentId]) {
    const fullPath = path.join(cssPath, cssMap[componentId]);
    if (await fs.pathExists(fullPath)) {
      const css = await fs.readFile(fullPath, 'utf8');

      // Transform CSS module classes to regular classes
      // This is a simplified transformation - in production you'd use a proper CSS modules processor
      const transformedCSS = css
        .replace(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g, `.fragment-${componentId}__$1`)
        .replace(/\:global\((.*?)\)/g, '$1');

      return transformedCSS;
    }
  }

  return '';
}

// Generate manifest for a component
function generateManifest(config) {
  return {
    id: config.id,
    name: config.name,
    version: '1.0.0',
    generated: new Date().toISOString(),
    placeholders: config.placeholders,
    files: {
      html: './fragment.html',
      css: './styles.css'
    },
    responsive: true,
    themes: ['cellcolabs', 'cellcolabsclinical']
  };
}

// Main generation function
async function generateFragments() {
  console.log('Starting fragment generation...\n');

  // Ensure output directory exists
  await fs.ensureDir(FRAGMENTS_DIR);

  // Generate fragments for each component
  for (const config of COMPONENTS) {
    const componentDir = path.join(FRAGMENTS_DIR, config.id, 'v1');
    await fs.ensureDir(componentDir);

    // Generate HTML fragment
    const html = generateFragment(config);
    await fs.writeFile(path.join(componentDir, 'fragment.html'), html);

    // Extract and save CSS
    const css = await extractCSS(config.id);
    await fs.writeFile(path.join(componentDir, 'styles.css'), css);

    // Generate manifest
    const manifest = generateManifest(config);
    await fs.writeJson(path.join(componentDir, 'manifest.json'), manifest, { spaces: 2 });

    console.log(`✓ Generated fragment: ${config.id}`);
  }

  // Create main manifest
  const mainManifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    components: COMPONENTS.map(c => ({
      id: c.id,
      name: c.name,
      path: `./${c.id}/v1/manifest.json`
    }))
  };

  await fs.writeJson(path.join(FRAGMENTS_DIR, 'manifest.json'), mainManifest, { spaces: 2 });

  console.log('\n✅ Fragment generation complete!');
  console.log(`📁 Output directory: ${FRAGMENTS_DIR}`);
}

// Note about SSR compilation
console.log('\n⚠️  Note: This script requires server-side React components.');
console.log('First run: npm run build:ssr to compile components for Node.js\n');

// Run if called directly
if (require.main === module) {
  generateFragments().catch(console.error);
}

module.exports = { generateFragments };