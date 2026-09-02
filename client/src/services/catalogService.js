import { request } from './api';

export const catalogService = {
  // Categories
  getCategories: async (includeInactive = false) => {
    return await request(`/categories${includeInactive ? '?includeInactive=true' : ''}`);
  },

  getCategoryBySlug: async (slug) => {
    return await request(`/categories/${slug}`);
  },

  createCategory: async (data) => {
    return await request('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCategory: async (id, data) => {
    return await request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteCategory: async (id) => {
    return await request(`/categories/${id}`, {
      method: 'DELETE',
    });
  },

  // Themes
  getThemes: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append('categoryId', params.categoryId);
    if (params.categorySlug) query.append('categorySlug', params.categorySlug);
    if (params.popularOnly) query.append('popularOnly', 'true');
    if (params.includeInactive) query.append('includeInactive', 'true');
    if (params.search) query.append('search', params.search);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await request(`/themes${queryString}`);
  },

  getThemeById: async (idOrSlug) => {
    return await request(`/themes/${idOrSlug}`);
  },

  createTheme: async (data) => {
    return await request('/themes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateTheme: async (id, data) => {
    return await request(`/themes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteTheme: async (id) => {
    return await request(`/themes/${id}`, {
      method: 'DELETE',
    });
  },

  // Addons
  getAddons: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.includeInactive) query.append('includeInactive', 'true');

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await request(`/addons${queryString}`);
  },

  createAddon: async (data) => {
    return await request('/addons', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateAddon: async (id, data) => {
    return await request(`/addons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteAddon: async (id) => {
    return await request(`/addons/${id}`, {
      method: 'DELETE',
    });
  },
};
