import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './TaskCommentsPanel.css';

const TaskCommentsPanel = ({ task, onClose }) => {
  const [comment, setComment] = useState('');
  
  if (!task) return null;

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
      <div className="tcp-panel" onClick={(e) => e.stopPropagation()}>
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
                {task.status && (
                  <div className="tcp-badge progress">
                    <div className="tcp-badge-dot" style={{ background: task.statusColor || '#F19100' }} />
                    <span>{task.status}</span>
                  </div>
                )}
                {task.priority && (
                  <div className="tcp-badge priority">
                    <div className="tcp-badge-dot" style={{ background: task.priorityColor || '#ED5757' }} />
                    <span>{task.priority}</span>
                  </div>
                )}
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
