import React, { useState, useEffect } from 'react';
import { catalogService } from '../../services/catalogService';
import { CategoryModal } from '../../components/admin/CategoryModal';
import { ThemeModal } from '../../components/admin/ThemeModal';
import { AddonModal } from '../../components/admin/AddonModal';
import { useToast } from '../../context/ToastContext';
import { DiyaIcon } from '../../components/common/Motif';
import { Plus, Edit2, Trash2, Sparkles, Layers, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';

export const AdminCatalogPage = () => {
  const [activeTab, setActiveTab] = useState('themes'); // 'categories', 'themes', 'addons'
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  const [addonModalOpen, setAddonModalOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState(null);

  const { addToast } = useToast();

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const [catsRes, themesRes, addonsRes] = await Promise.all([
        catalogService.getCategories(true),
        catalogService.getThemes({ includeInactive: true }),
        catalogService.getAddons({ includeInactive: true }),
      ]);
      if (catsRes.data) setCategories(catsRes.data);
      if (themesRes.data) setThemes(themesRes.data);
      if (addonsRes.data) setAddons(addonsRes.data);
    } catch (err) {
      console.error('Error fetching catalog:', err);
      addToast('Failed to load catalog data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // Delete handlers
  const handleDeleteCategory = async (cat) => {
    if (window.confirm(`Delete category "${cat.name}" and all its themes?`)) {
      try {
        await catalogService.deleteCategory(cat.id);
        addToast(`Category "${cat.name}" deleted.`, 'info');
        fetchCatalog();
      } catch (err) {
        addToast(err.message || 'Failed to delete category', 'error');
      }
    }
  };

  const handleDeleteTheme = async (theme) => {
    if (window.confirm(`Delete theme "${theme.name}"?`)) {
      try {
        await catalogService.deleteTheme(theme.id);
        addToast(`Theme "${theme.name}" deleted.`, 'info');
        fetchCatalog();
      } catch (err) {
        addToast(err.message || 'Failed to delete theme', 'error');
      }
    }
  };

  const handleDeleteAddon = async (addon) => {
    if (window.confirm(`Delete add-on item "${addon.name}"?`)) {
      try {
        await catalogService.deleteAddon(addon.id);
        addToast(`Add-on item "${addon.name}" deleted.`, 'info');
        fetchCatalog();
      } catch (err) {
        addToast(err.message || 'Failed to delete add-on', 'error');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--maroon-deep)' }}>Catalog Management</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Manage public categories, decoration packages, and customized add-on decor items.
          </p>
        </div>

        <div>
          {activeTab === 'categories' && (
            <button
              onClick={() => {
                setEditingCategory(null);
                setCategoryModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} /> Add Category
            </button>
          )}

          {activeTab === 'themes' && (
            <button
              onClick={() => {
                setEditingTheme(null);
                setThemeModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} /> Add New Theme
            </button>
          )}

          {activeTab === 'addons' && (
            <button
              onClick={() => {
                setEditingAddon(null);
                setAddonModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} /> Add Add-on Item
            </button>
          )}
        </div>
      </div>

      {/* Catalog Navigation Tabs */}
      <div className="catalog-tabs">
        <button
          className={`catalog-tab-btn ${activeTab === 'themes' ? 'active' : ''}`}
          onClick={() => setActiveTab('themes')}
        >
          Decoration Themes ({themes.length})
        </button>

        <button
          className={`catalog-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Event Categories ({categories.length})
        </button>

        <button
          className={`catalog-tab-btn ${activeTab === 'addons' ? 'active' : ''}`}
          onClick={() => setActiveTab('addons')}
        >
          Add-on Decor Items ({addons.length})
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <DiyaIcon size={32} color="var(--marigold)" className="animate-spin" />
          <p style={{ marginTop: '0.8rem' }}>Loading catalog items...</p>
        </div>
      ) : (
        <div>
          {/* TAB 1: THEMES LIST */}
          {activeTab === 'themes' && (
            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Theme Name</th>
                      <th>Category</th>
                      <th>Inclusions</th>
                      <th>Signature</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {themes.map((theme) => {
                      const coverImg = Array.isArray(theme.images) && theme.images.length > 0 ? theme.images[0] : '';
                      const features = Array.isArray(theme.features) ? theme.features : [];

                      return (
                        <tr key={theme.id}>
                          <td style={{ width: '80px' }}>
                            {coverImg ? (
                              <img
                                src={coverImg}
                                alt={theme.name}
                                style={{ width: '70px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div style={{ width: '70px', height: '50px', background: 'var(--bg-secondary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ImageIcon size={20} color="var(--text-subtle)" />
                              </div>
                            )}
                          </td>

                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--maroon-deep)' }}>{theme.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {theme.shortDesc || theme.description}
                            </div>
                          </td>

                          <td>
                            <span className="badge badge-maroon">
                              {theme.category ? theme.category.name : 'Unassigned'}
                            </span>
                          </td>

                          <td>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-heading)' }}>
                              {features.length} items
                            </span>
                          </td>

                          <td>
                            {theme.isPopular ? (
                              <span className="badge badge-gold">Signature</span>
                            ) : (
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Standard</span>
                            )}
                          </td>

                          <td>
                            {theme.active ? (
                              <span style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle size={14} /> Active
                              </span>
                            ) : (
                              <span style={{ color: '#DC2626', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <XCircle size={14} /> Hidden
                              </span>
                            )}
                          </td>

                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => {
                                  setEditingTheme(theme);
                                  setThemeModalOpen(true);
                                }}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.35rem 0.65rem' }}
                                title="Edit theme"
                              >
                                <Edit2 size={13} />
                              </button>

                              <button
                                onClick={() => handleDeleteTheme(theme)}
                                className="btn btn-sm"
                                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.35rem 0.65rem' }}
                                title="Delete theme"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES LIST */}
          {activeTab === 'categories' && (
            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>Category Name</th>
                      <th>Slug</th>
                      <th>Themes Count</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td style={{ width: '80px' }}>
                          <img
                            src={cat.coverImage}
                            alt={cat.name}
                            style={{ width: '70px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                        </td>

                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--maroon-deep)' }}>{cat.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {cat.description}
                          </div>
                        </td>

                        <td>
                          <code>/category/{cat.slug}</code>
                        </td>

                        <td>
                          <span className="badge badge-gold">
                            {cat._count?.themes || 0} themes
                          </span>
                        </td>

                        <td>
                          {cat.active ? (
                            <span style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle size={14} /> Active
                            </span>
                          ) : (
                            <span style={{ color: '#DC2626', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <XCircle size={14} /> Hidden
                            </span>
                          )}
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setEditingCategory(cat);
                                setCategoryModalOpen(true);
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.35rem 0.65rem' }}
                            >
                              <Edit2 size={13} />
                            </button>

                            <button
                              onClick={() => handleDeleteCategory(cat)}
                              className="btn btn-sm"
                              style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.35rem 0.65rem' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADDONS LIST */}
          {activeTab === 'addons' && (
            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Unit Type</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addons.map((addon) => (
                      <tr key={addon.id}>
                        <td style={{ width: '80px' }}>
                          <img
                            src={addon.image}
                            alt={addon.name}
                            style={{ width: '60px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                        </td>

                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--maroon-deep)' }}>{addon.name}</div>
                        </td>

                        <td>
                          <span className="badge badge-marigold">{addon.itemCategory}</span>
                        </td>

                        <td>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-heading)' }}>{addon.unitType}</span>
                        </td>

                        <td>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {addon.description}
                          </div>
                        </td>

                        <td>
                          {addon.active ? (
                            <span style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle size={14} /> Active
                            </span>
                          ) : (
                            <span style={{ color: '#DC2626', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <XCircle size={14} /> Hidden
                            </span>
                          )}
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setEditingAddon(addon);
                                setAddonModalOpen(true);
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.35rem 0.65rem' }}
                            >
                              <Edit2 size={13} />
                            </button>

                            <button
                              onClick={() => handleDeleteAddon(addon)}
                              className="btn btn-sm"
                              style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.35rem 0.65rem' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        category={editingCategory}
        onSaved={fetchCatalog}
      />

      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        theme={editingTheme}
        categories={categories}
        onSaved={fetchCatalog}
      />

      <AddonModal
        isOpen={addonModalOpen}
        onClose={() => setAddonModalOpen(false)}
        addon={editingAddon}
        onSaved={fetchCatalog}
      />
    </div>
  );
};
