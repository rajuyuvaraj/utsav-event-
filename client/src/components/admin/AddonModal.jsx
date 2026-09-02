import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { catalogService } from '../../services/catalogService';

export const AddonModal = ({ isOpen, onClose, addon = null, onSaved }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    itemCategory: 'Floral',
    unitType: 'Per Set',
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const categories = ['Floral', 'Lighting', 'Seating', 'Entry', 'FX', 'Signage', 'Sound'];

  useEffect(() => {
    if (addon) {
      setFormData({
        name: addon.name || '',
        description: addon.description || '',
        image: addon.image || '',
        itemCategory: addon.itemCategory || 'Floral',
        unitType: addon.unitType || 'Per Set',
        active: addon.active !== undefined ? addon.active : true,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        itemCategory: 'Floral',
        unitType: 'Per Set',
        active: true,
      });
    }
  }, [addon, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (addon?.id) {
        await catalogService.updateAddon(addon.id, formData);
        addToast('Add-on item updated successfully!', 'success');
      } else {
        await catalogService.createAddon(formData);
        addToast('Add-on item created successfully!', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Failed to save add-on item', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={addon ? 'Edit Add-on Item' : 'Add New Add-on Decor Item'}
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Item Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Grand Floral Entrance Arch"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Decor Category</label>
            <select
              className="form-select"
              value={formData.itemCategory}
              onChange={(e) => setFormData({ ...formData, itemCategory: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Unit Specification</label>
            <input
              type="text"
              className="form-input"
              value={formData.unitType}
              onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
              placeholder="e.g. Per Pair / Per Arch / Set of 4"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Image URL <span className="required">*</span>
          </label>
          <input
            type="url"
            className="form-input"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Description <span className="required">*</span>
          </label>
          <textarea
            className="form-textarea"
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the styling details, size, and flowers/materials used..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={formData.active ? 'true' : 'false'}
            onChange={(e) => setFormData({ ...formData, active: e.target.value === 'true' })}
          >
            <option value="true">Active (Available for customer selection)</option>
            <option value="false">Inactive (Temporarily unavailable)</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary btn-sm" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
            {loading ? 'Saving...' : (addon ? 'Save Changes' : 'Create Item')}
          </button>
        </div>
      </form>
    </Modal>
  );
};
