import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { catalogService } from '../../services/catalogService';

export const CategoryModal = ({ isOpen, onClose, category = null, onSaved }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    coverImage: '',
    icon: 'Sparkles',
    displayOrder: 0,
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        coverImage: category.coverImage || '',
        icon: category.icon || 'Sparkles',
        displayOrder: category.displayOrder || 0,
        active: category.active !== undefined ? category.active : true,
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        icon: 'Sparkles',
        displayOrder: 0,
        active: true,
      });
    }
  }, [category, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (category?.id) {
        await catalogService.updateCategory(category.id, formData);
        addToast('Category updated successfully!', 'success');
      } else {
        await catalogService.createCategory(formData);
        addToast('Category created successfully!', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Failed to save category', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? 'Edit Event Category' : 'Add New Event Category'}
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Category Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Royal Weddings"
          />
        </div>

        <div className="form-group">
          <label className="form-label">URL Slug</label>
          <input
            type="text"
            className="form-input"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. weddings (auto-generated if left empty)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Description <span className="required">*</span>
          </label>
          <textarea
            className="form-textarea"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe this category of celebrations..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Cover Image URL <span className="required">*</span>
          </label>
          <input
            type="url"
            className="form-input"
            required
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
            {loading ? 'Saving...' : (category ? 'Save Changes' : 'Create Category')}
          </button>
        </div>
      </form>
    </Modal>
  );
};
