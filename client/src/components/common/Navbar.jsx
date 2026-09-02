import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { DiyaIcon } from './Motif';
import { Sparkles, Menu, X, Shield, ChevronDown, ChevronRight, MessageSquare, Phone } from 'lucide-react';

export const Navbar = () => {
  const { selectedTheme, selectedAddons, totalAddonsCount } = useCustomization();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const categories = [
    { name: 'Royal Weddings', slug: 'weddings' },
    { name: 'Ganesh Chaturthi Utsav', slug: 'ganesh-chaturthi' },
    { name: 'Milestone Birthdays', slug: 'birthdays' },
    { name: 'Griha Pravesh & Housewarming', slug: 'housewarming' },
    { name: 'Godh Bharai & Baby Shower', slug: 'baby-shower' },
    { name: 'Royal Engagement & Roka', slug: 'engagement' },
  ];

  const hasSelections = selectedTheme || selectedAddons.length > 0;

  // Mobile Drawer JSX rendered directly to document.body via Portal
  const mobileDrawerContent = mobileMenuOpen ? (
    <div
      className="mobile-drawer-overlay"
      onClick={() => setMobileMenuOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(42, 10, 15, 0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        className="mobile-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '85%',
          maxWidth: '340px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          animation: 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.4rem',
            borderBottom: '1px solid var(--surface-border)',
            background: 'var(--bg-main)',
          }}
        >
          <div className="brand-logo" style={{ fontSize: '1.2rem' }}>
            <div className="logo-icon" style={{ width: '32px', height: '32px' }}>
              <DiyaIcon size={18} color="#4A0E17" />
            </div>
            <div>
              <span className="brand-title">UTSAV DECOR</span>
              <span className="brand-subtitle">Indian Event Aesthetics</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-heading)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
            }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0, padding: 0 }}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>

            {/* Categories Accordion */}
            <li>
              <button
                className="mobile-nav-link"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <span>Events & Occasions</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease',
                  }}
                />
              </button>

              {mobileCategoriesOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.4rem 0 0.6rem 0.8rem' }}>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="mobile-sub-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ChevronRight size={14} color="var(--marigold)" />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Our Artisans
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact & Studio
              </NavLink>
            </li>
          </ul>

          {/* Drawer Actions Footer */}
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
            <Link
              to="/request"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-gold btn-lg"
              style={{ width: '100%', marginBottom: '0.75rem', justifyContent: 'center' }}
            >
              <Sparkles size={18} /> View Custom Request {hasSelections && `(${(selectedTheme ? 1 : 0) + totalAddonsCount})`}
            </Link>

            <a
              href="https://wa.me/919820145872?text=Hello%20Utsav%20Decor!%20I%20would%20like%20to%20inquire%20about%20event%20decoration."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-md"
              style={{ width: '100%', marginBottom: '1.2rem', justifyContent: 'center' }}
            >
              <MessageSquare size={16} color="var(--emerald-accent)" /> WhatsApp Stylist
            </a>

            <div style={{ textAlign: 'center' }}>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                <Shield size={14} /> Admin Portal Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="brand-logo">
            <div className="logo-icon">
              <DiyaIcon size={22} color="#4A0E17" />
            </div>
            <div>
              <span className="brand-title">UTSAV DECOR</span>
              <span className="brand-subtitle">Indian Event Aesthetics</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>

              {/* Categories Dropdown */}
              <li
                className="nav-item has-dropdown"
                onMouseEnter={() => setCategoriesDropdown(true)}
                onMouseLeave={() => setCategoriesDropdown(false)}
              >
                <span className="dropdown-trigger">
                  Events & Occasions <ChevronDown size={15} />
                </span>

                {categoriesDropdown && (
                  <div className="dropdown-menu animate-fade-in">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className="dropdown-item"
                        onClick={() => setCategoriesDropdown(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                  About & Experience
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className="nav-actions">
            {/* Customizer Cart / Request Drawer Trigger */}
            <button
              className="customizer-cart-btn"
              onClick={() => navigate('/request')}
              title="View your customized request"
            >
              <Sparkles size={16} />
              <span className="cart-label">Your Request</span>
              {hasSelections && (
                <span className="cart-counter">
                  {(selectedTheme ? 1 : 0) + totalAddonsCount}
                </span>
              )}
            </button>

            {/* Desktop Quick CTA */}
            <Link to="/category/weddings" className="btn btn-primary btn-sm desktop-only-btn">
              Explore Themes
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* Render mobile drawer directly onto body via portal */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(mobileDrawerContent, document.body)}
    </header>
  );
};
