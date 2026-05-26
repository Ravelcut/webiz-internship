// @ts-nocheck
//
// STUB: RecruiterController does not exist on the backend yet.
//
// Recruiter management from the company side is handled via companyService.ts:
//   - companyService.getRecruiters()
//   - companyService.inviteRecruiter(recruiterId)
//   - companyService.removeRecruiter(recruiterId)
//   - companyService.getRecruiterInvitations()
//   - companyService.revokeRecruiterInvitation(invitationId)
//
// When a RecruiterController is built on the backend (for recruiter self-service),
// this file should be updated to match those endpoints.
//

import { api } from './api';

export const recruiterService = {
  // Placeholder methods — will be implemented when backend adds RecruiterController
  // These will likely follow the same pattern as talentService.ts

  getProfile: async () => {
    // TODO: await api.get('/recruiter/profile');
    throw new Error('RecruiterController not yet implemented on backend');
  },

  updateProfile: async (request) => {
    // TODO: await api.put('/recruiter/profile', request);
    throw new Error('RecruiterController not yet implemented on backend');
  },

  getCompanies: async () => {
    // TODO: await api.get('/recruiter/companies');
    throw new Error('RecruiterController not yet implemented on backend');
  },

  getInvitations: async () => {
    // TODO: await api.get('/recruiter/invitations');
    throw new Error('RecruiterController not yet implemented on backend');
  },

  acceptInvitation: async (invitationId) => {
    // TODO: await api.post(`/recruiter/invitations/${invitationId}/accept`);
    throw new Error('RecruiterController not yet implemented on backend');
  },

  rejectInvitation: async (invitationId) => {
    // TODO: await api.post(`/recruiter/invitations/${invitationId}/reject`);
    throw new Error('RecruiterController not yet implemented on backend');
  },

  requestToJoin: async (companyId) => {
    // TODO: await api.post(`/recruiter/join-requests/${companyId}`);
    throw new Error('RecruiterController not yet implemented on backend');
  },

  getJoinRequests: async () => {
    // TODO: await api.get('/recruiter/join-requests');
    throw new Error('RecruiterController not yet implemented on backend');
  },

  cancelJoinRequest: async (joinRequestId) => {
    // TODO: await api.delete(`/recruiter/join-requests/${joinRequestId}`);
    throw new Error('RecruiterController not yet implemented on backend');
  }
};
