// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './JobsManagement.css';

const JobsManagement = ({ jobs = [] }) => {
  const [activeTab, setActiveTab] = useState('all');

  const statusColors = {
    'Active': '#08AC16',
    'Hired': '#2F80ED',
    'Frozen': '#ED5757',
  };

  const displayJobs = (jobs || []).map(job => ({
    id: job.id,
    title: job.title || 'Untitled Job',
    activity: job.creationDate ? new Date(job.creationDate).toLocaleDateString() : 'Recent',
    color: statusColors[job.status] || '#08AC16',
    recommended: 0,
    chosen: 0,
    inProgress: 0,
    status: job.status || 'Active',
    urgent: job.status === 'Active'
  }));

  const filteredJobs = displayJobs.filter(job => {
    if (activeTab === 'problematic') return false;
    if (activeTab === 'open') return job.status === 'Active';
    return true;
  });

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
          Problematic jobs (0)
        </button>
        <button 
          className={`jobs-tab-btn ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open jobs ({displayJobs.filter(j => j.status === 'Active').length})
        </button>
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="empty-state-text" style={{ padding: '24px', textAlign: 'center', color: '#687A9E' }}>No jobs found</div>
        ) : (
          filteredJobs.map(job => (
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
                  <span>Open</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobsManagement;
