"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import TopHeader from '../components/layout/TopHeader/TopHeader';
import ContentHeader from '../components/layout/ContentHeader/ContentHeader';
import FilterBar from '../components/layout/FilterBar/FilterBar';
import TaskListView from '../components/planner/TaskListView/TaskListView';
import KanbanBoard from '../components/board/KanbanBoard/KanbanBoard';
import TaskTable from '../components/table/TaskTable/TaskTable';
import NewTaskModal from '../components/shared/NewTaskModal/NewTaskModal';
import ClientsView from '../components/clients/ClientsView/ClientsView';
import CompanyDetail from '../components/clients/CompanyDetail/CompanyDetail';
import CandidatesView from '../components/candidates/CandidatesView/CandidatesView';
import CandidateDetail from '../components/candidates/CandidateDetail/CandidateDetail';
import JobsView from '../components/jobs/JobsView';
import JobDetail from '../components/jobs/JobDetail/JobDetail';
import { tasksData, boardColumns, clientsData, candidatesData } from '../data/mockData';
import { TaskPriority, TaskState } from '../constants/enums';
import { Icon } from '@iconify/react';
import { companyService } from '../services/companyService';
import { authService } from '../services/authService';
import { talentService } from '../services/talentService';
import { recruiterService } from '../services/recruiterService';
import Login from '../components/auth/Login/Login';
import TaskCommentsPanel from '../components/shared/TaskCommentsPanel/TaskCommentsPanel';
import ProfileSettingsModal from '../components/shared/ProfileSettingsModal/ProfileSettingsModal';
import InvitationsManager from '../components/recruiter/InvitationsManager/InvitationsManager';

const PRIORITY_COLORS = {
  0: '#2F80ED', // Lowest
  1: '#08AC16', // Low
  2: '#F19100', // Medium
  3: '#ED5757', // High
  4: '#D3220B', // Critical
};

const STATUS_STYLES = {
  0: { bg: '#EAF2FD', text: '#182939' }, // Pending / To Do
  1: { bg: '#F19100', text: '#FFFFFF' }, // InProgress
  2: { bg: '#F5E6FF', text: '#7B2CB5' }, // PendingReview
  3: { bg: '#E0F2FE', text: '#0369A1' }, // InReview
  4: { bg: '#08AC16', text: '#FFFFFF' }, // Done
};

const formatBackendDate = (dateStr) => {
  if (!dateStr) return 'No due date';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'No due date';
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch (e) {
    return 'No due date';
  }
};

const isOverdue = (dateStr) => {
  if (!dateStr) return false;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    d.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    return d < now;
  } catch (e) {
    return false;
  }
};

const convertToBackendDate = (dateStr) => {
  if (!dateStr || dateStr === 'No due date') return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch (e) {
    return null;
  }
};

const mapBackendAssignmentToTask = (assignment, talents = [], employees = []) => {
  if (!assignment) return null;
  
  let assigneeName = 'Unassigned';
  let entityType = 'user';
  
  if (assignment.talent) {
    assigneeName = `${assignment.talent.name || ''} ${assignment.talent.lastname || ''}`.trim() || 'Anonymous Talent';
    entityType = 'user';
  } else if (assignment.employee) {
    assigneeName = `${assignment.employee.name || ''} ${assignment.employee.lastname || ''}`.trim() || 'Anonymous Employee';
    entityType = 'laptop';
  } else if (assignment.talentId) {
    const tId = Number(assignment.talentId);
    const talent = talents.find(t => t.id === tId);
    if (talent) {
      assigneeName = `${talent.name || ''} ${talent.lastname || ''}`.trim() || 'Anonymous Talent';
      entityType = 'user';
    }
  } else if (assignment.employeeId) {
    const eId = Number(assignment.employeeId);
    const employee = employees.find(e => e.id === eId);
    if (employee) {
      assigneeName = `${employee.name || ''} ${employee.lastname || ''}`.trim() || 'Anonymous Employee';
      entityType = 'laptop';
    }
  }
  
  const status = assignment.taskState !== undefined ? assignment.taskState : (assignment.status !== undefined ? assignment.status : 0);
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES[0];
  const priority = assignment.priority !== undefined ? assignment.priority : 1;
  const priorityColor = PRIORITY_COLORS[priority] || '#F19100';

  return {
    id: assignment.id,
    title: assignment.title || '',
    description: assignment.description || '',
    group: 'Today',
    comments: assignment.comments || 0,
    priority: priority,
    priorityColor: priorityColor,
    assignee: assigneeName,
    entity: entityType,
    dueDate: formatBackendDate(assignment.dueDate),
    overdue: isOverdue(assignment.dueDate),
    status: status,
    statusBg: statusStyle.bg,
    statusText: statusStyle.text,
    completed: status === 4,
    raw: assignment,
  };
};

