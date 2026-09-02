import React from 'react';
import { Sparkles, PhoneCall, CheckCircle2, Archive } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const normalized = status ? status.toUpperCase() : 'NEW';

  const icons = {
    NEW: <Sparkles size={12} />,
    CONTACTED: <PhoneCall size={12} />,
    CONFIRMED: <CheckCircle2 size={12} />,
    CLOSED: <Archive size={12} />,
  };

  const labels = {
    NEW: 'New Request',
    CONTACTED: 'In Consultation',
    CONFIRMED: 'Confirmed Booking',
    CLOSED: 'Archived / Closed',
  };

  return (
    <span className={`status-pill status-${normalized}`}>
      {icons[normalized] || <Sparkles size={12} />}
      <span>{labels[normalized] || normalized}</span>
    </span>
  );
};
