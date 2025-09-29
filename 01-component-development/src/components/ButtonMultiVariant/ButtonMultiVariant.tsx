import React from 'react';
import styles from './ButtonMultiVariant.module.css';

export interface ButtonMultiVariantProps {
  text: string;
  url: string;
  style?: 'primary' | 'secondary' | 'outline' | 'outline-white';
  size?: 'small' | 'default' | 'large';
  alignment?: 'left' | 'center' | 'right';
  openInNewTab?: boolean;
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

export const ButtonMultiVariant: React.FC<ButtonMultiVariantProps> = ({
  text = 'Click here',
  url = '#',
  style = 'primary',
  size = 'default',
  alignment = 'left',
  openInNewTab = false,
  theme = 'cellcolabsclinical'
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button${style.charAt(0).toUpperCase() + style.slice(1)}`],
    size !== 'default' ? styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`] : ''
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.buttonWrapper,
    styles[`align${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`]
  ].join(' ');

  return (
    <div
      className={wrapperClasses}
      data-component="buttonMultiVariant"
      data-theme={theme}
    >
      <a
        href={url}
        className={buttonClasses}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
      >
        {text}
      </a>
    </div>
  );
};

export const componentMetadata = {
  name: 'ButtonMultiVariant',
  category: 'Action',
  tags: ['button', 'multi-variant', 'primary', 'secondary', 'outline', 'cta'],
  useCases: ['flexible-buttons', 'multiple-styles', 'hubspot-integration'],
  responsive: true,
  accessibility: 'WCAG-AA',
  version: '1.0.0'
};

export default ButtonMultiVariant;