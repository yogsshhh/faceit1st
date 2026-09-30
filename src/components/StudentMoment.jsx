import React from 'react';
import { ArrowRight, Moon } from 'lucide-react';
import './StudentMoment.css';

export const StudentMoment = ({ onBookClick }) => {
  return (
    <section className="student-moment-root">
      <div className="container">
        <div className="cinematic-photo-frame fade-in-up">
          {/* Background Photo with dark mood lighting */}
          <div className="photo-backdrop-overlay">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80" 
              alt="Late Night Campus Placement Preparation" 
              className="cinematic-bg-img"
            />
            <div className="dark-vignette-layer"></div>
          </div>

          {/* Text Overlays */}
          <div className="student-moment-content">
            <div className="time-badge font-mono">
              <Moon size={14} color="#C5A880" />
              <span>11:47 PM</span>
            </div>

            <h2 className="moment-statement">
              Tomorrow is the interview.<br />
              <span className="text-metallic">Tonight, practice it.</span>
            </h2>

            <button className="btn-premium btn-metallic" onClick={onBookClick}>
              <span>Book a Mock</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
