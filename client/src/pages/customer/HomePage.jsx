import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { catalogService } from '../../services/catalogService';
import { CategoryCard } from '../../components/customer/CategoryCard';
import { ThemeCard } from '../../components/customer/ThemeCard';
import { DiyaIcon, LotusIcon, SectionDivider } from '../../components/common/Motif';
import { Sparkles, Calendar, Heart, Award, Users, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [signatureThemes, setSignatureThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, themeRes] = await Promise.all([
          catalogService.getCategories(),
          catalogService.getThemes({ popularOnly: true }),
        ]);
        if (catRes.data) setCategories(catRes.data);
        if (themeRes.data) setSignatureThemes(themeRes.data.slice(0, 4));
      } catch (err) {
        console.error('Error loading homepage catalog data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* 1. Regal Festive Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            {/* Left Narrative */}
            <div className="hero-content">
              <div className="hero-tag">
                <Sparkles size={14} color="#D4AF37" />
                <span>Bespoke Indian Event Decoration</span>
              </div>

              <h1 className="hero-title">
                Transforming Your Auspicious Celebrations into{' '}
                <span className="highlight-gold">Everlasting Memories</span>
              </h1>

              <p className="hero-desc">
                From majestic Rajwada wedding mandaps and divine Ganesh Chaturthi pandals to sacred 
                Griha Pravesh marigold blooms and milestone birthdays—we craft authentic, luxurious Indian 
                ambiance with fresh florals and royal heritage craftsmanship.
              </p>

              <div className="hero-cta-group">
                <Link to="/category/weddings" className="btn btn-primary btn-lg">
                  <Sparkles size={18} /> Explore Event Themes
                </Link>

                <Link to="/request" className="btn btn-outline-gold btn-lg">
                  Customize Your Request
                </Link>
              </div>

              <div className="hero-trust-badges">
                <div className="trust-item">
                  <Award className="trust-icon" size={20} />
                  <div className="trust-text">1,200+ Celebrations</div>
                </div>
                <div className="trust-item">
                  <LotusIcon className="trust-icon" size={20} color="#D4AF37" />
                  <div className="trust-text">100% Fresh Farm Florals</div>
                </div>
                <div className="trust-item">
                  <ShieldCheck className="trust-icon" size={20} />
                  <div className="trust-text">Bespoke 3D Layouts</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="hero-visual">
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Royal Indian Wedding Mandap Decor"
                />
              </div>

              <div className="hero-floating-badge">
                <div className="floating-badge-icon">
                  <DiyaIcon size={24} color="#E66E19" />
                </div>
                <div>
                  <div className="floating-badge-title">Shubh Muhurtham Ready</div>
                  <div className="floating-badge-sub">On-time venue setup guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Event Categories Section */}
      <section className="section" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <DiyaIcon size={13} color="#E66E19" /> Sacred & Festive Occasions
            </span>
            <h2 className="section-title">Decor Tailored for Every Indian Milestone</h2>
            <p className="section-subtitle">
              Choose your occasion to explore authentic handpicked decor themes, customized backdrops, 
              and traditional floral styling.
            </p>
            <SectionDivider />
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Utsav Craftsmanship / Why Us */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={14} /> The Utsav Artistry
            </span>
            <h2 className="section-title">Why Families Trust Utsav Decor</h2>
            <p className="section-subtitle">
              We understand that Indian events aren't just gatherings—they are sacred rituals, deep family bonds, 
              and once-in-a-lifetime milestones.
            </p>
            <SectionDivider />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', padding: '2.2rem 1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--marigold-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--marigold)', marginBottom: '1.2rem' }}>
                <LotusIcon size={24} color="#E66E19" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--maroon-deep)' }}>Pure Fresh Florals</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Directly sourced daily from Bangalore and Madurai flower markets—fragrant mogra, fresh Dutch roses, marigolds, and tuberose.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2.2rem 1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--maroon-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--maroon-royal)', marginBottom: '1.2rem' }}>
                <DiyaIcon size={24} color="#681523" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--maroon-deep)' }}>Sacred Vedic Precision</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Authentic brass samai, kuthu vilakku, havan kund safety floorings, and auspicious orientation honoring pooja rituals.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2.2rem 1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', background: '#FFF9E6', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '1.2rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--maroon-deep)' }}>Zero Cliché Templates</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Every decor is tailor-fit to your ballroom or living room with custom color palettes, moodboards, and venue spatial adjustments.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2.2rem 1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--emerald-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald-accent)', marginBottom: '1.2rem' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--maroon-deep)' }}>Transparent Consultation</h3>
              <p style={{ fontSize: '0.9rem' }}>
                No hidden charges or rigid pricing packages. We provide transparent itemized proposals within 24 hours of your inquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Collections Showcase */}
      {signatureThemes.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-main)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <Sparkles size={14} /> Signature Atelier Themes
              </span>
              <h2 className="section-title">Our Most Cherished Setups</h2>
              <p className="section-subtitle">
                A glimpse into our most celebrated mandapams, haldi bloom gardens, and pooja sanctums.
              </p>
              <SectionDivider />
            </div>

            <div className="themes-grid">
              {signatureThemes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/category/weddings" className="btn btn-primary btn-md">
                Browse All Event Themes <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. Client Love & Testimonials */}
      <section className="section" style={{ background: 'var(--maroon-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ background: '#FFFFFF' }}>
              <Heart size={14} color="#E66E19" fill="#E66E19" /> Celebrated Moments
            </span>
            <h2 className="section-title">Words from Happy Families</h2>
            <p className="section-subtitle">
              Read how Utsav Decor brought joyous warmth and splendor to recent celebrations across India.
            </p>
            <SectionDivider />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--marigold)', marginBottom: '1rem' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-heading)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                "The Rajwada Mandap for our daughter’s wedding at Udaipur was pure royal perfection! 
                The fresh Dutch roses and brass oil lamps created an ethereal Vedic aura. Everyone was stunned."
              </p>
              <div style={{ fontWeight: 700, color: 'var(--maroon-deep)', fontSize: '0.95rem' }}>Anil & Sunita Singhania</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--marigold)' }}>Royal Wedding, Udaipur</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--marigold)', marginBottom: '1rem' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-heading)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                "We booked the Sampoorna Griha Pravesh setup for our new Bengaluru home. The entrance marigold toran 
                and sacred pooja backdrop were delivered and set up at 5:30 AM sharp before the muhurtham."
              </p>
              <div style={{ fontWeight: 700, color: 'var(--maroon-deep)', fontSize: '0.95rem' }}>Karthik & Deepa Rao</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--marigold)' }}>Griha Pravesh, Bengaluru</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--marigold)', marginBottom: '1rem' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-heading)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                "The Haldi Vrindavan theme with brass urlis and floral umbrellas was the life of our celebration! 
                The photos look straight out of a royal magazine."
              </p>
              <div style={{ fontWeight: 700, color: 'var(--maroon-deep)', fontSize: '0.95rem' }}>Ritika & Harshvardhan</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--marigold)' }}>Haldi & Mehendi, Mumbai</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Consultation Banner CTA */}
      <section style={{ background: 'var(--maroon-royal)', color: '#FFFFFF', padding: '4.5rem 0', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212, 175, 55, 0.2)', border: '1px solid var(--gold-border)', color: 'var(--gold-light)', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            <Sparkles size={14} /> Free Bespoke Moodboard Call
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginBottom: '1rem' }}>
            Planning an Upcoming Celebration?
          </h2>
          <p style={{ color: '#E2D7D9', maxWidth: '620px', margin: '0 auto 2.2rem', fontSize: '1.1rem' }}>
            Select your favorite base theme, choose customized add-ons, and send us your event details. 
            Our master decor team will reach out within 24 hours with tailored concepts.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <Link to="/request" className="btn btn-gold btn-lg">
              Start Your Custom Request
            </Link>
            <a
              href="https://wa.me/919820145872?text=Hello%20Utsav%20Decor!%20I%20want%20to%20plan%20decor%20for%20an%20upcoming%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-white btn-lg"
            >
              WhatsApp Our Stylist
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
