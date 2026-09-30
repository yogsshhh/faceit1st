import React, { useState, useEffect } from 'react';
import { CompanyLogo } from './CompanyLogos';
import { X, Calendar, Video, Download, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import './MyBookingsModal.css';

export const MyBookingsModal = ({ onClose }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('interviewForge_bookings') || '[]');
    setBookings(stored);
  }, []);

  const handleCancelBooking = (id) => {
    if (confirm('Are you sure you want to cancel this mock interview session?')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('interviewForge_bookings', JSON.stringify(updated));
    }
  };

  const handleDownloadPass = (booking) => {
    const content = `===========================================
FACEIT1ST MOCK INTERVIEW PASS
===========================================
Booking Ref ID: ${booking.id}
Company:        ${booking.company}
Interview Type: ${booking.interviewType}
Duration:       ${booking.duration || '45 minutes'}
Candidate Name: ${booking.candidateName}
Email:          ${booking.candidateEmail}
Live Room Link: ${booking.meetingUrl}
===========================================
Your mentor details and room link have been generated.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FACEIT1ST_Pass_${booking.id}.txt`;
    link.click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-pop my-bookings-container">
        <div className="modal-header">
          <div className="modal-title-box">
            <Calendar size={24} color="#4F46E5" />
            <div>
              <h3>My Scheduled Interviews</h3>
              <p className="modal-subtitle">Manage your live mock sessions & downloadable passes</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {bookings.length === 0 ? (
            <div className="empty-bookings-box">
              <AlertCircle size={48} color="#94A3B8" />
              <h4>No Upcoming Interviews Found</h4>
              <p>You haven't booked any mock interviews yet. Pick a company to get started!</p>
              <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '0.5rem' }}>
                Browse Companies
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card-item fade-in">
                  <div className="booking-card-header">
                    <div className="header-left">
                      <CompanyLogo id={booking.companyId} size={40} />
                      <div>
                        <h4>{booking.company} Mock Interview</h4>
                        <span className="booking-ref">Ref: {booking.id}</span>
                      </div>
                    </div>
                    <span className="status-tag active">
                      <CheckCircle2 size={13} /> Scheduled
                    </span>
                  </div>

                  <div className="booking-details-grid">
                    <div className="det-item">
                      <span className="lbl">Interview Type</span>
                      <span className="val">{booking.interviewType}</span>
                    </div>
                    <div className="det-item">
                      <span className="lbl">Duration</span>
                      <span className="val">{booking.duration || '45 minutes'}</span>
                    </div>
                    <div className="det-item">
                      <span className="lbl">Candidate Name</span>
                      <span className="val">{booking.candidateName}</span>
                    </div>
                    <div className="det-item">
                      <span className="lbl">Email</span>
                      <span className="val">{booking.candidateEmail}</span>
                    </div>
                  </div>

                  <div className="booking-card-actions">
                    <a 
                      href={booking.meetingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <Video size={14} /> Join Session Room
                    </a>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => handleDownloadPass(booking)}
                    >
                      <Download size={14} /> Download Pass
                    </button>
                    <button 
                      className="btn btn-outline btn-sm cancel-btn" 
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <Trash2 size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
