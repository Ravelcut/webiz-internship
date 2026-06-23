// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import CandidatesTable from '../CandidatesTable/CandidatesTable';
import { companyService } from '../../../services/companyService';
import CVPreviewModal from '../CVPreviewModal/CVPreviewModal';
import AddToJobModal from '../AddToJobModal/AddToJobModal';
import './CandidatesView.css';

const CandidatesView = ({ onNewTask, onSelectCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedTalentId, setSelectedTalentId] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [availableTalents, setAvailableTalents] = useState([]);
  
  const [selectedCvCandidate, setSelectedCvCandidate] = useState(null);
  const [selectedJobCandidate, setSelectedJobCandidate] = useState(null);
  const [isSearchingSimilar, setIsSearchingSimilar] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [activeTab, setActiveTab] = useState('pool'); // 'pool' or 'invitations'
  const [invitations, setInvitations] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendActivation = (candidate) => {
    showToast(`Activation email successfully sent to ${candidate.email}!`, 'success');
  };

  const handleAddToJobConfirm = (job) => {
    showToast(`${selectedJobCandidate?.name} successfully added to job: ${job.title}!`, 'success');
    setSelectedJobCandidate(null);
  };

  const handleFindSimilar = (candidate) => {
    setIsSearchingSimilar(true);
    setTimeout(() => {
      setIsSearchingSimilar(false);
      showToast(`Search complete: found 2 similar candidates (Casey Jones, Sam Smith).`, 'success');
    }, 1500);
  };

  const handleDeleteCandidate = async (candidateId) => {
    const candidate = talents.find(c => c.id === candidateId);
    if (!candidate) return;

    if (window.confirm(`Are you sure you want to remove ${candidate.name} from your talents list?`)) {
      try {
        await companyService.deleteTalent(candidateId);
        
        const updatedTalents = talents.filter(c => c.id !== candidateId);
        setTalents(updatedTalents);
        
        const [allTalentsData, invitationsData] = await Promise.all([
          companyService.getAllTalents().catch(() => []),
          companyService.getTalentInvitations().catch(() => [])
        ]);
        setInvitations(invitationsData);
        const acceptedIds = new Set(updatedTalents.map(t => t.id));
        const pendingIds = new Set(
          invitationsData
            .filter(i => i.invitationStatus === 'Pending' || i.invitationStatus === 0)
            .map(i => i.talentId)
        );
        const filteredAllTalents = allTalentsData.map(t => ({
          id: t.id,
          name: `${t.name} ${t.lastname}`.trim() || 'Anonymous',
          email: t.email
        })).filter(t => !acceptedIds.has(t.id) && !pendingIds.has(t.id));
        setAvailableTalents(filteredAllTalents);

        showToast(`${candidate.name} removed successfully!`, 'success');
      } catch (err) {
        console.error(err);
        showToast('Failed to remove candidate. Please try again.', 'error');
      }
    }
  };

  const handleInvite = async () => {
    if (!selectedTalentId) return;
    setIsInviting(true);
    setInviteMessage('');
    try {
      await companyService.inviteTalent(selectedTalentId);
      setInviteMessage('Invitation sent successfully!');
      
      const [allTalentsData, invitationsData] = await Promise.all([
        companyService.getAllTalents().catch(() => []),
        companyService.getTalentInvitations().catch(() => [])
      ]);
      setInvitations(invitationsData);
      
      const acceptedIds = new Set(talents.map(t => t.id));
      const pendingIds = new Set(
        invitationsData
          .filter(i => i.invitationStatus === 'Pending' || i.invitationStatus === 0)
          .map(i => i.talentId)
      );
      const filteredAllTalents = allTalentsData.map(t => ({
        id: t.id,
        name: `${t.name} ${t.lastname}`.trim() || 'Anonymous',
        email: t.email
      })).filter(t => !acceptedIds.has(t.id) && !pendingIds.has(t.id));
      setAvailableTalents(filteredAllTalents);

      setTimeout(() => {
        setIsInviteModalOpen(false);
        setInviteMessage('');
        setSelectedTalentId('');
      }, 2000);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Failed to send invitation.';
      setInviteMessage(errorMsg);
    } finally {
      setIsInviting(false);
    }
  };

  const handleRevokeInvitation = async (invitationId) => {
    if (window.confirm('Are you sure you want to revoke this invitation?')) {
      try {
        await companyService.revokeTalentInvitation(invitationId);
        
        const invitationsData = await companyService.getTalentInvitations().catch(() => []);
        setInvitations(invitationsData);
        
        const allTalentsData = await companyService.getAllTalents().catch(() => []);
        const acceptedIds = new Set(talents.map(t => t.id));
        const pendingIds = new Set(
          invitationsData
            .filter(i => i.invitationStatus === 'Pending' || i.invitationStatus === 0)
            .map(i => i.talentId)
        );
        const filteredAllTalents = allTalentsData.map(t => ({
          id: t.id,
          name: `${t.name} ${t.lastname}`.trim() || 'Anonymous',
          email: t.email
        })).filter(t => !acceptedIds.has(t.id) && !pendingIds.has(t.id));
        setAvailableTalents(filteredAllTalents);

        showToast('Invitation revoked successfully!', 'success');
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          // The invitation is already gone, so we refresh the state
          const invitationsData = await companyService.getTalentInvitations().catch(() => []);
          setInvitations(invitationsData);
          
          const allTalentsData = await companyService.getAllTalents().catch(() => []);
          const acceptedIds = new Set(talents.map(t => t.id));
          const pendingIds = new Set(
            invitationsData
              .filter(i => i.invitationStatus === 'Pending' || i.invitationStatus === 0)
              .map(i => i.talentId)
          );
          const filteredAllTalents = allTalentsData.map(t => ({
            id: t.id,
            name: `${t.name} ${t.lastname}`.trim() || 'Anonymous',
            email: t.email
          })).filter(t => !acceptedIds.has(t.id) && !pendingIds.has(t.id));
          setAvailableTalents(filteredAllTalents);
          
          showToast('Invitation already revoked or does not exist.', 'success');
        } else {
          showToast('Failed to revoke invitation.', 'error');
        }
      }
    }
  };

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const [talentsData, allTalentsData, invitationsData] = await Promise.all([
          companyService.getTalents(),
          companyService.getAllTalents().catch(() => []),
          companyService.getTalentInvitations().catch(() => [])
        ]);

        // Map backend TalentResponse (Id, Name, Lastname, Email) to expected candidate format
        const mappedTalents = talentsData.map(t => ({
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
        setInvitations(invitationsData);

        // Filter out talents who are already in the accepted talents list or have a pending invitation
        const acceptedIds = new Set(talentsData.map(t => t.id));
        const pendingIds = new Set(
          invitationsData
            .filter(i => i.invitationStatus === 'Pending' || i.invitationStatus === 0)
            .map(i => i.talentId)
        );
        const filteredAllTalents = allTalentsData.map(t => ({
          id: t.id,
          name: `${t.name} ${t.lastname}`.trim() || 'Anonymous',
          email: t.email
        })).filter(t => !acceptedIds.has(t.id) && !pendingIds.has(t.id));

        setAvailableTalents(filteredAllTalents);
      } catch (error) {
        console.error('Failed to fetch real talents from backend:', error);
        setTalents([]);
        setAvailableTalents([]);
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
            <h1 className="header-title" style={{ marginRight: '12px' }}>Candidates</h1>
          </div>
          <div className="candidates-tabs">
            <button 
              className={`candidates-tab-btn ${activeTab === 'pool' ? 'active' : ''}`}
              onClick={() => setActiveTab('pool')}
            >
              Talent Pool
            </button>
            <button 
              className={`candidates-tab-btn ${activeTab === 'invitations' ? 'active' : ''}`}
              onClick={() => setActiveTab('invitations')}
            >
              Sent Invitations
              {invitations.length > 0 && <span className="invitation-badge">{invitations.length}</span>}
            </button>
          </div>
        </div>

        <div className="header-right">
          <div className="search-wrapper">
            <Icon icon="solar:magnifer-linear" className="search-icon" />
            <input 
              type="text" 
              placeholder={activeTab === 'pool' ? "Search Candidate" : "Search Invitation"} 
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
              <span className="pagination-range">
                {activeTab === 'pool' 
                  ? `1-${talents.length} of ${talents.length}`
                  : `1-${invitations.length} of ${invitations.length}`
                }
              </span>
              <div className="pagination-controls">
                <button className="nav-arrow-btn"><Icon icon="solar:alt-arrow-left-linear" /></button>
                <button className="nav-arrow-btn active"><Icon icon="solar:alt-arrow-right-linear" /></button>
              </div>
            </div>

            <button className="secondary-btn-header">
              <Icon icon="solar:settings-linear" />
              <span>Customize Table</span>
            </button>

            <button className="primary-btn-header" onClick={() => setIsInviteModalOpen(true)}>
              <Icon icon="solar:plus-circle-bold" />
              <span>New Candidate</span>
            </button>
          </div>
        </div>
      </div>

      <div className="candidates-content">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : activeTab === 'pool' ? (
          <CandidatesTable 
            candidates={talents.filter(c => 
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.role.toLowerCase().includes(searchTerm.toLowerCase())
            )} 
            onNewTask={onNewTask}
            onSelectCandidate={onSelectCandidate}
            onPreviewCV={setSelectedCvCandidate}
            onDeleteCandidate={handleDeleteCandidate}
            onSendActivation={handleSendActivation}
            onAddToJob={setSelectedJobCandidate}
            onFindSimilar={handleFindSimilar}
          />
        ) : (
          <div className="candidates-table-container">
            <table className="candidates-table">
              <thead>
                <tr>
                  <th>Talent Details</th>
                  <th>Status</th>
                  <th className="action-col">Action</th>
                </tr>
              </thead>
              <tbody>
                {invitations
                  .filter(inv => {
                    const fullName = `${inv.talent?.name || ''} ${inv.talent?.lastname || ''}`.toLowerCase();
                    const email = (inv.talent?.email || '').toLowerCase();
                    return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
                  })
                  .map((inv) => (
                    <tr key={inv.id} className="candidate-row">
                      <td className="name-cell">
                        <div className="candidate-info">
                          <div className="candidate-avatar-placeholder">
                            {inv.talent?.name ? inv.talent.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div className="candidate-details">
                            <span className="candidate-name">
                              {inv.talent ? `${inv.talent.name} ${inv.talent.lastname}`.trim() : 'Anonymous'}
                            </span>
                            <span className="candidate-role">{inv.talent?.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="status-cell">
                        <div 
                          className="status-pill-btn" 
                          style={{
                            backgroundColor: inv.invitationStatus === 'Accepted' || inv.invitationStatus === 1 ? '#EAF9EC' : 
                                             inv.invitationStatus === 'Rejected' || inv.invitationStatus === 2 ? '#FFF1F0' : '#FFF8DF',
                            border: 'none',
                            color: inv.invitationStatus === 'Accepted' || inv.invitationStatus === 1 ? '#08AC16' : 
                                   inv.invitationStatus === 'Rejected' || inv.invitationStatus === 2 ? '#ED5757' : '#C97716',
                            justifyContent: 'center',
                            cursor: 'default',
                            width: '100px'
                          }}
                        >
                          <span className="status-text" style={{ fontWeight: '600' }}>
                            {inv.invitationStatus === 'Accepted' || inv.invitationStatus === 1 ? 'Accepted' :
                             inv.invitationStatus === 'Rejected' || inv.invitationStatus === 2 ? 'Rejected' : 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="action-cell">
                        {(inv.invitationStatus === 'Pending' || inv.invitationStatus === 0) ? (
                          <button 
                            className="secondary-btn-header"
                            style={{ height: '32px', borderColor: '#ED5757', color: '#ED5757', padding: '0 12px' }}
                            onClick={() => handleRevokeInvitation(inv.id)}
                          >
                            <Icon icon="solar:close-circle-linear" style={{ color: '#ED5757' }} />
                            <span>Revoke</span>
                          </button>
                        ) : (
                          <span style={{ color: '#B4BBC5', fontStyle: 'italic', fontSize: '12px' }}>No actions</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isInviteModalOpen && (
        <div className="invite-modal-overlay" onClick={() => setIsInviteModalOpen(false)}>
          <div className="invite-modal-content" onClick={e => e.stopPropagation()}>
            <div className="invite-modal-header">
              <h3>Invite Talent</h3>
              <button className="close-modal-btn" onClick={() => setIsInviteModalOpen(false)}>
                <Icon icon="solar:close-circle-linear" />
              </button>
            </div>
            <div className="invite-modal-body">
              <label className="form-label">Select Seeded Talent</label>
              <select 
                value={selectedTalentId} 
                onChange={(e) => setSelectedTalentId(e.target.value)}
                className="invite-select"
              >
                <option value="">-- Choose Talent --</option>
                {availableTalents.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.email})</option>
                ))}
              </select>

              <div className="or-divider">OR</div>

              <label className="form-label">Enter Custom Talent ID</label>
              <input 
                type="number"
                placeholder="Enter ID (e.g. 6)"
                value={selectedTalentId}
                onChange={(e) => setSelectedTalentId(e.target.value)}
                className="invite-input"
              />

              {inviteMessage && (
                <div className={`invite-message ${inviteMessage.includes('success') ? 'success' : 'error'}`}>
                  {inviteMessage}
                </div>
              )}
            </div>
            <div className="invite-modal-footer">
              <button className="cancel-btn" onClick={() => setIsInviteModalOpen(false)}>Cancel</button>
              <button 
                className="send-btn" 
                onClick={handleInvite}
                disabled={isInviting || !selectedTalentId}
              >
                {isInviting ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Similar Candidates Search Loader */}
      {isSearchingSimilar && (
        <div className="search-similar-overlay">
          <div className="loader-box">
            <div className="spinner-large"></div>
            <p>Searching similar candidates...</p>
          </div>
        </div>
      )}

      {/* CV Preview Modal */}
      {selectedCvCandidate && (
        <CVPreviewModal 
          candidate={selectedCvCandidate} 
          onClose={() => setSelectedCvCandidate(null)} 
        />
      )}

      {/* Add to Job Modal */}
      {selectedJobCandidate && (
        <AddToJobModal 
          candidate={selectedJobCandidate} 
          onClose={() => setSelectedJobCandidate(null)} 
          onConfirm={handleAddToJobConfirm}
        />
      )}

      {/* Status/Success Toast Notification */}
      {toast && (
        <div className={`toast-message animate-fade-in ${toast.type}`}>
          <Icon icon={toast.type === 'success' ? 'solar:check-circle-bold' : 'solar:danger-bold'} className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default CandidatesView;
