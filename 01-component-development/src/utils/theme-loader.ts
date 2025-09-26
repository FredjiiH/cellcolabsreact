import cellcolabsTheme from '@themes/cellcolabs.json';
import cellcolabsclinicalTheme from '@themes/cellcolabsclinical.json';

export type ThemeName = 'cellcolabs' | 'cellcolabsclinical';

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    background: {
      primary: string;
      secondary: string;
      section: string;
      dark: string;
    };
    border: {
      light: string;
      medium: string;
    };
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
    };
    fontSize: {
      mobile: {
        h1: string;
        h2: string;
        h3: string;
        body: string;
        small: string;
      };
      desktop: {
        h1: string;
        h2: string;
        h3: string;
        body: string;
        small: string;
      };
    };
    fontWeight: {
      regular: string;
      medium: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  spacing: {
    unit: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    containerPadding: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

const themes: Record<ThemeName, any> = {
  cellcolabs: cellcolabsTheme as any,
  cellcolabsclinical: cellcolabsclinicalTheme as any
};

export function getTheme(themeName: ThemeName): any {
  return themes[themeName];
}

export function applyThemeToCSS(theme: any): void {
  const root = document.documentElement;

  // Colors - using actual theme structure
  root.style.setProperty('--color-primary', theme.colors.brand[500] || '#00A651');
  root.style.setProperty('--color-text-primary', theme.colors.text.primary);
  root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
  root.style.setProperty('--color-text-link', theme.colors.text.link);
  root.style.setProperty('--color-bg-white', theme.colors.background.white);

  // Typography
  root.style.setProperty('--font-heading', theme.typography.fontFamily.heading);
  root.style.setProperty('--font-body', theme.typography.fontFamily.body);
  root.style.setProperty('--font-weight-regular', theme.typography.fontWeight.regular);
  root.style.setProperty('--font-weight-medium', theme.typography.fontWeight.medium);
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold);

  // Spacing
  root.style.setProperty('--spacing-xs', theme.spacing.space8);
  root.style.setProperty('--spacing-sm', theme.spacing.space16);
  root.style.setProperty('--spacing-md', theme.spacing.space24);
  root.style.setProperty('--spacing-lg', theme.spacing.space32);
  root.style.setProperty('--spacing-xl', theme.spacing.space48);
  root.style.setProperty('--spacing-xxl', theme.spacing.space64);

  // Border Radius
  root.style.setProperty('--radius-sm', theme.borderRadius.sm);
  root.style.setProperty('--radius-md', theme.borderRadius.md);
  root.style.setProperty('--radius-lg', theme.borderRadius.lg);
  root.style.setProperty('--radius-full', theme.borderRadius.full);

  // Shadows
  root.style.setProperty('--shadow-sm', theme.shadows.sm);
  root.style.setProperty('--shadow-md', theme.shadows.md);
  root.style.setProperty('--shadow-lg', theme.shadows.lg);

  // Breakpoints
  root.style.setProperty('--breakpoint-tablet', theme.breakpoints.tablet);
  root.style.setProperty('--breakpoint-desktop', theme.breakpoints.desktop);
  root.style.setProperty('--breakpoint-wide', theme.breakpoints.wide);
}