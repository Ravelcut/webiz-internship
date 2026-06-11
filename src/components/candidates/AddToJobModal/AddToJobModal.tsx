// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './AddToJobModal.css';

const AddToJobModal = ({ candidate, onClose, onConfirm }) => {
  const [selectedJob, setSelectedJob] = useState('');

  const mockJobs = [
    { id: '1', title: 'Lead C# Backend Developer', dept: 'Engineering' },
    { id: '2', title: 'Senior React Developer', dept: 'Frontend' },
    { id: '3', title: 'Cloud Infrastructure Architect', dept: 'DevOps' },
    { id: '4', title: 'Mid-Level QA Engineer', dept: 'QA' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    const job = mockJobs.find(j => j.id === selectedJob);
    onConfirm(job);
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal-card glass shadow-premium animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="job-modal-header">
          <div className="title-group">
            <Icon icon="ph:plus-circle-bold" className="job-header-icon" />
            <h3>Add to Job</h3>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <Icon icon="solar:close-circle-linear" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="job-modal-body">
          <p className="job-modal-sub">
            Assign <strong>{candidate?.name}</strong> to an open job opportunity within your organization.
          </p>

          <div className="form-group">
            <label htmlFor="jobSelect">Select Open Role</label>
            <select 
              id="jobSelect" 
              value={selectedJob} 
              onChange={e => setSelectedJob(e.target.value)}
              required
              className="job-select-input"
            >
              <option value="">-- Choose Job --</option>
              {mockJobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.dept})
                </option>
              ))}
            </select>
          </div>

          <div className="job-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-btn" disabled={!selectedJob}>
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToJobModal;
