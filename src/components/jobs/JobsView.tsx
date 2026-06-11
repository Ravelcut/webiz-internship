// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { jobsStats, jobsListData } from '../../data/mockData';
import './JobsView.css';

const JobsView = ({ listData = [], onJobClick }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const prioritySeniority = {
    'Low': 'Junior',
    'Medium': 'Middle',
    'High': 'Senior',
    'Critical': 'Lead',
    'Lowest': 'Intern'
  };

  const stateStatus = {
    'Pending': 'Active',
    'InProgress': 'Active',
    'InReview': 'Active',
    'Done': 'Hired'
  };

  const statusColors = {
    'Active': '#2F80ED',
    'Hired': '#08AC16',
    'Frozen': '#ED5757',
  };

  const jobs = listData.length > 0 
    ? listData.map((task) => {
        const mappedStatus = stateStatus[task.status] || 'Active';
        return {
          id: `#${task.id}`,
          title: task.title,
          seniority: prioritySeniority[task.priority] || 'Middle',
          salaryType: 'Gross',
          salaryRange: 'Negotiable',
          status: mappedStatus,
          statusColor: statusColors[mappedStatus] || '#2F80ED',
          rawTask: task
        };
      })
    : jobsListData;

  const totalCount = jobs.length;
  const activeCount = jobs.filter(j => j.status === 'Active').length;
  const hiredCount = jobs.filter(j => j.status === 'Hired').length;
  const frozenCount = jobs.filter(j => j.status === 'Frozen').length;

  const stats = [
    { label: 'All Jobs', value: totalCount.toString(), icon: 'solar:suitcase-tag-bold', color: '#2F80ED' },
    { label: 'Active', value: activeCount.toString(), icon: 'solar:play-circle-bold', color: '#2F80ED' },
    { label: 'Hired', value: hiredCount.toString(), icon: 'solar:check-circle-bold', color: '#08AC16' },
    { label: 'Frozen/Archived', value: frozenCount.toString(), icon: 'solar:close-circle-bold', color: '#ED5757' },
  ];

  const filteredJobs = activeFilter === 'All'
    ? jobs
    : jobs.filter(j => j.status.toLowerCase() === activeFilter.toLowerCase());

  const filters = [
    { label: 'All', color: '#2F80ED' },
    { label: 'Active', color: '#2F80ED' },
    { label: 'Hired', color: '#08AC16' },
    { label: 'Frozen', color: '#ED5757' },
  ];

  const dropdownItems = [
    { label: 'Edit', icon: 'solar:pen-linear' },
    { label: 'View as a Candidate', icon: 'solar:eye-linear' },
    { label: 'Create a Task', icon: 'solar:list-check-linear' },
    { label: 'Freeze', icon: 'solar:clock-circle-linear' },
    { label: 'Delete', icon: 'solar:trash-bin-trash-linear', isDelete: true },
  ];

  return (
    <div className="jobs-view animate-fade-in">
      {/* Stats Bar */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon-box" style={{ backgroundColor: stat.color }}>
              <Icon icon={stat.icon} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="jobs-content-card">
        {/* Toolbar */}
        <div className="jobs-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <Icon icon="solar:magnifer-linear" className="search-icon" />
              <input type="text" placeholder="Search jobs" />
            </div>

            <div className="status-filters">
              {filters.map(filter => (
                <button 
                  key={filter.label}
                  className={`filter-pill ${activeFilter === filter.label ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.label)}
                >
                  {filter.label !== 'All' && <div className="dot" style={{ backgroundColor: filter.color }} />}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="toolbar-right">
            <div className="view-toggles">
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <Icon icon="solar:list-linear" />
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Icon icon="solar:widget-linear" />
              </button>
            </div>

            <button className="new-job-btn">
              <Icon icon="solar:add-circle-linear" />
              New job
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="job-cards-grid">
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className="job-card shadow-premium"
              onClick={() => onJobClick?.(job)}
              style={{ cursor: 'pointer' }}
            >
              <div className="job-card-header">
                <div className="job-id-title">
                  <span className="job-id">{job.id}</span>
                  <span className="job-title">{job.title}</span>
                </div>
                <button 
                  className="more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdownId(openDropdownId === job.id ? null : job.id);
                  }}
                >
                  <Icon icon="solar:menu-dots-bold" />
                </button>

                {openDropdownId === job.id && (
                  <div className="action-dropdown shadow-premium">
                    {dropdownItems.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`dropdown-item ${item.isDelete ? 'delete' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(null);
                        }}
                      >
                        <Icon icon={item.icon} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="candidate-thumbnails">
                <img src="https://i.pravatar.cc/150?u=1" alt="candidate" className="candidate-thumb" />
                <img src="https://i.pravatar.cc/150?u=2" alt="candidate" className="candidate-thumb" />
                <img src="https://i.pravatar.cc/150?u=3" alt="candidate" className="candidate-thumb" />
                <img src="https://i.pravatar.cc/150?u=4" alt="candidate" className="candidate-thumb" />
                <img src="https://i.pravatar.cc/150?u=5" alt="candidate" className="candidate-thumb" />
                <img src="https://i.pravatar.cc/150?u=6" alt="candidate" className="candidate-thumb" style={{ filter: 'grayscale(1)', opacity: 0.5 }} />
              </div>

              <div className="job-card-details">
                <div className="detail-item">
                  <span className="detail-value">{job.seniority}</span>
                  <span className="detail-label">Seniority</span>
                </div>
                <div className="detail-item">
                  <span className="detail-value">{job.salaryType}</span>
                  <span className="detail-label">Salary Type</span>
                </div>
                <div className="detail-item">
                  <span className="detail-value">{job.salaryRange}</span>
                  <span className="detail-label">Salary Range</span>
                </div>
                <div className="detail-item">
                  <span className="detail-value status-text" style={{ color: job.statusColor }}>{job.status}</span>
                  <span className="detail-label">Status</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsView;
