// @ts-nocheck
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { jobService } from '../../../services/jobService';
import './JobDetail.css';

const JobDetail = ({ 
  job = { title: 'Front End Developer', status: 'Hired' }, 
  jobs = [], 
  talents = [], 
  onJobSelect, 
  onRefreshJobs, 
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState('pool');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [starredCandidateIds, setStarredCandidateIds] = useState([]);
  const [showOnlyMyPool, setShowOnlyMyPool] = useState(false);

  const jobDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(e.target)) {
        setIsJobDropdownOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const statusColors = {
    'Active': '#2F80ED',
    'Hired': '#08AC16',
    'Frozen': '#ED5757',
  };

  const mapJobToDisplay = (rawJob) => {
    if (!rawJob) return null;
    const mappedStatus = rawJob.status || 'Active';
    return {
      id: `#${rawJob.id}`,
      title: rawJob.title || 'Untitled Position',
      seniority: rawJob.seniority || 'Middle',
      salaryType: rawJob.salaryType || 'Gross',
      salaryRange: rawJob.salaryRange || 'Negotiable',
      status: mappedStatus,
      statusColor: statusColors[mappedStatus] || '#2F80ED',
      companyName: rawJob.companyName || 'Unknown Company',
      rawJob: rawJob
    };
  };

  const handleJobSwitch = (rawJob) => {
    if (onJobSelect) {
      onJobSelect(mapJobToDisplay(rawJob));
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const raw = job.rawJob || job;
      const cleanId = typeof raw.id === 'string' && raw.id.startsWith('#') ? Number(raw.id.substring(1)) : Number(raw.id);
      
      await jobService.updateJob({
        jobId: cleanId,
        title: raw.title,
        seniority: raw.seniority,
        salaryType: raw.salaryType,
        salaryRange: raw.salaryRange,
        status: newStatus
      });
      
      if (onRefreshJobs) {
        await onRefreshJobs();
      }
      
      if (onJobSelect) {
        const updatedRaw = { ...raw, status: newStatus };
        onJobSelect(mapJobToDisplay(updatedRaw));
      }
    } catch (error) {
      console.error('Failed to update job status:', error);
    }
    setIsStatusDropdownOpen(false);
  };

  const toggleStar = (id) => {
    setStarredCandidateIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Map talents to rich candidate objects
  const candidatesList = useMemo(() => {
    const list = [];
    const seenIds = new Set();

    // 1. Add the assigned talent first if it exists
    const assignedTalent = job?.rawJob?.talent || job?.rawTask?.talent;
    if (assignedTalent) {
      const t = assignedTalent;
      const id = t.id || 999;
      seenIds.add(id);
      list.push({
        id: id,
        name: `${t.name} ${t.lastname}`.trim() || t.email || 'Anonymous',
        role: 'Assigned Talent',
        source: 'Internal DB',
        skills: [{ name: 'React', y: '3y' }, { name: 'TypeScript', y: '2y' }],
        exp: '3 Years',
        score: 100,
        scoreLabel: 'Matched',
        scoreColor: '#08AC16',
        stage: job.status || 'Active',
        stageBg: '#EAF2FD',
        stageColor: '#2F80ED',
        stageIcon: 'solar:check-circle-linear'
      });
    }

    // 2. Add other talents from the talents prop
    talents.forEach((t) => {
      if (seenIds.has(t.id)) return;
      seenIds.add(t.id);

      const idNum = Number(t.id) || 0;
      const roles = ['Front End Developer', 'Full Stack Engineer', 'UX Designer', 'React Developer', 'QA Automation Engineer'];
      const role = roles[idNum % roles.length];
      
      const skillsPools = [
        [{ name: 'React', y: '3y' }, { name: 'TypeScript', y: '2y' }],
        [{ name: 'Node.js', y: '4y' }, { name: 'PostgreSQL', y: '2y' }],
        [{ name: 'Figma', y: '3y' }, { name: 'CSS/HTML', y: '5y' }],
        [{ name: 'Vue.js', y: '2y' }, { name: 'JavaScript', y: '4y' }],
        [{ name: 'Selenium', y: '3y' }, { name: 'Python', y: '2y' }]
      ];
      const skills = skillsPools[idNum % skillsPools.length];
      
      const score = 75 + (idNum % 21); // 75 to 95
      let scoreLabel = 'Matched';
      let scoreColor = '#08AC16';
      if (score < 80) {
        scoreLabel = 'Average Match';
        scoreColor = '#F19100';
      } else if (score < 90) {
        scoreLabel = 'Good Match';
        scoreColor = '#2F80ED';
      } else {
        scoreLabel = 'Strong Match';
        scoreColor = '#08AC16';
      }

      const stages = ['Screening', 'Interviewing', 'Offer Extended', 'Shortlisted', 'Applied'];
      const stage = stages[idNum % stages.length];
      
      const stageColorsMap = {
        'Hired': { bg: '#EAFDF5', text: '#08AC16', icon: 'solar:check-circle-linear' },
        'Active': { bg: '#EAF2FD', text: '#2F80ED', icon: 'solar:play-circle-linear' },
        'Screening': { bg: '#FFF7E6', text: '#F19100', icon: 'solar:user-speak-linear' },
        'Interviewing': { bg: '#F5E6FF', text: '#7B2CB5', icon: 'solar:videocamera-linear' },
        'Offer Extended': { bg: '#E0F2FE', text: '#0369A1', icon: 'solar:letter-opened-linear' },
        'Shortlisted': { bg: '#EBF3FF', text: '#1E40AF', icon: 'solar:star-linear' },
        'Applied': { bg: '#F1F5F9', text: '#475569', icon: 'solar:document-linear' },
        'Frozen': { bg: '#FEE2E2', text: '#EF4444', icon: 'solar:close-circle-linear' }
      };
      
      const style = stageColorsMap[stage] || { bg: '#F1F5F9', text: '#475569', icon: 'solar:document-linear' };

      list.push({
        id: t.id,
        name: `${t.name} ${t.lastname}`.trim() || t.email || 'Anonymous',
        role,
        source: 'Internal DB',
        skills,
        exp: `${1 + (idNum % 6)} Years`,
        score,
        scoreLabel,
        scoreColor,
        stage,
        stageBg: style.bg,
        stageColor: style.text,
        stageIcon: style.icon
      });
    });

    return list;
  }, [talents, job]);

  const candidatesPool = candidatesList;
  const choicesPool = candidatesList.filter(c => starredCandidateIds.includes(c.id));
  const inProgressPool = candidatesList.filter(c => 
    c.role === 'Assigned Talent' ||
    c.stage === 'Screening' || 
    c.stage === 'Interviewing' || 
    c.stage === 'Offer Extended' ||
    c.stage === 'Active'
  );

  let activeTabCandidates = [];
  if (activeTab === 'pool') {
    activeTabCandidates = candidatesPool;
  } else if (activeTab === 'choices') {
    activeTabCandidates = choicesPool;
  } else if (activeTab === 'inprogress') {
    activeTabCandidates = inProgressPool;
  }

  const filteredCandidates = activeTabCandidates.filter(candidate => {
    if (showOnlyMyPool && candidate.role === 'Assigned Talent') return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(term) ||
      candidate.role.toLowerCase().includes(term) ||
      candidate.skills.some(s => s.name.toLowerCase().includes(term))
    );
  });

  const tabs = [
    { id: 'pool', label: 'Candidates Pool', count: candidatesPool.length },
    { id: 'choices', label: 'My Choices', count: choicesPool.length },
    { id: 'inprogress', label: 'In Progress', count: inProgressPool.length },
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
              <div className="job-selector-wrapper" ref={jobDropdownRef}>
                <div 
                  className="job-selector-dropdown"
                  onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                >
                  <Icon icon="solar:suitcase-tag-linear" className="job-tag-icon" />
                  <span className="current-job-title">{job.title}</span>
                  <Icon icon="solar:alt-arrow-down-linear" className={`dropdown-arrow ${isJobDropdownOpen ? 'open' : ''}`} />
                </div>
                
                {isJobDropdownOpen && (
                  <div className="job-selector-menu shadow-premium">
                    <div className="dropdown-header">Switch Job Position</div>
                    {jobs.length === 0 ? (
                      <div className="dropdown-empty">No other jobs found</div>
                    ) : (
                      <div className="dropdown-scroll">
                        {jobs.map(j => (
                          <div 
                            key={j.id} 
                            className={`job-dropdown-item ${(j.id === job.rawJob?.id || j.id === job.id) ? 'active' : ''}`}
                            onClick={() => {
                              handleJobSwitch(j);
                              setIsJobDropdownOpen(false);
                            }}
                          >
                            <Icon icon="solar:suitcase-tag-linear" className="item-job-icon" />
                            <div className="job-item-details">
                              <span className="job-item-title">{j.title || 'Untitled Position'}</span>
                              <span className="job-item-company">{j.companyName || 'Internal'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="job-status-wrapper" ref={statusDropdownRef}>
                <div 
                  className={`job-status-pill ${job.status?.toLowerCase() || 'active'}`}
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <div className="dot"></div>
                  <span>{job.status}</span>
                  <Icon icon="solar:alt-arrow-down-linear" className={`dropdown-arrow ${isStatusDropdownOpen ? 'open' : ''}`} />
                </div>

                {isStatusDropdownOpen && (
                  <div className="status-selector-menu shadow-premium">
                    {['Active', 'Hired', 'Frozen'].map(st => (
                      <div 
                        key={st} 
                        className={`status-dropdown-item ${st.toLowerCase()} ${job.status === st ? 'active' : ''}`}
                        onClick={() => handleStatusChange(st)}
                      >
                        <div className="dot"></div>
                        <span>{st}</span>
                        {job.status === st && <Icon icon="solar:check-circle-bold" className="checked-icon" />}
                      </div>
                    ))}
                  </div>
                )}
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
                <input 
                  type="checkbox" 
                  checked={showOnlyMyPool} 
                  onChange={(e) => setShowOnlyMyPool(e.target.checked)} 
                />
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

          {/* Candidates List / Grid Container */}
          {viewMode === 'list' ? (
            <div className="candidates-list-container">
              <table className="job-candidates-table">
                <thead>
                  <tr>
                    <th className="star-col"></th>
                    <th className="name-col">Full Name <Icon icon="solar:alt-arrow-down-linear" className="sort-icon" /></th>
                    <th>Source</th>
                    <th className="skills-col">Skills</th>
                    <th>Y/XP</th>
                    <th className="score-col">Profile score</th>
                    <th className="stage-col">Recruiting stage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-candidates-row">
                        No candidates found in this category.
                      </td>
                    </tr>
                  ) : (
                    filteredCandidates.map((candidate) => (
                      <tr key={candidate.id} className="candidate-row">
                        <td className="star-cell">
                          <button 
                            className={`table-star-btn ${starredCandidateIds.includes(candidate.id) ? 'starred' : ''}`}
                            onClick={() => toggleStar(candidate.id)}
                          >
                            <Icon icon={starredCandidateIds.includes(candidate.id) ? "solar:star-bold" : "solar:star-linear"} />
                          </button>
                        </td>
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
                        <td className="score-col-cell">
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="candidates-grid-container">
              {filteredCandidates.length === 0 ? (
                <div className="no-candidates-grid">
                  No candidates found in this category.
                </div>
              ) : (
                filteredCandidates.map((candidate) => (
                  <div key={candidate.id} className="candidate-grid-card shadow-premium">
                    <button 
                      className={`star-badge-btn ${starredCandidateIds.includes(candidate.id) ? 'starred' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(candidate.id);
                      }}
                    >
                      <Icon icon={starredCandidateIds.includes(candidate.id) ? "solar:star-bold" : "solar:star-linear"} />
                    </button>
                    
                    <div className="card-avatar-info">
                      <img src={`https://i.pravatar.cc/150?u=${candidate.id}`} alt={candidate.name} className="card-avatar" />
                      <div className="card-identity">
                        <span className="card-name">{candidate.name}</span>
                        <span className="card-role">{candidate.role}</span>
                      </div>
                    </div>
                    
                    <div className="card-metadata">
                      <div className="meta-item">
                        <span className="meta-label">Source</span>
                        <span className="meta-val">{candidate.source}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Experience</span>
                        <span className="meta-val">{candidate.exp}</span>
                      </div>
                    </div>

                    <div className="card-skills">
                      {candidate.skills.map((skill, i) => (
                        <span key={i} className="card-skill-tag">
                          {skill.name} • {skill.y}
                        </span>
                      ))}
                    </div>

                    <div className="card-score">
                      <div className="score-header">
                        <span className="score-lbl">{candidate.scoreLabel}</span>
                        <span className="score-pct">{candidate.score}%</span>
                      </div>
                      <div className="card-progress-bar">
                        <div 
                          className="card-progress-fill" 
                          style={{ width: `${candidate.score}%`, backgroundColor: candidate.scoreColor }}
                        ></div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <div className="grid-stage-pill" style={{ backgroundColor: candidate.stageBg, color: candidate.stageColor }}>
                        <Icon icon={candidate.stageIcon} />
                        <span>{candidate.stage}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
