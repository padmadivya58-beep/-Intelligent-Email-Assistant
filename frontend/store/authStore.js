import { create } from 'zustand';
import api from '../lib/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initAuth: async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('email_assistant_token');
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      const res = await api.get('/auth/me');
      if (res.success && res.data) {
        set({ user: res.data, token, isAuthenticated: true, isLoading: false, error: null });
      } else {
        localStorage.removeItem('email_assistant_token');
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } catch (err) {
      localStorage.removeItem('email_assistant_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: err.message || 'Session expired' });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.success && res.data) {
        localStorage.setItem('email_assistant_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isAuthenticated: true, isLoading: false, error: null });
        return { success: true };
      }
      set({ isLoading: false, error: 'Login failed' });
      return { success: false };
    } catch (err) {
      const message = err?.error?.message || 'Failed to login';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.success && res.data) {
        localStorage.setItem('email_assistant_token', res.data.token);
        set({ user: res.data.user, token: res.data.token, isAuthenticated: true, isLoading: false, error: null });
        return { success: true };
      }
      set({ isLoading: false, error: 'Registration failed' });
      return { success: false };
    } catch (err) {
      const message = err?.error?.message || 'Failed to register';
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('email_assistant_token');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
  },
}));
