import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { StatsCard } from '../../components/admin/StatsCard';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DiyaIcon } from '../../components/common/Motif';
import { Inbox, Sparkles, PhoneCall, CheckCircle2, Calendar, Plus, ArrowRight, Layers, ArrowUpRight } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await requestService.getDashboardStats();
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <DiyaIcon size={32} color="var(--marigold)" className="animate-spin" />
        <p style={{ marginTop: '0.8rem' }}>Loading dashboard analytics...</p>
      </div>
    );
  }

  const summary = stats?.summary || {};
  const recentInquiries = stats?.recentInquiries || [];
  const categoryBreakdown = stats?.categoryBreakdown || [];

  return (
    <div>
      {/* Top Banner & Date info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--maroon-deep)' }}>
            Welcome to Utsav Decor Control Center
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Overview of customer inquiries, consultation requests, and catalog assets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link to="/admin/catalog" className="btn btn-secondary btn-sm">
            <Layers size={15} /> Manage Catalog
          </Link>
          <Link to="/admin/requests" className="btn btn-primary btn-sm">
            <Inbox size={15} /> View All Inquiries
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="kpi-grid">
        <StatsCard
          title="Total Inquiries"
          value={summary.totalRequests || 0}
          icon={<Inbox size={24} />}
          color="maroon"
          subtitle={`${summary.recentWeekRequests || 0} in the past 7 days`}
        />

        <StatsCard
          title="New Requests"
          value={summary.newRequests || 0}
          icon={<Sparkles size={24} />}
          color="marigold"
          subtitle="Awaiting initial phone call"
        />

        <StatsCard
          title="In Consultation"
          value={summary.contactedRequests || 0}
          icon={<PhoneCall size={24} />}
          color="gold"
          subtitle="Moodboard & quote in review"
        />

        <StatsCard
          title="Confirmed Bookings"
          value={summary.confirmedRequests || 0}
          icon={<CheckCircle2 size={24} />}
          color="emerald"
          subtitle="Advance token received"
        />
      </div>

      {/* Main Grid: Recent Inquiries + Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Left: Recent Inquiries Table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--maroon-deep)' }}>Recent Customer Requests</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Latest 5 incoming event inquiries</p>
            </div>
            <Link to="/admin/requests" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--marigold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Customer</th>
                  <th>Event Date</th>
                  <th>Theme Selected</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((reqItem) => (
                  <tr key={reqItem.id}>
                    <td>
                      <code style={{ fontWeight: 700, color: 'var(--maroon-royal)', fontSize: '0.85rem' }}>
                        {reqItem.requestNumber}
                      </code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{reqItem.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{reqItem.phone}</div>
                    </td>
                    <td>
                      <span style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}>{reqItem.eventDate}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-heading)' }}>
                        {reqItem.selectedThemeName || 'Custom'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={reqItem.status} />
                    </td>
                    <td>
                      <Link
                        to={`/admin/requests/${reqItem.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem' }}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {recentInquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No inquiries received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Requests by Category Breakdown */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--maroon-deep)' }}>Inquiries by Category</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Distribution across celebration types</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
            {categoryBreakdown.map((cat, idx) => {
              const total = summary.totalRequests || 1;
              const percentage = Math.round((cat.count / total) * 100);

              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-heading)' }}>{cat.category}</span>
                    <span style={{ color: 'var(--marigold)' }}>{cat.count} ({percentage}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: 'var(--gold-gradient)',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {categoryBreakdown.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No category data yet.</p>
            )}
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--surface-border)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--maroon-deep)' }}>{summary.totalCategories || 6}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Categories</div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--maroon-deep)' }}>{summary.totalThemes || 19}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Themes</div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--maroon-deep)' }}>{summary.totalAddons || 16}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Add-ons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
