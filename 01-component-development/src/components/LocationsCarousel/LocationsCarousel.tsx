import React, { useState } from 'react';
import styles from './LocationsCarousel.module.css';

export interface LocationData {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  linkText: string;
  linkUrl: string;
}

export interface LocationsCarouselProps {
  eyebrowText?: string;
  mainTitle: string;
  mainDescription: string;
  locations: LocationData[];
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

export const LocationsCarousel: React.FC<LocationsCarouselProps> = ({
  eyebrowText = 'Locations',
  mainTitle = 'Stem cell therapy\nin the Bahamas',
  mainDescription = 'At Cellcolabs Clinical, we conduct our patient-funded clinical trials in the Bahamas, a destination recognized both for tourism and for its role as a hub of regenerative medicine. All trials are approved by the Bahamas National Stem Cell Ethics Committee and carried out by experienced local physicians, ensuring both safety and expertise.',
  locations = [
    {
      id: 'live-well',
      name: 'Cellcolabs by Live Well',
      title: 'Cellcolabs by Live Well',
      description: 'Our clinic at The Albany resort is designed to make every participant feel cared for in a calm and private environment. Situated within The Albany, one of Nassau\'s most renowned resort communities, the clinic is surrounded by nearby accommodations, wellness amenities, and convenient travel access.',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1136&h=638&fit=crop',
      imageAlt: 'Cellcolabs by Live Well clinic interior',
      linkText: 'Get directions ↗',
      linkUrl: '#'
    },
    {
      id: 'albany-resort',
      name: 'The Albany Resort',
      title: 'The Albany Resort',
      description: 'Experience world-class facilities at The Albany Resort, featuring state-of-the-art medical equipment and luxurious accommodations. Our partnership with this premier destination ensures you receive exceptional care in an unparalleled setting.',
      imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1136&h=638&fit=crop',
      imageAlt: 'The Albany Resort facilities',
      linkText: 'Learn more ↗',
      linkUrl: '#'
    }
  ],
  theme = 'cellcolabsclinical'
}) => {
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  const activeLocation = locations[activeLocationIndex];

  return (
    <section
      className={styles.locationsCarousel}
      data-component="locationsCarousel"
      data-theme={theme}
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>
              {eyebrowText}
            </div>
            <h2 className={styles.mainTitle}>{mainTitle}</h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.mainDescription}>{mainDescription}</p>

            {/* Tab Navigation */}
            <div className={styles.tabNavigation}>
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  className={`${styles.tab} ${index === activeLocationIndex ? styles.tabActive : ''}`}
                  onClick={() => setActiveLocationIndex(index)}
                  aria-selected={index === activeLocationIndex}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className={styles.carouselContainer}>
          <div
            className={styles.carouselTrack}
            style={{
              '--slide-index': activeLocationIndex
            } as React.CSSProperties}
          >
            {locations.map((location) => (
              <div key={location.id} className={styles.carouselSlide}>
                <img
                  src={location.imageUrl}
                  alt={location.imageAlt}
                  className={styles.carouselImage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className={styles.progressIndicators}>
          {locations.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${index === activeLocationIndex ? styles.progressDotActive : ''}`}
            />
          ))}
        </div>

        {/* Bottom Content */}
        <div className={styles.bottomContent}>
          <div className={styles.bottomContentInner}>
            <h3 className={styles.locationTitle}>{activeLocation.title}</h3>
            <p className={styles.locationDescription}>{activeLocation.description}</p>
            <a href={activeLocation.linkUrl} className={styles.locationLink}>
              {activeLocation.linkText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const componentMetadata = {
  name: 'LocationsCarousel',
  category: 'Content',
  tags: ['locations', 'carousel', 'tabs', 'hero', 'overflow'],
  useCases: ['location-showcase', 'facility-presentation', 'hero-sections'],
  responsive: true,
  accessibility: 'WCAG-AA',
  version: '1.0.0'
};

export default LocationsCarousel;