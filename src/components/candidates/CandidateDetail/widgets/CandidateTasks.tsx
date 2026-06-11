// @ts-nocheck
import React from 'react';
import TaskTable from '../../../table/TaskTable/TaskTable';
import './Widgets.css';

const CandidateTasks = ({ candidate, tasks = [] }) => {
  // Filter tasks for this specific candidate
  const candidateTasks = tasks.filter(task => 
    (task.raw && task.raw.talentId === candidate.id) ||
    task.assignee === candidate.name ||
    (candidate.name && task.assignee && task.assignee.toLowerCase().includes(candidate.name.toLowerCase()))
  );

  return (
    <div className="candidate-tasks-tab fade-in">
      <div className="tasks-controls">
        <div className="tasks-stats">
          <div className="stat-pill">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{candidateTasks.length}</span>
          </div>
        </div>
      </div>
      <TaskTable tasks={candidateTasks} />
    </div>
  );
};

export default CandidateTasks;
