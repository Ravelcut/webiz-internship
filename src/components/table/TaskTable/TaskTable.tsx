// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import { EnumLabels, TaskPriority, TaskState } from '../../../constants/enums';
import EmptyState from '../../shared/EmptyState/EmptyState';
import InlineDropdown from '../../shared/InlineDropdown/InlineDropdown';
import './TaskTable.css';

const priorityColors = {
  [TaskPriority.Lowest]: '#2F80ED',
  [TaskPriority.Low]: '#08AC16',
  [TaskPriority.Medium]: '#F19100',
  [TaskPriority.High]: '#ED5757',
  [TaskPriority.Critical]: '#D3220B',
};

const statusStyles = {
  [TaskState.Pending]: { bg: '#EAF2FD', text: '#182939' },
  [TaskState.InProgress]: { bg: '#F19100', text: '#FFFFFF' },
  [TaskState.PendingReview]: { bg: '#F5E6FF', text: '#7B2CB5' },
  [TaskState.InReview]: { bg: '#E0F2FE', text: '#0369A1' },
  [TaskState.Done]: { bg: '#08AC16', text: '#FFFFFF' },
};

const priorityOptions = Object.entries(EnumLabels.TaskPriority).map(([value, label]) => ({
  value: Number(value),
  label,
  dot: priorityColors[Number(value)] || '#8B949C',
}));

const statusOptions = Object.entries(EnumLabels.TaskState).map(([value, label]) => {
  const style = statusStyles[Number(value)] || { bg: '#EAF2FD', text: '#182939' };
  return {
    value: Number(value),
    label,
    swatch: style.bg,
    swatchText: style.text,
  };
});

const TaskTable = ({ tasks, variant, onNewTask, onOpenComments, onUpdateTask, onDeleteTask, onSelectTask }) => {
  const isCompleted = variant === 'completed';

  const entityIcons = {
    contact: 'solar:user-linear',
    company: 'solar:buildings-linear',
    project: 'solar:folder-with-files-linear',
    laptop: 'solar:laptop-minimalistic-linear',
    user: 'solar:user-linear',
    'file-user': 'solar:file-text-linear',
  };

  if (!tasks || tasks.length === 0) {
    return <EmptyState onAction={onNewTask} />;
  }

  const handlePriorityChange = (taskId, newPriority) => {
    if (onUpdateTask) {
      onUpdateTask(taskId, {
        priority: newPriority,
        priorityColor: priorityColors[newPriority] || '#F19100',
      });
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    const style = statusStyles[newStatus] || { bg: '#EAF2FD', text: '#182939' };
    if (onUpdateTask) {
      onUpdateTask(taskId, {
        status: newStatus,
        statusBg: style.bg,
        statusText: style.text,
      });
    }
  };

  return (
    <div className={`task-table-wrapper ${isCompleted ? 'completed-variant' : ''}`}>
      <div className={`table-header ${isCompleted ? 'completed-header' : ''}`}>
        <div className="header-cell checkbox-header">
          <Icon icon="solar:check-circle-linear" className="header-checkbox-icon" />
        </div>
        <div className="header-cell task-title-header">Task Title</div>
        <div className="header-cell message-header">
          <Icon icon="solar:chat-round-line-linear" className="header-icon" />
        </div>
        <div className="header-cell priority-header">Priority</div>
        
        {isCompleted && (
          <div className="header-cell status-header">Status</div>
        )}
        
        <div className="header-cell entity-header">Related Entity</div>
        <div className="header-cell date-header">Due Date</div>
        
        {!isCompleted && (
          <div className="header-cell status-header">Status</div>
        )}
        
        {!isCompleted && (
          <div className="header-cell actions-header"></div>
        )}
      </div>
      
      <div className="table-body">
        {tasks.map((task) => (
          <div key={task.id} className={`table-row ${isCompleted ? 'completed-row' : ''}`} onClick={() => onSelectTask && onSelectTask(task)}>
            <div className="cell checkbox-cell" onClick={(e) => { 
              e.stopPropagation(); 
              if (onUpdateTask) {
                const isNowCompleted = !task.completed;
                onUpdateTask(task.id, { 
                  completed: isNowCompleted,
                  status: isNowCompleted ? TaskState.Done : TaskState.Pending 
                });
              }
            }}>
              <Icon icon={task.completed ? "solar:check-circle-bold" : "solar:check-circle-linear"} className={`unchecked-icon ${task.completed ? 'checked' : ''}`} />
            </div>
            
            <div className="cell title-cell">
              <span className="task-title-text">{task.title}</span>
            </div>
            
            <div className="cell message-cell">
              <div className="message-badge" onClick={(e) => { e.stopPropagation(); onOpenComments && onOpenComments(task); }}>
                <Icon icon="solar:chat-round-line-linear" className="message-icon" />
                <span className="message-count">{task.comments || 0}</span>
              </div>
            </div>
            
            <div className="cell priority-cell" onClick={(e) => e.stopPropagation()}>
              <InlineDropdown
                options={priorityOptions}
                value={task.priority}
                onChange={(val) => handlePriorityChange(task.id, val)}
              >
                <div className="priority-chip">
                  <div 
                    className="priority-dot" 
                    style={{ background: task.priorityColor || '#8B949C' }} 
                  />
                  <span className="priority-text">{EnumLabels.TaskPriority[task.priority] ?? task.priority ?? 'No Priority'}</span>
                </div>
              </InlineDropdown>
            </div>

            {isCompleted && (
              <div className="cell status-cell">
                <div 
                  className="status-badge"
                  style={{ 
                    background: '#08AC16',
                    color: '#FFFFFF'
                  }}
                >
                  Completed
                </div>
              </div>
            )}
            
            <div className="cell entity-cell">
              <div className="entity-wrapper">
                {task.assigneeAvatar ? (
                  <img src={task.assigneeAvatar} className="cell-avatar" alt="" />
                ) : (
                  <div className="cell-avatar-placeholder">
                    {task.assignee ? task.assignee.charAt(0) : ''}
                  </div>
                )}
                <span className="assignee-name">{task.assignee}</span>
                {task.entity && (
                  <Icon 
                    icon={entityIcons[task.entity] || 'solar:user-linear'} 
                    className="entity-icon" 
                  />
                )}
              </div>
            </div>
            
            <div className="cell date-cell">
              {task.dueDate}
            </div>

            {!isCompleted && (
              <div className="cell status-cell" onClick={(e) => e.stopPropagation()}>
                <InlineDropdown
                  options={statusOptions}
                  value={task.status}
                  onChange={(val) => handleStatusChange(task.id, val)}
                >
                  <div 
                    className="status-badge"
                    style={{ 
                      background: task.statusBg || '#EAF2FD',
                      color: task.statusText || '#182939'
                    }}
                  >
                    {EnumLabels.TaskState[task.status] ?? task.status}
                  </div>
                </InlineDropdown>
              </div>
            )}
            
            {!isCompleted && (
              <div className="cell actions-cell" onClick={(e) => e.stopPropagation()}>
                <Icon icon="solar:alt-arrow-right-linear" className="chevron-icon" />
                {onDeleteTask && (
                  <div className="delete-wrapper" onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}>
                    <Icon icon="solar:trash-bin-trash-linear" className="trash-icon" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
