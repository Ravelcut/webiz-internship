import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './Widgets.css';

const JobStatusCard = ({ candidate }) => {
  const [status, setStatus] = useState(candidate.status);
  const [privacy, setPrivacy] = useState(candidate.accountPrivacy);
  const [isSearching, setIsSearching] = useState(true);

  return (
    <div className="widget-card job-status-card">
      <div className="status-header">
        <span className="status-title">Current job search status</span>
        <div 
          className={`status-switch ${isSearching ? 'active' : ''}`}
          onClick={() => setIsSearching(!isSearching)}
        >
          <div className="switch-handle"></div>
        </div>
      </div>

      <div className="availability-grid">
        <button 
          className={`availability-btn ${status === 'Looking' ? 'active' : ''}`}
          onClick={() => setStatus('Looking')}
        >
          <span className="avail-label">Looking</span>
          <span className="avail-sub">Maximize Approaches</span>
        </button>
        <button 
          className={`availability-btn special ${status === 'Open' ? 'active' : ''}`}
          onClick={() => setStatus('Open')}
        >
          <span className="avail-label">Open</span>
          <span className="avail-sub">Relevant Approaches</span>
        </button>
        <button 
          className={`availability-btn ${status === 'Not Looking' ? 'active' : ''}`}
          onClick={() => setStatus('Not Looking')}
        >
          <span className="avail-label">Not Looking</span>
          <span className="avail-sub">Minimize Approaches</span>
        </button>
      </div>

      <div className="privacy-section">
        <div className="account-privacy">
          <span className="privacy-header-label">Choose Account Privacy</span>
          <div className="privacy-switcher">
            <button 
              className={`privacy-pill ${privacy === 'Public account' ? 'active' : ''}`}
              onClick={() => setPrivacy('Public account')}
            >
              Public account
            </button>
            <button 
              className={`privacy-pill ${privacy === 'Private account' ? 'active' : ''}`}
              onClick={() => setPrivacy('Private account')}
            >
              Private account
            </button>
          </div>
        </div>

        <div className="cv-privacy">
          <span className="privacy-header-label">Choose Talent CV Privacy</span>
          <div className="cv-privacy-dropdown">
            <span className="cv-privacy-value">{candidate.cvPrivacy || 'Fully Visible'}</span>
            <Icon icon="solar:alt-arrow-down-linear" />
          </div>
        </div>
      </div>

      <div className="status-footer">
        <span className="availability-date">December 2025</span>
      </div>
    </div>
  );
};

export default JobStatusCard;
