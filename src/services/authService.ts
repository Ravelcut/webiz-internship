// @ts-nocheck
import { api } from './api';

export const authService = {
  // Company login
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  // Talent login
  loginTalent: async (email, password) => {
    const { data } = await api.post('/auth/login/talent', { email, password });
    return data;
  },

  // Recruiter login
  loginRecruiter: async (email, password) => {
    const { data } = await api.post('/auth/login/recruiter', { email, password });
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  }
};
