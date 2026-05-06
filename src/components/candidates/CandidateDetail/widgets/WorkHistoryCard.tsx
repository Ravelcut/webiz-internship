// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './Widgets.css';

const WorkHistoryCard = ({ workHistory }) => {
  return (
    <div className="widget-card work-history-card">
      <div className="widget-header">
        <Icon icon="solar:case-linear" className="header-icon" />
        <h3 className="widget-title">Work History</h3>
      </div>
      
      <div className="timeline-container">
        {workHistory.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot"></div>
              {index !== workHistory.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
              <h4 className="role-title">{item.title}</h4>
              <span className="company-name">{item.company}</span>
              <div className="time-info">
                <span className="date-range">{item.date}</span>
                <span className="duration"> • {item.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistoryCard;
