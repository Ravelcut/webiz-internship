import React from 'react';
import TaskTable from '../../../table/TaskTable/TaskTable';
import { tasksData } from '../../../../data/mockData';
import './Widgets.css';

const CandidateTasks = ({ candidate }) => {
  // Filter tasks for this specific candidate if needed, 
  // for now we'll just show some mock tasks and filter by candidate name if matches
  const candidateTasks = tasksData.filter(task => 
    task.assignee === candidate.name || task.title.toLowerCase().includes(candidate.name.toLowerCase())
  );

  // If no specific tasks, just show the general ones or an empty state through TaskTable
  const displayTasks = candidateTasks.length > 0 ? candidateTasks : tasksData.slice(0, 5);

  return (
    <div className="candidate-tasks-tab fade-in">
      <div className="tasks-controls">
        <div className="tasks-stats">
          <div className="stat-pill">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{displayTasks.length}</span>
          </div>
        </div>
      </div>
      <TaskTable tasks={displayTasks} />
    </div>
  );
};

export default CandidateTasks;
