import { api } from './api';

export const commentService = {
  getComments: async (assignmentId: number) => {
    const { data } = await api.get(`/comments/assignment/${assignmentId}`);
    return data;
  },

  createComment: async (assignmentId: number, text: string) => {
    const { data } = await api.post('/comments', { assignmentId, text });
    return data;
  }
};
