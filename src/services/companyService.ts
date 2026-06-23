// @ts-nocheck
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
    await api.delete('/company/profile');
  },

  getCompanyDetails: async (id) => {
    try {
      const [profile, employees, jobs, assignments] = await Promise.all([
        api.get('/company/profile').then(res => res.data).catch(() => null),
        api.get('/company/employees').then(res => res.data).catch(() => []),
        api.get('/company/jobs').then(res => res.data).catch(() => []),
        api.get('/company/assignments').then(res => res.data).catch(() => [])
      ]);
      return {
        ...profile,
        id: profile?.id || id,
        name: profile?.companyName || (profile ? `${profile.name} ${profile.lastname}`.trim() : 'Anonymous Company'),
        employees: (employees || []).map(emp => ({
          id: emp.id,
          name: `${emp.name} ${emp.lastname}`.trim() || 'Anonymous Employee',
          email: emp.email,
          role: 'Employee'
        })),
        jobs: jobs || [],
        assignments: assignments || []
      };
    } catch (error) {
      console.warn('Backend getCompanyDetails failed, using fallback:', error.message);
      return null; // Will fallback to props in UI
    }
  },

  getCompanies: async () => {
    const { data } = await api.get('/talent/companies/all');
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

  getAllTalents: async () => {
    const { data } = await api.get('/company/talents/all');
    return data;
  },

  inviteTalent: async (talentId) => {
    const { data } = await api.post(`/company/talents/invite/${talentId}`);
    return data;
  },

  deleteTalent: async (talentId) => {
    const { data } = await api.delete(`/company/talents/${talentId}`);
    return data;
  },

  revokeTalentInvitation: async (invitationId) => {
    const { data } = await api.delete(`/company/talents/invitations/${invitationId}`);
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
  },

  // --- Talent Join Requests (Company manages incoming requests) ---
  getTalentJoinRequests: async () => {
    const { data } = await api.get('/company/talent-join-requests');
    return data;
  },

  approveTalentJoinRequest: async (joinRequestId) => {
    const { data } = await api.post(`/company/talent-join-requests/${joinRequestId}/approve`);
    return data;
  },

  rejectTalentJoinRequest: async (joinRequestId) => {
    const { data } = await api.post(`/company/talent-join-requests/${joinRequestId}/reject`);
    return data;
  },

  // --- Recruiter Join Requests (Company manages incoming requests) ---
  getRecruiterJoinRequests: async () => {
    const { data } = await api.get('/company/recruiter-join-requests');
    return data;
  },

  approveRecruiterJoinRequest: async (joinRequestId) => {
    const { data } = await api.post(`/company/recruiter-join-requests/${joinRequestId}/approve`);
    return data;
  },

  rejectRecruiterJoinRequest: async (joinRequestId) => {
    const { data } = await api.post(`/company/recruiter-join-requests/${joinRequestId}/reject`);
    return data;
  }
};

