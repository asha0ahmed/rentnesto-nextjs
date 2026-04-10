'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const router = useRouter();
  const { login, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.emailOrMobile || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    const result = await login(formData);

    setLoading(false);

    if (result.success) {
      setTimeout(() => {
        if (user?.accountType === 'owner') {
          router.push('/dashboard/owner');
        } else {
          router.push('/properties');
        }
      }, 100);
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Login to your Rentnest account</p>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email or Mobile Number *</label>
              <input
                type="text"
                name="emailOrMobile"
                className="form-input"
                placeholder="Enter email or mobile number"
                value={formData.emailOrMobile}
                onChange={handleChange}
                required
              />
              <small className="form-hint">
                Use the email or mobile you registered with
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
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
      Logging in...
    </>
  ) : (
    'Login'
  )}
</button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link href="/signup" className="auth-link">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;