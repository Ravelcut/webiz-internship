// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './TabBar.css';

const TabBar = ({ activeTab, onTabChange }) => {
  const mainTabs = [
    { id: 'planner', label: 'Planner', icon: 'solar:list-check-minimalistic-linear' },
    { id: 'board', label: 'Board', icon: 'solar:widget-2-linear' },
    { id: 'table', label: 'Table', icon: 'solar:list-down-minimalistic-linear' },
  ];

  return (
    <div className="tab-bar">
      <div className="tab-group-left">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <div className="tab-content">
              <Icon icon={tab.icon} className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
            </div>
            <div className="tab-slider" />
          </button>
        ))}

        <div className="tab-divider" />

        <button
          className={`tab-item ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => onTabChange('completed')}
        >
          <div className="tab-content">
            <Icon icon="solar:check-circle-linear" className="tab-icon" />
            <span className="tab-label">Completed</span>
          </div>
          <div className="tab-slider" />
        </button>
      </div>
    </div>
  );
};

export default TabBar;
