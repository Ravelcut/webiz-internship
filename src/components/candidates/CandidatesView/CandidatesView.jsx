import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import CandidatesTable from '../CandidatesTable/CandidatesTable';
import { candidatesData } from '../../../data/mockData';
import './CandidatesView.css';

const CandidatesView = ({ onNewTask, onSelectCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="candidates-view fade-in">
      <div className="candidates-header shadow-header">
        <div className="header-left">
          <div className="title-group">
            <Icon icon="solar:users-group-rounded-linear" className="header-icon-main" />
            <h1 className="header-title">Candidates</h1>
          </div>
        </div>

        <div className="header-right">
          <div className="search-wrapper">
            <Icon icon="solar:magnifer-linear" className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Candidate" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="header-actions">
            <button className="secondary-btn-header">
              <Icon icon="solar:export-linear" />
              <span>Export in Excel</span>
            </button>

            <div className="pagination-wrapper-header">
              <span className="pagination-range">1-50 of 989</span>
              <div className="pagination-controls">
                <button className="nav-arrow-btn"><Icon icon="solar:alt-arrow-left-linear" /></button>
                <button className="nav-arrow-btn active"><Icon icon="solar:alt-arrow-right-linear" /></button>
              </div>
            </div>

            <button className="secondary-btn-header">
              <Icon icon="solar:settings-linear" />
              <span>Customize Table</span>
            </button>

            <button className="primary-btn-header">
              <Icon icon="solar:plus-circle-bold" />
              <span>New Candidate</span>
            </button>
          </div>
        </div>
      </div>

      <div className="candidates-content">
        <CandidatesTable 
          candidates={candidatesData.filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.role.toLowerCase().includes(searchTerm.toLowerCase())
          )} 
          onNewTask={onNewTask}
          onSelectCandidate={onSelectCandidate}
        />
      </div>
    </div>
  );
};

export default CandidatesView;
