import React, { useState, useEffect } from 'react';
import { BrandLogo } from './CompanyLogos';
import { X, Mail, Lock, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';
import './LoginModal.css';

export const LoginModal = ({ onClose, onLoginSuccess }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: email.split('@')[0] || 'Candidate',
      email: email || 'candidate@example.com'
    };
    onLoginSuccess(userObj);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const userObj = {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com'
    };
    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-pop login-modal-container">
        <div className="modal-header">
          <BrandLogo size={32} />
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="login-header-text">
            <h3>{isRegister ? 'Create Your Account' : 'Welcome Back'}</h3>
            <p>Access your interview bookings, scorecards & mentor notes.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Email Address</label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  className="form-input"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Password</label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginBottom: '0.75rem' }}>
              <LogIn size={18} />
              <span>{isRegister ? 'Sign Up' : 'Login'}</span>
            </button>

            <button 
              type="button" 
              className="btn btn-secondary btn-block quick-login-btn"
              onClick={handleQuickDemoLogin}
            >
              <Sparkles size={16} color="#4F46E5" />
              <span>Quick Candidate Login Demo</span>
            </button>
          </form>

          <div className="login-toggle-footer">
            <span>{isRegister ? 'Already have an account?' : "Don't have an account?"}</span>
            <button 
              className="toggle-link"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
