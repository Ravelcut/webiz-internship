import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { TaskState, TaskPriority, EnumLabels } from '../../../constants/enums';
import './NewTaskModal.css';

const STATUS_OPTIONS = [
  { value: TaskState.Pending, bg: '#EAF2FD', color: '#182939', indicator: '#2F80ED' },
  { value: TaskState.InProgress, bg: '#F19100', color: '#FFFFFF', indicator: '#F19100' },
  { value: TaskState.Done, bg: '#08AC16', color: '#FFFFFF', indicator: '#08AC16' },
];

const PRIORITY_OPTIONS = [
  { value: TaskPriority.High, color: '#ED5757' },
  { value: TaskPriority.Medium, color: '#F19100' },
  { value: TaskPriority.Low, color: '#08AC16' },
];

const ENTITY_TYPE_OPTIONS = [
  { value: 'Talent', icon: 'solar:user-linear', hasAvatar: true },
  { value: 'Job', icon: 'solar:file-text-linear', hasAvatar: false },
  { value: 'Client', icon: 'solar:buildings-linear', hasAvatar: true },
  { value: 'Employee', icon: 'solar:laptop-minimalistic-linear', hasAvatar: false },
];

const ENTITY_OPTIONS = {
  Talent: [
    { name: 'Cameron Williamson', hasAvatar: true },
    { name: 'Eleanor Pena', hasAvatar: true },
    { name: 'Darrell Steward', hasAvatar: true },
    { name: 'Annette Black', hasAvatar: true },
  ],
  Job: [
    { name: 'Database Administrator', hasAvatar: false },
    { name: 'IT Auditor', hasAvatar: false },
    { name: 'Software Developer', hasAvatar: false },
    { name: 'IT Consultant', hasAvatar: false },
  ],
  Client: [
    { name: 'Bank of America', hasAvatar: true },
    { name: 'The Walt Disney Company', hasAvatar: true },
    { name: 'Mitsubishi', hasAvatar: true },
    { name: 'Gillette', hasAvatar: true },
  ],
  Employee: [
    { name: 'Devon Lane', hasAvatar: true },
    { name: 'Woody Harrelson', hasAvatar: true },
    { name: 'Cameron Williamson', hasAvatar: true },
    { name: 'Eleanor Pena', hasAvatar: true },
  ],
};

const TIME_OPTIONS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
];

const OWNER_OPTIONS = ['Woody Harrelson', 'Devon Lane', 'Cameron Williamson', 'Eleanor Pena'];

