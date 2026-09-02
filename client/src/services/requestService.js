import { request } from './api';

export const requestService = {
  // Public: Submit enquiry
  submitRequest: async (formData) => {
    return await request('/requests', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  // Admin: Get all requests with filters
  getRequests: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await request(`/requests${queryString}`);
  },

  // Admin: Get single request details
  getRequestById: async (id) => {
    return await request(`/requests/${id}`);
  },

  // Admin: Update status & internal notes
  updateRequest: async (id, data) => {
    return await request(`/requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Admin: Delete request
  deleteRequest: async (id) => {
    return await request(`/requests/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin: Dashboard stats
  getDashboardStats: async () => {
    return await request('/stats/dashboard');
  },
};
