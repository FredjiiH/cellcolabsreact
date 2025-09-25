import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  text: string;
  url: string;
  style?: 'primary' | 'secondary' | 'outline' | 'outline-white';
  size?: 'small' | 'default' | 'large';
  alignment?: 'left' | 'center' | 'right';
  openInNewTab?: boolean;
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

export const Button: React.FC<ButtonProps> = ({
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
      data-component="button"
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