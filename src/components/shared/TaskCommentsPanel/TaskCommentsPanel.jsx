import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TaskState, TaskPriority, EnumLabels } from '../../../constants/enums';
import './TaskCommentsPanel.css';

const STATUS_OPTIONS = [
  { value: TaskState.Pending, label: EnumLabels.TaskState[TaskState.Pending], color: '#2F80ED' },
  { value: TaskState.InProgress, label: EnumLabels.TaskState[TaskState.InProgress], color: '#F19100' },
  { value: TaskState.PendingReview, label: EnumLabels.TaskState[TaskState.PendingReview], color: '#8B5CF6' },
  { value: TaskState.InReview, label: EnumLabels.TaskState[TaskState.InReview], color: '#6366F1' },
  { value: TaskState.Done, label: EnumLabels.TaskState[TaskState.Done], color: '#08AC16' }
];

const PRIORITY_OPTIONS = [
  { value: TaskPriority.Lowest, label: EnumLabels.TaskPriority[TaskPriority.Lowest], color: '#8B949C' },
  { value: TaskPriority.Low, label: EnumLabels.TaskPriority[TaskPriority.Low], color: '#08AC16' },
  { value: TaskPriority.Medium, label: EnumLabels.TaskPriority[TaskPriority.Medium], color: '#F19100' },
  { value: TaskPriority.High, label: EnumLabels.TaskPriority[TaskPriority.High], color: '#ED5757' },
  { value: TaskPriority.Critical, label: EnumLabels.TaskPriority[TaskPriority.Critical], color: '#D3220B' }
];

const TaskCommentsPanel = ({ task, onClose, onUpdateTask }) => {
  const [comment, setComment] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [currentStatus, setCurrentStatus] = useState(task?.status || TaskState.Pending);
  const [currentPriority, setCurrentPriority] = useState(task?.priority || TaskPriority.Medium);

  if (!task) return null;

  const statusOpt = STATUS_OPTIONS.find(o => o.value === currentStatus) || STATUS_OPTIONS[0];
  const priorityOpt = PRIORITY_OPTIONS.find(o => o.value === currentPriority) || PRIORITY_OPTIONS[2];

  const mockComments = [
    {
      id: 1,
      date: '11.04.22',
      time: '14:00 PM',
      author: 'Anuka Surmanidze',
      avatar: 'https://i.pravatar.cc/150?u=anuka',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    },
    {
      id: 2,
      date: '11.04.22',
      time: '14:00 PM',
      author: 'Anuka Surmanidze',
      avatar: 'https://i.pravatar.cc/150?u=anuka',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    }
  ];

  return (
    <div className="tcp-backdrop" onClick={onClose}>
      <div className="tcp-panel" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}>
        <div className="tcp-header">
          <h2 className="tcp-header-title">Task Comments</h2>
          <button className="tcp-close-btn" onClick={onClose}>
            <Icon icon="solar:close-linear" />
          </button>
        </div>

        <div className="tcp-body">
          <div className="tcp-about-task">
            <div className="tcp-about-header">
              <span className="tcp-about-label">About Task</span>
              <div className="tcp-badges">
                
                <div className="tcp-badge-wrapper">
                  <div 
                    className="tcp-badge progress clickable"
                    onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'status' ? null : 'status'); }}
                  >
                    <div className="tcp-badge-dot" style={{ background: statusOpt.color }} />
                    <span>{statusOpt.label}</span>
                    <Icon icon="solar:alt-arrow-down-linear" className="tcp-chevron" />
                  </div>
                  {openDropdown === 'status' && (
                    <div className="tcp-dropdown">
                      {STATUS_OPTIONS.map(opt => (
                        <div 
                          key={opt.value} 
                          className="tcp-dropdown-item"
                          onClick={() => { 
                            setCurrentStatus(opt.value); 
                            setOpenDropdown(null);
                            if (onUpdateTask) onUpdateTask(task.id, { status: opt.value });
                          }}
                        >
                          <div className="tcp-badge-dot" style={{ background: opt.color }} />
                          <span>{opt.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="tcp-badge-wrapper">
                  <div 
                    className="tcp-badge priority clickable"
                    onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'priority' ? null : 'priority'); }}
                  >
                    <div className="tcp-badge-dot" style={{ background: priorityOpt.color }} />
                    <span>{priorityOpt.label}</span>
                    <Icon icon="solar:alt-arrow-down-linear" className="tcp-chevron" />
                  </div>
                  {openDropdown === 'priority' && (
                    <div className="tcp-dropdown">
                      {PRIORITY_OPTIONS.map(opt => (
                        <div 
                          key={opt.value} 
                          className="tcp-dropdown-item"
                          onClick={() => { 
                            setCurrentPriority(opt.value); 
                            setOpenDropdown(null);
                            if (onUpdateTask) onUpdateTask(task.id, { priority: opt.value });
                          }}
                        >
                          <div className="tcp-badge-dot" style={{ background: opt.color }} />
                          <span>{opt.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
            <div className="tcp-task-title-box">
              <p className="tcp-task-title-text">{task.title}</p>
            </div>
          </div>

          <div className="tcp-divider" />

          <div className="tcp-input-section">
            <div className="tcp-textarea-wrapper">
              <textarea
                placeholder="Write an update regarding this expence"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={300}
              />
              <div className="tcp-input-footer">
                <button className="tcp-attach-btn">
                  <Icon icon="solar:link-linear" />
                  <span>Attach files</span>
                </button>
                <span className="tcp-char-count">{comment.length}/300</span>
              </div>
            </div>
            <div className="tcp-input-actions">
              <button className="tcp-clear-btn" onClick={() => setComment('')}>Clear</button>
              <button className="tcp-submit-btn" disabled={!comment.trim()}>Comment</button>
            </div>
          </div>

          <div className="tcp-comments-list">
            {mockComments.map((c, index) => (
              <div key={c.id} className="tcp-comment-item">
                <div className="tcp-comment-timeline">
                  <div className="tcp-timeline-dot" />
                  {index !== mockComments.length - 1 && <div className="tcp-timeline-line" />}
                </div>
                <div className="tcp-comment-content">
                  <div className="tcp-comment-date">{c.date}  -  {c.time}</div>
                  <div className="tcp-comment-card">
                    <div className="tcp-comment-header">
                      <div className="tcp-author-info">
                        <img src={c.avatar} alt={c.author} className="tcp-author-avatar" />
                        <span className="tcp-author-name">{c.author}</span>
                      </div>
                      <div className="tcp-comment-actions">
                        <button className="tcp-icon-btn">
                          <Icon icon="solar:pen-linear" />
                        </button>
                        <button className="tcp-icon-btn">
                          <Icon icon="solar:trash-bin-trash-linear" />
                        </button>
                      </div>
                    </div>
                    <p className="tcp-comment-text">{c.text}</p>
                  </div>
                  <button className="tcp-reply-btn">
                    <Icon icon="solar:reply-linear" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCommentsPanel;
