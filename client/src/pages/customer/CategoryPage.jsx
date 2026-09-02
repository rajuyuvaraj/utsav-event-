import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { catalogService } from '../../services/catalogService';
import { ThemeCard } from '../../components/customer/ThemeCard';
import { AddonPicker } from '../../components/customer/AddonPicker';
import { RequestSummaryDrawer } from '../../components/customer/RequestSummaryDrawer';
import { SectionDivider, DiyaIcon } from '../../components/common/Motif';
import { Sparkles, ArrowLeft, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [catRes, addonRes] = await Promise.all([
          catalogService.getCategoryBySlug(slug),
          catalogService.getAddons(),
        ]);
        if (catRes.data) {
          setCategory(catRes.data);
        } else {
          setError('Category not found');
        }
        if (addonRes.data) {
          setAddons(addonRes.data);
        }
      } catch (err) {
        console.error('Error fetching category details:', err);
        setError(err.message || 'Failed to load category.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <DiyaIcon size={36} color="var(--marigold)" className="animate-spin" />
        <p style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
          Preparing festive gallery...
        </p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h2>Category Not Found</h2>
        <p style={{ marginTop: '0.8rem', marginBottom: '1.5rem' }}>
          We could not find the requested celebration category.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Category Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: '4rem 0 3.5rem',
          background: `linear-gradient(180deg, rgba(74, 14, 23, 0.88) 0%, rgba(74, 14, 23, 0.95) 100%), url(${category.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
        }}
      >
        <div className="container">
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--gold-light)',
              fontSize: '0.88rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            <ArrowLeft size={16} /> Back to All Celebrations
          </Link>

          <div style={{ maxWidth: '780px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid var(--gold-primary)',
                color: 'var(--gold-light)',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={13} /> Tailored Atelier Decor
            </span>

            <h1 style={{ color: '#FFFFFF', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              {category.name}
            </h1>

            <p style={{ color: '#F3ECE0', fontSize: '1.1rem', lineHeight: 1.7 }}>
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Themes Gallery Grid */}
      <section className="section" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <DiyaIcon size={13} color="#E66E19" /> Pre-Made Atelier Packages
            </span>
            <h2 className="section-title">Select a Base Decoration Theme</h2>
            <p className="section-subtitle">
              Browse our curated themes below. Click "View Details" to see the full photo gallery and inclusions,
              or select a theme directly to add bespoke accessories.
            </p>
            <SectionDivider />
          </div>

          {category.themes && category.themes.length > 0 ? (
            <div className="themes-grid">
              {category.themes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
              <p>No themes currently published for this category.</p>
            </div>
          )}

          {/* Add-on Enhancements Component */}
          {addons.length > 0 && <AddonPicker addons={addons} />}
        </div>
      </section>

      {/* Floating Action Drawer if something is selected */}
      <RequestSummaryDrawer />
    </div>
  );
};
