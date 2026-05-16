'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

// Optimistic UI — show success immediately, send in background
const emailToSend = email;

// Small delay so spinner briefly shows (feels responsive, not instant-fake)
setTimeout(() => {
  setSent(true);
  setLoading(false);
}, 400);

// Fire the actual request in background
axios.post(`${API_URL}/api/auth/forgot-password`, { email: emailToSend })
  .catch(err => console.error('Reset request failed:', err));
};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>📧</div>
              <h1 className="auth-title">Check Your Email</h1>
              <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
                If an account exists for <strong>{email}</strong>, 
                a password reset link has been sent. Check your inbox and spam folder.
              </p>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                The link expires in <strong>1 hour</strong>.
              </p>
              <Link href="/login" className="btn btn-primary" style={{ display: 'inline-block' }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Forgot Password?</h1>
              <p className="auth-subtitle">
                Enter your email and we'll send you a reset link
              </p>

              {error && (
                <div className="alert alert-error">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTop: '3px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              <p className="auth-footer">
                Remember your password?{' '}
                <Link href="/login" className="auth-link">Login here</Link>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;