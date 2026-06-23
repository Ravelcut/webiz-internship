// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './ActionsTable.css';

const ActionsTable = ({ assignments = [] }) => {
  const displayActions = (assignments || []).map((assignment, index) => {
    const priorityNames = {
      0: 'Lowest',
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Critical',
    };
    return {
      id: assignment.id || index,
      job: 'Assignment Task',
      candidate: assignment.talent 
        ? `${assignment.talent.name || ''} ${assignment.talent.lastname || ''}`.trim() 
        : (assignment.employee ? `${assignment.employee.name || ''} ${assignment.employee.lastname || ''}`.trim() : 'Unassigned'),
      date: assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date',
      description: assignment.title || 'No Title',
      action: priorityNames[assignment.priority] || 'Task'
    };
  });

  return (
    <div className="required-actions-container glass">
      <div className="actions-header">
        <Icon icon="solar:clipboard-list-linear" className="actions-icon" />
        <span className="actions-title">Required actions</span>
      </div>

      <div className="actions-grid">
        <div className="grid-header">
          <div className="col">Type</div>
          <div className="col">Assignee</div>
          <div className="col">Due Date</div>
          <div className="col">Task Title</div>
          <div className="col">Priority</div>
        </div>

        <div className="grid-rows">
          {displayActions.length === 0 ? (
            <div className="empty-state-text" style={{ padding: '24px', textAlign: 'center', color: '#687A9E' }}>No pending actions</div>
          ) : (
            displayActions.map(action => (
              <div key={action.id} className="grid-row">
                <div className="col job-col">{action.job}</div>
                <div className="col candidate-col">{action.candidate}</div>
                <div className="col date-col">{action.date}</div>
                <div className="col desc-col">{action.description}</div>
                <div className="col action-col">
                  <button className="action-btn">
                    <span>{action.action}</span>
                    <Icon icon="solar:alt-arrow-right-linear" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionsTable;
