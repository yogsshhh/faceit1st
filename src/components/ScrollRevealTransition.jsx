import React from 'react';
import './ScrollRevealTransition.css';

export const ScrollRevealTransition = ({ onBookClick }) => {
  return (
    <section className="reveal-section-root">
      <div className="container">
        <div className="reveal-content-center fade-in-up">
          <span className="reveal-eyebrow">// REASON FOR BEING</span>
          
          <h2 className="reveal-huge-headline">
            YOUR FIRST INTERVIEW<br />
            SHOULDN'T BE YOUR<br />
            <span className="text-metallic">PRACTICE INTERVIEW.</span>
          </h2>

          <p className="reveal-quote">
            "Face it once. Before it counts."
          </p>

          <button className="reveal-sub-statement reveal-btn-interactive" onClick={onBookClick}>
            <span>Book your real mock interview →</span>
          </button>
        </div>
      </div>
    </section>
  );
};
