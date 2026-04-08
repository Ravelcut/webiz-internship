import { Icon } from '@iconify/react';
import EmptyState from '../../shared/EmptyState/EmptyState';
import './KanbanBoard.css';

const entityIcons = {
  laptop: 'solar:laptop-minimalistic-linear',
  company: 'carbon:building',
  user: 'solar:user-linear',
  'file-user': 'solar:file-text-linear',
};

const KanbanCard = ({ card, onOpenComments }) => {
  const initials = card.assignee
    ? card.assignee.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '';

  if (card.isEditing) {
    return (
      <div className="kanban-card kanban-card--editing">
        <div className="card-top-row">
          <div className="card-label-input">
            <span className="label-placeholder">Add Label</span>
          </div>
          <button className="save-btn">
            <span>Save</span>
            <Icon icon="carbon:arrow-right" className="save-icon" />
          </button>
        </div>
        <div className="card-title-input">
          <div className="edit-cursor" />
          <span className="title-input-placeholder">Task Title...</span>
        </div>
        <div className="card-bottom-row">
          <div className="card-footer-left">
            <div className="avatar-placeholder">
              <Icon icon="solar:user-plus-linear" className="placeholder-icon" />
            </div>
          </div>
          <div className="date-placeholder">
            <Icon icon="solar:calendar-add-linear" className="placeholder-icon" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kanban-card">
      <div className="card-top-row">
        <div className="card-meta-left">
          <div className="priority-chip">
            <div className="priority-dot" style={{ background: card.priorityColor }} />
            <span className="priority-label">{card.priority}</span>
          </div>
          <div className="comment-badge-wrapper" onClick={() => onOpenComments && onOpenComments(card)}>
            <Icon icon="solar:chat-round-line-linear" className="comment-icon" />
            <span className="comment-count">{card.comments || 0}</span>
          </div>
        </div>
        <div className="card-meta-right">
          <div className="check-btn">
            {card.completed ? (
              <Icon icon="solar:check-circle-bold" className="check-icon--green" />
            ) : (
              <Icon icon="solar:check-circle-linear" className="check-icon" />
            )}
          </div>
          <div className="more-btn">
            <Icon icon="solar:menu-dots-bold" className="more-icon" />
          </div>
        </div>
      </div>

      <div className="card-title">{card.title}</div>

      <div className="card-bottom-row">
        <div className="card-footer-left">
          {card.assigneeAvatar ? (
            <img src={card.assigneeAvatar} className="avatar-img-sm" alt={card.assignee} />
          ) : card.assignee ? (
            <div className="avatar-sm">
              <span>{initials}</span>
            </div>
          ) : (
            <div className="avatar-placeholder">
              <Icon icon="solar:user-plus-linear" className="placeholder-icon" />
            </div>
          )}
          
          {card.assignee && <span className="assignee-label">{card.assignee}</span>}
          
          {card.entity && (
            <Icon
              icon={entityIcons[card.entity] || 'solar:user-linear'}
              className="entity-icon-sm"
            />
          )}
        </div>
        
        <div className="card-footer-right">
          {card.overdue && card.dueDate ? (
            <div className="due-overdue-pill">
              <span>{card.dueDate}</span>
              <Icon icon="solar:alarm-linear" className="alarm-icon-sm" />
            </div>
          ) : card.dueDate ? (
            <span className="due-text">{card.dueDate}</span>
          ) : (
            <div className="date-placeholder">
              <Icon icon="solar:calendar-add-linear" className="placeholder-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const KanbanColumn = ({ column, onOpenComments }) => {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-header-left">
          <div className="status-bar" style={{ background: column.indicatorColor }} />
          <span className="column-title">{column.title}</span>
          <span className="column-count">{column.count}</span>
        </div>
        <button className="column-add-btn">
          <Icon icon="solar:add-circle-linear" className="add-icon" />
        </button>
      </div>
      <div className="column-cards">
        {column.cards.map((card) => (
          <KanbanCard key={card.id} card={card} onOpenComments={onOpenComments} />
        ))}
        <button className="add-task-row">
          <Icon icon="carbon:add" className="plus-sm" />
          <span>New Task</span>
        </button>
      </div>
    </div>
  );
};

const KanbanBoard = ({ columns, onNewTask, onOpenComments }) => {
  const isEmpty = !columns || columns.every(col => !col.cards || col.cards.length === 0);

  if (isEmpty) {
    return <EmptyState onAction={onNewTask} />;
  }

  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <KanbanColumn key={col.id} column={col} onOpenComments={onOpenComments} />
      ))}
    </div>
  );
};

export default KanbanBoard;
