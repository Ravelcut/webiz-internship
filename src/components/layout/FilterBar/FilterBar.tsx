// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './FilterBar.css';

const FilterBar = ({ onClearAll, onSave, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="filter-bar-row">
      <div className="filter-items-group">
        {/* Priority Filter */}
        <div className="filter-box">
          <span className="filter-label">Priority:</span>
          <div className="filter-value-wrapper">
            <span className="filter-selection">All</span>
            <Icon icon="solar:alt-arrow-down-linear" className="filter-chevron" />
          </div>
        </div>

        {/* Entity Type Filter */}
        <div className="filter-box entity-type-filter active">
          <span className="filter-label">Entity Type:</span>
          <div className="filter-chips-container">
            <div className="filter-chip">
              <span>Talent</span>
              <Icon icon="solar:close-circle-bold" className="chip-close" />
            </div>
            <div className="filter-chip">
              <span>Job</span>
              <Icon icon="solar:close-circle-bold" className="chip-close" />
            </div>
            <Icon icon="solar:alt-arrow-down-linear" className="filter-chevron" />
          </div>
        </div>

        {/* Due Date Filter */}
        <div className="filter-box date-range-filter active">
          <span className="filter-label">Due Date:</span>
          <div className="filter-value-wrapper">
            <span className="filter-selection">16 Jun 2025 - 20 Jul 2025</span>
            <div className="filter-icons-right">
               <Icon icon="solar:close-circle-bold" className="clear-filter-icon" />
               <Icon icon="solar:alt-arrow-down-linear" className="filter-chevron" />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="filter-box">
          <span className="filter-label">Status:</span>
          <div className="filter-value-wrapper">
            <span className="filter-selection">All</span>
            <Icon icon="solar:alt-arrow-down-linear" className="filter-chevron" />
          </div>
        </div>
      </div>

      <div className="filter-actions">
        <button className="clear-all-btn" onClick={onClearAll}>Clear all</button>
        <button className="save-filters-btn" onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default FilterBar;
