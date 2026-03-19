'use client';

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link href="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/logo.png" alt="Rentnest Logo" className="logo-image" />
          </Link>

          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link href="/properties" className="nav-link" onClick={closeMenu}>Properties</Link>

            {isAuthenticated ? (
              <>
                {user?.accountType === 'owner' && (
                  <Link href="/dashboard/owner" className="nav-link" onClick={closeMenu}>
                    My Dashboard
                  </Link>
                )}
                {user?.accountType === 'tenant' && (
                  <Link href="/dashboard/tenant" className="nav-link" onClick={closeMenu}>
                    My Dashboard
                  </Link>
                )}

                <div className="user-menu">
                  <span className="user-name">
                    <img src="/user-icon.png" alt="User" className="user-avatar" style={{ width: '25px', height: 'auto', opacity: 1 }} />
                    {user?.fullName}
                  </span>
                  <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link href="/login" className="btn btn-secondary btn-sm" onClick={closeMenu}>
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;