import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export const RequestSummaryDrawer = () => {
  const { selectedTheme, selectedAddons, totalAddonsCount } = useCustomization();
  const navigate = useNavigate();

  if (!selectedTheme && selectedAddons.length === 0) {
    return null;
  }

  return (
    <div className="sticky-request-bar">
      <div className="container">
        <div className="sticky-bar-inner">
          <div className="bar-selection-info">
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--gold-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--maroon-deep)',
                flexShrink: 0,
              }}
            >
              <Sparkles size={20} />
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Your Custom Package
              </div>
              <div className="bar-theme-name">
                {selectedTheme ? selectedTheme.name : 'Customized Event Add-ons'}
              </div>
            </div>

            {totalAddonsCount > 0 && (
              <span className="bar-addons-badge">
                <Layers size={13} style={{ display: 'inline', marginRight: '4px' }} />
                +{totalAddonsCount} Extra {totalAddonsCount === 1 ? 'Item' : 'Items'}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', display: 'none', mdDisplay: 'inline' }}>
              Free bespoke quote & 3D consultation
            </span>

            <button
              onClick={() => navigate('/request')}
              className="btn btn-gold btn-md"
            >
              Proceed to Booking Request <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
