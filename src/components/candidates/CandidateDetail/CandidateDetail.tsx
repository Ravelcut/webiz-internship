// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
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

const DUMMY_PROFILE = {
  id: 1,
  name: 'Giorgi Kheladze',
  role: 'Software designer',
  position: 'Digital Product Designer',
  experience: '21 Years',
  age: 21,
  status: 'Open',
  statusDesc: 'Relevant Approaches',
  accountPrivacy: 'Public account',
  cvPrivacy: 'Fully Visible',
  workHistory: [
    { title: 'Senior Product Designer', company: 'Webiz International', date: 'Jul 2020 - Present', duration: '2 years 3 months' },
    { title: 'UI/UX Designer', company: 'Surwill LLC', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'Graphic Designer', company: 'Adobe', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'UX Designer', company: 'Google', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'Researcher', company: 'Sony Playstation', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
    { title: 'Graphic Designer', company: 'Adobe', date: 'Jul 2020 - Jun 2021', duration: '1 years 8 months' },
  ],
  education: [
    { title: 'Computer Science', school: 'Free University', date: '2020 - 2024' },
    { title: 'Computer Science', school: 'Free University', date: '2020 - 2024' },
    { title: 'Computer Science', school: 'Free University', date: '2020 - 2024' },
  ],
  courses: [
    { title: 'Computer Science', school: 'Free University' },
    { title: 'Computer Science', school: 'Free University' },
  ],
  projects: [
    { id: 1, name: 'Citycom', type: 'External', logo: 'solar:buildings-2-bold' },
    { id: 2, name: 'Iternity', type: 'External', logo: 'solar:buildings-2-bold' },
    { id: 3, name: 'Paybox', type: 'External', logo: 'solar:buildings-2-bold' },
  ],
  contact: {
    mobile: '+995 599 20 21 55',
    email: 'usernamc@info.com',
    country: 'Georgia',
    city: 'Tbilisi',
    address: '32 Road Village Str.',
    zip: '3301',
    recruiterEmail: 'Headhunter123@info.com',
    recruiterId: '23',
    whatsapp: '+995 599 20 21 55',
  },
  family: {
    name: 'Laura Palmer',
    phone: '+995 599 12 34 56',
    relation: 'Sister',
    emergency: 'N/A',
  },
  billing: {
    bank: 'TBC BANK',
    country: 'Georgia',
  }
};

const CandidateDetail = ({ candidate, tasks = [], onBack, onNewTask }) => {
  const [activeTab, setActiveTab] = useState('resume');

  // Merge backend candidate with local dummy profile details for rich visual UI layout
  const displayCandidate = {
    ...DUMMY_PROFILE,
    ...candidate,
    contact: {
      ...DUMMY_PROFILE.contact,
      email: candidate?.email || DUMMY_PROFILE.contact.email,
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
        return <CandidateTasks candidate={displayCandidate} tasks={tasks} />;
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
