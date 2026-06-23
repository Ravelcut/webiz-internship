// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './NewJobModal.css';

const NewJobModal = ({ isOpen, onClose, onCreateJob, onUpdateJob, jobToEdit }) => {
  const [title, setTitle] = useState('');
  const [seniority, setSeniority] = useState('Middle');
  const [salaryType, setSalaryType] = useState('Gross');
  const [salaryRange, setSalaryRange] = useState('Negotiable');
  const [status, setStatus] = useState('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title || '');
      setSeniority(jobToEdit.seniority || 'Middle');
      setSalaryType(jobToEdit.salaryType || 'Gross');
      setSalaryRange(jobToEdit.salaryRange || 'Negotiable');
      setStatus(jobToEdit.status || 'Active');
    } else {
      setTitle('');
      setSeniority('Middle');
      setSalaryType('Gross');
      setSalaryRange('Negotiable');
      setStatus('Active');
    }
  }, [jobToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        seniority,
        salaryType,
        salaryRange: salaryRange.trim() || 'Negotiable',
        status,
      };

      if (jobToEdit) {
        // Support both backend DTO JobId and generic Id
        const jobId = jobToEdit.jobId || jobToEdit.id;
        // Strip out the '#' prefix if it exists from UI rendering helper mapping
        const cleanJobId = typeof jobId === 'string' && jobId.startsWith('#') ? Number(jobId.substring(1)) : Number(jobId);
        await onUpdateJob({ ...payload, jobId: cleanJobId });
      } else {
        await onCreateJob(payload);
      }
      onClose();
    } catch (error) {
      console.error('Failed to submit job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-job-modal-overlay">
      <div className="new-job-modal-card shadow-premium animate-scale-in">
        <div className="modal-header">
          <h2>{jobToEdit ? 'Edit Job' : 'New Job'}</h2>
          <button className="close-btn" onClick={onClose}>
            <Icon icon="solar:close-circle-linear" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="job-title">Job Title</label>
            <input
              id="job-title"
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row-double">
            <div className="form-group">
              <label htmlFor="job-seniority">Seniority</label>
              <select
                id="job-seniority"
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
              >
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="job-status">Status</label>
              <select
                id="job-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Frozen">Frozen</option>
                <option value="Hired">Hired</option>
              </select>
            </div>
          </div>

          <div className="form-row-double">
            <div className="form-group">
              <label htmlFor="job-salary-type">Salary Type</label>
              <select
                id="job-salary-type"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="Gross">Gross</option>
                <option value="Net">Net</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="job-salary-range">Salary Range</label>
              <input
                id="job-salary-range"
                type="text"
                placeholder="e.g. 3000-5000$ or Negotiable"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : jobToEdit ? 'Save Changes' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewJobModal;
