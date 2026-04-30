import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { EnumLabels, TaskPriority } from '../../../constants/enums';
import { Icon } from '@iconify/react';
import EmptyState from '../../shared/EmptyState/EmptyState';
import './KanbanBoard.css';

const entityIcons = {
  laptop: 'solar:laptop-minimalistic-linear',
  company: 'carbon:building',
  user: 'solar:user-linear',
  'file-user': 'solar:file-text-linear',
};

const PRIORITY_OPTIONS = [
  { value: TaskPriority.High, color: '#ED5757' },
  { value: TaskPriority.Medium, color: '#F19100' },
  { value: TaskPriority.Low, color: '#08AC16' },
  { value: TaskPriority.Critical, color: '#D3220B' },
  { value: TaskPriority.Lowest, color: '#2F80ED' },
];

const KanbanCard = ({ card, onOpenComments, provided, snapshot, onUpdatePriority }) => {
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const initials = card.assignee
    ? card.assignee.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '';

  const style = provided ? {
    ...provided.draggableProps.style,
  } : {};

  if (card.isEditing) {
    return (
      <div 
        className="kanban-card kanban-card--editing"
        ref={provided?.innerRef}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
        style={style}
      >
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
    <div 
      className={`kanban-card ${snapshot?.isDragging ? 'is-dragging' : ''}`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={style}
    >
      <div className="card-top-row">
        <div className="card-meta-left">
          <div className="priority-chip" style={{ position: 'relative', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setIsPriorityOpen(!isPriorityOpen); }}>
            <div className="priority-dot" style={{ background: card.priorityColor }} />
            <span className="priority-label">{EnumLabels.TaskPriority[card.priority] || card.priority}</span>
            <Icon icon="solar:alt-arrow-down-linear" style={{ fontSize: '12px', marginLeft: '4px', color: '#8B949C' }} />
            {isPriorityOpen && (
              <div 
                className="kanban-inline-dropdown"
                style={{
                  position: 'absolute', top: '100%', left: 0, background: '#FFFFFF',
                  border: '1px solid #E6E6E6', borderRadius: '8px', padding: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, minWidth: '120px', marginTop: '4px'
                }}
              >
                {PRIORITY_OPTIONS.map(opt => (
                  <div key={opt.value} onClick={(e) => {
                    e.stopPropagation();
                    setIsPriorityOpen(false);
                    if (onUpdatePriority) onUpdatePriority(card.id, opt.value, opt.color);
                  }} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', 
                    borderRadius: '4px', fontSize: '12px'
                  }} onMouseEnter={(e) => e.currentTarget.style.background = '#F5F8FC'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <div className="priority-dot" style={{ background: opt.color }} />
                    <span style={{ color: '#182939' }}>{EnumLabels.TaskPriority[opt.value]}</span>
                  </div>
                ))}
              </div>
            )}
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

const KanbanColumn = ({ column, onOpenComments, onUpdatePriority }) => {
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
      
      <Droppable droppableId={String(column.id)}>
        {(provided, snapshot) => (
          <div 
            className={`column-cards ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '100px' }}
          >
            {column.cards.map((card, index) => (
              <Draggable key={String(card.id)} draggableId={String(card.id)} index={index}>
                {(provided, snapshot) => (
                  <KanbanCard 
                    card={card} 
                    onOpenComments={onOpenComments}
                    onUpdatePriority={onUpdatePriority}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button className="add-task-row">
              <Icon icon="carbon:add" className="plus-sm" />
              <span>New Task</span>
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
};

const KanbanBoard = ({ columns, setColumns, onNewTask, onOpenComments }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColIndex = columns.findIndex(col => String(col.id) === source.droppableId);
    const destColIndex = columns.findIndex(col => String(col.id) === destination.droppableId);

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceCards = Array.from(sourceCol.cards || []);
    const destCards = source.droppableId === destination.droppableId 
      ? sourceCards 
      : Array.from(destCol.cards || []);

    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    const newBoardData = [...columns];
    newBoardData[sourceColIndex] = {
      ...sourceCol,
      cards: sourceCards,
      count: sourceCards.length
    };

    if (source.droppableId !== destination.droppableId) {
      newBoardData[destColIndex] = {
        ...destCol,
        cards: destCards,
        count: destCards.length
      };
    }

    setColumns(newBoardData);
  };

  const handleUpdatePriority = (cardId, newPriority, newColor) => {
    const newBoardData = columns.map(col => {
      const updatedCards = col.cards?.map(card => {
        if (card.id === cardId) {
          return { ...card, priority: newPriority, priorityColor: newColor };
        }
        return card;
      }) || [];
      return { ...col, cards: updatedCards };
    });
    setColumns(newBoardData);
  };

  const isEmpty = !columns || columns.every(col => !col.cards || col.cards.length === 0);

  if (isEmpty) {
    return <EmptyState onAction={onNewTask} />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {columns.map((col) => (
          <KanbanColumn 
            key={col.id} 
            column={col} 
            onOpenComments={onOpenComments} 
            onUpdatePriority={handleUpdatePriority}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
