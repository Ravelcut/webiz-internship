import { TaskPriority, TaskState } from '../constants/enums';
export const tasksData = [
  { id: 1, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "Woody Harrelson", entity: "laptop", dueDate: "16 Jun 2025, 18:00PM", overdue: true, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 2, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "The North Face", entity: "company", dueDate: "16 Jun 2025, 13:00PM", overdue: true, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 3, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "Devon Lane", entity: "user", dueDate: "16 Jun 2025, 18:00PM", overdue: true, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 4, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "Job Name Job Name", entity: "file-user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 5, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.High, priorityColor: "#ED5757", assignee: "The North Face", entity: "company", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 6, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 7, group: "Today", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "Job Name Job Name", entity: "file-user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 8, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 9, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "The North Face", entity: "company", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 10, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.High, priorityColor: "#ED5757", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 11, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.High, priorityColor: "#ED5757", assignee: "Job Name Job Name", entity: "file-user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 12, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "The North Face", entity: "company", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 13, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 14, group: "Tomorrow", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.High, priorityColor: "#ED5757", assignee: "Job Name Job Name", entity: "file-user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 15, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 16, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "The North Face", entity: "company", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 17, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 18, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.High, priorityColor: "#ED5757", assignee: "Job Name Job Name", entity: "file-user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 19, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Medium, priorityColor: "#F19100", assignee: "The North Face", entity: "company", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
  { id: 20, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.High, priorityColor: "#ED5757", assignee: "Devon Lane", entity: "user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.Pending, statusBg: "#EAF2FD", statusText: "#182939" },
  { id: 21, group: "Upcoming", title: "Task title up to 80 characters Task title up to 80 characters Task title up to", comments: 0, priority: TaskPriority.Low, priorityColor: "#08AC16", assignee: "Job Name Job Name", entity: "file-user", dueDate: "Jun 2020, 18:00PM", overdue: false, status: TaskState.InProgress, statusBg: "#F19100", statusText: "#FFFFFF" },
];

export const completedTasks = [
  { id: 'c1', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Medium, priorityColor: '#F19100', assignee: 'Devon Lane', entity: 'user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c2', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.High, priorityColor: '#ED5757', assignee: 'The North Face', entity: 'company', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c3', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Medium, priorityColor: '#F19100', assignee: 'Devon Lane', entity: 'user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c4', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Low, priorityColor: '#08AC16', assignee: 'Job Name Job Name', entity: 'file-user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c5', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Low, priorityColor: '#08AC16', assignee: 'The North Face', entity: 'company', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c6', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Medium, priorityColor: '#F19100', assignee: 'Devon Lane', entity: 'user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c7', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Medium, priorityColor: '#F19100', assignee: 'Job Name Job Name', entity: 'file-user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c8', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.High, priorityColor: '#ED5757', assignee: 'Job Name Job Name', entity: 'file-user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c9', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Medium, priorityColor: '#F19100', assignee: 'Devon Lane', entity: 'user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c10', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Low, priorityColor: '#08AC16', assignee: 'The North Face', entity: 'company', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
  { id: 'c11', title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', comments: 0, priority: TaskPriority.Medium, priorityColor: '#F19100', assignee: 'Devon Lane', entity: 'user', dueDate: 'Jun 2020, 18:00PM', status: TaskState.Done, statusBg: '#08AC16', statusText: '#FFFFFF' },
];

export const boardColumns = [
  {
    id: 'todo',
    title: TaskState.Pending,
    count: 4,
    indicatorColor: '#EAF2FD',
    cards: [
      { id: 'b1', priority: TaskPriority.High, priorityColor: '#ED5757', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'Devon Lane', entity: 'user', dueDate: '13 Jun 2020, 18...', overdue: false, completed: false },
      { id: 'b2', priority: TaskPriority.Medium, priorityColor: '#F19100', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'Job Name Job Name', entity: 'file-user', dueDate: '13 Jun 2020', overdue: true, completed: false },
      { id: 'b3', priority: TaskPriority.High, priorityColor: '#ED5757', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: null, entity: null, dueDate: null, overdue: false, completed: false, isEditing: true },
      { id: 'b4', priority: TaskPriority.Low, priorityColor: '#08AC16', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'Job Name Job Name', entity: 'file-user', dueDate: 'Jun 2020, 18...', overdue: false, completed: false },
    ],
  },
  {
    id: 'inprogress',
    title: TaskState.InProgress,
    count: 2,
    indicatorColor: '#F19100',
    cards: [
      { id: 'b5', priority: TaskPriority.High, priorityColor: '#ED5757', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'Devon Lane', entity: 'user', dueDate: null, overdue: false, completed: false },
      { id: 'b6', priority: TaskPriority.High, priorityColor: '#ED5757', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: null, entity: null, dueDate: null, overdue: false, completed: false },
      { id: 'b7', priority: TaskPriority.Low, priorityColor: '#08AC16', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'Job Name Job Name', entity: 'file-user', dueDate: 'Jun 2020, 18...', overdue: false, completed: false },
    ],
  },
  {
    id: 'completed',
    title: TaskState.Done,
    count: 0,
    indicatorColor: '#08AC16',
    cards: [
      { id: 'b8', priority: TaskPriority.High, priorityColor: '#ED5757', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'The North Face', entity: 'company', dueDate: null, overdue: false, completed: true },
      { id: 'b9', priority: TaskPriority.Medium, priorityColor: '#F19100', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'Devon Lane', entity: 'user', dueDate: null, overdue: false, completed: true },
      { id: 'b10', priority: TaskPriority.Low, priorityColor: '#08AC16', comments: 0, title: 'Task title up to 80 characters Task title up to 80 characters Task title up to', assignee: 'The North Face', entity: 'company', dueDate: '13 Jun 2020, 18...', overdue: false, completed: true },
    ],
  },
];

export const clientsData = [
  { 
    id: 1, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#A855F7',
    name: 'TechSphere Innovations', 
    assignedAM: 'Nino Khutsishvili', 
    representative: 'Nguyen, Shane', 
    projects: 5, 
    status: 'Verified', 
    openPositions: 1, 
    score: 31, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 2, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#EC4899',
    name: 'ByteWave Solutions', 
    assignedAM: 'Henry, Arthur', 
    representative: 'Nino Khutsishvili', 
    projects: 6, 
    status: 'Verified', 
    openPositions: 4, 
    score: 31, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 3, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#6366F1',
    name: 'CloudNest Technologies', 
    assignedAM: 'Miles, Esther', 
    representative: 'Flores, Juanita', 
    projects: 8, 
    status: 'Verified', 
    openPositions: 3, 
    score: 31, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 4, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#EF4444',
    name: 'DataForge Systems', 
    assignedAM: 'Flores, Juanita', 
    representative: 'Henry, Arthur', 
    projects: 3, 
    status: 'Verified', 
    openPositions: 1, 
    score: 23, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 5, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#8B5CF6',
    name: 'NexGen IT Services', 
    assignedAM: 'Cooper, Kristin', 
    representative: 'Cooper, Kristin', 
    projects: 5, 
    status: 'Verified', 
    openPositions: 1, 
    score: 31, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 6, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#1F2937',
    name: 'CyberLink Networks', 
    assignedAM: 'Nguyen, Shane', 
    representative: 'Black, Marvin', 
    projects: 5, 
    status: 'Verified', 
    openPositions: 11, 
    score: 35, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 7, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#F59E0B',
    name: 'QuantumTech Labs', 
    assignedAM: 'Black, Marvin', 
    representative: 'Black, Marvin', 
    projects: 2, 
    status: 'Verified', 
    openPositions: 1, 
    score: 13, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 8, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#4F46E5',
    name: 'PixelPioneers Inc.', 
    assignedAM: 'Henry, Arthur', 
    representative: 'Miles, Esther', 
    projects: 1, 
    status: 'Verified', 
    openPositions: 24, 
    score: 97, 
    unseenMessages: 3,
    isVerified: true
  },
  { 
    id: 9, 
    logo: 'solar:buildings-2-bold', 
    logoColor: '#DB2777',
    name: 'Innovatech Solutions', 
    assignedAM: 'Nguyen, Shane', 
    representative: 'Nguyen, Shane', 
    projects: 5, 
    status: 'Verified', 
    openPositions: 32, 
    score: 10, 
    unseenMessages: 3,
    isVerified: true
  }
];

export const clientStats = {
  companies: 120,
  employees: 33,
  price: '82,980$',
  cost: '12,980$',
  profit: '230,000$'
};

export const dashboardJobs = [
  { id: 1, title: 'Java Developer', recommended: 32, chosen: 12, inProgress: 6, status: 'Open', color: '#08AC16', activity: 'Jan 29, 2024' },
  { id: 2, title: 'Software Engineer', recommended: 24, chosen: 12, inProgress: 6, status: 'Open', color: '#08AC16', activity: 'Jan 29, 2024' },
  { id: 3, title: 'Software Engineer', recommended: 24, chosen: 12, inProgress: 6, status: 'Open', color: '#08AC16', activity: 'Jan 29, 2024', urgent: true },
  { id: 4, title: 'Front End Developer', recommended: 56, chosen: 25, inProgress: 6, status: 'Open', color: '#ED5757', activity: 'Jan 29, 2024' },
];

export const dashboardInterviews = [
  { id: 1, title: 'Meeting Name', job: 'Product Designer', date: '24 April, 2024', time: '16:00 - 17:00', status: 'Scheduled', statusColor: '#08AC16', attendee: 'Amanda gray' },
  { id: 2, title: 'Meeting Name', job: 'Product Designer', date: '24 April, 2024', time: '16:00 - 17:00', status: 'Pending (waiting for candidate)', statusColor: '#F19100', attendees: ['Amanda gray', 'Henry Arthur', 'Miles Esther'] },
  { id: 3, title: 'Meeting Name', job: 'Product Designer', date: '24 April, 2024', time: '16:00 - 17:00', status: 'Scheduled', statusColor: '#08AC16', attendee: 'Amanda gray' },
];

export const teamData = [
  { id: 1, name: 'Luffy D.', role: 'Representative', isLead: true },
  { id: 2, name: 'Mike D.', role: 'Representative' },
];

export const requiredActions = [
  { id: 1, job: 'Java Developer', candidate: 'Nino Khutsishvili', date: 'Jan 29, 2024', description: 'Pending interview feedback', action: 'Contact' },
  { id: 2, job: 'Software Engineer', candidate: 'Henry Arthur', date: 'Jan 30, 2024', description: 'Document review required', action: 'Review' },
];

export const candidatesData = [
  { id: 1, name: 'Giorgi Kheladze', role: 'Software designer', assignedHR: 'Nino Khutsishvili', status: 'Open', statusColor: '#F19100', cv: 'Giorgi_CV.pdf', messageCount: 3, avatar: 'https://i.pravatar.cc/150?u=giorgi' },
  { id: 2, name: 'radros mushaobaa', role: 'Software engineering', assignedHR: null, status: 'Choose Status', cv: null, messageCount: 0 },
  { id: 3, name: 'event test', role: 'Quality assurance', assignedHR: null, status: 'Choose Status', cv: null, messageCount: 0 },
  { id: 4, name: 'nini nn', role: 'Design', assignedHR: null, status: 'Choose Status', cv: null, messageCount: 0 },
  { id: 5, name: 'Martin Test', role: 'Software engineering', assignedHR: null, status: 'Choose Status', cv: null, messageCount: 0 },
  { id: 6, name: 'test country', role: 'Quality assurance', assignedHR: null, status: 'Choose Status', cv: null, messageCount: 0 },
  { id: 7, name: 'Stuart Bloom', role: 'Software engineering', assignedHR: 'Mariami Tsitelas...', status: 'Bananaaaa', statusColor: '#34747C', cv: 'aff-2910_CV.pdf', messageCount: 0 },
  { id: 8, name: 'Flow test Check test', role: 'Quality assurance', assignedHR: null, status: 'Choose Status', cv: 'Homework.docx', messageCount: 2 },
];

export const candidateProfile = {
  id: 1,
  name: 'Giorgi Kheladze',
  role: 'Software designer',
  position: 'Digital Product Designer',
  experience: '21 Years',
  age: 21,
  status: 'Open',
  statusDesc: 'Relevant Approaches',
  accountPrivacy: 'Public account',
  cvPrivacy: 'Fully Visible',
  workHistory: [
    { title: 'Senior Product Designer', company: 'Webiz International', date: 'Jul 2020 - Present', duration: '2 years 3 months' },
    { title: 'UI/UX Designer', company: 'Surwill LLC', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'Graphic Designer', company: 'Adobe', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'UX Designer', company: 'Google', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'Researcher', company: 'Sony Playstation', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'Graphic Designer', company: 'Adobe', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
  ],
  education: [
    { title: 'Computer Science', school: 'Free University', date: '2020 - 2024' },
    { title: 'Computer Science', school: 'Free University', date: '2020 - 2024' },
    { title: 'Computer Science', school: 'Free University', date: '2020 - 2024' },
  ],
  courses: [
    { title: 'Computer Science', school: 'Free University' },
    { title: 'Computer Science', school: 'Free University' },
  ],
  projects: [
    { id: 1, name: 'Citycom', type: 'External', logo: 'solar:buildings-2-bold' },
    { id: 2, name: 'Iternity', type: 'External', logo: 'solar:buildings-2-bold' },
    { id: 3, name: 'Paybox', type: 'External', logo: 'solar:buildings-2-bold' },
  ],
  contact: {
    mobile: '+995 599 20 21 55',
    email: 'usernamc@info.com',
    country: 'Georgia',
    city: 'Tbilisi',
    address: '32 Road Village Str.',
    zip: '3301',
    recruiterEmail: 'Headhunter123@info.com',
    recruiterId: '23',
    whatsapp: '+995 599 20 21 55',
  },
  family: {
    name: 'Laura Palmer',
    phone: '+995 599 12 34 56',
    relation: 'Sister',
    emergency: 'N/A',
  },
  billing: {
    bank: 'TBC BANK',
    country: 'Georgia',
  }
};

export const jobsStats = [
  { label: 'Position Amount', value: 9, icon: 'solar:suitcase-linear', color: '#2F80ED' },
  { label: 'Matched', value: 150, icon: 'solar:users-group-rounded-linear', color: '#F19100' },
  { label: 'Hired', value: 24, icon: 'solar:suitcase-tag-linear', color: '#08AC16' },
  { label: 'Rejected', value: 150, icon: 'solar:bookmark-opened-linear', color: '#ED5757' },
];

export const jobsListData = [
  { id: 32, title: 'Information Architect', seniority: 'Junior', salaryType: '80h / M', salaryRange: '500-1200$', status: 'Hired', statusColor: '#08AC16' },
  { id: 33, title: 'Information Architect', seniority: 'Junior', salaryType: '80h / M', salaryRange: '500-1200$', status: 'Frozen', statusColor: '#ED5757' },
  { id: 34, title: 'Information Architect', seniority: 'Junior', salaryType: '80h / M', salaryRange: '500-1200$', status: 'Hired', statusColor: '#08AC16' },
  { id: 35, title: 'Information Architect', seniority: 'Junior', salaryType: '80h / M', salaryRange: '500-1200$', status: 'Active', statusColor: '#2F80ED' },
  { id: 36, title: 'Information Architect', seniority: 'Junior', salaryType: '80h / M', salaryRange: '500-1200$', status: 'Hired', statusColor: '#08AC16' },
  { id: 37, title: 'Information Architect', seniority: 'Junior', salaryType: '80h / M', salaryRange: '500-1200$', status: 'Active', statusColor: '#2F80ED' },
];

export const jobCandidates = [
  { id: 1, name: 'Amélie Fournier', role: 'Content Strategist', source: 'HR pool', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 3, score: 20, scoreLabel: 'Matching', scoreColor: '#ED5757', stage: 'Recommended', stageColor: '#C97716', stageBg: '#FFF8DF', stageIcon: 'solar:star-fall-linear' },
  { id: 2, name: 'Luisa Meyer', role: 'Product Manager', source: 'HR pool', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 12, score: 50, scoreLabel: 'Matching', scoreColor: '#F19100', stage: 'Interested', stageColor: '#2B911E', stageBg: '#EDFBEC', stageIcon: 'solar:check-circle-linear' },
  { id: 3, name: 'Johanna Müller', role: 'Data Analyst', source: '-', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 4, score: 90, scoreLabel: 'Matching', scoreColor: '#08AC16', stage: 'Recommended', stageColor: '#C97716', stageBg: '#FFF8DF', stageIcon: 'solar:star-fall-linear' },
  { id: 4, name: 'David Roux', role: 'Database Administrator', source: 'HR pool', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 12, score: 50, scoreLabel: 'Matching', scoreColor: '#F19100', stage: 'Recent', stageColor: '#D3220B', stageBg: '#FFF1F0', stageIcon: 'solar:clock-circle-linear' },
  { id: 5, name: 'Franca Coppo', role: 'Marketing Technologist', source: '-', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 2, score: 20, scoreLabel: 'Matching', scoreColor: '#ED5757', stage: 'Interested', stageColor: '#2B911E', stageBg: '#EDFBEC', stageIcon: 'solar:check-circle-linear' },
  { id: 6, name: 'Simon Stanser', role: 'Cloud Architect', source: '-', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 3, score: 90, scoreLabel: 'Matching', scoreColor: '#08AC16', stage: 'Recommended', stageColor: '#C97716', stageBg: '#FFF8DF', stageIcon: 'solar:star-fall-linear' },
  { id: 7, name: 'Petra Steiner', role: 'UX Designer', source: 'HR pool', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 2, score: 20, scoreLabel: 'Matching', scoreColor: '#ED5757', stage: 'Recent', stageColor: '#D3220B', stageBg: '#FFF1F0', stageIcon: 'solar:clock-circle-linear' },
  { id: 8, name: 'Amande Bernard', role: 'Social Media Manager', source: 'HR pool', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 6, score: 50, scoreLabel: 'Matching', scoreColor: '#F19100', stage: 'Recommended', stageColor: '#C97716', stageBg: '#FFF8DF', stageIcon: 'solar:star-fall-linear' },
  { id: 9, name: 'Urs Müller', role: 'Artificial Intelligence (AI) Engineer', source: '-', skills: [{name: 'Figma', y: '4y'}, {name: 'React', y: '2y'}], extraSkills: 5, exp: 3, score: 90, scoreLabel: 'Matching', scoreColor: '#08AC16', stage: 'Interested', stageColor: '#2B911E', stageBg: '#EDFBEC', stageIcon: 'solar:check-circle-linear' },
];

