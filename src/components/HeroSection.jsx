import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { CompanyGlobe3D } from './CompanyGlobe3D';
import './HeroSection.css';

export const HeroSection = ({ onBookClick, onExploreClick }) => {
  return (
    <section className="hero-section-root" id="hero">
      <div className="container hero-layout-grid">
        {/* Left Column — Editorial Copy (Kept Exactly As Requested) */}
        <div className="hero-editorial-col fade-in-up">
          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>
            <span>// CAMPUS PLACEMENT PREPARATION</span>
          </div>

          <h1 className="hero-display-title">
            YOUR PLACEMENT<br />
            INTERVIEW.<br />
            <span className="text-metallic">BEFORE THE REAL ONE.</span>
          </h1>

          <p className="hero-support-text">
            Practice a realistic interview built around the company you're targeting.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn-premium btn-metallic hero-primary-btn" 
              onClick={() => onBookClick('accenture')}
            >
              <span>BOOK A MOCK INTERVIEW</span>
              <ArrowRight size={18} />
            </button>

            <button className="explore-sublink" onClick={onExploreClick}>
              Explore Companies ↓
            </button>
          </div>

          <div className="hero-trust-indicator font-mono">
            <ShieldCheck size={16} className="trust-icon" />
            <span>Over 2,400+ campus drive interviews conducted across top target companies.</span>
          </div>
        </div>

        {/* Right Column — 3D Interactive Company Globe Ecosystem */}
        <div className="hero-globe-col fade-in-up">
          <CompanyGlobe3D onSelectCompany={(companyId) => onBookClick(companyId)} />
        </div>
      </div>
    </section>
  );
};
