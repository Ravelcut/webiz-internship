import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { dashboardJobs } from '../../../../data/mockData';
import './JobsManagement.css';

const JobsManagement = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="jobs-management glass">
      <div className="jobs-header">
        <div className="header-left">
          <Icon icon="solar:case-linear" className="jobs-icon" />
          <span className="jobs-title">Jobs</span>
        </div>
        <div className="jobs-filter-dropdown">
          <span>Open jobs</span>
          <Icon icon="solar:alt-arrow-down-linear" />
        </div>
      </div>

      <div className="jobs-tabs">
        <button 
          className={`jobs-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All jobs
        </button>
        <button 
          className={`jobs-tab-btn ${activeTab === 'problematic' ? 'active' : ''}`}
          onClick={() => setActiveTab('problematic')}
        >
          Problematic jobs (3)
        </button>
        <button 
          className={`jobs-tab-btn ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open jobs (24)
        </button>
      </div>

      <div className="jobs-list">
        {dashboardJobs.map(job => (
          <div key={job.id} className="job-item">
            <div className="job-bar" style={{ background: job.color }}></div>
            <div className="job-info">
              <div className="job-main">
                <span className="job-name">{job.title}</span>
                <span className="last-activity">Last activity: {job.activity}</span>
              </div>
              <div className="job-stats">
                <span className="stat">{job.recommended} recommended</span>
                <span className="dot"></span>
                <span className="stat">{job.chosen} chosen</span>
                <span className="dot"></span>
                <span className="stat">{job.inProgress} in progress</span>
              </div>
            </div>
            {job.urgent && (
              <div className="urgent-tag">
                <Icon icon="solar:chat-round-dots-bold" />
                <span>Open for 32 days</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsManagement;