const NewTaskModal = ({ isOpen, onClose, onCreateTask, initialEntity }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [entityType, setEntityType] = useState('');
  const [entity, setEntity] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('Woody Harrelson');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=john',
      text: 'Muse about Tunguska event two ghostly white figures in coveralls and helmets are softly dancing',
      date: '18 Aug 2025',
      time: '14:00',
      attachments: [{ name: '2022certificationsick.pdf' }, { name: 'filename.pdf' }]
    },
    {
      id: 2,
      author: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=john',
      text: 'Lorem John Doe Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      date: '18 Aug 2025',
      time: '14:00',
      replies: [
        {
          author: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?u=john',
          text: 'Muse about Tunguska event two ghostly white figures in coveralls and helmets are softly dancing',
          date: '18 Aug 2025',
          time: '14:00',
        }
      ]
    }
  ]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showCommentActions, setShowCommentActions] = useState(null);

  useEffect(() => {
    if (isOpen && initialEntity) {
      setEntityType(initialEntity.typeName || 'Client');
      setEntity(initialEntity.name);
    }
  }, [isOpen, initialEntity]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const modalRef = useRef(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreateTask?.({
      title, status, priority, dueDate, time,
      entityType, entity, description, owner,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setStatus('');
    setPriority('');
    setDueDate('');
    setTime('');
    setEntityType('');
    setEntity('');
    setDescription('');
    setOwner('Woody Harrelson');
    setOpenDropdown(null);
    setIsCommentsVisible(false);
    setEditingCommentId(null);
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      author: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=john',
      text: newComment,
      date: '18 Aug 2025',
      time: '14:00',
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleEditComment = (id, newText) => {
    setComments(comments.map(c => c.id === id ? { ...c, text: newText } : c));
    setEditingCommentId(null);
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
    setShowCommentActions(null);
  };

  const getStatusOption = () => STATUS_OPTIONS.find(s => s.value === status);
  const getPriorityOption = () => PRIORITY_OPTIONS.find(p => p.value === priority);
  const getEntityTypeOption = () => ENTITY_TYPE_OPTIONS.find(e => e.value === entityType);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="ntm-backdrop" onClick={handleBackdropClick}>
      <div className={`ntm-modal ${isCommentsVisible ? 'expanded' : ''}`} ref={modalRef} onClick={() => { setOpenDropdown(null); setShowCommentActions(null); }}>
        <div className="ntm-header">
          <div className="ntm-header-left">
            <div className="ntm-header-icon">
              <Icon icon="solar:list-check-minimalistic-bold" />
            </div>
            <span className="ntm-header-title">New Task</span>
          </div>
          <button className="ntm-close-btn" onClick={onClose}>
            <Icon icon="solar:close-linear" />
          </button>
        </div>

        <div className="ntm-body">
          <div className="ntm-form-section">
            <div className="ntm-field-group">
              <div className="ntm-input-wrapper">
                <input
                  type="text"
                  className="ntm-title-input"
                  placeholder="Task Title"
                  value={title}
                  maxLength={80}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="ntm-char-count">{title.length}/80</span>
              </div>
            </div>

            <div className="ntm-row three-cols">
              <div className="ntm-select-wrapper" onClick={(e) => { e.stopPropagation(); toggleDropdown('status'); }}>
                <div className={`ntm-select ${status !== '' ? 'has-value' : ''}`}>
                  <div className="ntm-status-indicator" style={{ background: getStatusOption()?.indicator || '#D9E2EE' }} />
                  <span className={status !== '' ? 'ntm-select-value' : 'ntm-select-placeholder'}>
                    {status !== '' ? EnumLabels.TaskState[status] : 'Status'}
                  </span>
                  <Icon icon="solar:alt-arrow-down-linear" className="ntm-chevron" />
                </div>
                {status !== '' && <label className="ntm-select-label">Status</label>}
                {openDropdown === 'status' && (
                  <div className="ntm-dropdown">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className="ntm-dropdown-item"
                        onClick={(e) => { e.stopPropagation(); setStatus(opt.value); setOpenDropdown(null); }}
                      >
                        <div className="ntm-status-indicator small" style={{ background: opt.indicator }} />
                        <span>{EnumLabels.TaskState[opt.value]}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="ntm-select-wrapper" onClick={(e) => { e.stopPropagation(); toggleDropdown('priority'); }}>
                <div className={`ntm-select ${priority !== '' ? 'has-value' : ''}`}>
                  <span className={priority !== '' ? 'ntm-select-value' : 'ntm-select-placeholder'}>
                    {priority !== '' ? EnumLabels.TaskPriority[priority] : 'Priority'}
                  </span>
                  <Icon icon="solar:alt-arrow-down-linear" className="ntm-chevron" />
                </div>
                {priority !== '' && <label className="ntm-select-label">Priority</label>}
                {openDropdown === 'priority' && (
                  <div className="ntm-dropdown">
                    {PRIORITY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className="ntm-dropdown-item"
                        onClick={(e) => { e.stopPropagation(); setPriority(opt.value); setOpenDropdown(null); }}
                      >
                        <div className="ntm-priority-dot" style={{ background: opt.color }} />
                        <span>{EnumLabels.TaskPriority[opt.value]}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="ntm-select-wrapper ntm-date-wrapper">
                <div
                  className={`ntm-select ${dueDate ? 'has-value' : ''}`}
                  onClick={() => dateInputRef.current?.showPicker()}
                >
                  <span className={dueDate ? 'ntm-select-value' : 'ntm-select-placeholder'}>
                    {dueDate ? formatDate(dueDate) : 'Due To'}
                  </span>
                  <Icon icon="solar:calendar-linear" className="ntm-calendar-icon" />
                </div>
                {dueDate && <label className="ntm-select-label">Due To</label>}
                <input
                  ref={dateInputRef}
                  type="date"
                  className="ntm-hidden-date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="ntm-select-wrapper ntm-full" onClick={(e) => { e.stopPropagation(); toggleDropdown('entityType'); }}>
              <div className={`ntm-select ${entityType ? 'has-value' : ''}`}>
                <Icon 
                  icon={getEntityTypeOption()?.icon || 'solar:user-circle-linear'} 
                  className={`ntm-entity-type-icon ${entityType ? 'active' : ''}`} 
                />
                <span className={entityType ? 'ntm-select-value' : 'ntm-select-placeholder'}>
                  {entityType || 'Entity Type'}
                </span>
                <Icon icon="solar:alt-arrow-down-linear" className="ntm-chevron" />
              </div>
              {entityType && <label className="ntm-select-label">Entity Type</label>}
              {openDropdown === 'entityType' && (
                <div className="ntm-dropdown">
                  {ENTITY_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      className="ntm-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEntityType(opt.value);
                        setEntity('');
                        setOpenDropdown(null);
                      }}
                    >
                      <Icon icon={opt.icon} className="ntm-dropdown-icon" />
                      <span>{opt.value}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`ntm-select-wrapper ntm-full ${!entityType ? 'ntm-disabled' : ''}`}
              onClick={(e) => { if (entityType) { e.stopPropagation(); toggleDropdown('entity'); } }}
            >
              <div className={`ntm-select ${entity ? 'has-value' : ''}`}>
                <span className={entity ? 'ntm-select-value' : 'ntm-select-placeholder'}>
                  {entity || 'Select Entity'}
                </span>
                <Icon icon="solar:alt-arrow-down-linear" className="ntm-chevron" />
              </div>
              {entity && <label className="ntm-select-label">Select Entity</label>}
              {openDropdown === 'entity' && entityType && (
                <div className="ntm-dropdown">
                  {(ENTITY_OPTIONS[entityType] || []).map((item) => (
                    <button
                      key={item.name}
                      className="ntm-dropdown-item"
                      onClick={(e) => { e.stopPropagation(); setEntity(item.name); setOpenDropdown(null); }}
                    >
                      {item.hasAvatar && (
                        <div className="ntm-entity-avatar small">{item.name.charAt(0)}</div>
                      )}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ntm-field-group">
              <div className="ntm-textarea-wrapper">
                <textarea
                  className="ntm-textarea"
                  placeholder="Task Description"
                  value={description}
                  maxLength={300}
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="ntm-char-count">{description.length}/300</span>
              </div>
            </div>

            <div className="ntm-select-wrapper ntm-full" onClick={(e) => { e.stopPropagation(); toggleDropdown('owner'); }}>
              <div className={`ntm-select ${owner ? 'has-value' : ''}`}>
                <span className={owner ? 'ntm-select-value' : 'ntm-select-placeholder'}>
                  {owner || 'Task Owner'}
                </span>
                <Icon icon="solar:alt-arrow-down-linear" className="ntm-chevron" />
              </div>
              {owner && <label className="ntm-select-label">Task Owner</label>}
              {openDropdown === 'owner' && (
                <div className="ntm-dropdown">
                  {OWNER_OPTIONS.map((name) => (
                    <button
                      key={name}
                      className="ntm-dropdown-item"
                      onClick={(e) => { e.stopPropagation(); setOwner(name); setOpenDropdown(null); }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ntm-comments-container">
            <div className="ntm-comment-input-area">
              <div className="ntm-comment-textarea-box">
                <textarea 
                  placeholder="Leave a comment" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  maxLength={300}
                />
                <div className="ntm-comment-textarea-footer">
                  <span className="ntm-char-count">{newComment.length}/300</span>
                </div>
              </div>
              <div className="ntm-comment-input-actions">
                <button className="ntm-attach-btn">
                  <Icon icon="solar:link-linear" />
                  <span>Attach Files</span>
                </button>
                <button 
                  className="ntm-submit-comment-btn" 
                  disabled={!newComment.trim()}
                  onClick={handleAddComment}
                >
                  Comment
                </button>
              </div>
            </div>

            <div className="ntm-comments-header">
              <div className="ntm-comments-count">
                <span className="ntm-lbl">Comments</span>
                <span className="ntm-cnt">{comments.length}</span>
              </div>
              <button 
                className="ntm-toggle-comments-btn"
                onClick={() => setIsCommentsVisible(!isCommentsVisible)}
              >
                {isCommentsVisible ? 'Hide' : 'Show All Comments'}
              </button>
            </div>

            {isCommentsVisible && (
              <div className="ntm-comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="ntm-comment-card">
                    <div className="ntm-comment-card-header">
                      <div className="ntm-comment-author-info">
                        <img src={comment.avatar} alt="" className="ntm-comment-avatar" />
                        <div className="ntm-comment-meta">
                          <span className="ntm-comment-author">{comment.author}</span>
                          <span className="ntm-comment-time">{comment.date}  •  {comment.time}</span>
                        </div>
                      </div>
                      <div className="ntm-comment-header-actions">
                        <div className="ntm-comment-action-trigger" onClick={(e) => { e.stopPropagation(); setShowCommentActions(showCommentActions === comment.id ? null : comment.id); }}>
                          <Icon icon="solar:menu-dots-bold" />
                          {showCommentActions === comment.id && (
                            <div className="ntm-comment-popover">
                              <button onClick={() => setEditingCommentId(comment.id)}>
                                <Icon icon="solar:pen-linear" />
                                <span>Edit</span>
                              </button>
                              <button onClick={() => handleDeleteComment(comment.id)}>
                                <Icon icon="solar:trash-bin-trash-linear" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                        <button className="ntm-comment-reply-btn">
                          <Icon icon="solar:reply-linear" />
                        </button>
                      </div>
                    </div>

                    <div className="ntm-comment-card-body">
                      {editingCommentId === comment.id ? (
                        <div className="ntm-comment-edit-box">
                          <textarea 
                            defaultValue={comment.text}
                            onChange={(e) => comment.text = e.target.value} // simplistic for demo
                          />
                          <div className="ntm-comment-edit-footer">
                            <span className="ntm-char-count">{comment.text.length}/300</span>
                          </div>
                          <div className="ntm-comment-edit-actions">
                             <div className="ntm-edit-attachments">
                               {comment.attachments?.map((at, idx) => (
                                 <div key={idx} className="ntm-edit-at-chip">
                                   <span>{at.name}</span>
                                   <Icon icon="solar:trash-bin-trash-linear" />
                                 </div>
                               ))}
                               <button className="ntm-add-at-btn"><Icon icon="solar:add-circle-linear" /></button>
                             </div>
                             <button className="ntm-comment-save-btn" onClick={() => handleEditComment(comment.id, comment.text)}>Save</button>
                          </div>
                        </div>
                      ) : (
                        <p className="ntm-comment-text">{comment.text}</p>
                      )}
                      
                      {!editingCommentId && comment.attachments && (
                        <div className="ntm-comment-attachments">
                          {comment.attachments.map((at, idx) => (
                            <div key={idx} className="ntm-attachment-chip">
                              <span className="ntm-at-name">{at.name}</span>
                              <Icon icon="solar:download-linear" className="ntm-at-dl" />
                            </div>
                          ))}
                        </div>
                      )}

                      {comment.replies && comment.replies.map((reply, rIdx) => (
                        <div key={rIdx} className="ntm-comment-reply-item">
                          <div className="ntm-reply-header">
                            <img src={reply.avatar} alt="" className="ntm-reply-avatar" />
                            <span className="ntm-reply-author">{reply.author}</span>
                            <span className="ntm-reply-indicator">Replied on</span>
                            <span className="ntm-reply-time">{reply.date}  •  {reply.time}</span>
                          </div>
                          <p className="ntm-reply-text">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="ntm-footer">
          <button className="ntm-cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="ntm-create-btn" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
