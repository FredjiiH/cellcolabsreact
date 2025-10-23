// Growth Child Theme JavaScript
// Navigation functionality for the child theme header

(function() {
  // Wait for DOM to be ready
  function initNavigation() {
    // Mobile menu toggle with debugging
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-menu-mobile');
    const header = document.querySelector('.site-header');

    console.log('Navigation elements found:', {
      navToggle: !!navToggle,
      navMobile: !!navMobile,
      header: !!header
    });

    if (navToggle && navMobile) {
      navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMobile.classList.toggle('is-active');

        // FORCE display style with JavaScript to override CSS
        if (!isExpanded) {
          navMobile.style.display = 'block';
          navMobile.style.visibility = 'visible';
          navMobile.style.opacity = '1';
          document.body.style.overflow = 'hidden';
        } else {
          navMobile.style.display = 'none';
          navMobile.style.visibility = 'hidden';
          navMobile.style.opacity = '0';
          document.body.style.overflow = '';
        }

        console.log('Mobile menu toggled:', {
          isExpanded: !isExpanded,
          hasActiveClass: navMobile.classList.contains('is-active'),
          menuDisplayStyle: window.getComputedStyle(navMobile).display,
          menuVisibility: window.getComputedStyle(navMobile).visibility,
          menuHeight: navMobile.offsetHeight,
          menuChildren: navMobile.children.length
        });
      });
    }

    // Scroll effects
    if (header) {
      function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 10) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }

      // Throttled scroll listener
      let scrollTimer;
      window.addEventListener('scroll', function() {
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(handleScroll, 10);
      }, { passive: true });

      handleScroll();
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMobile && navMobile.classList.contains('is-active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.classList.remove('is-active');
        // Force hide with JavaScript
        navMobile.style.display = 'none';
        navMobile.style.visibility = 'hidden';
        navMobile.style.opacity = '0';
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on click outside
    document.addEventListener('click', function(e) {
      if (navMobile && navMobile.classList.contains('is-active')) {
        if (!e.target.closest('.site-navigation')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMobile.classList.remove('is-active');
          // Force hide with JavaScript
          navMobile.style.display = 'none';
          navMobile.style.visibility = 'hidden';
          navMobile.style.opacity = '0';
          document.body.style.overflow = '';
        }
      }
    });

    // Brand switcher functionality
    const brandSwitcher = document.getElementById('brand-switcher');
    const brandSelector = document.getElementById('brand-selector');

    if (brandSwitcher && brandSelector) {
      // Set current brand in selector from data attribute
      const currentBrand = document.querySelector('[data-brand]')?.getAttribute('data-brand') || 'cellcolabsclinical';
      brandSelector.value = currentBrand;

      // Handle brand switching - reload page with query parameter
      brandSelector.addEventListener('change', function() {
        const selectedBrand = this.value;

        // Get current URL and update/add brand query parameter
        const url = new URL(window.location.href);
        url.searchParams.set('brand', selectedBrand);

        // Reload page with brand parameter
        window.location.href = url.toString();

        console.log('Switching brand to:', selectedBrand);
      });

      // Show brand switcher only in preview/staging environments
      // Hide on production domains (cellcolabs.com and cellcolabsclinical.com)
      const hostname = window.location.hostname;
      const isProduction = hostname === 'cellcolabs.com' ||
                          hostname === 'www.cellcolabs.com' ||
                          hostname === 'cellcolabsclinical.com' ||
                          hostname === 'www.cellcolabsclinical.com';

      const isPreviewOrStaging = hostname.includes('hs-sites') ||
                                 hostname.includes('hubspot') ||
                                 hostname.includes('sandbox');

      if (!isPreviewOrStaging || isProduction) {
        brandSwitcher.style.display = 'none';
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();