import { useState } from 'react';
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

  const [listData, setListData] = useState(() => {
    const saved = localStorage.getItem('taskmanager_list_tasks');
    return saved ? JSON.parse(saved) : tasksData;
  });

  // Persist to local storage
  import('react').then(React => {
    React.useEffect(() => {
      localStorage.setItem('taskmanager_board_columns', JSON.stringify(boardData));
    }, [boardData]);
    React.useEffect(() => {
      localStorage.setItem('taskmanager_list_tasks', JSON.stringify(listData));
    }, [listData]);
  });

  const handleCreateTask = (taskData) => {
    const priorityColors = {
      [TaskPriority.Low]: '#08AC16',
      [TaskPriority.Medium]: '#F19100',
      [TaskPriority.High]: '#ED5757',
      [TaskPriority.Critical]: '#D3220B',
      [TaskPriority.Lowest]: '#2F80ED'
    };

    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      priority: taskData.priority,
      priorityColor: priorityColors[taskData.priority] || '#F19100',
      status: taskData.status,
      comments: 0,
      assignee: taskData.owner,
      entity: taskData.entityType,
      dueDate: taskData.dueDate,
      overdue: false,
      completed: taskData.status === TaskState.Done,
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
        count: newBoardData[colIndex].count + 1
      };
    } else if (newBoardData.length > 0) {
      newBoardData[0] = {
        ...newBoardData[0],
        cards: [newTask, ...newBoardData[0].cards],
        count: newBoardData[0].count + 1
      };
    }
    setBoardData(newBoardData);
  };

  const handleOpenComments = (task) => {
    setSelectedTaskForComments(task);
    setIsCommentsOpen(true);
  };

  return (
    <div className="app-shell">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeModule={activeModule}
        onModuleChange={setActiveModule}
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
                    />
                  </div>
                )}

                {activeTab === 'table' && (
                  <div className="list-scroll">
                    <TaskTable 
                      tasks={listData} 
                      onNewTask={() => setIsNewTaskOpen(true)}
                      onOpenComments={handleOpenComments}
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
        />
      )}
    </div>
  );
}

export default App;
