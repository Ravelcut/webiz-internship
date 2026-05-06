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
import Login from '../components/auth/Login/Login';


import TaskCommentsPanel from '../components/shared/TaskCommentsPanel/TaskCommentsPanel';

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

  const [boardData, setBoardData] = useState(() => boardColumns.map(col => ({ ...col, cards: [], count: 0 })));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [listData, setListData] = useState([]);
  const [talentsList, setTalentsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Compute completed tasks from live state
  const completedTasks = listData.filter(task => task.completed || task.status === TaskState.Done);

  // Safely restore user session and states on client-side mount (solves Next.js SSR hydration blocks)
  useEffect(() => {
    setIsMounted(true);
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    if (logged) {
      setIsLoggedIn(true);
      
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

  // Persist to local storage
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [assignments, talents, employees, profileData] = await Promise.all([
          companyService.getAssignments(),
          companyService.getTalents().catch(() => []),
          companyService.getEmployees().catch(() => []),
          companyService.getProfile().catch(() => null)
        ]);
        
        setListData(assignments);
        setTalentsList(talents);
        setEmployeesList(employees);
        setProfile(profileData);
        if (profileData) {
          localStorage.setItem('taskmanager_company_profile', JSON.stringify(profileData));
        }
        
        // Update board data based on fetched assignments
        const newBoardData = boardColumns.map(col => {
          const colTasks = assignments.filter(t => t.status === col.title);
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

    fetchData();
  }, [isLoggedIn]);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('taskmanager_board_columns', JSON.stringify(boardData));
  }, [boardData]);

  useEffect(() => {
    localStorage.setItem('taskmanager_list_tasks', JSON.stringify(listData));
  }, [listData]);

  const handleCreateTask = async (taskData) => {
    const priorityColors = {
      [TaskPriority.Low]: '#08AC16',
      [TaskPriority.Medium]: '#F19100',
      [TaskPriority.High]: '#ED5757',
      [TaskPriority.Critical]: '#D3220B',
      [TaskPriority.Lowest]: '#2F80ED'
    };

    try {
      const createdTask = await companyService.createAssignment({
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority,
        talentId: taskData.talentId,
        employeeId: taskData.employeeId
      });

      const newTask = {
        ...createdTask,
        priorityColor: priorityColors[createdTask.priority] || '#F19100',
        completed: createdTask.status === TaskState.Done,
      };
      
      // Add to listData
      setListData([{ ...newTask, group: "Today" }, ...listData]);
      
      // Add to boardData
      const newBoardData = [...boardData];
      const colIndex = newBoardData.findIndex(col => col.title === taskData.status);
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
      setBoardData(prev => prev.map(col => {
        const updatedCards = col.cards?.map(t => t.id === taskId ? { ...t, ...finalUpdates } : t) || [];
        return { ...col, cards: updatedCards, count: updatedCards.length };
      }));
    }

    // Fire API call in background (don't block UI)
    try {
      await companyService.updateAssignment({ id: taskId, ...finalUpdates });
    } catch (error) {
      console.warn('Backend update failed (offline mode):', error.message);
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
      />
      
      <div className="main-area">
        <TopHeader 
          onMenuClick={() => setIsSidebarOpen(true)} 
          activeModule={activeModule}
          profile={profile}
        />

        <div className="content-area">
          {activeModule === 'companies' ? (
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
              <JobsView onJobClick={setSelectedJob} />
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
        }}
        onCreateTask={handleCreateTask}
        initialEntity={initialTaskEntity}
      />

      {isCommentsOpen && (
        <TaskCommentsPanel 
          task={selectedTaskForComments} 
          onClose={() => setIsCommentsOpen(false)} 
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
}

const DynamicApp = dynamic(() => Promise.resolve(App), { ssr: false });
export default DynamicApp;
