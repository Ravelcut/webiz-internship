// @ts-nocheck
import { api } from './api';

export const jobService = {
  getCompanyJobs: async () => {
    const { data } = await api.get('/company/jobs');
    return data;
  },

  getTalentJobs: async () => {
    const { data } = await api.get('/talent/jobs/all');
    return data;
  },

  getRecruiterJobs: async () => {
    const { data } = await api.get('/recruiter/jobs/all');
    return data;
  },

  createJob: async (request) => {
    const { data } = await api.post('/company/jobs', request);
    return data;
  },

  updateJob: async (request) => {
    const { data } = await api.put('/company/jobs', request);
    return data;
  },

  deleteJob: async (jobId) => {
    const { data } = await api.delete(`/company/jobs/${jobId}`);
    return data;
  }
};
