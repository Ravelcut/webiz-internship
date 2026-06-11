// @ts-nocheck
export const UserType = Object.freeze({
  Talent: 0,
  Employee: 1,
  Company: 2,
  Recruiter: 3
});

export const State = Object.freeze({
  Active: 0,
  Deleted: 1
});

export const CompanyEmployeeCount = Object.freeze({
  Small: 0,
  Medium: 1,
  Large: 2,
  Larger: 3
});

export const TaskState = Object.freeze({
  Pending: 0,
  InProgress: 1,
  PendingReview: 2,
  InReview: 3,
  Done: 4
});

export const TaskPriority = Object.freeze({
  Lowest: 0,
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4
});

export const InvitationStatus = Object.freeze({
  Pending: 0,
  Accepted: 1,
  Rejected: 2
});

export const EnumLabels = Object.freeze({
  TaskState: {
    [TaskState.Pending]: 'To Do',
    [TaskState.InProgress]: 'In Progress',
    [TaskState.PendingReview]: 'Pending Review',
    [TaskState.InReview]: 'In Review',
    [TaskState.Done]: 'Done'
  },
  TaskPriority: {
    [TaskPriority.Lowest]: 'Lowest',
    [TaskPriority.Low]: 'Low Priority',
    [TaskPriority.Medium]: 'Mid Priority',
    [TaskPriority.High]: 'High Priority',
    [TaskPriority.Critical]: 'Critical Priority'
  }
});
