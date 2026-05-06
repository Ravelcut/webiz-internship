// @ts-nocheck
import { api } from './api';

export const invitationService = {
  // --- Recruiter Invitations ---
  inviteRecruiter: async (recruiterId) => {
    const { data } = await api.post('/invitations/recruiters', { recruiterId });
    return data;
  },

  getRecruiterInvitations: async () => {
    const { data } = await api.get('/invitations/recruiters');
    return data;
  },

  updateRecruiterInvitation: async (invitationId, status) => {
    const { data } = await api.put(`/invitations/recruiters/${invitationId}`, { status });
    return data;
  },

  deleteRecruiterInvitation: async (invitationId) => {
    const { data } = await api.delete(`/invitations/recruiters/${invitationId}`);
    return data;
  },

  // --- Talent Invitations ---
  inviteTalent: async (talentId) => {
    const { data } = await api.post('/invitations/talents', { talentId });
    return data;
  },

  getTalentInvitations: async () => {
    const { data } = await api.get('/invitations/talents');
    return data;
  },

  updateTalentInvitation: async (invitationId, status) => {
    const { data } = await api.put(`/invitations/talents/${invitationId}`, { status });
    return data;
  },

  deleteTalentInvitation: async (invitationId) => {
    const { data } = await api.delete(`/invitations/talents/${invitationId}`);
    return data;
  }
};
