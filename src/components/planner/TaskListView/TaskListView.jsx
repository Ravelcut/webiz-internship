import { Icon } from '@iconify/react';
import EmptyState from '../../shared/EmptyState/EmptyState';
import './TaskListView.css';

const entityIcons = {
  laptop: 'solar:laptop-minimalistic-linear',
  company: 'solar:buildings-2-linear',
  user: 'solar:user-linear',
  'file-user': 'solar:file-text-linear',
};

const TaskRow = ({ task, onOpenComments }) => {
  return (
    <div className="task-row">
      <div className="cell cell-checkbox">
        <Icon icon="solar:check-circle-linear" className="checkbox-icon" />
      </div>

      <div className="cell cell-name">
        <span className="task-title">{task.title}</span>
      </div>

      <div className="cell cell-comments">
        <div className="comment-counter-wrapper" onClick={() => onOpenComments && onOpenComments(task)}>
          <Icon icon="solar:chat-round-line-linear" className="comment-msg-icon" />
          <span className="comments-badge">{task.comments}</span>
        </div>
      </div>

      <div className="cell cell-priority">
        <div className="priority-pill">
          <div className="priority-dot-wrapper">
            <div
              className="priority-dot"
              style={{ background: task.priorityColor }}
            />
          </div>
          <span className="priority-text">{task.priority}</span>
        </div>
      </div>

      <div className="cell cell-assignee">
        <div className="assignee-wrapper">
          <div className="assignee-info">
            <div className="avatar-circle">
              <span>{task.assignee.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
            </div>
            <span className="assignee-name">{task.assignee}</span>
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

      <div className="cell cell-status">
        <div
          className="status-badge"
          style={{
            background: task.statusBg,
            color: task.statusText,
          }}
        >
          {task.status}
        </div>
      </div>
    </div>
  );
};

const TaskListView = ({ tasks, onNewTask, onOpenComments }) => {
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
                <TaskRow key={task.id} task={task} onOpenComments={onOpenComments} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskListView;
