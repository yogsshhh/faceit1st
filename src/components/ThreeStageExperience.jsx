import React from 'react';
import { ArrowRight, CheckCircle2, Sliders, Shield, Award } from 'lucide-react';
import './ThreeStageExperience.css';

export const ThreeStageExperience = ({ onBookClick }) => {
  return (
    <section className="three-stage-root" id="how-it-works">
      <div className="container">
        {/* Stage 01 */}
        <div className="stage-block-item fade-in-up">
          <div className="stage-left-info">
            <span className="stage-number">01</span>
            <h2 className="stage-heading">CHOOSE</h2>
            <p className="stage-lead">Choose the company you're preparing for during campus placements.</p>
            <p className="stage-body">
              Select Accenture, TCS, Infosys, Cognizant, Wipro, Deloitte or Capgemini to launch a session tailored strictly to their hiring drive patterns.
            </p>
          </div>

          <div className="stage-right-preview">
            <div className="stage-frame-window">
              <div className="frame-header-bar">
                <span className="f-title">SELECT TARGET / 01</span>
                <span className="f-status text-champagne">ACTIVE</span>
              </div>
              <div className="frame-body-box">
                <div className="company-pick-row selected">
                  <span className="c-name">ACCENTURE</span>
                  <span className="c-role font-mono">Software Engineer Track</span>
                  <CheckCircle2 size={16} color="#C5A880" />
                </div>
                <div className="company-pick-row muted">
                  <span className="c-name">TCS</span>
                  <span className="c-role font-mono">Ninja & Digital Track</span>
                </div>
                <div className="company-pick-row muted">
                  <span className="c-name">INFOSYS</span>
                  <span className="c-role font-mono">InfyTQ Specialist Track</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 02 */}
        <div className="stage-block-item fade-in-up">
          <div className="stage-left-info">
            <span className="stage-number">02</span>
            <h2 className="stage-heading">PRACTICE</h2>
            <p className="stage-lead">Enter a realistic live 1-on-1 mock interview.</p>
            <p className="stage-body">
              Answer live coding and technical follow-ups under strict time pressure with a senior ex-interviewer.
            </p>
          </div>

          <div className="stage-right-preview">
            <div className="stage-frame-window">
              <div className="frame-header-bar">
                <span className="f-title">LIVE SESSION ENGINE / 02</span>
                <span className="f-status text-champagne">● 45:00</span>
              </div>
              <div className="frame-body-box">
                <div className="live-mock-dialog font-mono">
                  <span className="interviewer-prefix">INTERVIEWER:</span>
                  <p className="dialog-text">
                    "Good logic on the array traversal. Now how would you optimize the memory footprint to O(1) space?"
                  </p>
                </div>
                <div className="live-input-box">
                  <span className="input-prompt">&gt; Candidate response streaming live...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 03 */}
        <div className="stage-block-item fade-in-up">
          <div className="stage-left-info">
            <span className="stage-number">03</span>
            <h2 className="stage-heading">IMPROVE</h2>
            <p className="stage-lead">Receive a detailed performance breakdown score within 2 hours.</p>
            <p className="stage-body">
              Know exactly where you stand before the campus drive begins with diagnostic scores across key interview dimensions.
            </p>
          </div>

          <div className="stage-right-preview">
            <div className="stage-frame-window">
              <div className="frame-header-bar">
                <span className="f-title">DIAGNOSTIC REPORT / 03</span>
                <span className="f-status text-champagne">VERIFIED</span>
              </div>
              
              <div className="frame-body-box">
                <div className="scores-metrics-grid">
                  <div className="score-metric-item">
                    <span className="score-val">88</span>
                    <span className="score-label">TECHNICAL</span>
                    <div className="score-bar"><div className="fill" style={{ width: '88%' }}></div></div>
                  </div>

                  <div className="score-metric-item">
                    <span className="score-val">82</span>
                    <span className="score-label">COMMUNICATION</span>
                    <div className="score-bar"><div className="fill" style={{ width: '82%' }}></div></div>
                  </div>

                  <div className="score-metric-item">
                    <span className="score-val">79</span>
                    <span className="score-label">CONFIDENCE</span>
                    <div className="score-bar"><div className="fill" style={{ width: '79%' }}></div></div>
                  </div>

                  <div className="score-metric-item overall-item">
                    <span className="score-val text-champagne">84</span>
                    <span className="score-label">OVERALL SCORE</span>
                    <div className="score-bar"><div className="fill metallic" style={{ width: '84%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
