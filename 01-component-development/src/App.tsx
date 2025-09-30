import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { ContentSection } from './components/ContentSection/ContentSection';
import { Grid2x2CardImage } from './components/Grid2x2CardImage/Grid2x2CardImage';
import { WhyUsSection } from './components/WhyUsSection/WhyUsSection';
import { LocationsCarousel } from './components/LocationsCarousel/LocationsCarousel';
import { Footer } from './components/Footer/Footer';
import { applyThemeToCSS, getTheme, ThemeName } from './utils/theme-loader';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('cellcolabs');

  useEffect(() => {
    const theme = getTheme(currentTheme);
    applyThemeToCSS(theme);
  }, [currentTheme]);

  const handleThemeChange = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="app" data-theme={currentTheme}>
      {/* Theme Switcher */}
      <div className="theme-switcher">
        <label>Theme:</label>
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
        >
          <option value="cellcolabs">Cellcolabs</option>
          <option value="cellcolabsclinical">Cellcolabs Clinical</option>
        </select>
      </div>

      {/* Navigation */}
      <Navigation
        brandText={currentTheme === 'cellcolabs' ? 'Cellcolabs' : 'Cellcolabs Clinical'}
        theme={currentTheme}
      />

      {/* Content Section with Cards */}
      <ContentSection
        title="Our clinical research programs"
        subtitle="We conduct patient-funded clinical trials exploring stem cell treatments with potential to protect your heart, restore mobility, and support healthy aging."
        cards={[
          {
            id: '1',
            headline: 'Heart Protection Study',
            description: 'If the trial is a good fit, you\'ll receive an offer with the participation details. Once you\'re ready, a date is booked and arrangements confirmed. Our team will guide you through every step of the process.',
            imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=343&h=228&fit=crop',
            imageAlt: 'Clinical research lab'
          },
          {
            id: '2',
            headline: 'Mobility Restoration Program',
            description: 'Begin with a simple sign-up online. This allows us to share more information and see if a trial may be right for you. We\'ll assess your eligibility and provide detailed information about the treatment protocol.',
            imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=343&h=228&fit=crop',
            imageAlt: 'Medical research'
          },
          {
            id: '3',
            headline: 'Healthy Aging Initiative',
            description: 'Our comprehensive approach combines cutting-edge stem cell therapy with personalized treatment plans. Each participant receives careful monitoring and support throughout their journey.',
            imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=343&h=228&fit=crop',
            imageAlt: 'Laboratory research'
          }
        ]}
        theme={currentTheme}
      />

      {/* Grid2x2CardImage */}
      <Grid2x2CardImage />

      {/* WhyUsSection */}
      <WhyUsSection
        title="Excellence in every cell"
        items={[
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
        ]}
        theme={currentTheme}
      />

      {/* LocationsCarousel */}
      <LocationsCarousel
        eyebrowText="Locations"
        mainTitle="Stem cell therapy in the Bahamas"
        mainDescription="At Cellcolabs Clinical, we conduct our patient-funded clinical trials in the Bahamas, a destination recognized both for tourism and for its role as a hub of regenerative medicine. All trials are approved by the Bahamas National Stem Cell Ethics Committee and carried out by experienced local physicians, ensuring both safety and expertise."
        locations={[
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
        ]}
        theme={currentTheme}
      />

      {/* Footer */}
      <Footer
        brandText={currentTheme === 'cellcolabs' ? 'Cellcolabs' : 'Cellcolabs Clinical'}
        theme={currentTheme}
      />
    </div>
  );
}

export default App;