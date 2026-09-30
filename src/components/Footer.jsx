import React from 'react';
import './Footer.css';

export const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-root">
      <div className="container footer-layout">
        <div className="footer-brand-block">
          <span className="footer-wordmark">INTERVIEWFORGE</span>
          <p className="footer-tagline-statement">Practice before the pressure is real.</p>
        </div>

        <nav className="footer-links-row">
          <button className="footer-link-btn" onClick={() => scrollToSection('companies')}>Companies</button>
          <button className="footer-link-btn" onClick={() => scrollToSection('how-it-works')}>How It Works</button>
          <button className="footer-link-btn" onClick={() => scrollToSection('pricing')}>Pricing</button>
          <a href="mailto:contact@interviewforge.com" className="footer-link-btn">Contact</a>
        </nav>

        <div className="footer-bottom-copy font-mono">
          <span>© {new Date().getFullYear()} INTERVIEWFORGE. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
};
