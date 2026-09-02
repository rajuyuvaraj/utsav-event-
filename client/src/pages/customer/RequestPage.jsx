import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCustomization } from '../../context/CustomizationContext';
import { useToast } from '../../context/ToastContext';
import { requestService } from '../../services/requestService';
import { SectionDivider, DiyaIcon } from '../../components/common/Motif';
import { Sparkles, Calendar, MapPin, Users, Mail, Phone, User, Clock, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export const RequestPage = () => {
  const { selectedTheme, selectedAddons, updateAddonQty, removeAddon, clearAllCustomizations } = useCustomization();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventTimeSlot: 'Evening',
    location: '',
    venueType: 'Banquet Hall',
    guestCount: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validation
  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your mobile number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.eventDate) {
      errs.eventDate = 'Please select your celebration date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields correctly.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        eventDate: formData.eventDate,
        eventTimeSlot: formData.eventTimeSlot,
        location: formData.location,
        venueType: formData.venueType,
        guestCount: formData.guestCount ? parseInt(formData.guestCount) : null,
        notes: formData.notes,
        selectedThemeId: selectedTheme?.id || null,
        selectedThemeName: selectedTheme?.name || 'Custom Decor Enquiry',
        selectedAddons: selectedAddons,
      };

      const res = await requestService.submitRequest(payload);

      if (res.success && res.data) {
        clearAllCustomizations();
        addToast('Your event inquiry has been submitted successfully!', 'success');
        navigate(`/request-confirmed/${res.data.id}`, { state: { request: res.data } });
      }
    } catch (err) {
      console.error('Submission error:', err);
      addToast(err.message || 'Failed to submit request. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '3.5rem 0 6rem' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <DiyaIcon size={14} color="#E66E19" /> Booking & Consultation Request
          </span>
          <h1 style={{ color: 'var(--maroon-deep)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '0.6rem' }}>
            Finalize Your Event Vision
          </h1>
          <p className="section-subtitle">
            Review your chosen base theme and bespoke add-ons, fill in your celebration details,
            and our senior decor stylist will prepare your tailored proposal.
          </p>
          <SectionDivider />
        </div>

        <div className="request-layout">
          {/* Left Column: Contact & Event Details Form */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              border: '1.5px solid var(--surface-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', color: 'var(--maroon-deep)', marginBottom: '1.5rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--surface-border)' }}>
              1. Event & Contact Information
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              {/* Customer Name */}
              <div className="form-group">
                <label className="form-label">
                  Your Full Name <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Meera & Rajesh Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>
                {errors.customerName && <div className="form-error">{errors.customerName}</div>}
              </div>

              {/* Phone & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    Mobile Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    Celebration Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  />
                  {errors.eventDate && <div className="form-error">{errors.eventDate}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select
                    className="form-select"
                    value={formData.eventTimeSlot}
                    onChange={(e) => setFormData({ ...formData, eventTimeSlot: e.target.value })}
                  >
                    <option value="Morning">Morning Pooja (6AM - 12PM)</option>
                    <option value="Afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="Evening">Evening Reception (5PM - 11PM)</option>
                    <option value="Full Day">Full Day Multi-Rituals</option>
                  </select>
                </div>
              </div>

              {/* Location & Venue Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label">Event City & Venue Locality</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. ITC Gardenia, Bengaluru / Home in Andheri West"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Venue Type</label>
                  <select
                    className="form-select"
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                  >
                    <option value="Banquet Hall">Banquet Hall</option>
                    <option value="Home/Apartment">Home / Apartment</option>
                    <option value="Lawn/Open Ground">Lawn / Open Ground</option>
                    <option value="Hotel Ballroom">Hotel Ballroom</option>
                    <option value="Temple/Mandapam">Temple / Mandapam</option>
                  </select>
                </div>
              </div>

              {/* Guest Count */}
              <div className="form-group">
                <label className="form-label">Estimated Guest Count (Optional)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 250"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                />
              </div>

              {/* Special Notes */}
              <div className="form-group">
                <label className="form-label">Special Requests / Color Theme Preferences</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Mention any specific floral preferences (e.g., yellow marigold, red roses), muhurtham timings, or venue restrictions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold btn-lg"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {submitting ? 'Submitting Your Request...' : 'Submit Custom Request (Free Quote)'}
              </button>
            </form>
          </div>

          {/* Right Column: Customization Summary */}
          <div className="order-summary-box">
            <h3 style={{ fontSize: '1.3rem', color: 'var(--maroon-deep)', marginBottom: '1.2rem' }}>
              2. Your Decor Selection
            </h3>

            {/* Selected Theme */}
            {selectedTheme ? (
              <div className="summary-theme-header">
                {selectedTheme.coverImage && (
                  <img
                    src={selectedTheme.coverImage}
                    alt={selectedTheme.name}
                    className="summary-theme-thumb"
                  />
                )}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--marigold)', textTransform: 'uppercase' }}>
                    Selected Base Theme
                  </span>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--maroon-deep)' }}>
                    {selectedTheme.name}
                  </h4>
                  {selectedTheme.categoryName && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Category: {selectedTheme.categoryName}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--surface-border)',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                  No base theme selected yet. (You can still submit a custom inquiry!)
                </p>
                <Link to="/category/weddings" className="btn btn-secondary btn-sm">
                  Browse Themes Gallery
                </Link>
              </div>
            )}

            {/* Selected Add-ons List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--maroon-deep)' }}>
                  Selected Add-ons ({selectedAddons.length})
                </h4>
              </div>

              {selectedAddons.length > 0 ? (
                <ul className="selected-addons-list">
                  {selectedAddons.map((addon) => (
                    <li key={addon.id} className="selected-addon-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {addon.image && (
                          <img
                            src={addon.image}
                            alt={addon.name}
                            style={{ width: '38px', height: '38px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.88rem' }}>
                            {addon.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {addon.itemCategory} • {addon.unitType}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div className="qty-stepper" style={{ padding: '0.1rem 0.3rem' }}>
                          <button
                            type="button"
                            className="qty-btn"
                            style={{ width: '22px', height: '22px' }}
                            onClick={() => updateAddonQty(addon.id, -1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="qty-val" style={{ fontSize: '0.82rem', minWidth: '16px' }}>
                            {addon.quantity}
                          </span>
                          <button
                            type="button"
                            className="qty-btn"
                            style={{ width: '22px', height: '22px' }}
                            onClick={() => updateAddonQty(addon.id, 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeAddon(addon.id)}
                          style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0.5rem 0' }}>
                  No extra add-on decor items selected.
                </p>
              )}
            </div>

            {/* Bespoke Pricing Assurance */}
            <div className="no-pricing-notice">
              <strong>Bespoke Consultation:</strong> As every Indian venue and muhurtham setup is unique,
              our decor stylists will prepare an itemized proposal after a brief consultation.
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--emerald-accent)' }}>
              <ShieldCheck size={16} /> Fast response within 24 hours guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
