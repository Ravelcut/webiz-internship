import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar/Sidebar';
import TopHeader from './components/layout/TopHeader/TopHeader';
import ContentHeader from './components/layout/ContentHeader/ContentHeader';
import FilterBar from './components/layout/FilterBar/FilterBar';
import TaskListView from './components/planner/TaskListView/TaskListView';
import KanbanBoard from './components/board/KanbanBoard/KanbanBoard';
import TaskTable from './components/table/TaskTable/TaskTable';
import NewTaskModal from './components/shared/NewTaskModal/NewTaskModal';
import ClientsView from './components/clients/ClientsView/ClientsView';
import CompanyDetail from './components/clients/CompanyDetail/CompanyDetail';
import CandidatesView from './components/candidates/CandidatesView/CandidatesView';
import CandidateDetail from './components/candidates/CandidateDetail/CandidateDetail';
import JobsView from './components/jobs/JobsView';
import JobDetail from './components/jobs/JobDetail/JobDetail';
import { tasksData, completedTasks, boardColumns, clientsData, candidatesData } from './data/mockData';
import { TaskPriority, TaskState } from './constants/enums';
import { Icon } from '@iconify/react';
import { companyService } from './services/companyService';
import Login from './components/auth/Login/Login';
import './index.css';

import TaskCommentsPanel from './components/shared/TaskCommentsPanel/TaskCommentsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [activeModule, setActiveModule] = useState('companies'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialTaskEntity, setInitialTaskEntity] = useState(null);
  const [selectedTaskForComments, setSelectedTaskForComments] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const [boardData, setBoardData] = useState(() => {
    const saved = localStorage.getItem('taskmanager_board_columns');
    return saved ? JSON.parse(saved) : boardColumns;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

  const [listData, setListData] = useState(() => {
    const saved = localStorage.getItem('taskmanager_list_tasks');
    return saved ? JSON.parse(saved) : tasksData;
  });

  // Persist to local storage
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const assignments = await companyService.getAssignments();
        setListData(assignments);
        
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
        console.error('Failed to fetch assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

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
        priority: taskData.priority,
        status: taskData.status,
        assignee: taskData.owner,
        entity: taskData.entityType,
        dueDate: taskData.dueDate
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

    try {
      await companyService.updateAssignment(taskId, finalUpdates);
      setListData(prev => prev.map(t => t.id === taskId ? { ...t, ...finalUpdates } : t));
      
      // Also update board data if status or priority changed
      if (finalUpdates.status !== undefined || finalUpdates.priority !== undefined) {
        const updatedListData = listData.map(t => t.id === taskId ? { ...t, ...finalUpdates } : t);
        const newBoardData = boardData.map(col => {
          const colTasks = updatedListData.filter(t => t.status === col.title);
          return {
            ...col,
            cards: colTasks,
            count: colTasks.length
          };
        });
        setBoardData(newBoardData);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
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

export default App;
