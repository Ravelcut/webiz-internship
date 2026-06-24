// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './Sidebar.css';

const Sidebar = ({ activeModule, onModuleChange, isOpen, setIsOpen, onLogout, userRole, theme, onThemeToggle, onSettings }) => {
  const getNavIcons = () => {
    if (userRole === 'recruiter') {
      return [
        { icon: 'solar:widget-linear', id: 'dashboard', label: 'Dashboard' },
        { icon: 'solar:buildings-2-linear', id: 'companies', label: 'Companies' },
        { icon: 'solar:letter-opened-linear', id: 'invitations', label: 'Invitations' },
        { icon: 'solar:suitcase-linear', id: 'jobs', label: 'Jobs' },
        { icon: 'solar:calendar-minimalistic-linear', id: 'calendar', label: 'Calendar' },
      ];
    }
    
    return [
      { icon: 'solar:widget-linear', id: 'dashboard', label: 'Dashboard' },
      userRole === 'talent'
        ? { icon: 'solar:buildings-2-linear', id: 'companies', label: 'Companies' }
        : { icon: 'solar:users-group-rounded-linear', id: 'people', label: 'People' },
      { icon: 'solar:suitcase-linear', id: 'jobs', label: 'Jobs' },
      { icon: 'solar:user-speak-linear', id: 'referrals', label: 'Referrals' },
      { icon: 'solar:document-text-linear', id: 'documents', label: 'Documents' },
      { icon: 'solar:calendar-minimalistic-linear', id: 'calendar', label: 'Calendar' },
      { icon: 'solar:chart-square-linear', id: 'reports', label: 'Reports' },
      { icon: 'solar:star-fall-2-linear', id: 'ai', label: 'AI Tools' },
    ];
  };

  const navIcons = getNavIcons();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-top">
        <button className="sidebar-icon-btn menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <Icon icon="carbon:menu" className="sidebar-icon" />
        </button>

        <div className="sidebar-divider" />

        <div className="sidebar-nav">
          {navIcons.map((item) => (
            <button
              key={item.id}
              className={`sidebar-icon-btn ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => onModuleChange(item.id)}
            >
              <Icon icon={item.icon} className="sidebar-icon" />
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-icon-btn quickstart-btn" onClick={() => window.location.href = '/info/quickstart'}>
          <Icon icon="solar:rocket-linear" className="sidebar-icon" style={{ color: '#08AC16' }} />
          <span className="sidebar-label" style={{ color: '#08AC16', fontWeight: 'bold' }}>Quickstart Guide</span>
        </button>
        <button className="sidebar-icon-btn showcase-btn" onClick={() => window.location.href = '/info/showcase'}>
          <Icon icon="solar:video-library-linear" className="sidebar-icon" style={{ color: '#c084fc' }} />
          <span className="sidebar-label" style={{ color: '#c084fc', fontWeight: 'bold' }}>Showcase Video</span>
        </button>

        <button className="sidebar-icon-btn settings-btn" onClick={onSettings}>
          <Icon icon="solar:settings-linear" className="sidebar-icon" />
          <span className="sidebar-label">Settings</span>
        </button>
        <div className="sidebar-toggle" onClick={onThemeToggle}>
          <div className={`toggle-track ${theme === 'dark' ? 'active' : ''}`}>
            <div className="toggle-thumb" />
          </div>
        </div>
        <button className="sidebar-icon-btn logout-btn" onClick={onLogout}>
          <Icon icon="solar:logout-linear" className="sidebar-icon" />
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
