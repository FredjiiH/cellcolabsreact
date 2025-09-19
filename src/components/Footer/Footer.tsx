import styles from './Footer.module.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  brandText?: string;
  brandDescription?: string;
  sections?: FooterSection[];
  contactInfo?: {
    title: string;
    address: string[];
  };
  copyrightText?: string;
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

const defaultSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Stem cells', href: '#stem-cells' },
      { label: 'Trials', href: '#trials' },
      { label: 'Clinics', href: '#clinics' },
      { label: 'Consultation', href: '#consultation' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Partnerships', href: '#partnerships' },
      { label: 'Career', href: '#career' },
      { label: 'Privacy policy', href: '#privacy' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact us', href: '#contact' }
    ]
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: '#instagram' },
      { label: 'Facebook', href: '#facebook' },
      { label: 'LinkedIn', href: '#linkedin' },
      { label: 'LINE', href: '#line' }
    ]
  }
];

const defaultContactInfo = {
  title: 'Contact',
  address: [
    'Registered office Dominion',
    'House, 60 Montrose Avenue',
    'P.O. Box N-9932',
    'Nassau, New Providence, The Bahamas'
  ]
};

export function Footer({
  brandText = 'Cellcolabs Clinical',
  brandDescription = 'World-leading stem cell research and clinical trials using GMP-certified, donor-derived mesenchymal stem cells.',
  sections = defaultSections,
  contactInfo = defaultContactInfo,
  copyrightText = '© 2025 Cellcolabs Clinical',
  theme = 'cellcolabsclinical'
}: FooterProps) {
  return (
    <footer
      className={styles.footer}
      data-component="footer"
      data-theme={theme}
      data-node-id="699:4152"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Mobile Brand Section - Hidden on Desktop */}
          <div className={styles.mobileBrandSection}>
            <h2 className={styles.brandTitle} data-placeholder="brand_text">
              {brandText}
            </h2>
            <p className={styles.brandDescription} data-placeholder="brand_description">
              {brandDescription}
            </p>
          </div>

          {/* Desktop Logo - Hidden on Mobile */}
          <div className={styles.desktopLogo}>
            <span className={styles.logoText}>cell</span>
            <span className={styles.logoText}>colabs</span>
            <span className={styles.logoSubtext}>CLINICAL</span>
          </div>

          {/* Footer Columns */}
          <div className={styles.sectionsGrid}>
            {sections.map((section, index) => (
              <div key={index} className={styles.section} data-section={section.title.toLowerCase()}>
                <h3 className={styles.sectionTitle} data-placeholder={`section_${index}_title`}>
                  {section.title}
                </h3>
                <ul className={styles.sectionLinks} data-placeholder={`section_${index}_links`}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Contact Section - Hidden on Desktop */}
          <div className={styles.mobileContactSection}>
            <h3 className={styles.contactTitle}>
              {contactInfo.title}
            </h3>
            <address className={styles.address}>
              {contactInfo.address.map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </address>
          </div>

          {/* Copyright */}
          <div className={styles.copyright} data-placeholder="copyright">
            {copyrightText}
          </div>
        </div>
      </div>
    </footer>
  );
}