// @ts-nocheck
import { Icon } from '@iconify/react';
import { EnumLabels, TaskPriority, TaskState } from '../../../constants/enums';
import EmptyState from '../../shared/EmptyState/EmptyState';
import InlineDropdown from '../../shared/InlineDropdown/InlineDropdown';
import './TaskListView.css';

const entityIcons = {
  laptop: 'solar:laptop-minimalistic-linear',
  company: 'solar:buildings-2-linear',
  user: 'solar:user-linear',
  'file-user': 'solar:file-text-linear',
};

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

const TaskRow = ({ task, onOpenComments, onUpdateTask, onDeleteTask, onSelectTask }) => {
  const handlePriorityChange = (newPriority) => {
    onUpdateTask(task.id, {
      priority: newPriority,
      priorityColor: priorityColors[newPriority] || '#F19100',
    });
  };

  const handleStatusChange = (newStatus) => {
    const style = statusStyles[newStatus] || { bg: '#EAF2FD', text: '#182939' };
    onUpdateTask(task.id, {
      status: newStatus,
      statusBg: style.bg,
      statusText: style.text,
    });
  };

  return (
    <div className="task-row" onClick={() => onSelectTask && onSelectTask(task)}>
      <div className="cell cell-checkbox" onClick={(e) => { 
        e.stopPropagation(); 
        const isNowCompleted = !task.completed;
        onUpdateTask(task.id, { 
          completed: isNowCompleted,
          status: isNowCompleted ? TaskState.Done : TaskState.Pending 
        }); 
      }}>
        <Icon icon={task.completed ? "solar:check-circle-bold" : "solar:check-circle-linear"} className={`unchecked-icon ${task.completed ? 'checked' : ''}`} />
      </div>

      <div className="cell cell-name">
        <span className="task-title">{task.title}</span>
      </div>

      <div className="cell cell-comments">
        <div className="comment-counter-wrapper" onClick={(e) => { e.stopPropagation(); onOpenComments && onOpenComments(task); }}>
          <Icon icon="solar:chat-round-line-linear" className="comment-msg-icon" />
          <span className="comments-badge">{task.comments}</span>
        </div>
      </div>

      <div className="cell cell-priority" onClick={(e) => e.stopPropagation()}>
        <InlineDropdown
          options={priorityOptions}
          value={task.priority}
          onChange={handlePriorityChange}
        >
          <div className="priority-pill">
            <div className="priority-dot-wrapper">
              <div
                className="priority-dot"
                style={{ background: task.priorityColor }}
              />
            </div>
            <span className="priority-text">{EnumLabels.TaskPriority[task.priority] ?? task.priority}</span>
          </div>
        </InlineDropdown>
      </div>

      <div className="cell cell-assignee">
        <div className="assignee-wrapper">
          <div className="assignee-info">
            <div className="avatar-circle">
              <span>{task.assignee ? task.assignee.split(' ').map(n => n[0]).join('').slice(0, 2) : 'U'}</span>
            </div>
            <span className="assignee-name">{task.assignee || 'Unassigned'}</span>
          </div>
          <div className="entity-icon-wrapper">
            <Icon
              icon={entityIcons[task.entity] || 'solar:user-linear'}
              className="entity-icon"
            />
          </div>
        </div>
      </div>

      <div className="cell cell-due">
        {task.overdue ? (
          <div className="due-overdue">
            <span className="due-overdue-text">{task.dueDate}</span>
            <Icon icon="solar:alarm-linear" className="alarm-icon" />
          </div>
        ) : (
          <span className="due-normal">{task.dueDate}</span>
        )}
      </div>

      <div className="cell cell-status" onClick={(e) => e.stopPropagation()}>
        <InlineDropdown
          options={statusOptions}
          value={task.status}
          onChange={handleStatusChange}
        >
          <div
            className="status-badge"
            style={{
              background: task.statusBg,
              color: task.statusText,
            }}
          >
            {EnumLabels.TaskState[task.status] ?? task.status}
          </div>
        </InlineDropdown>
      </div>

      <div className="cell cell-actions" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

const TaskListView = ({ tasks, onNewTask, onOpenComments, onUpdateTask, onDeleteTask, onSelectTask }) => {
  if (!tasks || tasks.length === 0) {
    return <EmptyState onAction={onNewTask} />;
  }

  const groups = ['Today', 'Tomorrow', 'Upcoming'];

  return (
    <div className="task-list-view">
      {groups.map((group) => {
        const groupTasks = tasks.filter((t) => t.group === group);
        if (groupTasks.length === 0) return null;

        return (
          <div key={group} className="task-group">
            <div className="group-header">
              <span className="group-title">{group}</span>
            </div>
            <div className="group-rows">
              {groupTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onOpenComments={onOpenComments}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  onSelectTask={onSelectTask}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskListView;
