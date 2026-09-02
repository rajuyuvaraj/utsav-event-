import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Minus, Check, Sparkles, Filter } from 'lucide-react';

export const AddonPicker = ({ addons = [] }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const { addAddon, removeAddon, updateAddonQty, isAddonSelected, getAddonQty } = useCustomization();
  const { addToast } = useToast();

  const categories = ['ALL', 'Floral', 'Lighting', 'Seating', 'Entry', 'FX', 'Signage', 'Sound'];

  const filteredAddons = activeCategory === 'ALL'
    ? addons
    : addons.filter((item) => item.itemCategory?.toLowerCase() === activeCategory.toLowerCase());

  const handleToggleAddon = (addon) => {
    if (isAddonSelected(addon.id)) {
      removeAddon(addon.id);
      addToast(`Removed "${addon.name}" from your request.`, 'info');
    } else {
      addAddon(addon, 1);
      addToast(`Added "${addon.name}" to your request!`, 'success');
    }
  };

  return (
    <div className="addons-section">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="section-tag">
          <Sparkles size={14} /> Bespoke Enhancements
        </span>
        <h2 style={{ fontSize: '2rem', color: 'var(--maroon-deep)', marginBottom: '0.5rem' }}>
          Personalize with Curated Add-ons
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
          Elevate your base theme with authentic grand arches, royal thrones, traditional brass samai,
          cold spark entry effects, and bespoke signages. No fixed prices—all customized to your venue.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="addons-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`addon-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'ALL' ? 'All Add-ons' : cat}
          </button>
        ))}
      </div>

      {/* Addons Grid */}
      <div className="addons-grid">
        {filteredAddons.map((addon) => {
          const selected = isAddonSelected(addon.id);
          const qty = getAddonQty(addon.id);

          return (
            <div key={addon.id} className={`addon-card ${selected ? 'selected' : ''}`}>
              <div className="addon-card-img">
                <img src={addon.image} alt={addon.name} loading="lazy" />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.6rem',
                    right: '0.6rem',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(4px)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--maroon-royal)',
                  }}
                >
                  {addon.itemCategory} • {addon.unitType}
                </span>
              </div>

              <div className="addon-card-body">
                <h4 className="addon-card-title">{addon.name}</h4>
                <p className="addon-card-desc">{addon.description}</p>

                <div className="addon-card-footer">
                  {selected ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateAddonQty(addon.id, -1)}
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-val">{qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateAddonQty(addon.id, 1)}
                          title="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleAddon(addon)}
                        className="btn btn-sm"
                        style={{
                          background: '#FEE2E2',
                          color: '#B91C1C',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.8rem',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleAddon(addon)}
                      className="btn btn-outline-gold btn-sm"
                      style={{ width: '100%' }}
                    >
                      <Plus size={15} /> Add to Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
