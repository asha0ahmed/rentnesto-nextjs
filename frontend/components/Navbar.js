'use client';

import React, { useContext, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

/* ─────────────────────────────────────────────
   Tiny inline SVG icon — zero extra packages
───────────────────────────────────────────── */
const Icon = ({ d, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
);

/* SVG path data for each icon */
const ICONS = {
  home:      'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
  search:    'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  add:       'M12 5v14M5 12h14',
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  login:     'M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3',
  logout:    'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
  signup:    'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z',
  user:      'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z',
};

/* ─────────────────────────────────────────────
   DesktopNavLink — icon + label for desktop bar
───────────────────────────────────────────── */
const DesktopNavLink = ({ href, iconKey, children, isActive }) => (
  <Link
    href={href}
    className={`nav-link${isActive ? ' nav-link-active' : ''}`}
  >
    <span className="nav-link-icon">
      <Icon d={ICONS[iconKey]} size={17} />
    </span>
    {children}
  </Link>
);

/* ─────────────────────────────────────────────
   NavItem — icon + label for MOBILE drawer
───────────────────────────────────────────── */
const NavItem = ({ href, iconKey, children, closeMenu, isActive }) => (
  <Link
    href={href}
    className={`drawer-link${isActive ? ' drawer-link-active' : ''}`}
    onClick={closeMenu}
  >
    <span className="drawer-icon-wrap">
      <Icon d={ICONS[iconKey]} size={18} />
    </span>
    {children}
  </Link>
);

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const router   = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  /* body scroll lock */
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  /* route-change auto-close */
  useEffect(() => { closeMenu(); }, [pathname, closeMenu]);

  /* Escape key closes drawer */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  const handleLogout = () => {
    logout();
    closeMenu();
    router.push('/');
  };

  const active = (href) => pathname === href;

  return (
    <>
      {/* ══════════════════════════════════════
          TOP NAVBAR BAR
         ══════════════════════════════════════ */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">

            {/* Logo */}
            <Link href="/" className="navbar-logo" onClick={closeMenu}>
              <img src="/logo.png" alt="RentNesto Logo" className="logo-image" />
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className={`hamburger${isMenuOpen ? ' active' : ''}`}
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span /><span /><span />
            </button>

            {/* ── DESKTOP NAV with icons ── */}
            <div className="desktop-nav">

              <DesktopNavLink href="/" iconKey="home" isActive={active('/')}>
                Home
              </DesktopNavLink>

              <DesktopNavLink href="/properties" iconKey="search" isActive={active('/properties')}>
                Properties
              </DesktopNavLink>

              {isAuthenticated ? (
                <>
                  {user?.accountType === 'owner' && (
                    <>
                      <DesktopNavLink href="/properties/create" iconKey="add" isActive={active('/properties/create')}>
                        Add Property
                      </DesktopNavLink>

                      <DesktopNavLink href="/dashboard/owner" iconKey="dashboard" isActive={active('/dashboard/owner')}>
                        My Dashboard
                      </DesktopNavLink>
                    </>
                  )}

                  {user?.accountType === 'tenant' && (
                    <DesktopNavLink href="/dashboard/tenant" iconKey="dashboard" isActive={active('/dashboard/tenant')}>
                      My Dashboard
                    </DesktopNavLink>
                  )}

                  {/* Desktop user name + logout */}
                  <div className="user-menu">
                    <span className="user-name">
                      <Icon d={ICONS.user} size={16} />
                      {user?.fullName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary btn-sm desktop-logout-btn"
                    >
                      <Icon d={ICONS.logout} size={15} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="auth-buttons">
                  <Link href="/login" className="btn btn-secondary btn-sm desktop-auth-btn">
                    <Icon d={ICONS.login} size={15} />
                    Login
                  </Link>
                  <Link href="/signup" className="btn btn-primary btn-sm desktop-auth-btn">
                    <Icon d={ICONS.signup} size={15} />
                    Sign Up
                  </Link>
                </div>
              )}

            </div>
            {/* end .desktop-nav */}

          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          MOBILE DRAWER  (separate from navbar)
         ══════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        className={`mobile-overlay${isMenuOpen ? ' active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div className={`mobile-drawer${isMenuOpen ? ' active' : ''}`} role="dialog" aria-modal="true">

        {/* User profile strip */}
        <div className="drawer-header">
          <div className="drawer-avatar">
            <img src="/user-icon.png" alt="User avatar" />
          </div>
          <div className="drawer-user-info">
            {isAuthenticated ? (
              <>
                <p className="drawer-name">{user?.fullName}</p>
                <p className="drawer-role">{user?.accountType}</p>
              </>
            ) : (
              <>
                <p className="drawer-name">Welcome!</p>
                <p className="drawer-role">Sign in to continue</p>
              </>
            )}
          </div>
        </div>

        {/* Nav links */}
        <nav className="drawer-nav">

          <span className="drawer-section-label">Explore</span>

          <NavItem href="/" iconKey="home" closeMenu={closeMenu} isActive={active('/')}>
            Home
          </NavItem>
          <NavItem href="/properties" iconKey="search" closeMenu={closeMenu} isActive={active('/properties')}>
            Browse Properties
          </NavItem>

          {isAuthenticated && (
            <>
              <span className="drawer-section-label">Account</span>

              {user?.accountType === 'owner' && (
                <>
                  <NavItem href="/properties/create" iconKey="add" closeMenu={closeMenu} isActive={active('/properties/create')}>
                    Add Property
                  </NavItem>
                  <NavItem href="/dashboard/owner" iconKey="dashboard" closeMenu={closeMenu} isActive={active('/dashboard/owner')}>
                    My Dashboard
                  </NavItem>
                </>
              )}

              {user?.accountType === 'tenant' && (
                <NavItem href="/dashboard/tenant" iconKey="dashboard" closeMenu={closeMenu} isActive={active('/dashboard/tenant')}>
                  My Dashboard
                </NavItem>
              )}

              <div className="drawer-divider" />

              {/* Mobile-only logout — red row */}
              <button className="drawer-logout-btn" onClick={handleLogout}>
                <span className="drawer-icon-wrap">
                  <Icon d={ICONS.logout} size={18} />
                </span>
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <span className="drawer-section-label">Account</span>

              <NavItem href="/login" iconKey="login" closeMenu={closeMenu} isActive={active('/login')}>
                Login
              </NavItem>
              <NavItem href="/signup" iconKey="signup" closeMenu={closeMenu} isActive={active('/signup')}>
                Sign Up
              </NavItem>
            </>
          )}

        </nav>

        <div className="drawer-footer">© 2025 RentNesto</div>
      </div>
    </>
  );
};

export default Navbar;