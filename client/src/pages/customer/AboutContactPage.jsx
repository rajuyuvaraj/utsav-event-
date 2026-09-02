import React, { useState } from 'react';
import { SectionDivider, DiyaIcon, LotusIcon } from '../../components/common/Motif';
import { MapPin, Phone, Mail, Clock, Sparkles, Award, Heart, ShieldCheck, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AboutContactPage = ({ pageType = 'about' }) => {
  const { addToast } = useToast();
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Thank you! Your message has been sent to our studio.', 'success');
    setContactForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        {pageType === 'about' ? (
          <div>
            <div className="section-header">
              <span className="section-tag">
                <LotusIcon size={14} color="#E66E19" /> Royal Heritage Atelier
              </span>
              <h1 className="section-title">The Story of Utsav Decor</h1>
              <p className="section-subtitle">
                Founded with a passion for preserving rich Indian celebratory art forms, Vedic ritual authenticity,
                and opulent floral architecture.
              </p>
              <SectionDivider />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'center', marginBottom: '5rem' }}>
              <div>
                <h2 style={{ color: 'var(--maroon-deep)', fontSize: '2rem', marginBottom: '1.2rem' }}>
                  Crafting Timeless Celebrations with Devotion
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.2rem', color: 'var(--text-main)' }}>
                  At Utsav Decor, we believe every Indian festival and milestone celebration carries profound ancestral 
                  blessings and emotional beauty. From the aromatic fragrance of fresh Madurai mogra to the auspicious 
                  glow of handcrafted brass Kuthu Vilakku, our team of master floral artisans and spatial designers 
                  create setups that honor Vedic rituals while dazzling modern sensibilities.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                  Over the past decade, we have decorated over 1,200+ royal weddings, sacred Griha Pravesh ceremonies, 
                  Ganesh Chaturthi pandals, and milestone birthdays across Bengaluru, Mumbai, Jaipur, and Udaipur.
                </p>
              </div>

              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-maroon)', border: '4px solid #FFFFFF' }}>
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Utsav Decor Master Artisans"
                />
              </div>
            </div>

            {/* Values Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
                <DiyaIcon size={32} color="var(--marigold)" />
                <h3 style={{ fontSize: '1.2rem', margin: '0.8rem 0 0.5rem', color: 'var(--maroon-deep)' }}>Authentic Vedic Precision</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Every backdrop and seating arrangement respects traditional pooja alignments and auspicious muhurtham sanctity.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
                <LotusIcon size={32} color="var(--maroon-royal)" />
                <h3 style={{ fontSize: '1.2rem', margin: '0.8rem 0 0.5rem', color: 'var(--maroon-deep)' }}>Farm-to-Mandap Freshness</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  We work directly with traditional flower growers to source fresh Dutch roses, jasmine, marigolds, and lotus blooms.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
                <Sparkles size={32} color="var(--gold-dark)" />
                <h3 style={{ fontSize: '1.2rem', margin: '0.8rem 0 0.5rem', color: 'var(--maroon-deep)' }}>100% Bespoke Customization</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Zero rigid pricing packages. We tailor dimensions and floral density to complement your unique venue layout.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Contact Studio Section */}
        <div style={{ marginTop: pageType === 'about' ? '5rem' : '0' }}>
          <div className="section-header">
            <span className="section-tag">
              <DiyaIcon size={14} color="#E66E19" /> Studio & Consultation
            </span>
            <h2 className="section-title">Get in Touch with Our Decor Team</h2>
            <p className="section-subtitle">
              Have questions about an upcoming event or want a preliminary consultation with our senior stylist?
            </p>
            <SectionDivider />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem', alignItems: 'start' }}>
            {/* Left: Contact Info */}
            <div style={{ background: 'var(--maroon-deep)', color: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '2px solid var(--gold-primary)', boxShadow: 'var(--shadow-maroon)' }}>
              <h3 style={{ color: 'var(--gold-light)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
                Studio Locations
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={22} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>Bengaluru Design Atelier</div>
                    <div style={{ fontSize: '0.9rem', color: '#E2D7D9' }}>42, Heritage Court, MG Road, Central Bengaluru - 560001</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={22} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>Mumbai & Udaipur Hubs</div>
                    <div style={{ fontSize: '0.9rem', color: '#E2D7D9' }}>Bandra West, Mumbai & Lake Palace Road, Udaipur</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Phone size={22} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>Call & WhatsApp</div>
                    <div style={{ fontSize: '0.9rem', color: '#E2D7D9' }}>+91 98201 45872 / +91 98450 12894</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Mail size={22} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>Email Inquiries</div>
                    <div style={{ fontSize: '0.9rem', color: '#E2D7D9' }}>namaste@utsavdecor.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Clock size={22} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>Operating Hours</div>
                    <div style={{ fontSize: '0.9rem', color: '#E2D7D9' }}>Monday – Sunday: 9:00 AM – 9:00 PM (By Appointment)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--maroon-deep)', marginBottom: '1.5rem' }}>
                Send a General Message
              </h3>

              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Vikramaditya Rathore"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="+91 98201 00000"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="you@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message or Query</label>
                  <textarea
                    required
                    rows={4}
                    className="form-textarea"
                    placeholder="Tell us about your event vision, dates, or questions..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-md">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
