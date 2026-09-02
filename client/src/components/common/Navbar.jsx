import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { DiyaIcon } from './Motif';
import { Sparkles, ShoppingBag, Menu, X, Shield, Phone, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { selectedTheme, selectedAddons, totalAddonsCount } = useCustomization();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Royal Weddings', slug: 'weddings' },
    { name: 'Ganesh Chaturthi Utsav', slug: 'ganesh-chaturthi' },
    { name: 'Milestone Birthdays', slug: 'birthdays' },
    { name: 'Griha Pravesh & Housewarming', slug: 'housewarming' },
    { name: 'Godh Bharai & Baby Shower', slug: 'baby-shower' },
    { name: 'Royal Engagement & Roka', slug: 'engagement' },
  ];

  const hasSelections = selectedTheme || selectedAddons.length > 0;

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-icon">
              <DiyaIcon size={22} color="#4A0E17" />
            </div>
            <div>
              <span className="brand-title">UTSAV DECOR</span>
              <span className="brand-subtitle">Indian Event Aesthetics</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>

              {/* Categories Dropdown */}
              <li
                className="nav-item"
                style={{ position: 'relative' }}
                onMouseEnter={() => setCategoriesDropdown(true)}
                onMouseLeave={() => setCategoriesDropdown(false)}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    padding: '0.5rem 0',
                  }}
                >
                  Events & Occasions <ChevronDown size={15} />
                </span>

                {categoriesDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '260px',
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid var(--surface-border)',
                      padding: '0.6rem 0',
                      zIndex: 100,
                    }}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        onClick={() => setCategoriesDropdown(false)}
                        style={{
                          display: 'block',
                          padding: '0.6rem 1.2rem',
                          fontSize: '0.9rem',
                          color: 'var(--text-heading)',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-secondary)';
                          e.currentTarget.style.color = 'var(--marigold)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-heading)';
                        }}
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
              <span>Your Request</span>
              {hasSelections && (
                <span className="cart-counter">
                  {(selectedTheme ? 1 : 0) + totalAddonsCount}
                </span>
              )}
            </button>

            {/* Quick Plan CTA */}
            <Link to="/category/weddings" className="btn btn-primary btn-sm" style={{ display: 'none', smDisplay: 'inline-flex' }}>
              Explore Themes
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--surface-border)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--maroon-deep)' }}>
                Home
              </Link>
            </li>
            <li style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--surface-border-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--marigold)', marginBottom: '0.5rem' }}>
                Event Categories
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', paddingLeft: '0.5rem' }}>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: '0.92rem', color: 'var(--text-heading)' }}
                  >
                    • {cat.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
                About Utsav Decor
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
                Contact & Consultation
              </Link>
            </li>
            <li style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--surface-border-subtle)' }}>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}
              >
                <Shield size={14} /> Admin Access
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
