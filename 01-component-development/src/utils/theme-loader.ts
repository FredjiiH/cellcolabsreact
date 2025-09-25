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

const themes: Record<ThemeName, Theme> = {
  cellcolabs: cellcolabsTheme as Theme,
  cellcolabsclinical: cellcolabsclinicalTheme as Theme
};

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName];
}

export function applyThemeToCSS(theme: Theme): void {
  const root = document.documentElement;

  // Colors
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-text-primary', theme.colors.text.primary);
  root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
  root.style.setProperty('--color-text-inverse', theme.colors.text.inverse);
  root.style.setProperty('--color-bg-primary', theme.colors.background.primary);
  root.style.setProperty('--color-bg-secondary', theme.colors.background.secondary);
  root.style.setProperty('--color-bg-section', theme.colors.background.section);
  root.style.setProperty('--color-bg-dark', theme.colors.background.dark);
  root.style.setProperty('--color-border-light', theme.colors.border.light);
  root.style.setProperty('--color-border-medium', theme.colors.border.medium);

  // Typography
  root.style.setProperty('--font-heading', theme.typography.fontFamily.heading);
  root.style.setProperty('--font-body', theme.typography.fontFamily.body);
  root.style.setProperty('--font-weight-regular', theme.typography.fontWeight.regular);
  root.style.setProperty('--font-weight-medium', theme.typography.fontWeight.medium);
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold);

  // Spacing
  root.style.setProperty('--spacing-xs', theme.spacing.xs);
  root.style.setProperty('--spacing-sm', theme.spacing.sm);
  root.style.setProperty('--spacing-md', theme.spacing.md);
  root.style.setProperty('--spacing-lg', theme.spacing.lg);
  root.style.setProperty('--spacing-xl', theme.spacing.xl);
  root.style.setProperty('--spacing-xxl', theme.spacing.xxl);

  // Border Radius
  root.style.setProperty('--radius-sm', theme.borderRadius.sm);
  root.style.setProperty('--radius-md', theme.borderRadius.md);
  root.style.setProperty('--radius-lg', theme.borderRadius.lg);
  root.style.setProperty('--radius-full', theme.borderRadius.full);

  // Shadows
  root.style.setProperty('--shadow-sm', theme.shadows.sm);
  root.style.setProperty('--shadow-md', theme.shadows.md);
  root.style.setProperty('--shadow-lg', theme.shadows.lg);

  // Breakpoints (for CSS custom media queries)
  root.style.setProperty('--breakpoint-tablet', theme.breakpoints.tablet);
  root.style.setProperty('--breakpoint-desktop', theme.breakpoints.desktop);
  root.style.setProperty('--breakpoint-wide', theme.breakpoints.wide);
}