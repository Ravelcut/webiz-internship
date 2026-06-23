// @ts-nocheck
//
// DEPRECATED: This service is no longer needed.
//
// Invitation management has been consolidated into the actual entity services:
//   - Company-side invitation management → companyService.ts
//     (inviteRecruiter, revokeRecruiterInvitation, getRecruiterInvitations,
//      inviteTalent, getTalentInvitations)
//   - Talent-side invitation handling → talentService.ts
//     (getInvitations, acceptInvitation, rejectInvitation)
//
// This file is kept as a stub to avoid breaking existing imports.
// Please migrate any callers to use companyService or talentService instead.
//

import { companyService } from './companyService';
import { talentService } from './talentService';

export const invitationService = {
  // --- Recruiter Invitations (delegates to companyService) ---
  inviteRecruiter: companyService.inviteRecruiter,
  getRecruiterInvitations: companyService.getRecruiterInvitations,
  deleteRecruiterInvitation: companyService.revokeRecruiterInvitation,

  // --- Talent Invitations (delegates to companyService) ---
  inviteTalent: companyService.inviteTalent,
  getTalentInvitations: companyService.getTalentInvitations,

  // --- Talent-side invitation handling (delegates to talentService) ---
  acceptTalentInvitation: talentService.acceptInvitation,
  rejectTalentInvitation: talentService.rejectInvitation,
};
