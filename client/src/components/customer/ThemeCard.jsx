import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { useToast } from '../../context/ToastContext';
import { Sparkles, Check, ArrowRight, Star } from 'lucide-react';

export const ThemeCard = ({ theme }) => {
  const { selectedTheme, selectTheme } = useCustomization();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const isSelected = selectedTheme?.id === theme.id;
  const coverImage = Array.isArray(theme.images) && theme.images.length > 0 
    ? theme.images[0] 
    : 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';

  const features = Array.isArray(theme.features) ? theme.features : [];

  const handleSelectTheme = (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectTheme(theme);
    addToast(`"${theme.name}" set as your base theme!`, 'success');
  };

  return (
    <div className={`theme-card ${isSelected ? 'selected' : ''}`} style={isSelected ? { borderColor: 'var(--marigold)', boxShadow: '0 4px 18px var(--marigold-glow)' } : {}}>
      <div className="theme-card-img-wrap">
        <img
          src={coverImage}
          alt={theme.name}
          loading="lazy"
        />
        {theme.isPopular && (
          <div className="popular-ribbon">
            <Star size={12} fill="currentColor" /> Signature Collection
          </div>
        )}
      </div>

      <div className="theme-card-body">
        <h3 className="theme-card-title">{theme.name}</h3>
        <p className="theme-card-short">{theme.shortDesc || theme.description}</p>

        {features.length > 0 && (
          <ul className="theme-features-preview">
            {features.slice(0, 3).map((feat, idx) => (
              <li key={idx}>
                <Check size={14} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem' }}>
          <Link
            to={`/theme/${theme.slug || theme.id}`}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
          >
            View Details
          </Link>

          <button
            onClick={handleSelectTheme}
            className={`btn btn-sm ${isSelected ? 'btn-marigold' : 'btn-primary'}`}
            style={{ flex: 1.2 }}
          >
            {isSelected ? (
              <>
                <Check size={15} /> Selected
              </>
            ) : (
              <>
                <Sparkles size={15} /> Select Theme
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
