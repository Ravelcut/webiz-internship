// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import { requiredActions } from '../../../../data/mockData';
import './ActionsTable.css';

const ActionsTable = () => {
  return (
    <div className="required-actions-container glass">
      <div className="actions-header">
        <Icon icon="solar:clipboard-list-linear" className="actions-icon" />
        <span className="actions-title">Required actions</span>
      </div>

      <div className="actions-grid">
        <div className="grid-header">
          <div className="col">Name of the job</div>
          <div className="col">Candidate name</div>
          <div className="col">Date</div>
          <div className="col">Action description</div>
          <div className="col">Action</div>
        </div>

        <div className="grid-rows">
          {requiredActions.map(action => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionsTable;
