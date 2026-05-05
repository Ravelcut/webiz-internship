import { api } from './api';

export const recruiterService = {
  authenticate: async (loginRequest) => {
    const { data } = await api.post('/recruiters/auth', loginRequest);
    return data;
  },

  getRecruiters: async () => {
    const { data } = await api.get('/recruiters');
    return data;
  },

  getRecruiterById: async (id) => {
    const { data } = await api.get(`/recruiters/${id}`);
    return data;
  },

  updateRecruiter: async (id, updateRequest) => {
    const { data } = await api.put(`/recruiters/${id}`, updateRequest);
    return data;
  },

  deleteRecruiter: async (id) => {
    const { data } = await api.delete(`/recruiters/${id}`);
    return data;
  }
};