function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [activeModule, setActiveModule] = useState('dashboard'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialTaskEntity, setInitialTaskEntity] = useState(null);
  const [selectedTaskForComments, setSelectedTaskForComments] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleSelectTask = (task) => {
    setTaskToEdit(task);
    setIsNewTaskOpen(true);
  };

  const [boardData, setBoardData] = useState(() => boardColumns.map(col => ({ ...col, cards: [], count: 0 })));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [listData, setListData] = useState([]);
  const [talentsList, setTalentsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('taskmanager_theme', newTheme);
  };

  // Compute completed tasks from live state
  const completedTasks = listData.filter(task => task.completed || task.status === TaskState.Done);

  // Safely restore user session and states on client-side mount (solves Next.js SSR hydration blocks)
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('taskmanager_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const logged = localStorage.getItem('isLoggedIn') === 'true';
    if (logged) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem('userRole'));
      
      const savedUser = localStorage.getItem('userData');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      
      const savedList = localStorage.getItem('taskmanager_list_tasks');
      if (savedList) setListData(JSON.parse(savedList));
      
      const savedBoard = localStorage.getItem('taskmanager_board_columns');
      if (savedBoard) setBoardData(JSON.parse(savedBoard));
      
      const cachedProfile = localStorage.getItem('taskmanager_company_profile');
      if (cachedProfile) setProfile(JSON.parse(cachedProfile));
    }
  }, []);

  // Handle automatic logout on unauthorized requests
  useEffect(() => {
    const handleUnauthorized = () => {
      handleLogout();
    };
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, []);

  // Persist to local storage
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (!isLoggedIn || !userRole) return;
    setIsLoading(true);
    try {
      let assignments = [];
      let talents = [];
      let employees = [];
      let profileData = null;

      if (userRole === 'company') {
        [assignments, talents, employees, profileData] = await Promise.all([
          companyService.getAssignments(),
          companyService.getTalents().catch(() => []),
          companyService.getEmployees().catch(() => []),
          companyService.getProfile().catch(() => null)
        ]);
      } else if (userRole === 'talent') {
        [assignments, profileData] = await Promise.all([
          talentService.getAssignments().catch(() => []),
          talentService.getProfile().catch(() => null)
        ]);
      } else if (userRole === 'recruiter') {
        profileData = await recruiterService.getProfile().catch(() => null);
      }
      
      const mappedAssignments = (assignments || []).map(a => mapBackendAssignmentToTask(a, talents, employees)).filter(Boolean);
      setListData(mappedAssignments);
      setTalentsList(talents);
      setEmployeesList(employees);
      setProfile(profileData);
      if (profileData) {
        localStorage.setItem('taskmanager_company_profile', JSON.stringify(profileData));
      }
      
      // Update board data based on fetched assignments
      const newBoardData = boardColumns.map(col => {
        const colTasks = mappedAssignments.filter(t => t.status === col.title);
        return {
          ...col,
          cards: colTasks,
          count: colTasks.length
        };
      });
      setBoardData(newBoardData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !userRole) return;
    fetchData();
  }, [isLoggedIn, userRole]);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('taskmanager_board_columns', JSON.stringify(boardData));
  }, [boardData]);

  useEffect(() => {
    localStorage.setItem('taskmanager_list_tasks', JSON.stringify(listData));
  }, [listData]);

  const handleCreateTask = async (taskData) => {
    if (userRole === 'talent') return; // Talents cannot create tasks

    try {
      const createdTask = await companyService.createAssignment({
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority,
        talentId: taskData.talentId,
        employeeId: taskData.employeeId,
        dueDate: taskData.dueDate || null
      });

      const newTask = mapBackendAssignmentToTask(createdTask, talentsList, employeesList);

      // Add to listData
      setListData([newTask, ...listData]);
      
      // Add to boardData
      const newBoardData = [...boardData];
      const colIndex = newBoardData.findIndex(col => col.title === newTask.status);
      if (colIndex !== -1) {
        newBoardData[colIndex] = {
          ...newBoardData[colIndex],
          cards: [newTask, ...newBoardData[colIndex].cards],
          count: (newBoardData[colIndex].cards?.length || 0) + 1
        };
      }
      setBoardData(newBoardData);
      setIsNewTaskOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    const statusStyles = {
      [TaskState.Pending]: { bg: '#EAF2FD', text: '#182939' },
      [TaskState.InProgress]: { bg: '#F19100', text: '#FFFFFF' },
      [TaskState.PendingReview]: { bg: '#F5E6FF', text: '#7B2CB5' },
      [TaskState.InReview]: { bg: '#E0F2FE', text: '#0369A1' },
      [TaskState.Done]: { bg: '#08AC16', text: '#FFFFFF' },
    };

    const finalUpdates = { ...updates };
    if (updates.status !== undefined) {
      const style = statusStyles[updates.status] || statusStyles[TaskState.Pending];
      finalUpdates.statusBg = style.bg;
      finalUpdates.statusText = style.text;
      finalUpdates.completed = updates.status === TaskState.Done;
    }

    // Optimistic update — always update local state immediately
    setListData(prev => prev.map(t => t.id === taskId ? { ...t, ...finalUpdates } : t));

    if (finalUpdates.status !== undefined || finalUpdates.priority !== undefined) {
      setBoardData(prev => {
        let cardToMove = null;
        
        // Step 1: Remove from old column if status is changing, or update in place
        const updatedColumns = prev.map(col => {
          const hasCard = col.cards?.some(t => t.id === taskId);
          
          if (hasCard && finalUpdates.status !== undefined && col.title !== finalUpdates.status) {
            // Card needs to move. Extract it.
            const card = col.cards.find(t => t.id === taskId);
            cardToMove = { ...card, ...finalUpdates };
            const remainingCards = col.cards.filter(t => t.id !== taskId);
            return {
              ...col,
              cards: remainingCards,
              count: remainingCards.length
            };
          }
          
          // Status not changing or correct column, just update in place
          const updatedCards = col.cards?.map(t => t.id === taskId ? { ...t, ...finalUpdates } : t) || [];
          return {
            ...col,
            cards: updatedCards,
            count: updatedCards.length
          };
        });

        // Step 2: Add to new column if it was extracted
        if (cardToMove && finalUpdates.status !== undefined) {
          return updatedColumns.map(col => {
            if (col.title === finalUpdates.status) {
              const newCards = [cardToMove, ...(col.cards || [])];
              return {
                ...col,
                cards: newCards,
                count: newCards.length
              };
            }
            return col;
          });
        }

        return updatedColumns;
      });
    }

    // Fire API call in background (don't block UI)
    try {
      if (userRole === 'company') {
        const currentTask = listData.find(t => t.id === taskId);
        if (currentTask) {
          const updatedTask = { ...currentTask, ...finalUpdates };
          const payload = {
            assignmentId: taskId,
            title: updatedTask.title,
            description: updatedTask.description || "",
            priority: updatedTask.priority,
            taskState: updatedTask.status,
            dueDate: convertToBackendDate(updatedTask.dueDate)
          };
          await companyService.updateAssignment(payload);
        }
      } else if (userRole === 'talent' && finalUpdates.status !== undefined) {
        await talentService.updateAssignmentState({ assignmentId: taskId, taskState: finalUpdates.status });
      }
    } catch (error) {
      console.warn('Backend update failed (offline mode):', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (userRole === 'talent') return; // Talents cannot delete tasks

    // Optimistically remove from listData
    setListData(prev => prev.filter(t => t.id !== taskId));

    // Also remove from boardData
    setBoardData(prev => prev.map(col => {
      const remainingCards = col.cards?.filter(t => t.id !== taskId) || [];
      return { ...col, cards: remainingCards, count: remainingCards.length };
    }));

    try {
      if (userRole === 'company') {
        await companyService.deleteAssignment(taskId);
      }
    } catch (error) {
      console.warn('Backend delete failed:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Backend logout failed or already logged out');
    }
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('taskmanager_list_tasks');
    localStorage.removeItem('taskmanager_board_columns');
    localStorage.removeItem('taskmanager_company_profile');
    
    // Clear local state variables to guarantee no cross-profile data leakage
    setListData([]);
    setBoardData(boardColumns.map(col => ({ ...col, cards: [], count: 0 })));
    setTalentsList([]);
    setEmployeesList([]);
    setProfile(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setUserRole(localStorage.getItem('userRole'));
  };

  const handleOpenComments = (task) => {
    setSelectedTaskForComments(task);
    setIsCommentsOpen(true);
  };

  if (!isMounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0D1117' }}>
        <div style={{ color: '#2F80ED', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Loading Task Manager...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-shell">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onLogout={handleLogout}
        userRole={userRole}
        theme={theme}
        onThemeToggle={toggleTheme}
        onSettings={() => setIsSettingsOpen(true)}
      />
      
      <div className="main-area">
        <TopHeader 
          onMenuClick={() => setIsSidebarOpen(true)} 
          activeModule={activeModule}
          profile={profile}
          userRole={userRole}
          onRefreshData={fetchData}
        />

        <div className="content-area">
          {activeModule === 'invitations' && userRole === 'recruiter' ? (
            <InvitationsManager />
          ) : activeModule === 'companies' ? (
            selectedCompany ? (
              <CompanyDetail 
                company={selectedCompany} 
                onBack={() => setSelectedCompany(null)}
                onNewTask={(entity) => {
                  setInitialTaskEntity(entity);
                  setIsNewTaskOpen(true);
                }}
              />
            ) : (
              <ClientsView 
                onNewTask={(entity) => {
                  setInitialTaskEntity(entity);
                  setIsNewTaskOpen(true);
                }} 
                onSelectCompany={setSelectedCompany}
              />
            )
          ) : activeModule === 'people' ? (
            selectedCandidate ? (
              <CandidateDetail 
                candidate={selectedCandidate} 
                onBack={() => setSelectedCandidate(null)}
                onNewTask={(entity) => {
                  setInitialTaskEntity(entity);
                  setIsNewTaskOpen(true);
                }}
              />
            ) : (
              <CandidatesView 
                onNewTask={(entity) => {
                  setInitialTaskEntity(entity);
                  setIsNewTaskOpen(true);
                }}
                onSelectCandidate={setSelectedCandidate}
              />
            )
          ) : activeModule === 'jobs' ? (
            selectedJob ? (
              <JobDetail 
                job={selectedJob} 
                onBack={() => setSelectedJob(null)} 
              />
            ) : (
              <JobsView listData={listData} onJobClick={setSelectedJob} />
            )
          ) : (
            <div className="content-card">
              <ContentHeader
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onNewTask={() => setIsNewTaskOpen(true)}
                onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
                isFilterOpen={isFilterOpen}
              />
              
              <FilterBar 
                isVisible={isFilterOpen}
                onClearAll={() => console.log('Clear All')}
                onSave={() => console.log('Save Filters')}
              />
              
              <div className="card-body">
                {activeTab === 'planner' && (
                  <div className="list-scroll">
                    <TaskListView 
                      tasks={listData} 
                      onNewTask={() => setIsNewTaskOpen(true)}
                      onOpenComments={handleOpenComments}
                      onUpdateTask={handleUpdateTask}
                      onSelectTask={handleSelectTask}
                    />
                  </div>
                )}

                {activeTab === 'board' && (
                  <div className="board-scroll">
                    <KanbanBoard 
                      columns={boardData} 
                      setColumns={setBoardData}
                      onNewTask={() => setIsNewTaskOpen(true)}
                      onOpenComments={handleOpenComments}
                      onUpdateTask={handleUpdateTask}
                      onSelectTask={handleSelectTask}
                    />
                  </div>
                )}

                {activeTab === 'table' && (
                  <div className="list-scroll">
                    <TaskTable 
                      tasks={listData} 
                      variant="default"
                      onNewTask={() => setIsNewTaskOpen(true)}
                      onOpenComments={handleOpenComments}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={handleDeleteTask}
                      onSelectTask={handleSelectTask}
                    />
                  </div>
                )}

                {activeTab === 'completed' && (
                  <div className="list-scroll">
                    <TaskTable 
                      tasks={completedTasks} 
                      variant="completed" 
                      onNewTask={() => setIsNewTaskOpen(true)}
                      onOpenComments={handleOpenComments}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={handleDeleteTask}
                      onSelectTask={handleSelectTask}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => {
          setIsNewTaskOpen(false);
          setInitialTaskEntity(null);
          setTaskToEdit(null);
        }}
        onCreateTask={handleCreateTask}
        initialEntity={initialTaskEntity}
        talents={talentsList}
        employees={employeesList}
        taskToEdit={taskToEdit}
        onUpdateTask={handleUpdateTask}
      />

      {isCommentsOpen && (
        <TaskCommentsPanel 
          task={selectedTaskForComments} 
          onClose={() => setIsCommentsOpen(false)} 
          onUpdateTask={handleUpdateTask}
        />
      )}

      <ProfileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userRole={userRole}
        currentUser={currentUser}
        onProfileUpdate={(updated) => {
          setProfile(updated);
          if (updated) localStorage.setItem('taskmanager_company_profile', JSON.stringify(updated));
        }}
      />
    </div>
  );
}

const DynamicApp = dynamic(() => Promise.resolve(App), { ssr: false });
export default DynamicApp;
