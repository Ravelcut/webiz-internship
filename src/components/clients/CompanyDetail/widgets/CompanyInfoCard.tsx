// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './CompanyInfoCard.css';

const CompanyInfoCard = ({ company, onNewTask }) => {
  return (
    <div className="company-info-card glass">
      <div className="info-card-header">
        <div className="company-basic">
          <Icon icon="solar:buildings-2-bold" className="building-icon" />
          <span className="company-name">{company.name}</span>
          <div className="teams-dropdown">
            <span>All teams</span>
            <Icon icon="solar:alt-arrow-down-linear" />
          </div>
        </div>
        
        <div className="header-actions">
          <div className="message-notif">
            <Icon icon="solar:chat-round-dots-linear" />
            <span className="notif-badge">3</span>
          </div>
          <button className="action-link" onClick={() => onNewTask(company)}>Create a Task</button>
          <button className="action-link link-gray">Edit details</button>
        </div>
      </div>

      <div className="info-card-body">
        <div className="company-large-logo" style={{ background: `${company.logoColor}15`, color: company.logoColor }}>
          <Icon icon={company.logo} />
        </div>

        <div className="metadata-grid">
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:user-linear" /></div>
            <div className="meta-content">
              <label>Representative</label>
              <span>{company.representative}</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:case-linear" /></div>
            <div className="meta-content">
              <label>ID</label>
              <span>2222</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:phone-linear" /></div>
            <div className="meta-content">
              <label>Phone number</label>
              <span>N/A</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:letter-linear" /></div>
            <div className="meta-content">
              <label>Corporate email</label>
              <span>N/A</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:map-point-linear" /></div>
            <div className="meta-content">
              <label>Zip Code</label>
              <span>N/A</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:flag-linear" /></div>
            <div className="meta-content">
              <label>Country</label>
              <span>Georgia</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:city-linear" /></div>
            <div className="meta-content">
              <label>City</label>
              <span>Tbilisi</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon-box"><Icon icon="solar:map-point-linear" /></div>
            <div className="meta-content">
              <label>Street Address</label>
              <span>N/A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card-inputs">
        <div className="input-group">
          <label>Tax</label>
          <div className="input-with-val">15%</div>
        </div>
        <div className="input-group">
          <label>Overhead</label>
          <div className="input-with-val">1500$</div>
        </div>
        <div className="input-group">
          <label>Profit</label>
          <div className="input-with-val">1500$</div>
        </div>
        
        <div className="edit-btn-box">
          <Icon icon="solar:pen-linear" />
        </div>
        
        <div className="type-dropdown">
          <div className="type-label">Customer Type</div>
          <div className="type-value">
            <span>Affiliate</span>
            <Icon icon="solar:alt-arrow-down-linear" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoCard;
