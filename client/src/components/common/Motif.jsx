import React from 'react';

export const DiyaIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Flame */}
    <path d="M12 2c.8 1.2 1.6 2.4 1.6 3.6 0 1.3-.8 2.4-1.6 2.4s-1.6-1.1-1.6-2.4C10.4 4.4 11.2 3.2 12 2z" fill={color} />
    {/* Lamp base */}
    <path d="M3 13c0 4.5 4 8 9 8s9-3.5 9-8c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1z" />
    <path d="M4 12h16" />
    <path d="M9 21v1h6v-1" />
  </svg>
);

export const LotusIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 4c-1.5 3-3 6.5-3 9.5 0 2.5 1.3 4.5 3 4.5s3-2 3-4.5C15 10.5 13.5 7 12 4z" />
    <path d="M7 11.5c-2.5 1.5-4 4-4 6.5 2 0 4.5-.8 6-2.5" />
    <path d="M17 11.5c2.5 1.5 4 4 4 6.5-2 0-4.5-.8-6-2.5" />
    <path d="M4.5 18c2.5 2.5 5 2.5 7.5 2.5s5 0 7.5-2.5" />
  </svg>
);

export const MandalaPattern = ({ className = '', size = 120, opacity = 0.08 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke="#D4AF37"
    strokeWidth="1"
    style={{ opacity }}
    className={className}
  >
    <circle cx="50" cy="50" r="45" />
    <circle cx="50" cy="50" r="35" strokeDasharray="2,2" />
    <circle cx="50" cy="50" r="25" />
    <circle cx="50" cy="50" r="15" />
    <circle cx="50" cy="50" r="5" fill="#D4AF37" />
    <path d="M50 5 L50 95 M5 50 L95 50" />
    <path d="M18 18 L82 82 M18 82 L82 18" />
    <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" />
  </svg>
);

export const SectionDivider = ({ label }) => (
  <div className="motif-divider">
    <div className="motif-icon">
      <DiyaIcon size={20} color="#D4AF37" />
    </div>
  </div>
);
