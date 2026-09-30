import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Grid, ChevronDown, Sparkles, X } from 'lucide-react';
import { COMPANIES } from '../data/mockData';
import { CompanyLogo } from './CompanyLogos';
import './CompanyExperience.css';

export const CompanyExperience = ({ onSelectCompany }) => {
  const [selectedId, setSelectedId] = useState('accenture');
  const [hoveredId, setHoveredId] = useState(null);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isMoreModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMoreModalOpen]);

  // Featured 8 companies: Accenture, TCS, Infosys, Cognizant, LTIMindtree, HCLTech, Zoho, Capgemini
  const primaryCompanyIds = ['accenture', 'tcs', 'infosys', 'cognizant', 'ltimindtree', 'hcltech', 'zoho', 'capgemini'];
  const primaryCompanies = COMPANIES.filter(c => primaryCompanyIds.includes(c.id));

  const selectedCompany = COMPANIES.find(c => c.id === selectedId) || COMPANIES[0];

  const handleCompanyClick = (companyId) => {
    setSelectedId(companyId);
    if (onSelectCompany) {
      onSelectCompany(companyId);
    }
  };

  const companyModulesMap = {
    accenture: [
      { title: 'Technical', desc: 'Data Structures, Pseudo Code Analysis & OOPs' },
      { title: 'Projects', desc: 'System Architecture & Final Year Project Defense' },
      { title: 'SQL', desc: 'Joins, Indexing, Triggers & Database Optimization' },
      { title: 'Programming', desc: 'Live Hands-on Coding & Algorithm Logic' },
      { title: 'Communication', desc: 'Articulating Problem Solving under Pressure' },
      { title: 'HR', desc: 'Behavioral Situations & Company Value Alignment' }
    ],
    tcs: [
      { title: 'Technical', desc: 'C/C++/Java Fundamentals, Data Structures & Logic' },
      { title: 'TCS NQT Prep', desc: 'Advanced Coding & Digital Track Problem Solving' },
      { title: 'SQL', desc: 'RDBMS Queries & Database Operations' },
      { title: 'Programming', desc: 'Arrays, Strings & Time Complexity Analysis' },
      { title: 'Communication', desc: 'Professional Clarity & Presentation' },
      { title: 'HR', desc: 'Relocation, Shift Preference & Behavioral Scenarios' }
    ],
    infosys: [
      { title: 'Technical', desc: 'Python/Java Algorithms, DBMS & Data Structures' },
      { title: 'InfyTQ Track', desc: 'Specialist Programmer Coding Standards' },
      { title: 'SQL', desc: 'Complex Subqueries, Normalization & ER Diagrams' },
      { title: 'Programming', desc: 'Dynamic Programming & Recursion Logic' },
      { title: 'Communication', desc: 'Technical Explanations & Confidence' },
      { title: 'HR', desc: 'Career Goals, Adaptability & Culture Fit' }
    ],
    cognizant: [
      { title: 'Technical', desc: 'Web Technologies, Pseudo Code & Core CS' },
      { title: 'GenC Next', desc: 'Advanced Problem Solving & Code Quality' },
      { title: 'SQL', desc: 'Database Schema & Query Execution' },
      { title: 'Programming', desc: 'String Manipulation & Searching Algorithms' },
      { title: 'Communication', desc: 'Structured Answers under Time Pressure' },
      { title: 'HR', desc: 'Resume Breakdown & Project Deep Dive' }
    ],
    ltimindtree: [
      { title: 'Technical', desc: 'OOPs, Java/Python, Data Structures & Cloud Basics' },
      { title: 'LTI Aptitude', desc: 'Logical Reasoning & Algorithmic Thinking' },
      { title: 'SQL', desc: 'RDBMS Joins, Subqueries & Transactions' },
      { title: 'Programming', desc: 'Array & Matrix Execution Challenges' },
      { title: 'Communication', desc: 'Articulating Technical Logic' },
      { title: 'HR', desc: 'Relocation, Team Fit & Problem Solving Scenarios' }
    ],
    hcltech: [
      { title: 'Technical', desc: 'C/C++/Java, OS Scheduling & Networking' },
      { title: 'TechBee Track', desc: 'Hands-on Debugging & Code Execution' },
      { title: 'SQL', desc: 'DDL, DML & Aggregates' },
      { title: 'Programming', desc: 'String Manipulation & Recursion' },
      { title: 'Communication', desc: 'Clear Problem Statement Breakdown' },
      { title: 'HR', desc: 'Behavioral Fit & Learning Agility' }
    ],
    zoho: [
      { title: 'L2 Advanced Coding', desc: 'Array Matrix & Pattern Generation Algorithms' },
      { title: 'L3 Application Design', desc: 'Object-Oriented Design (Railway, Banking System)' },
      { title: 'Data Structures', desc: 'Linked Lists, Stacks, Queues & Custom Types' },
      { title: 'Code Efficiency', desc: 'Optimizing Time & Space Complexity' },
      { title: 'Communication', desc: 'Defending Design Patterns & Class Diagrams' },
      { title: 'HR Round', desc: 'Passion for Software Engineering & Integrity' }
    ],
    capgemini: [
      { title: 'Technical', desc: 'Pseudo Code Analysis, Data Structures & Architecture' },
      { title: 'Domain Prep', desc: 'Cloud, Fullstack or Data Specialization Track' },
      { title: 'SQL', desc: 'Relational Model & Query Design' },
      { title: 'Programming', desc: 'Coding Standards & Modular Functions' },
      { title: 'Communication', desc: 'Concise Technical Defense' },
      { title: 'HR', desc: 'Behavioral & Situational Scenario Assessment' }
    ]
  };

  const currentModules = companyModulesMap[selectedCompany.id] || [
    { title: 'Technical', desc: 'Data Structures, OOPs & Core Domain Concepts' },
    { title: 'System Design', desc: 'Architecture & Database Normalization' },
    { title: 'SQL', desc: 'Queries, Aggregates & Joins' },
    { title: 'Programming', desc: 'Live Execution & Algorithm Debugging' },
    { title: 'Communication', desc: 'Articulating Logic Under Pressure' },
    { title: 'HR Round', desc: 'Behavioral Questions & Culture Fit' }
  ];

  return (
    <section className="company-exp-root" id="companies">
      <div className="container">
        {/* Eyebrow & Title */}
        <div className="company-exp-header">
          <span className="exp-eyebrow">// COMPANY SPECIFIC PREPARATION</span>
          <h2 className="exp-title">WHAT ARE YOU PREPARING FOR?</h2>
        </div>

        {/* Horizontal Monochrome Wordmark Selector */}
        <div className="monochrome-company-list">
          {primaryCompanies.map((company) => {
            const isHovered = hoveredId === company.id;
            const isSelected = selectedId === company.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <div 
                key={company.id}
                className={`mono-company-item ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredId(company.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleCompanyClick(company.id)}
              >
                <span className="mono-wordmark">{company.name}</span>
                <span 
                  className="mono-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompanyClick(company.id);
                  }}
                >
                  Prepare for {company.name} <ArrowRight size={14} className="arrow-inline" />
                </span>
              </div>
            );
          })}
        </div>

        {/* Button to open All 25 Companies Modal */}
        <div className="more-companies-trigger-wrapper">
          <button 
            className="btn-premium btn-dark-outline show-all-companies-btn"
            onClick={() => setIsMoreModalOpen(true)}
          >
            <Grid size={16} />
            <span>+ View All 25 Companies (TCS, Infosys, Wipro, Cognizant, IBM, Deloitte...)</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Interactive Company Preparation Interface */}
        <div className="company-preview-window fade-in-up">
          <div className="preview-top-bar">
            <div className="preview-meta">
              <CompanyLogo id={selectedCompany.id} size={32} />
              <div>
                <h3 className="preview-company-name">{selectedCompany.name}</h3>
                <div className="preview-pills font-mono">
                  <span className="pill-role">{selectedCompany.rolesAvailable[0] || 'Software Engineer'}</span>
                  <span className="pill-type">Technical + HR • 45 MIN</span>
                </div>
              </div>
            </div>

            <button 
              className="btn-premium btn-metallic"
              onClick={() => onSelectCompany(selectedCompany.id)}
            >
              <span>Book {selectedCompany.name} Mock →</span>
            </button>
          </div>

          <div className="preview-modules-grid">
            {currentModules.map((mod, idx) => (
              <div key={idx} className="module-item">
                <div className="module-head">
                  <span className="mod-num">0{idx + 1}</span>
                  <h4 className="mod-title">{mod.title}</h4>
                </div>
                <p className="mod-desc">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ALL COMPANIES MODAL — PORTAL TO BODY WITH HIGHEST Z-INDEX */}
        {isMoreModalOpen && createPortal(
          <div className="modal-overlay" onClick={() => setIsMoreModalOpen(false)}>
            <div className="modal-container modal-pop all-companies-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title-box">
                  <Sparkles size={22} color="#C5A880" />
                  <div>
                    <h3>Choose Your Target Company</h3>
                    <p className="modal-subtitle">25+ Campus Placement Interview Tracks Available</p>
                  </div>
                </div>
                <button className="modal-close-btn" onClick={() => setIsMoreModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="all-companies-grid">
                  {COMPANIES.map((company) => (
                    <div 
                      key={company.id}
                      className={`company-modal-card ${selectedId === company.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedId(company.id);
                        setIsMoreModalOpen(false);
                        if (onSelectCompany) {
                          onSelectCompany(company.id);
                        }
                      }}
                    >
                      <CompanyLogo id={company.id} size={36} />
                      <div className="comp-modal-info">
                        <h4 className="comp-modal-title">{company.name}</h4>
                        <span className="comp-modal-badge">{company.badge || 'Campus Recruit'}</span>
                      </div>
                      <button 
                        className="comp-select-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(company.id);
                          setIsMoreModalOpen(false);
                          if (onSelectCompany) {
                            onSelectCompany(company.id);
                          }
                        }}
                      >
                        Book →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};
