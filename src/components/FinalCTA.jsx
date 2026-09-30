import React from 'react';
import { ArrowRight } from 'lucide-react';
import './FinalCTA.css';

export const FinalCTA = ({ onBookClick }) => {
  return (
    <section className="final-cta-root" id="pricing">
      <div className="container">
        <div className="final-cta-box fade-in-up">
          <span className="cta-eyebrow font-mono">// FINAL PREPARATION</span>
          
          <h2 className="cta-heading">
            READY WHEN THE<br />
            <span className="text-metallic">INTERVIEW IS?</span>
          </h2>

          <p className="cta-subtext">
            Choose your company. Book your mock. Walk in prepared.
          </p>

          <button className="btn-premium btn-metallic cta-giant-btn" onClick={onBookClick}>
            <span>START PRACTICING →</span>
          </button>
        </div>
      </div>
    </section>
  );
};
