import React from 'react';

export const StatsCard = ({ title, value, icon, color = 'maroon', subtitle }) => {
  return (
    <div className="kpi-card">
      <div className={`kpi-icon-wrap ${color}`}>
        {icon}
      </div>
      <div>
        <div className="kpi-val">{value}</div>
        <div className="kpi-label">{title}</div>
        {subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '2px' }}>{subtitle}</div>}
      </div>
    </div>
  );
};
