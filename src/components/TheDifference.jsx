import React, { useState, useEffect } from 'react';
import { ArrowRight, HelpCircle, Video, CheckCircle2 } from 'lucide-react';
import './TheDifference.css';

export const TheDifference = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'question',
      title: 'QUESTION',
      subtitle: 'Reading answers on a screen',
      desc: 'Static question banks give you solutions, but cannot test how you perform under live scrutiny.',
      icon: <HelpCircle size={28} color="#8A8A8A" />
    },
    {
      id: 'interview',
      title: 'INTERVIEW',
      subtitle: 'Live pressure & real-time evaluation',
      desc: 'Face live technical follow-up questions, code execution challenges, and real-time interviewer evaluation.',
      icon: <Video size={28} color="#C5A880" />
    },
    {
      id: 'feedback',
      title: 'FEEDBACK',
      subtitle: 'Comprehensive diagnostic scorecard',
      desc: 'Receive an immediate breakdown of your technical accuracy, communication score, and areas for improvement.',
      icon: <CheckCircle2 size={28} color="#FFFFFF" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="difference-root">
      <div className="container">
        <div className="difference-header">
          <span className="diff-eyebrow">// THE PARADIGM SHIFT</span>
          <h2 className="diff-title">
            DON'T JUST<br />
            PREPARE.<br />
            <span className="text-metallic">PRACTICE THE INTERVIEW.</span>
          </h2>
          <p className="diff-subtitle">
            "Experience the interview before you walk into the real one."
          </p>
        </div>

        {/* Animated Transition Component: QUESTION -> INTERVIEW -> FEEDBACK */}
        <div className="difference-interactive-flow">
          <div className="flow-tabs-header">
            {stages.map((stg, idx) => (
              <button 
                key={stg.id}
                className={`flow-tab-btn ${activeStage === idx ? 'active' : ''}`}
                onClick={() => setActiveStage(idx)}
              >
                <span className="tab-idx">0{idx + 1}</span>
                <span className="tab-title">{stg.title}</span>
              </button>
            ))}
          </div>

          <div className="flow-card-stage fade-in-up">
            <div className="stage-icon-wrap">
              {stages[activeStage].icon}
            </div>

            <div className="stage-info">
              <span className="stage-sub-lbl">{stages[activeStage].subtitle}</span>
              <h3 className="stage-main-title">{stages[activeStage].title} PHASE</h3>
              <p className="stage-body-text">{stages[activeStage].desc}</p>
            </div>

            <div className="stage-prog-bar">
              <div 
                className="prog-fill" 
                style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
