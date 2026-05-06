// @ts-nocheck
import { api } from './api';

export const employeeService = {
  authenticate: async (loginRequest) => {
    const { data } = await api.post('/employees/auth', loginRequest);
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get('/employees/profile');
    return data;
  },

  updateProfile: async (updateRequest) => {
    const { data } = await api.put('/employees/profile', updateRequest);
    return data;
  }
};
