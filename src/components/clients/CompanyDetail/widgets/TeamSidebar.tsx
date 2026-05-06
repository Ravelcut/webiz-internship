// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './TeamSidebar.css';

const TeamSidebar = ({ team = [] }) => {
  const [activeTab, setActiveTab] = useState('representatives');

  // Use team from props if available, otherwise fallback to basic mock for visualization
  const displayEmployees = team.length > 0 ? team : [
    { id: 1, name: 'Luffy D.', role: 'Lead', isLead: true, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Mike D.', role: 'AM', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: `All (${team.length || 32})`, isSummary: true }
  ];

  return (
    <div className="team-sidebar glass">
      <div className="team-tabs">
        <button 
          className={`team-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Employees
        </button>
        <button 
          className={`team-tab-btn ${activeTab === 'representatives' ? 'active' : ''}`}
          onClick={() => setActiveTab('representatives')}
        >
          Representatives
        </button>
      </div>

      <div className="team-list">
        {displayEmployees.map(emp => (
          <div key={emp.id} className="team-member-item">
            <div className="member-avatar-box">
              {emp.isLead && <Icon icon="solar:crown-minimalistic-bold" className="lead-crown" />}
              {emp.isSummary ? (
                <div className="member-avatar summary-avatar">
                   <div className="avatar-stack">
                     <img src="https://i.pravatar.cc/150?u=10" alt="" />
                     <img src="https://i.pravatar.cc/150?u=11" alt="" />
                     <img src="https://i.pravatar.cc/150?u=12" alt="" />
                   </div>
                </div>
              ) : (
                <img src={emp.avatar} alt={emp.name} className="member-avatar" />
              )}
            </div>
            <span className={`member-name ${emp.isSummary ? 'summary-text' : ''}`}>{emp.name}</span>
          </div>
        ))}
      </div>

      <button className="add-team-btn">
        <Icon icon="solar:add-circle-linear" />
        <span>Add New</span>
      </button>
    </div>
  );
};

export default TeamSidebar;
