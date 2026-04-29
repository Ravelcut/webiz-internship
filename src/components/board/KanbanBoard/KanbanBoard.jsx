import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { EnumLabels } from '../../../constants/enums';
import { Icon } from '@iconify/react';
import EmptyState from '../../shared/EmptyState/EmptyState';
import './KanbanBoard.css';

const entityIcons = {
  laptop: 'solar:laptop-minimalistic-linear',
  company: 'carbon:building',
  user: 'solar:user-linear',
  'file-user': 'solar:file-text-linear',
};

const KanbanCard = ({ card, onOpenComments, provided, snapshot }) => {
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
          <div className="priority-chip">
            <div className="priority-dot" style={{ background: card.priorityColor }} />
            <span className="priority-label">{EnumLabels.TaskPriority[card.priority] || card.priority}</span>
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

const KanbanBoard = ({ columns: initialColumns, onNewTask, onOpenComments }) => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    setBoardData(initialColumns || []);
  }, [initialColumns]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColIndex = boardData.findIndex(col => String(col.id) === source.droppableId);
    const destColIndex = boardData.findIndex(col => String(col.id) === destination.droppableId);

    const sourceCol = boardData[sourceColIndex];
    const destCol = boardData[destColIndex];

    const sourceCards = Array.from(sourceCol.cards || []);
    const destCards = source.droppableId === destination.droppableId 
      ? sourceCards 
      : Array.from(destCol.cards || []);

    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    const newBoardData = [...boardData];
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

    setBoardData(newBoardData);
  };

  const isEmpty = !boardData || boardData.every(col => !col.cards || col.cards.length === 0);

  if (isEmpty) {
    return <EmptyState onAction={onNewTask} />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {boardData.map((col) => (
          <KanbanColumn key={col.id} column={col} onOpenComments={onOpenComments} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
