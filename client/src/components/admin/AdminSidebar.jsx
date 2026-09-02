import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DiyaIcon } from '../common/Motif';
import { LayoutDashboard, Inbox, Sparkles, ExternalLink, LogOut, User } from 'lucide-react';

export const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-brand">
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'var(--gold-gradient)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DiyaIcon size={18} color="#4A0E17" />
        </div>
        <div className="admin-brand-title">UTSAV DECOR</div>
        <span className="admin-badge">ADMIN</span>
      </div>

      {/* Navigation Links */}
      <ul className="sidebar-nav">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/requests"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Inbox size={19} />
            <span>Customer Inquiries</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/catalog"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Sparkles size={19} />
            <span>Catalog Manager</span>
          </NavLink>
        </li>

        <li style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            to="/"
            target="_blank"
            className="sidebar-link"
            style={{ color: 'var(--gold-light)' }}
          >
            <ExternalLink size={17} />
            <span>Live Customer Site</span>
          </Link>
        </li>
      </ul>

      {/* User Profile & Logout */}
      <div className="sidebar-footer">
        <div className="admin-user-preview">
          <div className="admin-avatar">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {user?.name || 'Administrator'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#BDB0B3', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {user?.email || 'admin@utsavdecor.com'}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-sm"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            color: '#FFFFFF',
            border: 'none',
            justifyContent: 'center',
          }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </aside>
  );
};
