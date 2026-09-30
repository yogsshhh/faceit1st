import React, { useState } from 'react';
import { Target, Sparkles, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import './CampusDriveWidget.css';

export const CampusDriveWidget = ({ onBookClick }) => {
  const [selectedCompany, setSelectedCompany] = useState('tcs');
  const [preparationWeeks, setPreparationWeeks] = useState('2');

  const readinessScores = {
    accenture: { score: '88%', focus: 'Pseudo Code & Coding Round', level: 'High Competition' },
    tcs: { score: '92%', focus: 'TCS NQT Advanced Coding & Digital Track', level: 'Very High Volume' },
    infosys: { score: '85%', focus: 'InfyTQ & Technical HR Scenarios', level: 'Medium-High' },
    cognizant: { score: '90%', focus: 'GenC Next Technical + Aptitude', level: 'High Demand' },
    wipro: { score: '87%', focus: 'Elite NTH Coding & HR', level: 'Popular Drive' },
    deloitte: { score: '82%', focus: 'Consulting Case Study & Tech HR', level: 'Tier-1 Elite' },
    capgemini: { score: '89%', focus: 'Game-based Aptitude & Tech Round', level: 'High Hiring' }
  };

  const currentInfo = readinessScores[selectedCompany];

  return (
    <section className="readiness-widget-section">
      <div className="container">
        <div className="readiness-card-wrapper fade-in">
          <div className="readiness-header">
            <div className="widget-badge">
              <Sparkles size={16} />
              <span>Campus Placement Readiness Calculator</span>
            </div>
            <h2>Are You Prepared For Your Upcoming On-Campus Drive?</h2>
            <p>Select your target company drive to calculate your recommended preparation track.</p>
          </div>

          <div className="readiness-content-grid">
            <div className="calculator-inputs">
              <div className="input-block">
                <label className="input-label">1. Target On-Campus Company</label>
                <div className="company-pills">
                  {['accenture', 'tcs', 'infosys', 'cognizant', 'wipro', 'deloitte', 'capgemini'].map((id) => (
                    <button 
                      key={id}
                      className={`comp-pill ${selectedCompany === id ? 'active' : ''}`}
                      onClick={() => setSelectedCompany(id)}
                    >
                      {id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-block" style={{ marginTop: '1.25rem' }}>
                <label className="input-label">2. Time Left Until Campus Drive</label>
                <div className="time-pills">
                  <button className={`time-pill ${preparationWeeks === '1' ? 'active' : ''}`} onClick={() => setPreparationWeeks('1')}>
                    ⚡ Under 1 Week (Urgent)
                  </button>
                  <button className={`time-pill ${preparationWeeks === '2' ? 'active' : ''}`} onClick={() => setPreparationWeeks('2')}>
                    📅 1–2 Weeks (Ideal)
                  </button>
                  <button className={`time-pill ${preparationWeeks === '4' ? 'active' : ''}`} onClick={() => setPreparationWeeks('4')}>
                    🚀 1 Month+ (Early Prep)
                  </button>
                </div>
              </div>
            </div>

            <div className="readiness-results-card">
              <div className="results-top">
                <span className="results-label">Estimated Campus Drive Readiness</span>
                <div className="score-display">
                  <span className="score-num">{currentInfo.score}</span>
                  <span className="score-sub">Success Probability with 1:1 Mock Practice</span>
                </div>
              </div>

              <div className="results-body">
                <div className="res-row">
                  <span className="res-lbl">Key Focus Area:</span>
                  <span className="res-val">{currentInfo.focus}</span>
                </div>
                <div className="res-row">
                  <span className="res-lbl">Competition Level:</span>
                  <span className="res-val highlight">{currentInfo.level}</span>
                </div>
                <div className="res-row">
                  <span className="res-lbl">Recommended Prep:</span>
                  <span className="res-val">1x Technical + 1x HR Mock Session</span>
                </div>
              </div>

              <button className="btn btn-primary btn-block btn-lg widget-cta" onClick={() => onBookClick(selectedCompany)}>
                <span>Book {selectedCompany.toUpperCase()} Live Mock (₹499)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
