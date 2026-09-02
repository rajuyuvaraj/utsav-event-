import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { useToast } from '../../context/ToastContext';
import { DiyaIcon } from '../../components/common/Motif';
import { ArrowLeft, Phone, Mail, MessageSquare, Calendar, MapPin, Users, Clock, Send, Trash2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminRequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [requestItem, setRequestItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await requestService.getRequestById(id);
      if (res.data) {
        setRequestItem(res.data);
      }
    } catch (err) {
      console.error('Error fetching request details:', err);
      addToast(err.message || 'Failed to load request details', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await requestService.updateRequest(id, { status: newStatus });
      if (res.data) {
        setRequestItem((prev) => ({ ...prev, status: res.data.status }));
        addToast(`Status updated to "${newStatus}"`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setUpdating(true);
    try {
      const res = await requestService.updateRequest(id, { noteText: newNote.trim() });
      if (res.data) {
        setRequestItem((prev) => ({ ...prev, adminNotes: res.data.adminNotes }));
        setNewNote('');
        addToast('Internal note recorded.', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Failed to append note', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this customer request?')) {
      try {
        await requestService.deleteRequest(id);
        addToast('Request deleted.', 'info');
        navigate('/admin/requests');
      } catch (err) {
        addToast(err.message || 'Failed to delete request', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <DiyaIcon size={32} color="var(--marigold)" className="animate-spin" />
        <p style={{ marginTop: '0.8rem' }}>Loading request dossier...</p>
      </div>
    );
  }

  if (!requestItem) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h3>Request Not Found</h3>
        <Link to="/admin/requests" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Requests
        </Link>
      </div>
    );
  }

  const selectedAddons = Array.isArray(requestItem.selectedAddons) ? requestItem.selectedAddons : [];
  const adminNotes = Array.isArray(requestItem.adminNotes) ? requestItem.adminNotes : [];
  const themeDetails = requestItem.themeDetails;

  const rawPhone = requestItem.phone.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Namaste ${requestItem.customerName}! Greetings from Utsav Decor regarding your inquiry (Ref: ${requestItem.requestNumber}) for ${requestItem.eventDate}.`
  )}`;

  return (
    <div>
      {/* Top Header & Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin/requests" className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} /> All Inquiries
          </Link>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Request Dossier
            </span>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--maroon-deep)' }}>
              {requestItem.requestNumber}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={handleDelete} className="btn btn-sm" style={{ background: '#FEE2E2', color: '#DC2626', border: 'none' }}>
            <Trash2 size={15} /> Delete Record
          </button>
        </div>
      </div>

      <div className="request-detail-grid">
        {/* Left Column: Customer Details, Selected Theme & Add-ons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Customer Info Card */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="detail-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Customer & Event Details</span>
              <StatusBadge status={requestItem.status} />
            </div>

            <div className="info-kv-grid">
              <div className="info-kv-item">
                <div className="info-label">Customer Name</div>
                <div className="info-value">{requestItem.customerName}</div>
              </div>

              <div className="info-kv-item">
                <div className="info-label">Contact Phone</div>
                <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <a href={`tel:${requestItem.phone}`} style={{ color: 'var(--maroon-royal)', textDecoration: 'underline' }}>
                    {requestItem.phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge badge-gold"
                    style={{ textDecoration: 'none' }}
                  >
                    <MessageSquare size={12} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="info-kv-item">
                <div className="info-label">Email Address</div>
                <div className="info-value">
                  <a href={`mailto:${requestItem.email}`} style={{ color: 'var(--maroon-royal)' }}>
                    {requestItem.email}
                  </a>
                </div>
              </div>

              <div className="info-kv-item">
                <div className="info-label">Event Date & Slot</div>
                <div className="info-value" style={{ color: 'var(--marigold)' }}>
                  {requestItem.eventDate} ({requestItem.eventTimeSlot})
                </div>
              </div>

              <div className="info-kv-item">
                <div className="info-label">Venue Location</div>
                <div className="info-value">{requestItem.location || 'Not provided'}</div>
              </div>

              <div className="info-kv-item">
                <div className="info-label">Venue Type & Guests</div>
                <div className="info-value">
                  {requestItem.venueType} {requestItem.guestCount ? `(~${requestItem.guestCount} guests)` : ''}
                </div>
              </div>
            </div>

            {/* Special Notes */}
            {requestItem.notes && (
              <div style={{ marginTop: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--marigold)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Customer's Special Notes / Preferences:
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-heading)', fontStyle: 'italic' }}>
                  "{requestItem.notes}"
                </div>
              </div>
            )}
          </div>

          {/* Selected Base Theme Card */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="detail-section-title">Selected Base Decoration Theme</div>

            {themeDetails ? (
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                {themeDetails.images && themeDetails.images.length > 0 && (
                  <img
                    src={themeDetails.images[0]}
                    alt={themeDetails.name}
                    style={{ width: '120px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />
                )}
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--maroon-deep)' }}>{themeDetails.name}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.3rem 0' }}>
                    {themeDetails.shortDesc || themeDetails.description}
                  </div>
                  {themeDetails.category && (
                    <span className="badge badge-maroon">Category: {themeDetails.category.name}</span>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.95rem', color: 'var(--text-heading)', fontWeight: 600 }}>
                {requestItem.selectedThemeName || 'General Custom Event Consultation'}
              </div>
            )}
          </div>

          {/* Selected Addons Card */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="detail-section-title">
              Customized Add-on Decor Items ({selectedAddons.length})
            </div>

            {selectedAddons.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {selectedAddons.map((addon, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--surface-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      {addon.image && (
                        <img
                          src={addon.image}
                          alt={addon.name}
                          style={{ width: '44px', height: '44px', borderRadius: '4px', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '0.92rem' }}>
                          {addon.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Category: {addon.itemCategory || 'Floral'} • {addon.unitType || 'Unit'}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--maroon-royal)', background: '#FFFFFF', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)' }}>
                      Qty: {addon.quantity || 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                No extra add-on items were selected with this request.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Status Updater & Internal Admin Notes Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Status Updater Card */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="detail-section-title">Update Inquiry Status</div>

            <div className="form-group">
              <label className="form-label">Workflow Stage</label>
              <select
                className="form-select"
                value={requestItem.status}
                disabled={updating}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="NEW">NEW - Awaiting Initial Contact</option>
                <option value="CONTACTED">CONTACTED - In Moodboard & Quote Review</option>
                <option value="CONFIRMED">CONFIRMED - Token Advance Paid</option>
                <option value="CLOSED">CLOSED - Completed / Archived</option>
              </select>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Updated on {new Date(requestItem.updatedAt).toLocaleString()}
            </div>
          </div>

          {/* Internal Admin Notes */}
          <div className="admin-card" style={{ marginBottom: 0 }}>
            <div className="detail-section-title">Internal Team Notes</div>

            <div className="admin-notes-log" style={{ marginBottom: '1.2rem' }}>
              {adminNotes.map((note, idx) => (
                <div key={idx} className="note-bubble">
                  <div className="note-bubble-meta">
                    <span>{note.author || 'Admin'}</span>
                    <span>{new Date(note.date).toLocaleDateString()} {new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div style={{ color: 'var(--text-main)' }}>{note.text}</div>
                </div>
              ))}

              {adminNotes.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No internal notes recorded yet.
                </div>
              )}
            </div>

            {/* Add Note Input */}
            <form onSubmit={handleAddNote}>
              <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                <textarea
                  className="form-textarea"
                  rows={2}
                  required
                  placeholder="Type internal note (e.g. Called client, shared quote for 50k on WhatsApp)..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={updating || !newNote.trim()}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <Send size={14} /> Append Internal Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
