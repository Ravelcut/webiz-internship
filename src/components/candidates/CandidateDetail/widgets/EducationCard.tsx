// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './Widgets.css';

const EducationCard = ({ education, courses }) => {
  return (
    <div className="widget-card education-card">
      <div className="widget-header">
        <Icon icon="solar:hat-linear" className="header-icon" />
        <h3 className="widget-title">Education</h3>
      </div>

      <div className="edu-section">
        <div className="section-title">University</div>
        <div className="edu-list">
          {education.map((item, index) => (
            <div key={index} className="edu-item-card">
              <Icon icon="solar:hat-linear" className="edu-item-icon" />
              <div className="edu-info">
                <h4 className="edu-name">{item.title}</h4>
                <span className="edu-school">{item.school} • {item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="edu-divider"></div>

      <div className="edu-section">
        <div className="section-title">Courses</div>
        <div className="edu-list">
          {courses.map((item, index) => (
            <div key={index} className="edu-item-card">
              <Icon icon="solar:book-linear" className="edu-item-icon" />
              <div className="edu-info">
                <h4 className="edu-name">{item.title}</h4>
                <span className="edu-school">{item.school}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
