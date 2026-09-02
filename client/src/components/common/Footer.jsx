import React from 'react';
import { Link } from 'react-router-dom';
import { DiyaIcon } from './Motif';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--gold-gradient)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DiyaIcon size={20} color="#4A0E17" />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                  UTSAV DECOR
                </span>
                <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700 }}>
                  Crafting Celebrations
                </span>
              </div>
            </div>

            <p>
              Utsav Decor is India’s premier bespoke event decoration and floral design atelier. 
              Specializing in grand royal weddings, sacred pooja pandals, and joyous family milestones with 
              authentic traditional craftsmanship.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a
                href="https://wa.me/919820145872?text=Hello%20Utsav%20Decor%20Team!%20I%20would%20like%20to%20inquire%20about%20event%20decoration."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="footer-col-title">Our Celebrations</h4>
            <ul className="footer-links">
              <li><Link to="/category/weddings">Royal Weddings</Link></li>
              <li><Link to="/category/ganesh-chaturthi">Ganesh Chaturthi Utsav</Link></li>
              <li><Link to="/category/birthdays">Milestone Birthdays</Link></li>
              <li><Link to="/category/housewarming">Griha Pravesh</Link></li>
              <li><Link to="/category/baby-shower">Godh Bharai & Baby Shower</Link></li>
              <li><Link to="/category/engagement">Engagement & Roka</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/request">Your Custom Request</Link></li>
              <li><Link to="/about">About Our Artisans</Link></li>
              <li><Link to="/contact">Consultation & Contact</Link></li>
              <li><Link to="/admin/login" style={{ color: 'var(--gold-primary)' }}><ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Studio Info */}
          <div>
            <h4 className="footer-col-title">Studio & Contact</h4>
            <ul className="footer-contact-info">
              <li>
                <MapPin size={18} />
                <span>Utsav Heritage Studio, MG Road, Bengaluru & Mumbai Hub</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+91 98201 45872 / +91 98450 12894</span>
              </li>
              <li>
                <Mail size={18} />
                <span>namaste@utsavdecor.com</span>
              </li>
              <li>
                <Clock size={18} />
                <span>Mon – Sun: 9:00 AM – 9:00 PM (By Appointment)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Utsav Decor. All rights reserved. Handcrafted with devotion for Indian celebrations.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>No fixed prices — every celebration is uniquely tailored</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
