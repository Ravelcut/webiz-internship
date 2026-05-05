import { api } from './api';

export const companyService = {
  // --- Profile ---
  getProfile: async () => {
    const { data } = await api.get('/company/profile');
    return data;
  },

  updateProfile: async (request) => {
    const { data } = await api.put('/company/profile', request);
    return data;
  },

  deleteProfile: async () => {
    const { data } = await api.delete('/company/profile');
    return data;
  },

  // --- Recruiters ---
  getRecruiters: async () => {
    const { data } = await api.get('/company/recruiters');
    return data;
  },

  inviteRecruiter: async (recruiterId) => {
    const { data } = await api.post(`/company/recruiters/invite/${recruiterId}`);
    return data;
  },

  revokeRecruiterInvitation: async (invitationId) => {
    const { data } = await api.delete(`/company/recruiters/invitations/${invitationId}`);
    return data;
  },

  removeRecruiter: async (recruiterId) => {
    const { data } = await api.delete(`/company/recruiters/${recruiterId}`);
    return data;
  },

  getRecruiterInvitations: async () => {
    const { data } = await api.get('/company/recruiters/invitations');
    return data;
  },

  // --- Talents ---
  getTalents: async () => {
    const { data } = await api.get('/company/talents');
    return data;
  },

  inviteTalent: async (talentId) => {
    const { data } = await api.post(`/company/talents/invite/${talentId}`);
    return data;
  },

  getTalentInvitations: async () => {
    const { data } = await api.get('/company/talents/invitations');
    return data;
  },

  // --- Employees ---
  getEmployees: async () => {
    const { data } = await api.get('/company/employees');
    return data;
  },

  // --- Assignments ---
  getAssignments: async () => {
    const { data } = await api.get('/company/assignments');
    return data;
  },

  createAssignment: async (request) => {
    const { data } = await api.post('/company/assignments', request);
    return data;
  },

  updateAssignment: async (request) => {
    // Note: The controller expects UpdateAssignmentRequest in the body
    const { data } = await api.put('/company/assignments', request);
    return data;
  },

  deleteAssignment: async (assignmentId) => {
    const { data } = await api.delete(`/company/assignments/${assignmentId}`);
    return data;
  }
};
