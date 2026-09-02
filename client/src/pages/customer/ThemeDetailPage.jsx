import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { catalogService } from '../../services/catalogService';
import { useCustomization } from '../../context/CustomizationContext';
import { useToast } from '../../context/ToastContext';
import { AddonPicker } from '../../components/customer/AddonPicker';
import { GalleryLightbox } from '../../components/customer/GalleryLightbox';
import { RequestSummaryDrawer } from '../../components/customer/RequestSummaryDrawer';
import { SectionDivider, DiyaIcon } from '../../components/common/Motif';
import { Sparkles, Check, ArrowLeft, ArrowRight, Star, Maximize2, ShieldCheck, Heart, Calendar } from 'lucide-react';

export const ThemeDetailPage = () => {
  const { idOrSlug } = useParams();
  const [theme, setTheme] = useState(null);
  const [addons, setAddons] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedTheme, selectTheme, totalAddonsCount } = useCustomization();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [themeRes, addonsRes] = await Promise.all([
          catalogService.getThemeById(idOrSlug),
          catalogService.getAddons(),
        ]);
        if (themeRes.data) {
          setTheme(themeRes.data);
        } else {
          setError('Theme not found');
        }
        if (addonsRes.data) {
          setAddons(addonsRes.data);
        }
      } catch (err) {
        console.error('Error fetching theme details:', err);
        setError(err.message || 'Failed to load theme.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idOrSlug]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <DiyaIcon size={36} color="var(--marigold)" className="animate-spin" />
        <p style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
          Loading royal decor details...
        </p>
      </div>
    );
  }

  if (error || !theme) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2>Theme Not Found</h2>
        <p style={{ marginTop: '0.8rem', marginBottom: '1.5rem' }}>
          We could not locate this decoration theme.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  const isSelected = selectedTheme?.id === theme.id;
  const images = Array.isArray(theme.images) && theme.images.length > 0 
    ? theme.images 
    : ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'];

  const features = Array.isArray(theme.features) ? theme.features : [];

  const handleSelectBaseTheme = () => {
    selectTheme(theme);
    addToast(`"${theme.name}" set as your base theme!`, 'success');
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Breadcrumb Header */}
      <div className="theme-detail-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--maroon-royal)', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            {theme.category && (
              <>
                <Link to={`/category/${theme.category.slug}`} style={{ color: 'var(--maroon-royal)', fontWeight: 600 }}>
                  {theme.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span style={{ color: 'var(--text-heading)', fontWeight: 700 }}>{theme.name}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              {theme.category && (
                <span className="badge badge-maroon" style={{ marginBottom: '0.5rem' }}>
                  {theme.category.name}
                </span>
              )}
              <h1 style={{ color: 'var(--maroon-deep)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.3rem' }}>
                {theme.name}
              </h1>
            </div>

            {theme.isPopular && (
              <div className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                <Star size={14} fill="currentColor" /> Signature Collection
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Photo Gallery Grid */}
        <div className="theme-gallery-grid">
          {/* Main Photo View */}
          <div className="main-gallery-view" onClick={() => setLightboxOpen(true)}>
            <img src={images[activeImageIndex]} alt={theme.name} />
            <button
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'rgba(74, 14, 23, 0.85)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Maximize2 size={15} /> View Fullscreen ({images.length} Photos)
            </button>
          </div>

          {/* Thumbnails Column */}
          <div className="gallery-thumbs-col">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img src={imgUrl} alt={`${theme.name} angle ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Theme Narrative & Inclusions Grid */}
        <div className="theme-detail-layout">
          {/* Left Column: Description & Inclusions */}
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-deep)', marginBottom: '0.8rem' }}>
                Design Concept & Ambiance
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                {theme.description}
              </p>
            </div>

            {/* Inclusions Card */}
            {features.length > 0 && (
              <div className="theme-inclusions-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Sparkles size={20} color="var(--gold-dark)" />
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--maroon-deep)' }}>
                    What's Included in This Theme
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  All elements are fully installed and styled on-site by our expert artisans.
                </p>

                <ul className="inclusions-list">
                  {features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={18} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Customization Action Card */}
          <div>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '2.2rem',
                border: '1.5px solid var(--surface-border)',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '100px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--marigold)',
                  marginBottom: '0.4rem',
                }}
              >
                Atelier Base Package
              </span>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--maroon-deep)', marginBottom: '1rem' }}>
                {theme.name}
              </h3>

              <div
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  color: 'var(--text-heading)',
                  marginBottom: '1.5rem',
                  borderLeft: '3px solid var(--gold-primary)',
                }}
              >
                <strong>Bespoke Consultation Model:</strong> No fixed prices shown. We tailor materials, floral quantities,
                and setup dimensions to your specific venue requirements.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <button
                  type="button"
                  onClick={handleSelectBaseTheme}
                  className={`btn btn-lg ${isSelected ? 'btn-marigold' : 'btn-primary'}`}
                  style={{ width: '100%' }}
                >
                  {isSelected ? (
                    <>
                      <Check size={18} /> Base Theme Selected
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} /> Select as Base Theme
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isSelected) selectTheme(theme);
                    navigate('/request');
                  }}
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%' }}
                >
                  Proceed to Booking Request <ArrowRight size={18} />
                </button>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '1px solid var(--surface-border-subtle)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={16} color="var(--emerald-accent)" /> 100% On-time Muhurtham Guarantee
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={16} color="var(--maroon-royal)" /> Dedicated On-site Decor Coordinator
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Addons Customizer Section */}
        {addons.length > 0 && <AddonPicker addons={addons} />}
      </div>

      {/* Lightbox Fullscreen Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={images}
        activeIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onChangeIndex={setActiveImageIndex}
      />

      {/* Sticky Customizer Summary Bar */}
      <RequestSummaryDrawer />
    </div>
  );
};
