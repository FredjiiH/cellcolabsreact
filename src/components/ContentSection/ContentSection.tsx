import { useState } from 'react';
import styles from './ContentSection.module.css';

export interface ContentCard {
  id: string;
  headline: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  cards?: ContentCard[];
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

const defaultCards: ContentCard[] = [
  {
    id: '1',
    headline: 'Headline',
    description: 'If the trial is a good fit, you\'ll receive an offer with the participation details. Once you\'re ready, a date is booked and arrangements confirmed.',
    imageUrl: 'https://via.placeholder.com/343x228',
    imageAlt: 'Clinical research image'
  },
  {
    id: '2',
    headline: 'Headline',
    description: 'Begin with a simple sign-up online. This allows us to share more information and see if a trial may be right for you.',
    imageUrl: 'https://via.placeholder.com/343x228',
    imageAlt: 'Clinical research image'
  },
  {
    id: '3',
    headline: 'Headline',
    description: 'If the trial is a good fit, you\'ll receive an offer with the participation details. Once you\'re ready, a date is booked and arrangements confirmed.',
    imageUrl: 'https://via.placeholder.com/343x228',
    imageAlt: 'Clinical research image'
  }
];

function ContentCard({ card }: { card: ContentCard }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={card.imageUrl} alt={card.imageAlt} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTextContent}>
          <h3 className={styles.cardHeadline} data-placeholder={`card_${card.id}_headline`}>
            {card.headline}
          </h3>
          <p
            className={`${styles.cardDescription} ${isExpanded ? styles.expanded : ''}`}
            data-placeholder={`card_${card.id}_description`}
          >
            {card.description}
          </p>
        </div>
        <button
          className={styles.readMoreButton}
          onClick={() => setIsExpanded(!isExpanded)}
          data-placeholder={`card_${card.id}_button`}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}

export function ContentSection({
  title = 'Our clinical research programs',
  subtitle = 'We conduct patient-funded clinical trials exploring stem cell treatments with potential to protect your heart, restore mobility, and support healthy aging.',
  cards = defaultCards,
  theme = 'cellcolabs'
}: ContentSectionProps) {
  return (
    <section
      className={styles.contentSection}
      data-component="content-section"
      data-theme={theme}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title} data-placeholder="title">
            {title}
          </h2>
          <p className={styles.subtitle} data-placeholder="subtitle">
            {subtitle}
          </p>
        </div>
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <ContentCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}