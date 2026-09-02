import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { catalogService } from '../../services/catalogService';

export const ThemeModal = ({ isOpen, onClose, theme = null, categories = [], onSaved }) => {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    slug: '',
    shortDesc: '',
    description: '',
    featuresText: '',
    imagesText: '',
    isPopular: false,
    displayOrder: 0,
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (theme) {
      setFormData({
        categoryId: theme.categoryId || (categories[0]?.id || ''),
        name: theme.name || '',
        slug: theme.slug || '',
        shortDesc: theme.shortDesc || '',
        description: theme.description || '',
        featuresText: Array.isArray(theme.features) ? theme.features.join('\n') : '',
        imagesText: Array.isArray(theme.images) ? theme.images.join('\n') : '',
        isPopular: Boolean(theme.isPopular),
        displayOrder: theme.displayOrder || 0,
        active: theme.active !== undefined ? theme.active : true,
      });
    } else {
      setFormData({
        categoryId: categories[0]?.id || '',
        name: '',
        slug: '',
        shortDesc: '',
        description: '',
        featuresText: 'Grand Royal Mandapam Setup\nFresh Rose & Mogra Garland Strings\nRoyal Maharaja High-Back Seating\nIntelligent Warm Ambience Spot Lighting',
        imagesText: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        isPopular: false,
        displayOrder: 0,
        active: true,
      });
    }
  }, [theme, isOpen, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const images = formData.imagesText
      .split('\n')
      .map((img) => img.trim())
      .filter(Boolean);

    const payload = {
      categoryId: formData.categoryId,
      name: formData.name,
      slug: formData.slug,
      shortDesc: formData.shortDesc,
      description: formData.description,
      features,
      images,
      isPopular: formData.isPopular,
      displayOrder: formData.displayOrder,
      active: formData.active,
    };

    try {
      if (theme?.id) {
        await catalogService.updateTheme(theme.id, payload);
        addToast('Theme updated successfully!', 'success');
      } else {
        await catalogService.createTheme(payload);
        addToast('Theme created successfully!', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Failed to save theme', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={theme ? 'Edit Decoration Theme' : 'Add New Decoration Theme'}
      maxWidth="700px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              Theme Name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rajwada Palace Gold Mandapam"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              className="form-select"
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">URL Slug</label>
          <input
            type="text"
            className="form-input"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. rajwada-palace-mandap (auto-generated if empty)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Short Summary (Preview text)</label>
          <input
            type="text"
            className="form-input"
            value={formData.shortDesc}
            onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            placeholder="Brief 1-line highlight of this theme..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Full Narrative Description <span className="required">*</span>
          </label>
          <textarea
            className="form-textarea"
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed description of decor ambiance, materials, floral styling, backdrop architecture..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">What's Included / Inclusions (1 per line)</label>
          <textarea
            className="form-textarea"
            rows={4}
            value={formData.featuresText}
            onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
            placeholder="16x16 ft Grand Royal Mandapam&#10;Fresh Dutch Red Roses & Jasmine&#10;Maharaja Seating Chairs"
          />
          <div className="form-help">Enter each included element on a separate line.</div>
        </div>

        <div className="form-group">
          <label className="form-label">Image URLs (1 URL per line)</label>
          <textarea
            className="form-textarea"
            rows={3}
            value={formData.imagesText}
            onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
            placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
          />
          <div className="form-help">First image will be the primary cover photo.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
          <div className="form-group">
            <label className="form-label">Display Order</label>
            <input
              type="number"
              className="form-input"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Signature Highlight</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mark as Signature</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formData.active ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, active: e.target.value === 'true' })}
            >
              <option value="true">Active (Visible)</option>
              <option value="false">Inactive (Hidden)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary btn-sm" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
            {loading ? 'Saving...' : (theme ? 'Save Changes' : 'Create Theme')}
          </button>
        </div>
      </form>
    </Modal>
  );
};
