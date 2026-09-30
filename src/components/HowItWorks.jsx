import React from 'react';
import { TESTIMONIALS, FAQS } from '../data/mockData';
import { Target, Calendar, Video, FileCheck, HelpCircle, ChevronDown, Check } from 'lucide-react';
import './HowItWorks.css';

export const HowItWorks = ({ onBookClick }) => {
  const [openFaq, setOpenFaq] = React.useState(null);

  const steps = [
    {
      num: '01',
      title: 'Select Company & Role',
      desc: 'Pick from Accenture, TCS, Infosys, Cognizant, Wipro, Deloitte or Capgemini and select your target role.',
      icon: <Target size={24} color="#4F46E5" />
    },
    {
      num: '02',
      title: 'Choose Date & Time Slot',
      desc: 'Select a convenient 45-minute slot that fits your schedule. Morning, afternoon & evening slots available.',
      icon: <Calendar size={24} color="#4F46E5" />
    },
    {
      num: '03',
      title: 'Live 1-on-1 Mock Session',
      desc: 'Join via Google Meet with a verified interviewer. Answer live technical & HR questions in real-time.',
      icon: <Video size={24} color="#4F46E5" />
    },
    {
      num: '04',
      title: 'Get Scorecard & Feedback',
      desc: 'Receive a comprehensive diagnostic report highlighting your strengths, coding score, and weak spots.',
      icon: <FileCheck size={24} color="#4F46E5" />
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper fade-in">
          <div className="section-badge">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="section-heading">How InterviewForge Works</h2>
          <p className="section-subtitle">
            From booking to detailed scorecard — here is how we prepare you for final placement success.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid fade-in">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-top">
                <div className="step-icon-box">{step.icon}</div>
                <span className="step-num">{step.num}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="mid-banner-card fade-in">
          <div className="banner-text">
            <h3>Ready to test your preparation?</h3>
            <p>Book your 45-minute live mock session for ₹499 and get actionable feedback today.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={onBookClick}>
            Book Mock Interview Now
          </button>
        </div>

        {/* Testimonials */}
        <div className="testimonials-section fade-in">
          <div className="section-title-wrapper" style={{ marginBottom: '2.5rem' }}>
            <h3 className="section-heading" style={{ fontSize: '1.85rem' }}>What Placed Candidates Say</h3>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img src={item.avatar} alt={item.name} className="testimonial-avatar" />
                  <div>
                    <h4 className="testimonial-name">{item.name}</h4>
                    <p className="testimonial-role">{item.role}</p>
                    <span className="testimonial-college">{item.college}</span>
                  </div>
                </div>
                <p className="testimonial-comment">"{item.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-wrapper fade-in">
          <div className="section-title-wrapper" style={{ marginBottom: '2rem' }}>
            <h3 className="section-heading" style={{ fontSize: '1.75rem' }}>Frequently Asked Questions</h3>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className="faq-chevron" />
                </button>
                {openFaq === idx && (
                  <div className="faq-answer fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
