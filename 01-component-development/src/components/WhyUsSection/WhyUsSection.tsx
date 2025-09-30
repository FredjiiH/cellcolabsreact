import React from 'react';
import styles from './WhyUsSection.module.css';

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface WhyUsSectionProps {
  title: string;
  items: WhyUsItem[];
  theme?: 'cellcolabs' | 'cellcolabsclinical';
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({
  title = 'Excellence in every cell',
  items = [
    {
      title: 'Highest quality stem cells',
      description: 'GMP-certified and produced under the world\'s strictest safety standards.'
    },
    {
      title: 'Personal health insights',
      description: 'In-depth biomarker testing gives you a clearer picture of your body and wellbeing.'
    },
    {
      title: 'Continuous health monitoring',
      description: 'We follow your progress closely, supporting you throughout the journey.'
    },
    {
      title: 'Expert medical care',
      description: 'A dedicated team of experienced doctors by your side.'
    }
  ],
  theme = 'cellcolabsclinical'
}) => {
  return (
    <section
      className={styles.whyUsSection}
      data-component="whyUsSection"
      data-theme={theme}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Desktop Layout */}
          <div className={styles.desktopLayout}>
            <div className={styles.titleColumn}>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.itemsColumn}>
              <div className={styles.itemsWrapper}>
                {items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <div className={styles.checkmark}>✓</div>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className={styles.mobileLayout}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.itemsList}>
              {items.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.checkmark}>✓</div>
                  <div className={styles.itemContent}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const componentMetadata = {
  name: 'WhyUsSection',
  category: 'Content',
  tags: ['why-us', 'benefits', 'checklist', 'features', 'excellence'],
  useCases: ['benefits-showcase', 'feature-highlights', 'trust-building'],
  responsive: true,
  accessibility: 'WCAG-AA',
  version: '1.0.0'
};

export default WhyUsSection;