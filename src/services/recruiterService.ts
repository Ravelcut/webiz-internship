import { api } from './api';

export const recruiterService = {
  getProfile: async () => {
    const { data } = await api.get('/recruiter/profile');
    return data;
  },

  updateProfile: async (request) => {
    const { data } = await api.put('/recruiter/profile', request);
    return data;
  },

  getCompanies: async () => {
    const { data } = await api.get('/recruiter/companies');
    return data;
  },

  getAllCompanies: async () => {
    const { data } = await api.get('/recruiter/companies/all');
    return data;
  },

  getInvitations: async () => {
    const { data } = await api.get('/recruiter/invitations');
    return data;
  },

  acceptInvitation: async (invitationId) => {
    const { data } = await api.post(`/recruiter/invitations/${invitationId}/accept`);
    return data;
  },

  rejectInvitation: async (invitationId) => {
    const { data } = await api.post(`/recruiter/invitations/${invitationId}/reject`);
    return data;
  },

  requestToJoin: async (companyId) => {
    const { data } = await api.post(`/recruiter/join-requests/${companyId}`);
    return data;
  },

  getJoinRequests: async () => {
    const { data } = await api.get('/recruiter/join-requests');
    return data;
  },

  cancelJoinRequest: async (joinRequestId) => {
    const { data } = await api.delete(`/recruiter/join-requests/${joinRequestId}`);
    return data;
  }
};
