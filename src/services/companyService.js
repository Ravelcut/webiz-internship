import { api } from './api';

export const companyService = {
  // --- Auth ---
  authenticate: async (loginRequest) => {
    const { data } = await api.post('/companies/auth', loginRequest);
    return data;
  },

  getCompanies: async () => {
    const { data } = await api.get('/companies');
    return data;
  },

  getCompanyDetails: async (id) => {
    const { data } = await api.get(`/companies/${id}/details`);
    return data;
  },

  // --- Profile ---
  getProfile: async () => {
    const { data } = await api.get('/companies/profile');
    return data;
  },
  
  updateProfile: async (updateRequest) => {
    const { data } = await api.put('/companies/profile', updateRequest);
    return data;
  },
  
  deleteProfile: async () => {
    const { data } = await api.delete('/companies/profile');
    return data;
  },

  // --- Recruiters ---
  inviteRecruiter: async (recruiterId) => {
    const { data } = await api.post('/companies/recruiters/invite', { recruiterId });
    return data;
  },
  
  revokeRecruiterInvitation: async (invitationId) => {
    const { data } = await api.delete(`/companies/recruiters/invitations/${invitationId}`);
    return data;
  },
  
  removeRecruiter: async (recruiterId) => {
    const { data } = await api.delete(`/companies/recruiters/${recruiterId}`);
    return data;
  },
  
  getRecruiters: async () => {
    const { data } = await api.get('/companies/recruiters');
    return data;
  },
  
  getRecruiterInvitations: async () => {
    const { data } = await api.get('/companies/recruiters/invitations');
    return data;
  },

  // --- Talents ---
  inviteTalent: async (talentId) => {
    const { data } = await api.post('/companies/talents/invite', { talentId });
    return data;
  },
  
  getTalents: async () => {
    const { data } = await api.get('/companies/talents');
    return data;
  },
  
  getTalentInvitations: async () => {
    const { data } = await api.get('/companies/talents/invitations');
    return data;
  },

  // --- Employees ---
  getEmployees: async () => {
    const { data } = await api.get('/companies/employees');
    return data;
  },

  // --- Assignments ---
  createAssignment: async (request) => {
    const { data } = await api.post('/companies/assignments', request);
    return data;
  },
  
  updateAssignment: async (assignmentId, request) => {
    const { data } = await api.put(`/companies/assignments/${assignmentId}`, request);
    return data;
  },
  
  deleteAssignment: async (assignmentId) => {
    const { data } = await api.delete(`/companies/assignments/${assignmentId}`);
    return data;
  },
  
  getAssignments: async () => {
    const { data } = await api.get('/companies/assignments');
    return data;
  },

  updateAssignmentsRange: async (assignments) => {
    const { data } = await api.put('/companies/assignments/range', assignments);
    return data;
  }
};
