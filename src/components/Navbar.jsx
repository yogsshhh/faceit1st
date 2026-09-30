import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ onOpenBooking, onOpenLogin, user }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-wordmark">FACEIT<span style={{ color: 'var(--accent-champagne)' }}>1ST</span></span>
        </div>

        {/* Desktop Links */}
        <nav className="navbar-links">
          <button className="nav-link" onClick={() => scrollToSection('companies')}>
            Companies
          </button>
          <button className="nav-link" onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </button>
          <button className="nav-link" onClick={() => scrollToSection('pricing')}>
            Pricing
          </button>
        </nav>

        {/* Desktop Right CTA */}
        <div className="navbar-right">
          <button className="nav-link login-text-btn" onClick={onOpenLogin}>
            {user ? user.name : 'Login'}
          </button>

          <button className="btn-premium btn-dark-outline nav-cta-btn" onClick={() => onOpenBooking()}>
            <span>Book a Mock</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} color="#FFFFFF" /> : <Menu size={24} color="#FFFFFF" />}
        </button>
      </div>

      {/* Full-Screen Black Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay-menu fade-in-up">
          <div className="mobile-overlay-header">
            <span className="brand-wordmark">FACEIT<span style={{ color: 'var(--accent-champagne)' }}>1ST</span></span>
            <button className="close-overlay-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={26} color="#FFFFFF" />
            </button>
          </div>

          <div className="mobile-overlay-links">
            <button className="mobile-menu-item" onClick={() => scrollToSection('companies')}>
              <span>Companies</span>
              <ArrowRight size={18} className="arrow-muted" />
            </button>
            <button className="mobile-menu-item" onClick={() => scrollToSection('how-it-works')}>
              <span>How It Works</span>
              <ArrowRight size={18} className="arrow-muted" />
            </button>
            <button className="mobile-menu-item" onClick={() => scrollToSection('pricing')}>
              <span>Pricing</span>
              <ArrowRight size={18} className="arrow-muted" />
            </button>
            <button className="mobile-menu-item" onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}>
              <span>{user ? `Account (${user.name})` : 'Login'}</span>
              <ArrowRight size={18} className="arrow-muted" />
            </button>
          </div>

          <div className="mobile-overlay-footer">
            <button 
              className="btn-premium btn-metallic btn-block mobile-overlay-cta" 
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
            >
              <span>Book a Mock Interview</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
