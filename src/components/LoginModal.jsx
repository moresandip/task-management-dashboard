import React, { useState } from 'react';
import { LogIn, User, Lock, Mail, Sparkles, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('jane.doe@focusboard.io');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Jane Doe');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'JD';

    onLogin({
      name: name.trim() || 'Jane Doe',
      email: email.trim() || 'jane.doe@focusboard.io',
      role: 'Senior Product Designer',
      initials
    });
    onClose();
  };

  const handleDemoLogin = () => {
    onLogin({
      name: 'Jane Doe',
      email: 'jane.doe@focusboard.io',
      role: 'Senior Product Designer',
      initials: 'JD'
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-container login-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-dialog-title"
      >
        <button
          type="button"
          className="modal-close-btn login-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Modal Brand Header */}
        <div className="login-modal-header">
          <div className="brand-logo" style={{ margin: '0 auto 12px' }}>
            <div className="logo-dots-grid">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <h2 id="login-dialog-title" className="login-title">Sign in to FocusBoard</h2>
          <p className="login-subtitle">Access your workspaces, projects, and personal focus notes.</p>
        </div>

        {/* Quick 1-Click Demo Login Button */}
        <div className="demo-login-box">
          <button
            type="button"
            className="demo-signin-btn"
            onClick={handleDemoLogin}
          >
            <Sparkles size={16} />
            <span>Continue as Jane Doe (Demo Profile)</span>
          </button>
        </div>

        <div className="login-divider">
          <span>OR SIGN IN WITH EMAIL</span>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-name-input" className="form-label">Display Name</label>
            <div className="input-with-icon">
              <User size={16} className="field-icon" />
              <input
                id="login-name-input"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-email-input" className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} className="field-icon" />
              <input
                id="login-email-input"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password-input" className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={16} className="field-icon" />
              <input
                id="login-password-input"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-btn login-submit-btn">
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
}
