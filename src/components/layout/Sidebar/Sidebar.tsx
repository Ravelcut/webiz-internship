// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './Sidebar.css';

const Sidebar = ({ activeModule, onModuleChange, isOpen, setIsOpen, onLogout }) => {
  const navIcons = [
    { icon: 'solar:widget-linear', id: 'dashboard' },
    { icon: 'solar:users-group-rounded-linear', id: 'people' },
    { icon: 'solar:suitcase-linear', id: 'jobs' },
    { icon: 'solar:user-speak-linear', id: 'referrals' },
    { icon: 'solar:document-text-linear', id: 'documents' },
    { icon: 'solar:calendar-minimalistic-linear', id: 'calendar' },
    { icon: 'solar:chart-square-linear', id: 'reports' },
    { icon: 'solar:star-fall-2-linear', id: 'ai' },
  ];

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
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-toggle">
          <div className="toggle-track">
            <div className="toggle-thumb" />
          </div>
        </div>
        <button className="sidebar-icon-btn logout-btn" onClick={onLogout}>
          <Icon icon="solar:logout-linear" className="sidebar-icon" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
