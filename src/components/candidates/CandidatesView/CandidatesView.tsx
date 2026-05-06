// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import CandidatesTable from '../CandidatesTable/CandidatesTable';
import { companyService } from '../../../services/companyService';
import './CandidatesView.css';

const CandidatesView = ({ onNewTask, onSelectCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const data = await companyService.getTalents();
        // Map backend TalentResponse (Id, Name, Lastname, Email) to expected candidate format
        const mappedTalents = data.map(t => ({
          id: t.id,
          name: `${t.name} ${t.lastname}`.trim() || 'Anonymous',
          email: t.email,
          role: 'Talent Pool', // Default role for talents in database
          status: 'Active',
          statusColor: '#08AC16', // Green badge
          messageCount: 0,
          assignedHR: '-',
          cv: 'resume.pdf' // Placeholder for UI consistency
        }));
        setTalents(mappedTalents);
      } catch (error) {
        console.error('Failed to fetch real talents from backend:', error);
        setTalents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTalents();
  }, []);

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
              <span className="pagination-range">1-{talents.length} of {talents.length}</span>
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
        {isLoading ? (
          <div className="loading-spinner">Loading candidates...</div>
        ) : (
          <CandidatesTable 
            candidates={talents.filter(c => 
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.role.toLowerCase().includes(searchTerm.toLowerCase())
            )} 
            onNewTask={onNewTask}
            onSelectCandidate={onSelectCandidate}
          />
        )}
      </div>
    </div>
  );
};

export default CandidatesView;
