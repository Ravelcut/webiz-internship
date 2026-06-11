// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { jobCandidates } from '../../../data/mockData';
import './JobDetail.css';

const JobDetail = ({ job = { title: 'Front End Developer', status: 'Hired' }, onBack }) => {
  const [activeTab, setActiveTab] = useState('pool');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const tabs = [
    { id: 'pool', label: 'Candidates Pool', count: 20 },
    { id: 'choices', label: 'My Choices', count: 12 },
    { id: 'inprogress', label: 'In Progress', count: 9 },
  ];

  const candidates = [];
  if (job?.rawTask?.talent) {
    const t = job.rawTask.talent;
    candidates.push({
      id: t.id || 999,
      name: `${t.name} ${t.lastname}`.trim() || t.email || 'Anonymous',
      role: 'Assigned Talent',
      source: 'Internal DB',
      skills: [{ name: 'Database', y: '1y' }],
      exp: '1 Year',
      score: 100,
      scoreLabel: 'Matched',
      scoreColor: '#08AC16',
      stage: job.status || 'Active',
      stageBg: '#EAF2FD',
      stageColor: '#2F80ED',
      stageIcon: 'solar:check-circle-linear'
    });
  }

  const displayCandidates = [
    ...candidates,
    ...jobCandidates.filter(jc => !candidates.some(c => c.id === jc.id))
  ];

  return (
    <div className="job-detail-view fade-in">
      <div className="job-detail-content">
        <div className="job-content-card shadow-premium">
          {/* Back Button and Job Title Area */}
          <div className="job-detail-nav">
             <button className="back-link-btn" onClick={onBack}>
                <Icon icon="solar:alt-arrow-left-linear" />
                <span>Back to Jobs</span>
             </button>
          </div>

          {/* Job Sub-header */}
          <div className="job-subheader">
            <div className="subheader-left">
              <div className="job-selector-dropdown">
                <Icon icon="solar:suitcase-tag-linear" className="job-tag-icon" />
                <span className="current-job-title">{job.title}</span>
                <Icon icon="solar:alt-arrow-down-linear" className="dropdown-arrow" />
              </div>
              <div className="job-status-pill hired">
                <div className="dot"></div>
                <span>{job.status}</span>
                <Icon icon="solar:alt-arrow-down-linear" />
              </div>
            </div>

            <nav className="job-tabs">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  className={`job-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>

            <div className="subheader-right">
              <div className="view-mode-toggles">
                <button 
                  className={`mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <Icon icon="solar:list-linear" />
                </button>
                <button 
                  className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Icon icon="solar:widget-linear" />
                </button>
              </div>
              <button className="view-job-btn">
                <Icon icon="solar:eye-linear" />
                <span>View Job</span>
              </button>
              <button className="more-actions-btn">
                <Icon icon="solar:menu-dots-bold" />
              </button>
            </div>
          </div>

          {/* Table Toolbar */}
          <div className="table-toolbar">
            <div className="toolbar-left">
              <div className="search-wrapper">
                <Icon icon="solar:magnifer-linear" className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Start searching..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <label className="checkbox-filter">
                <input type="checkbox" />
                <span>Show only candidates from my pool</span>
              </label>
            </div>

            <div className="toolbar-right">
              <button className="filter-btn">
                <Icon icon="solar:filter-linear" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="candidates-list-container">
            <table className="job-candidates-table">
              <thead>
                <tr>
                  <th className="name-col">Full Name <Icon icon="solar:alt-arrow-down-linear" className="sort-icon" /></th>
                  <th>Source</th>
                  <th className="skills-col">Skills</th>
                  <th>Y/XP</th>
                  <th className="score-col">Profile score</th>
                  <th className="stage-col">Recruiting stage</th>
                </tr>
              </thead>
              <tbody>
                {displayCandidates.map((candidate) => (
                  <tr key={candidate.id} className="candidate-row">
                    <td className="name-cell">
                      <div className="candidate-avatar-info">
                        <img src={`https://i.pravatar.cc/150?u=${candidate.id}`} alt={candidate.name} />
                        <div className="name-details">
                          <span className="name-text">{candidate.name}</span>
                          <span className="role-text">{candidate.role}</span>
                        </div>
                      </div>
                    </td>
                    <td>{candidate.source}</td>
                    <td className="skills-cell">
                      <div className="skills-group">
                        {candidate.skills.slice(0, 2).map((skill, i) => (
                          <div key={i} className="skill-tag">
                            <span className="skill-name">{skill.name}</span>
                            <div className="skill-dot"></div>
                            <span className="skill-years">{skill.y}</span>
                          </div>
                        ))}
                        {candidate.extraSkills && (
                          <div className="skill-tag extra">+{candidate.extraSkills}</div>
                        )}
                      </div>
                    </td>
                    <td><span className="exp-val">{candidate.exp}</span></td>
                    <td className="score-cell">
                      <div className="score-wrapper">
                        <span className="score-label">{candidate.scoreLabel}</span>
                        <div className="progress-bar-bg">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${candidate.score}%`, backgroundColor: candidate.scoreColor }}
                          ></div>
                        </div>
                        <span className="score-percent">{candidate.score}%</span>
                      </div>
                    </td>
                    <td className="stage-cell">
                      <div className="stage-pill" style={{ backgroundColor: candidate.stageBg, color: candidate.stageColor }}>
                        <Icon icon={candidate.stageIcon} />
                        <span>{candidate.stage}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
