import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { COMPANIES, INTERVIEW_TYPES } from '../data/mockData';
import { CompanyLogo } from './CompanyLogos';
import { X, ArrowRight, ArrowLeft, CreditCard, QrCode, Building, ShieldCheck, Sparkles, User, Mail, Phone } from 'lucide-react';
import './BookingModal.css';

export const BookingModal = ({ initialCompanyId, onClose, onBookingComplete }) => {
  // Lock body scroll when modal is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Step state: 1 = Interview Type, 2 = Candidate Details, 3 = Payment, 4 = Confirmation Success
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Company & Interview Type
  const [selectedCompanyId, setSelectedCompanyId] = useState(initialCompanyId || 'accenture');
  const [selectedInterviewType, setSelectedInterviewType] = useState('technical');

  useEffect(() => {
    if (initialCompanyId) {
      setSelectedCompanyId(initialCompanyId);
    }
  }, [initialCompanyId]);

  // Candidate Details State
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [errors, setErrors] = useState({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Completed Booking reference
  const [completedBooking, setCompletedBooking] = useState(null);

  // Fetch current company object
  const currentCompany = COMPANIES.find(c => c.id === selectedCompanyId) || COMPANIES[0];
  const currentInterviewTypeObj = INTERVIEW_TYPES.find(t => t.id === selectedInterviewType) || INTERVIEW_TYPES[0];

  // Price calculations
  const rawPrice = currentInterviewTypeObj.price;
  const totalPrice = Math.max(0, rawPrice - discountAmount);

  // Quick auto-fill candidate data for testing ease
  const handleAutoFillCandidate = () => {
    setCandidateName('Rahul Sharma');
    setCandidateEmail('rahul.sharma@example.com');
    setCandidatePhone('+91 98765 43210');
    setErrors({});
  };

  // Step 2 Validation -> Direct to Payment (Step 3)
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!candidateName.trim()) newErrors.name = 'Full name is required';
    if (!candidateEmail.trim() || !candidateEmail.includes('@')) newErrors.email = 'Valid email is required';
    if (!candidatePhone.trim() || candidatePhone.length < 8) newErrors.phone = 'Valid phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setCurrentStep(3); // Directly to Payment!
  };

  // Coupon handling
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'FORGE100') {
      setDiscountAmount(100);
      alert('Coupon FORGE100 applied! ₹100 discount added.');
    } else if (couponCode.trim().toUpperCase() === 'STUDENT50') {
      setDiscountAmount(50);
      alert('Coupon STUDENT50 applied! ₹50 discount added.');
    } else {
      alert('Invalid coupon code. Try "FORGE100"');
    }
  };

  // Step 3: Pay & Book Action -> Goes to Step 4 (Success)
  const handleExecutePayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const bookingRecord = {
        id: `IF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        company: currentCompany.name,
        companyId: currentCompany.id,
        interviewType: currentInterviewTypeObj.name,
        duration: currentInterviewTypeObj.duration,
        candidateName,
        candidateEmail,
        candidatePhone,
        totalPaid: totalPrice,
        createdAt: new Date().toISOString(),
        meetingUrl: `https://meet.google.com/if-${Math.floor(100 + Math.random() * 900)}-for`
      };

      // Save in localStorage
      const existing = JSON.parse(localStorage.getItem('interviewForge_bookings') || '[]');
      localStorage.setItem('interviewForge_bookings', JSON.stringify([bookingRecord, ...existing]));

      setCompletedBooking(bookingRecord);
      setCurrentStep(4);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect:', err);
      }

      if (onBookingComplete) {
        onBookingComplete(bookingRecord);
      }
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-pop">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-box">
            <CompanyLogo id={currentCompany.id} size={32} />
            <div>
              <h3>{currentCompany.name} Mock Interview</h3>
              <p className="modal-subtitle">
                {currentStep === 4 ? 'Confirmation' : `Step ${currentStep} of 3 • Booking Setup`}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Simplified Wizard Progress Bar (3 steps before confirmation) */}
        {currentStep < 4 && (
          <div className="wizard-progress-bar">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-badge">1</span>
              <span className="step-label">Interview Type</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-badge">2</span>
              <span className="step-label">Candidate Details</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-badge">3</span>
              <span className="step-label">Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body Steps */}
        <div className="modal-body">
          {/* STEP 1: INTERVIEW TYPE SELECTION */}
          {currentStep === 1 && (
            <div className="wizard-step fade-in">
              <div className="company-banner-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1', minWidth: '220px' }}>
                  <CompanyLogo id={currentCompany.id} size={48} />
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                      {currentCompany.name} Mock Interview
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#8A8A8A', margin: '0.2rem 0 0 0' }}>
                      Targeting {currentCompany.name} campus placement track.
                    </p>
                  </div>
                </div>

                <div style={{ minWidth: '180px' }}>
                  <label style={{ fontSize: '0.72rem', color: 'var(--accent-champagne)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                    TARGET COMPANY
                  </label>
                  <select 
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    className="form-select"
                    style={{ padding: '0.45rem 0.75rem', fontSize: '0.88rem', background: '#121212', borderColor: 'rgba(197, 168, 128, 0.3)', color: '#FFFFFF' }}
                  >
                    {COMPANIES.map((comp) => (
                      <option key={comp.id} value={comp.id}>
                        {comp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Select Interview Type */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                  Select Interview Type
                </label>
                <div className="options-grid">
                  {INTERVIEW_TYPES.map((type) => (
                    <div 
                      key={type.id}
                      className={`option-card ${selectedInterviewType === type.id ? 'selected' : ''}`}
                      onClick={() => setSelectedInterviewType(type.id)}
                    >
                      <div className="option-header">
                        <span className="option-title">{type.name}</span>
                        <span className="option-price">₹{type.price}</span>
                      </div>
                      <p className="option-desc">{type.description}</p>
                      <span className="option-duration">⏱️ {type.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="step-footer">
                <div></div>
                <button className="btn-premium btn-metallic" onClick={() => setCurrentStep(2)}>
                  <span>Continue to Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CANDIDATE DETAILS */}
          {currentStep === 2 && (
            <form className="wizard-step fade-in" onSubmit={handleContinueToPayment}>
              <div className="step-info-header">
                <h3>Candidate Details</h3>
                <p>Please enter your contact details to receive your interview link and scorecard.</p>
                <button 
                  type="button" 
                  className="quick-fill-btn" 
                  onClick={handleAutoFillCandidate}
                >
                  <Sparkles size={14} /> Quick Demo Auto-Fill
                </button>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Full Name *</label>
                <div className="input-icon-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text"
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Rahul Sharma"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                  />
                </div>
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Email Address *</label>
                <div className="input-icon-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="e.g. rahul.sharma@gmail.com"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                  />
                </div>
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Phone Number *</label>
                <div className="input-icon-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input 
                    type="tel"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="e.g. +91 98765 43210"
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                  />
                </div>
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="step-footer">
                <button type="button" className="btn-premium btn-dark-outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className="btn-premium btn-metallic">
                  <span>Continue to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT PAGE (DIRECT AFTER CONTACT DETAILS) */}
          {currentStep === 3 && (
            <div className="wizard-step fade-in">
              <div className="checkout-grid">
                {/* Left: Booking Summary Card */}
                <div className="summary-card">
                  <h4 className="summary-title">Booking Summary</h4>

                  <div className="summary-list">
                    <div className="summary-row">
                      <span className="lbl">Company:</span>
                      <span className="val bold">{currentCompany.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="lbl">Interview Type:</span>
                      <span className="val">{currentInterviewTypeObj.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="lbl">Candidate Name:</span>
                      <span className="val">{candidateName}</span>
                    </div>
                    <div className="summary-row">
                      <span className="lbl">Email:</span>
                      <span className="val">{candidateEmail}</span>
                    </div>
                    <div className="summary-row">
                      <span className="lbl">Duration:</span>
                      <span className="val">{currentInterviewTypeObj.duration}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="summary-row discount-row">
                        <span className="lbl">Discount Coupon:</span>
                        <span className="val">- ₹{discountAmount}</span>
                      </div>
                    )}
                  </div>

                  <div className="summary-total-box">
                    <span className="total-label">Total Amount</span>
                    <span className="total-price">₹{totalPrice}</span>
                  </div>

                  {/* Promo Code Input */}
                  <div className="coupon-box">
                    <input 
                      type="text" 
                      placeholder="Coupon Code (e.g. FORGE100)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                    <button type="button" className="btn-premium btn-metallic coupon-btn" onClick={handleApplyCoupon}>
                      Apply
                    </button>
                  </div>
                </div>

                {/* Right: Payment Method Selector */}
                <div className="payment-method-box">
                  <h4 className="summary-title">Select Payment Method</h4>

                  <div className="payment-tabs">
                    <button 
                      type="button" 
                      className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <QrCode size={18} /> UPI
                    </button>
                    <button 
                      type="button" 
                      className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard size={18} /> Card
                    </button>
                    <button 
                      type="button" 
                      className={`payment-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <Building size={18} /> Net Banking
                    </button>
                  </div>

                  {/* Payment Details Form Mock */}
                  <div className="payment-detail-form">
                    {paymentMethod === 'upi' && (
                      <div className="upi-demo-box fade-in">
                        <div className="mock-qr-wrapper">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi://pay?pa=faceit1st@upi&pn=FACEIT1ST&am=499" 
                            alt="Scan UPI QR" 
                            className="qr-code-img"
                          />
                          <span className="qr-hint">Scan with GPay, PhonePe, or Paytm</span>
                        </div>
                        <div className="upi-id-input">
                          <label className="form-label">Or enter UPI ID</label>
                          <input type="text" className="form-input" defaultValue="rahul@okicici" />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="card-demo-box fade-in">
                        <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                          <label className="form-label">Card Number</label>
                          <input type="text" className="form-input" defaultValue="4532 •••• •••• 8942" />
                        </div>
                        <div className="form-row-2">
                          <div className="form-group">
                            <label className="form-label">Expiry</label>
                            <input type="text" className="form-input" defaultValue="08/28" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">CVV</label>
                            <input type="password" className="form-input" defaultValue="•••" />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="netbank-demo-box fade-in">
                        <label className="form-label">Choose Bank</label>
                        <select className="form-select" defaultValue="hdfc">
                          <option value="hdfc">HDFC Bank</option>
                          <option value="sbi">State Bank of India (SBI)</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Large Pay Button */}
                  <button 
                    type="button" 
                    className="btn-premium btn-metallic btn-block pay-btn"
                    disabled={isProcessingPayment}
                    onClick={handleExecutePayment}
                  >
                    {isProcessingPayment ? (
                      <span className="spinner-loading">Processing Payment...</span>
                    ) : (
                      <span>Pay ₹{totalPrice} & Book Interview</span>
                    )}
                  </button>

                  <div className="security-note">
                    <ShieldCheck size={16} color="#C5A880" />
                    <span>256-Bit Encrypted Secure Checkout • 100% Refund Guarantee</span>
                  </div>
                </div>
              </div>

              <div className="step-footer" style={{ marginTop: '1.5rem' }}>
                <button type="button" className="btn-premium btn-dark-outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft size={16} /> Back to Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: BOOKING SUCCESS PAGE */}
          {currentStep === 4 && completedBooking && (
            <div className="wizard-step success-step fade-in">
              <div className="success-icon-badge">
                🎉
              </div>

              <h2 className="success-title">Interview Booked Successfully!</h2>
              <p className="success-subtitle">Your mock interview has been scheduled.</p>

              <div className="success-receipt-card">
                <div className="receipt-header">
                  <CompanyLogo id={completedBooking.companyId} size={36} />
                  <div>
                    <h4>{completedBooking.company} Mock Interview</h4>
                    <span className="receipt-id">Ref ID: {completedBooking.id}</span>
                  </div>
                </div>

                <div className="receipt-details-grid">
                  <div className="receipt-item">
                    <span className="lbl">Company</span>
                    <span className="val">{completedBooking.company}</span>
                  </div>
                  <div className="receipt-item">
                    <span className="lbl">Interview Type</span>
                    <span className="val">{completedBooking.interviewType}</span>
                  </div>
                  <div className="receipt-item">
                    <span className="lbl">Candidate Name</span>
                    <span className="val">{completedBooking.candidateName}</span>
                  </div>
                  <div className="receipt-item">
                    <span className="lbl">Duration</span>
                    <span className="val">{completedBooking.duration}</span>
                  </div>
                </div>

                <div className="receipt-email-notice">
                  <Mail size={16} color="#C5A880" />
                  <span>"We'll send the interview details to your email ({completedBooking.candidateEmail})."</span>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn-premium btn-metallic" onClick={onClose}>
                  View Booking
                </button>
                <button className="btn-premium btn-dark-outline" onClick={onClose}>
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
