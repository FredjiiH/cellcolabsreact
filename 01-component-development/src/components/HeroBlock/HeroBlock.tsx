import styles from './HeroBlock.module.css';

export interface HeroBlockProps {
  heading?: string;
  bodyText?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  theme?: 'cellcolabs' | 'cellcolabsclinical';
  imagePosition?: 'left' | 'right';
}

export function HeroBlock({
  heading = 'Transform Healthcare with Advanced Cell Therapy',
  bodyText = 'Discover cutting-edge cellular treatments that are revolutionizing patient care. Our innovative therapies offer new hope for challenging medical conditions.',
  ctaText = 'Learn More',
  ctaUrl = '#learn-more',
  imageUrl = 'https://via.placeholder.com/600x400',
  imageAlt = 'Cell therapy illustration',
  theme = 'cellcolabs',
  imagePosition = 'right'
}: HeroBlockProps) {
  return (
    <section
      className={`${styles.heroBlock} ${imagePosition === 'left' ? styles.imageLeft : styles.imageRight}`}
      data-component="hero-block"
      data-theme={theme}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.heading} data-placeholder="heading">
              {heading}
            </h1>
            <p className={styles.bodyText} data-placeholder="body_text">
              {bodyText}
            </p>
            <div className={styles.ctaWrapper}>
              <a
                href={ctaUrl}
                className={styles.ctaButton}
                data-placeholder="cta"
              >
                {ctaText}
              </a>
            </div>
          </div>
          <div className={styles.imageContent}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className={styles.image}
              data-placeholder="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}