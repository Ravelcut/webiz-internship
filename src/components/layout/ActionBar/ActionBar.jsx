import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import SelectEntity from '../../shared/SelectEntity/SelectEntity';
import SearchEntityDropdown from '../../shared/SearchEntityDropdown/SearchEntityDropdown';
import './ActionBar.css';

const ActionBar = ({ onNewTask, onFilterToggle, isFilterOpen: isFilterBarActive }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  const closeMenu = () => setActiveMenu(null);

  return (
    <div className="action-bar-container">
      {activeMenu && (
        <div className="global-menu-overlay" onClick={closeMenu} />
      )}

      <div className="action-bar">
        <div className="action-btn-wrapper search-btn-wrapper">
          {activeMenu !== 'search' ? (
            <div
              className="search-wrapper"
              onClick={() => toggleMenu('search')}
            >
              <Icon icon="solar:magnifer-linear" className="search-icon" />
              <span className="search-placeholder">Search...</span>
            </div>
          ) : (
            <div className="dropdown-container search-dropdown-pos" onClick={(e) => e.stopPropagation()}>
              <SearchEntityDropdown onClose={closeMenu} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="action-btn-wrapper">
            <button
              className={`filter-btn ${isFilterBarActive ? 'active' : ''}`}
              onClick={onFilterToggle}
            >
              <Icon icon="solar:filter-linear" className="filter-icon" />
              <span>Filter</span>
            </button>
          </div>

          <div className="action-btn-wrapper">
            <button
              className="add-task-btn"
              onClick={onNewTask}
            >
              <Icon icon="solar:add-circle-linear" className="add-icon" />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
