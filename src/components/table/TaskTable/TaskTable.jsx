import React from 'react';
import { Icon } from '@iconify/react';
import { EnumLabels } from '../../../constants/enums';
import EmptyState from '../../shared/EmptyState/EmptyState';
import './TaskTable.css';

const TaskTable = ({ tasks, variant, onNewTask, onOpenComments }) => {
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
          <div key={task.id} className={`table-row ${isCompleted ? 'completed-row' : ''}`}>
            <div className="cell checkbox-cell">
              <Icon icon="solar:check-circle-linear" className="unchecked-icon" />
            </div>
            
            <div className="cell title-cell">
              <span className="task-title-text">{task.title}</span>
            </div>
            
            <div className="cell message-cell">
              <div className="message-badge" onClick={() => onOpenComments && onOpenComments(task)}>
                <Icon icon="solar:chat-round-line-linear" className="message-icon" />
                <span className="message-count">{task.comments || 0}</span>
              </div>
            </div>
            
            <div className="cell priority-cell">
              <div className="priority-chip">
                <div 
                  className="priority-dot" 
                  style={{ background: task.priorityColor || '#8B949C' }} 
                />
                <span className="priority-text">{EnumLabels.TaskPriority[task.priority] ?? task.priority ?? 'No Priority'}</span>
              </div>
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
              <div className="cell status-cell">
                <div 
                  className="status-badge"
                  style={{ 
                    background: task.statusBg || '#EAF2FD',
                    color: task.statusText || '#182939'
                  }}
                >
                  {EnumLabels.TaskState[task.status] ?? task.status}
                </div>
              </div>
            )}
            
            {!isCompleted && (
              <div className="cell actions-cell">
                <Icon icon="solar:alt-arrow-right-linear" className="chevron-icon" />
                <div className="delete-wrapper">
                  <Icon icon="solar:trash-bin-trash-linear" className="trash-icon" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
