import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { DiyaIcon } from './Motif';
import { Sparkles, ShoppingBag, Menu, X, Shield, Phone, ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';

export const Navbar = () => {
  const { selectedTheme, selectedAddons, totalAddonsCount } = useCustomization();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-logo" style={{ fontSize: '1.25rem' }}>
                <div className="logo-icon" style={{ width: '32px', height: '32px' }}>
                  <DiyaIcon size={18} color="#4A0E17" />
                </div>
                <div>
                  <span className="brand-title">UTSAV DECOR</span>
                  <span className="brand-subtitle">Indian Event Aesthetics</span>
                </div>
              </div>
              <button
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              <ul className="mobile-nav-list">
                <li>
                  <NavLink to="/" end className="mobile-nav-link">
                    Home
                  </NavLink>
                </li>

                <li>
                  <button
                    className="mobile-nav-link mobile-accordion-btn"
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  >
                    <span>Events & Celebrations</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="mobile-subcategories">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/category/${cat.slug}`}
                          className="mobile-sub-link"
                        >
                          <ChevronRight size={14} color="var(--marigold)" />
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>

                <li>
                  <NavLink to="/about" className="mobile-nav-link">
                    About Our Artisans
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/contact" className="mobile-nav-link">
                    Contact & Studio
                  </NavLink>
                </li>
              </ul>

              <div className="mobile-drawer-footer">
                <Link to="/request" className="btn btn-gold btn-lg" style={{ width: '100%', marginBottom: '0.8rem' }}>
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

                <Link
                  to="/admin/login"
                  className="mobile-admin-link"
                >
                  <Shield size={14} /> Admin Management Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
