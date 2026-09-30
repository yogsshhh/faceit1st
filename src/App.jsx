import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScrollRevealTransition } from './components/ScrollRevealTransition';
import { CompanyExperience } from './components/CompanyExperience';
import { TheDifference } from './components/TheDifference';
import { ThreeStageExperience } from './components/ThreeStageExperience';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LoginModal } from './components/LoginModal';

export function App() {
  const [user, setUser] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState('accenture');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenBooking = (companyId = 'accenture') => {
    setSelectedCompanyId(companyId);
    setIsBookingModalOpen(true);
  };

  const scrollToCompanies = () => {
    const el = document.getElementById('companies');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-root-black">
      {/* Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking('accenture')}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        user={user}
      />

      {/* Hero Section & Product Visual */}
      <HeroSection 
        onBookClick={(companyId) => handleOpenBooking(typeof companyId === 'string' ? companyId : 'accenture')}
        onExploreClick={scrollToCompanies}
      />

      {/* Cinematic Scroll Reveal Statement */}
      <ScrollRevealTransition onBookClick={(companyId) => handleOpenBooking(typeof companyId === 'string' ? companyId : 'accenture')} />

      {/* Horizontal Monochrome Company Selector & Interactive Preview */}
      <CompanyExperience 
        onSelectCompany={(companyId) => handleOpenBooking(companyId)}
      />

      {/* The Difference: QUESTION -> INTERVIEW -> FEEDBACK */}
      <TheDifference />

      {/* The 3-Stage Experience: 01 CHOOSE, 02 PRACTICE, 03 IMPROVE */}
      <ThreeStageExperience 
        onBookClick={(companyId) => handleOpenBooking(typeof companyId === 'string' ? companyId : 'accenture')}
      />

      {/* Minimal Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal 
          initialCompanyId={selectedCompanyId}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
        />
      )}
    </div>
  );
}

export default App;
