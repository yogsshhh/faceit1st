import React, { useState } from 'react';
import './SocialProofSection.css';

const TESTIMONIALS = [
  {
    quote: '"It felt closer to the real interview than anything I had practiced before."',
    author: 'Rahul Sharma',
    meta: 'Final-year CS Engineering Student (Placed @ Accenture)'
  },
  {
    quote: '"The TCS Digital mock environment gave me exact clarity on what questions to expect."',
    author: 'Ananya Verma',
    meta: 'Final-year ECE Student (Placed @ TCS Prime)'
  },
  {
    quote: '"My mentor pointed out flaws in my database indexing explanation that saved my Infosys drive."',
    author: 'Priya Nair',
    meta: 'Final-year IT Student (Placed @ Infosys)'
  }
];

export const SocialProofSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="social-proof-root">
      <div className="container">
        <div className="social-quote-box fade-in-up">
          <span className="quote-eyebrow font-mono">// CANDIDATE EXPERIENCE</span>

          <p className="main-quote-text">
            {TESTIMONIALS[activeIdx].quote}
          </p>

          <div className="quote-author-info">
            <h4 className="author-name">{TESTIMONIALS[activeIdx].author}</h4>
            <span className="author-meta">{TESTIMONIALS[activeIdx].meta}</span>
          </div>

          <div className="quote-dots-nav">
            {TESTIMONIALS.map((_, idx) => (
              <button 
                key={idx}
                className={`quote-dot ${activeIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
