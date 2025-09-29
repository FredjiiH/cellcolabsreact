import React from 'react';
import styles from './Grid2x2CardImage.module.css';
import chestImage from '../../assets/images/focus-areas/Chest.webp';
import muscleImage from '../../assets/images/focus-areas/muscle.png';

export interface Grid2x2CardImageCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface Grid2x2CardImageProps {
  cards?: Grid2x2CardImageCard[];
  className?: string;
}

const defaultCards: Grid2x2CardImageCard[] = [
  {
    id: '1',
    title: 'Prevention in heart health',
    description: 'Exploring how MSCs can lower the risk of cardiovascular disease.',
    imageUrl: muscleImage,  // Using muscle image for top left
    linkUrl: '#'
  },
  {
    id: '2',
    title: 'Rediscovering ease in motion',
    description: 'Studying how MSCs may support cartilage health and ease joint pain in osteoarthritis.',
    imageUrl: muscleImage,  // Using muscle image for top right
    linkUrl: '#'
  },
  {
    id: '3',
    title: 'Strengthening joint & muscle',
    description: 'Investigating how MSCs may aid recovery after injury and maintain musculoskeletal strength.',
    imageUrl: chestImage,  // Keeping chest image for bottom left
    linkUrl: '#'
  },
  {
    id: '4',
    title: 'Staying active as you age',
    description: 'Researching how MSCs could support performance and promote healthier lives as we grow older.',
    imageUrl: chestImage,  // Keeping chest image for bottom right
    linkUrl: '#'
  }
];

export const Grid2x2CardImage: React.FC<Grid2x2CardImageProps> = ({
  cards = defaultCards,
  className = ''
}) => {
  return (
    <section className={`${styles.grid2x2CardImage} ${className}`}>
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

export default Grid2x2CardImage;