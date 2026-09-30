import React, { useState } from 'react';
import { COMPANIES } from '../data/mockData';
import { CompanyLogo } from './CompanyLogos';
import { ArrowRight, Star, Search, ShieldAlert, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import './CompanyGrid.css';

export const CompanyGrid = ({ onSelectCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCompanies = COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'popular') return matchesSearch && (company.badge === 'Popular' || company.badge === 'Top Rated' || company.badge === 'High Demand');
    return matchesSearch;
  });

  const campusTracks = {
    accenture: 'Advanced Coding + Technical HR Drive',
    tcs: 'TCS NQT (Ninja, Digital & Prime Tracks)',
    infosys: 'InfyTQ, Specialist & Systems Engineer',
    cognizant: 'GenC, GenC Next & Elevate Hiring Tracks',
    wipro: 'Elite NTH & Turbo Placement Drives',
    deloitte: 'Tech Consulting & Case Study HR',
    capgemini: 'Tech Domain & Game-based HR Drive'
  };

  return (
    <section className="company-section" id="companies">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper fade-in">
          <div className="section-badge">
            <GraduationCap size={16} />
            <span>Campus Placement Company Drives</span>
          </div>
          <h2 className="section-heading">Choose Your On-Campus Target Company</h2>
          <p className="section-subtitle">
            Practice 1-on-1 live mock interviews tailored specifically to the official campus hiring patterns of top tech recruiters.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="company-toolbar fade-in">
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search Accenture, TCS, Infosys, Deloitte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>

          <div className="filter-pills">
            <button 
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Placement Drives ({COMPANIES.length})
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'popular' ? 'active' : ''}`}
              onClick={() => setActiveFilter('popular')}
            >
              🔥 High Volume Campus Drives
            </button>
          </div>
        </div>

        {/* Company Cards Grid (7 Cards) */}
        <div className="company-grid fade-in">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="card company-card">
              {/* Badge top right */}
              {company.badge && (
                <span className="company-badge" style={{ backgroundColor: company.logoBg, color: company.accentColor }}>
                  {company.badge}
                </span>
              )}

              {/* Company Logo Header */}
              <div className="company-header">
                <div className="company-logo-wrapper" style={{ backgroundColor: company.logoBg }}>
                  <CompanyLogo id={company.id} size={48} />
                </div>
                <div className="company-title-meta">
                  <h3 className="company-name">{company.name}</h3>
                  <div className="company-rating">
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span className="rating-num">{company.rating}</span>
                    <span className="reviews-num">({company.reviewsCount} Students)</span>
                  </div>
                </div>
              </div>

              {/* Campus Drive Track Highlight Pill */}
              <div className="campus-track-highlight">
                <CheckCircle2 size={14} color="#4F46E5" />
                <span>Track: {campusTracks[company.id]}</span>
              </div>

              {/* Short Description */}
              <p className="company-desc">{company.description}</p>

              {/* Card Footer Action */}
              <div className="company-card-footer">
                <div className="price-info">
                  <span className="from-text">Student Special</span>
                  <span className="card-price">₹499</span>
                </div>
                <button 
                  className="btn btn-primary company-book-btn"
                  onClick={() => onSelectCompany(company.id)}
                >
                  <span>Book Mock Interview</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="no-results-box">
            <ShieldAlert size={36} color="#94A3B8" />
            <p>No company found matching "{searchTerm}"</p>
            <button className="btn btn-secondary btn-sm" onClick={() => setSearchTerm('')}>Reset Search</button>
          </div>
        )}
      </div>
    </section>
  );
};
