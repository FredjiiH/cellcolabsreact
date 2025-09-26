import React from 'react';
import styles from './FocusAreas.module.css';
import chestImage from '../../assets/images/focus-areas/Chest.webp';

export interface FocusAreaCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface FocusAreasProps {
  cards?: FocusAreaCard[];
  className?: string;
}

const defaultCards: FocusAreaCard[] = [
  {
    id: '1',
    title: 'Prevention in heart health',
    description: 'Exploring how MSCs can lower the risk of cardiovascular disease.',
    imageUrl: chestImage,
    linkUrl: '#'
  },
  {
    id: '2',
    title: 'Rediscovering ease in motion',
    description: 'Studying how MSCs may support cartilage health and ease joint pain in osteoarthritis.',
    imageUrl: chestImage,
    linkUrl: '#'
  },
  {
    id: '3',
    title: 'Strengthening joint & muscle',
    description: 'Investigating how MSCs may aid recovery after injury and maintain musculoskeletal strength.',
    imageUrl: chestImage,
    linkUrl: '#'
  },
  {
    id: '4',
    title: 'Staying active as you age',
    description: 'Researching how MSCs could support performance and promote healthier lives as we grow older.',
    imageUrl: chestImage,
    linkUrl: '#'
  }
];

export const FocusAreas: React.FC<FocusAreasProps> = ({
  cards = defaultCards,
  className = ''
}) => {
  return (
    <section className={`${styles.focusAreas} ${className}`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${card.imageUrl})` }}
              >
                <div className={styles.cardOverlay}>
                  <div className={styles.cardBadge}>Focus areas</div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <a href={card.linkUrl} className={styles.cardLink}>
                    Learn more ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;