import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminHeader = ({ title = 'Admin Portal' }) => {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <h1 className="admin-header-title">{title}</h1>

      <div className="admin-header-actions">
        <Link
          to="/"
          target="_blank"
          className="btn btn-outline-gold btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ExternalLink size={14} /> Customer View
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--maroon-light)',
              color: 'var(--maroon-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '1px solid var(--surface-border)',
            }}
          >
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};
