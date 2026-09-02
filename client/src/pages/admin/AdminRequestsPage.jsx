import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DiyaIcon } from '../../components/common/Motif';
import { Search, Filter, Phone, Mail, Calendar, Eye, RefreshCw } from 'lucide-react';

export const AdminRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await requestService.getRequests({
        status: activeStatus,
        search: searchTerm,
      });
      if (res.data) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [activeStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRequests();
  };

  const statusFilters = [
    { key: 'ALL', label: 'All Inquiries' },
    { key: 'NEW', label: 'New' },
    { key: 'CONTACTED', label: 'In Consultation' },
    { key: 'CONFIRMED', label: 'Confirmed' },
    { key: 'CLOSED', label: 'Closed' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--maroon-deep)' }}>Customer Inquiries</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Track, review, and manage all incoming celebration requests.
          </p>
        </div>

        <button onClick={fetchRequests} className="btn btn-secondary btn-sm">
          <RefreshCw size={15} /> Refresh List
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-bar">
        <div className="filter-tabs">
          {statusFilters.map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab ${activeStatus === tab.key ? 'active' : ''}`}
              onClick={() => setActiveStatus(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="search-input-wrap">
          <Search size={16} />
          <input
            type="text"
            className="form-input"
            style={{ padding: '0.55rem 0.8rem 0.55rem 2.4rem', fontSize: '0.88rem' }}
            placeholder="Search name, phone, ref #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Requests Table Card */}
      <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <DiyaIcon size={32} color="var(--marigold)" className="animate-spin" />
            <p style={{ marginTop: '0.8rem' }}>Loading requests...</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Reference #</th>
                  <th>Customer Info</th>
                  <th>Event Date & Slot</th>
                  <th>Venue Location</th>
                  <th>Theme & Addons</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((item) => {
                  const addonsCount = Array.isArray(item.selectedAddons)
                    ? item.selectedAddons.reduce((acc, curr) => acc + (curr.quantity || 1), 0)
                    : 0;

                  return (
                    <tr key={item.id}>
                      <td>
                        <code style={{ fontWeight: 700, color: 'var(--maroon-royal)', fontSize: '0.85rem' }}>
                          {item.requestNumber}
                        </code>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{item.customerName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{item.email}</div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.88rem' }}>
                          {item.eventDate}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--marigold)' }}>
                          {item.eventTimeSlot}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-heading)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.location || 'Not specified'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.venueType} {item.guestCount ? `• ~${item.guestCount} guests` : ''}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--maroon-deep)' }}>
                          {item.selectedThemeName || 'Custom'}
                        </div>
                        {addonsCount > 0 && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                            +{addonsCount} extra add-ons
                          </span>
                        )}
                      </td>

                      <td>
                        <StatusBadge status={item.status} />
                      </td>

                      <td>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={`/admin/requests/${item.id}`}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <Eye size={13} /> View
                        </Link>
                      </td>
                    </tr>
                  );
                })}

                {requests.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No requests found matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
