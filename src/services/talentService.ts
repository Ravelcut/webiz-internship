// @ts-nocheck
import { api } from './api';

export const talentService = {
  // --- Profile ---
  getProfile: async () => {
    const { data } = await api.get('/talent/profile');
    return data;
  },

  updateProfile: async (request) => {
    const { data } = await api.put('/talent/profile', request);
    return data;
  },

  deleteProfile: async () => {
    await api.delete('/talent/profile');
  },

  // --- Companies ---
  getMyCompanies: async () => {
    const { data } = await api.get('/talent/companies');
    return data;
  },

  getAllCompanies: async () => {
    const { data } = await api.get('/talent/companies/all');
    return data;
  },

  // --- Invitations ---
  getInvitations: async () => {
    const { data } = await api.get('/talent/invitations');
    return data;
  },

  acceptInvitation: async (invitationId) => {
    const { data } = await api.post(`/talent/invitations/${invitationId}/accept`);
    return data;
  },

  rejectInvitation: async (invitationId) => {
    const { data } = await api.post(`/talent/invitations/${invitationId}/reject`);
    return data;
  },

  // --- Join Requests ---
  requestToJoin: async (companyId) => {
    const { data } = await api.post(`/talent/join-requests/${companyId}`);
    return data;
  },

  cancelJoinRequest: async (joinRequestId) => {
    await api.delete(`/talent/join-requests/${joinRequestId}`);
  },

  getJoinRequests: async () => {
    const { data } = await api.get('/talent/join-requests');
    return data;
  },

  // --- Assignments ---
  getAssignments: async () => {
    const { data } = await api.get('/talent/assignments');
    return data;
  },

  updateAssignmentState: async (request) => {
    // request: { assignmentId: number, taskState: TaskState }
    const { data } = await api.put('/talent/assignments/state', request);
    return data;
  }
};
