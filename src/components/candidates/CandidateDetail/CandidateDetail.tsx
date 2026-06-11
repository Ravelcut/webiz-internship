// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { candidateProfile } from '../../../data/mockData';
import ProfileCard from './widgets/ProfileCard';
import JobStatusCard from './widgets/JobStatusCard';
import WorkHistoryCard from './widgets/WorkHistoryCard';
import EducationCard from './widgets/EducationCard';
import ProjectsCarousel from './widgets/RightSidebar/ProjectsCarousel';
import ContactDetailsCard from './widgets/RightSidebar/ContactDetailsCard';
import FamilyMemberCard from './widgets/RightSidebar/FamilyMemberCard';
import BillingInfoCard from './widgets/RightSidebar/BillingInfoCard';
import CandidateTasks from './widgets/CandidateTasks';
import CandidateDocuments from './widgets/CandidateDocuments';
import './CandidateDetail.css';

const CandidateDetail = ({ candidate, onBack, onNewTask }) => {
  const [activeTab, setActiveTab] = useState('resume');

  // Merge backend candidate with candidateProfile for rich visual appearance
  const displayCandidate = {
    ...candidateProfile,
    ...candidate,
    contact: {
      ...candidateProfile.contact,
      email: candidate?.email || candidateProfile.contact.email,
      ...candidate?.contact
    }
  };

  const tabs = [
    { id: 'resume', label: 'Resume' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'documents', label: 'Documents' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <CandidateTasks candidate={displayCandidate} />;
      case 'documents':
        return <CandidateDocuments candidate={displayCandidate} />;
      case 'resume':
      default:
        return (
          <div className="candidate-grid">
            {/* Main Content Column */}
            <div className="main-column">
              <div className="top-widgets">
                <ProfileCard candidate={displayCandidate} onNewTask={onNewTask} />
                <JobStatusCard candidate={displayCandidate} />
              </div>
              
              <div className="middle-widgets">
                <WorkHistoryCard workHistory={displayCandidate.workHistory} />
                <EducationCard education={displayCandidate.education} courses={displayCandidate.courses} />
              </div>
            </div>

            {/* Right Sidebar Column */}
            <aside className="right-sidebar">
              <ProjectsCarousel projects={displayCandidate.projects} />
              <ContactDetailsCard contact={displayCandidate.contact} />
              <FamilyMemberCard family={displayCandidate.family} />
              <BillingInfoCard billing={displayCandidate.billing} />
            </aside>
          </div>
        );
    }
  };

  return (
    <div className="candidate-detail fade-in">
      <header className="candidate-detail-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            <Icon icon="solar:hamburger-menu-linear" className="menu-icon" />
          </button>
          <div className="page-title">
            <Icon icon="solar:file-text-bold" className="title-icon" />
            <span className="title-text">{tabs.find(t => t.id === activeTab)?.label}</span>
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

      <main className="candidate-detail-content">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default CandidateDetail;
