import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import CompanyInfoCard from './widgets/CompanyInfoCard';
import TeamSidebar from './widgets/TeamSidebar';
import InterviewSchedule from './widgets/InterviewSchedule';
import JobsManagement from './widgets/JobsManagement';
import ActionsTable from './widgets/ActionsTable';
import './CompanyDetail.css';

const CompanyDetail = ({ company, onBack, onNewTask }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'documents', label: 'Documents' },
    { id: 'profile', label: 'Profile' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'availability', label: 'Availability' },
    { id: 'daysoff', label: 'Days off' },
    { id: 'jobs', label: 'Jobs' },
  ];

  return (
    <div className="company-detail">
      <header className="company-detail-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            <Icon icon="solar:hamburger-menu-linear" className="menu-icon" />
          </button>
          <div className="company-title">
            <Icon icon="solar:widget-2-bold" className="company-icon" />
            <span className="title-text">Company</span>
          </div>
          
          <nav className="detail-tabs">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <button className="tab-btn more">
              <Icon icon="solar:menu-dots-bold" />
            </button>
          </nav>
        </div>

        <div className="header-right">
          <div className="header-icon-btns">
            <button className="icon-badge-btn">
              <Icon icon="solar:bell-linear" />
            </button>
            <div className="user-profile-circle">NP</div>
            <div className="project-selector">
              <span className="project-name">Legato</span>
              <Icon icon="solar:alt-arrow-down-linear" />
            </div>
          </div>
        </div>
      </header>

      <main className="company-dashboard-content">
        <div className="dashboard-grid">
          <div className="grid-top">
            <CompanyInfoCard company={company} onNewTask={onNewTask} />
            <TeamSidebar />
          </div>
          
          <div className="grid-middle">
            <InterviewSchedule />
            <JobsManagement />
          </div>

          <div className="grid-bottom">
            <ActionsTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDetail;
