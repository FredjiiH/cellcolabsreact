import { useState } from 'react';
import styles from './Navigation.module.css';

export interface NavigationProps {
  brandText?: string;
  menuItems?: Array<{
    label: string;
    href: string;
  }>;
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

const defaultMenuItems = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'About', href: '#about' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' }
];

export function Navigation({
  brandText = 'Cellcolabs Clinical',
  menuItems = defaultMenuItems,
  theme = 'cellcolabs'
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={styles.navigation}
      data-component="navigation"
      data-theme={theme}
      data-node-id="699:4112"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand} data-placeholder="brand_text">
            <span className={styles.brandBold}>Cellcolabs </span>
            <span className={styles.brandRegular}>Clinical</span>
          </div>

          <button
            className={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={styles.dotsGrid}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </button>

          <ul
            className={`${styles.menu} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
            data-placeholder="menu_items"
          >
            {menuItems.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <a href={item.href} className={styles.menuLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}