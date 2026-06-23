// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { jobService } from '../../services/jobService';
import NewJobModal from '../shared/NewJobModal/NewJobModal';
import './JobsView.css';

const JobsView = ({ jobs = [], onJobClick, onRefreshJobs, userRole }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobToEdit, setSelectedJobToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors = {
    'Active': '#2F80ED',
    'Hired': '#08AC16',
    'Frozen': '#ED5757',
  };

  const displayJobs = (jobs || []).map((job) => {
    const mappedStatus = job.status || 'Active';
    return {
      id: `#${job.id}`,
      title: job.title || 'Untitled Position',
      seniority: job.seniority || 'Middle',
      salaryType: job.salaryType || 'Gross',
      salaryRange: job.salaryRange || 'Negotiable',
      status: mappedStatus,
      statusColor: statusColors[mappedStatus] || '#2F80ED',
      companyName: job.companyName || 'Unknown Company',
      rawJob: job
    };
  });

  const totalCount = displayJobs.length;
  const activeCount = displayJobs.filter(j => j.status === 'Active').length;
  const hiredCount = displayJobs.filter(j => j.status === 'Hired').length;
  const frozenCount = displayJobs.filter(j => j.status === 'Frozen').length;

  const stats = [
    { label: 'All Jobs', value: totalCount.toString(), icon: 'solar:suitcase-tag-bold', color: '#2F80ED' },
    { label: 'Active', value: activeCount.toString(), icon: 'solar:play-circle-bold', color: '#2F80ED' },
    { label: 'Hired', value: hiredCount.toString(), icon: 'solar:check-circle-bold', color: '#08AC16' },
    { label: 'Frozen/Archived', value: frozenCount.toString(), icon: 'solar:close-circle-bold', color: '#ED5757' },
  ];

  const filteredJobs = displayJobs
    .filter(j => {
      if (activeFilter === 'All') return true;
      return j.status.toLowerCase() === activeFilter.toLowerCase();
    })
    .filter(j => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        j.title.toLowerCase().includes(term) ||
        (j.companyName && j.companyName.toLowerCase().includes(term)) ||
        j.seniority.toLowerCase().includes(term) ||
        j.id.toLowerCase().includes(term)
      );
    });

  const filters = [
    { label: 'All', color: '#2F80ED' },
    { label: 'Active', color: '#2F80ED' },
    { label: 'Hired', color: '#08AC16' },
    { label: 'Frozen', color: '#ED5757' },
  ];

  const dropdownItems = [
    { label: 'Edit', icon: 'solar:pen-linear', action: 'edit' },
    { label: 'Freeze', icon: 'solar:clock-circle-linear', action: 'freeze' },
    { label: 'Delete', icon: 'solar:trash-bin-trash-linear', isDelete: true, action: 'delete' },
  ];

  const handleCreateJob = async (payload) => {
    try {
      await jobService.createJob(payload);
      onRefreshJobs?.();
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const handleUpdateJob = async (payload) => {
    try {
      await jobService.updateJob(payload);
      onRefreshJobs?.();
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        const cleanId = typeof jobId === 'string' && jobId.startsWith('#') ? Number(jobId.substring(1)) : Number(jobId);
        await jobService.deleteJob(cleanId);
        onRefreshJobs?.();
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  const handleToggleFreezeJob = async (job) => {
    try {
      const newStatus = job.status === 'Frozen' ? 'Active' : 'Frozen';
      const jobId = job.rawJob?.id || job.id;
      const cleanId = typeof jobId === 'string' && jobId.startsWith('#') ? Number(jobId.substring(1)) : Number(jobId);
      
      await jobService.updateJob({
        jobId: cleanId,
        title: job.title,
        seniority: job.seniority,
        salaryType: job.salaryType,
        salaryRange: job.salaryRange,
        status: newStatus
      });
      onRefreshJobs?.();
    } catch (error) {
      console.error('Failed to toggle freeze job:', error);
    }
  };

  const handleDropdownAction = (action, job) => {
    setOpenDropdownId(null);
    if (action === 'edit') {
      setSelectedJobToEdit(job.rawJob || job);
      setIsModalOpen(true);
    } else if (action === 'delete') {
      handleDeleteJob(job.id);
    } else if (action === 'freeze') {
      handleToggleFreezeJob(job);
    }
  };

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
              <input 
                type="text" 
                placeholder="Search jobs" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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

            {userRole === 'company' && (
              <button className="new-job-btn" onClick={() => {
                setSelectedJobToEdit(null);
                setIsModalOpen(true);
              }}>
                <Icon icon="solar:add-circle-linear" />
                New job
              </button>
            )}
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
                  <div className="job-header-top">
                    <span className="job-id">{job.id}</span>
                    {job.companyName && <span className="job-company">{job.companyName}</span>}
                  </div>
                  <span className="job-title">{job.title}</span>
                </div>
                
                {userRole === 'company' && (
                  <>
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
                        {dropdownItems.map((item, idx) => {
                          // Toggle label based on current status
                          const itemLabel = item.action === 'freeze' && job.status === 'Frozen' ? 'Unfreeze' : item.label;
                          const itemIcon = item.action === 'freeze' && job.status === 'Frozen' ? 'solar:play-circle-linear' : item.icon;
                          
                          return (
                            <div 
                              key={idx} 
                              className={`dropdown-item ${item.isDelete ? 'delete' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDropdownAction(item.action, job);
                              }}
                            >
                              <Icon icon={itemIcon} />
                              <span>{itemLabel}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
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

      <NewJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJobToEdit(null);
        }}
        onCreateJob={handleCreateJob}
        onUpdateJob={handleUpdateJob}
        jobToEdit={selectedJobToEdit}
      />
    </div>
  );
};

export default JobsView;
