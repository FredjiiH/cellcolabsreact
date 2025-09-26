import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { ContentSection } from './components/ContentSection/ContentSection';
import { FocusAreas } from './components/FocusAreas/FocusAreas';
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

      {/* Focus Areas Grid */}
      <FocusAreas />

      {/* Footer */}
      <Footer
        brandText={currentTheme === 'cellcolabs' ? 'Cellcolabs' : 'Cellcolabs Clinical'}
        theme={currentTheme}
      />
    </div>
  );
}

export default App;