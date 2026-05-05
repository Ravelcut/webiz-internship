import { api } from './api';

export const talentService = {
  authenticate: async (loginRequest) => {
    const { data } = await api.post('/talents/auth', loginRequest);
    return data;
  },

  getTalents: async () => {
    const { data } = await api.get('/talents');
    return data;
  },

  getTalentById: async (id) => {
    const { data } = await api.get(`/talents/${id}`);
    return data;
  },

  updateTalent: async (id, updateRequest) => {
    const { data } = await api.put(`/talents/${id}`, updateRequest);
    return data;
  },

  deleteTalent: async (id) => {
    const { data } = await api.delete(`/talents/${id}`);
    return data;
  }
};
