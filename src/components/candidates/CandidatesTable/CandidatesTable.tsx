// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './CandidatesTable.css';

const CandidatesTable = ({ candidates, onNewTask, onSelectCandidate }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleAction = (e, candidate, action) => {
    e.stopPropagation();
    if (action === 'create-task') {
      onNewTask({
        type: 'user',
        typeName: 'Talent',
        name: candidate.name,
      });
    }
    setActiveMenu(null);
  };

  return (
    <div className="candidates-table-container">
      <table className="candidates-table">
        <thead>
          <tr>
            <th className="checkbox-col"><input type="checkbox" className="custom-checkbox" onClick={(e) => e.stopPropagation()} /></th>
            <th>Full Name</th>
            <th className="icon-col"><Icon icon="solar:chat-round-dots-linear" /></th>
            <th>Assigned HR</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Job</th>
            <th>CV</th>
            <th className="action-col">Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr 
              key={candidate.id} 
              className="candidate-row"
              onClick={() => onSelectCandidate(candidate)}
            >
              <td className="checkbox-cell">
                <input 
                  type="checkbox" 
                  className="custom-checkbox" 
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="name-cell">
                <div className="candidate-info">
                  {candidate.avatar ? (
                    <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar-img" />
                  ) : (
                    <div className="candidate-avatar-placeholder">
                      {candidate.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="candidate-details">
                    <span className="candidate-name">{candidate.name}</span>
                    <span className="candidate-role">{candidate.role}</span>
                  </div>
                </div>
              </td>
              <td className="messages-cell">
                <div className="message-container">
                  <Icon icon="ri:whatsapp-line" className="msg-icon" />
                  <span className="msg-counter">{candidate.messageCount || 0}</span>
                </div>
              </td>
              <td className="hr-cell">
                {candidate.assignedHR ? (
                  <div className="hr-info">
                    <div className="hr-avatar-mini" title={candidate.assignedHR}>
                      {candidate.hrAvatar ? (
                        <img src={candidate.hrAvatar} alt={candidate.assignedHR} />
                      ) : (
                        candidate.assignedHR.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="hr-name">{candidate.assignedHR}</span>
                  </div>
                ) : (
                  <span className="unassigned">-</span>
                )}
              </td>
              <td className="status-cell">
                <button 
                  className="status-pill-btn"
                  onClick={(e) => e.stopPropagation()}
                  style={{ 
                    backgroundColor: candidate.statusColor || '#F0F5FA',
                    color: candidate.statusColor ? 'white' : '#36475F'
                  }}
                >
                  <span className="status-text">{candidate.status || 'Choose Status'}</span>
                  <Icon icon="solar:alt-arrow-down-linear" className="status-arrow" />
                </button>
              </td>
              <td className="contact-cell">
                <div className="contact-icons" onClick={(e) => e.stopPropagation()}>
                  <div className="contact-btn">
                    <Icon icon="solar:smartphone-linear" className="contact-icon" />
                  </div>
                  <div className="contact-btn">
                    <span className="contact-icon at-symbol">@</span>
                  </div>
                  {candidate.linkedin && (
                    <Icon icon="logos:linkedin-icon" className="contact-icon linkedin" />
                  )}
                </div>
              </td>
              <td className="job-cell">
                {candidate.jobTitle ? (
                  <span className="job-text">{candidate.jobTitle}</span>
                ) : null}
              </td>
              <td className="cv-cell">
                {candidate.cv ? (
                  <div className="cv-link" onClick={(e) => e.stopPropagation()}>
                    <Icon icon="solar:file-download-linear" className="cv-icon" />
                    <span className="cv-filename">{candidate.cv}</span>
                  </div>
                ) : (
                  <span className="no-cv">-</span>
                )}
              </td>
              <td className="action-cell">
                <div className="menu-container" style={{ position: 'relative' }}>
                  <button 
                    className="action-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === candidate.id ? null : candidate.id);
                    }}
                  >
                    <Icon icon="solar:menu-dots-bold" />
                  </button>
                  
                  {activeMenu === candidate.id && (
                    <>
                      <div className="menu-overlay" onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(null);
                      }} />
                      <div className="action-dropdown shadow-premium" onClick={(e) => e.stopPropagation()}>
                        <button className="dropdown-item">
                          <Icon icon="iconamoon:send-light" />
                          <span>Send activation</span>
                        </button>
                        <button className="dropdown-item">
                          <Icon icon="ph:plus-light" />
                          <span>Add to job</span>
                        </button>
                        <button 
                          className="dropdown-item"
                          onClick={(e) => handleAction(e, candidate, 'create-task')}
                        >
                          <Icon icon="solar:list-check-linear" />
                          <span>Create a Task</span>
                        </button>
                        <button className="dropdown-item">
                          <Icon icon="solar:magnifer-linear" />
                          <span>Find similar</span>
                        </button>
                        <button className="dropdown-item">
                          <Icon icon="solar:eye-linear" />
                          <span>Preview CV</span>
                        </button>
                        <button className="dropdown-item">
                          <Icon icon="solar:trash-bin-trash-linear" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
