import { request } from './api';

export const authService = {
  login: async (email, password) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      localStorage.setItem('utsav_admin_token', res.token);
      localStorage.setItem('utsav_admin_user', JSON.stringify(res.admin));
    }
    return res;
  },

  getCurrentUser: async () => {
    return await request('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('utsav_admin_token');
    localStorage.removeItem('utsav_admin_user');
  },

  getStoredToken: () => {
    return localStorage.getItem('utsav_admin_token');
  },

  getStoredUser: () => {
    const user = localStorage.getItem('utsav_admin_user');
    return user ? JSON.parse(user) : null;
  },
};
