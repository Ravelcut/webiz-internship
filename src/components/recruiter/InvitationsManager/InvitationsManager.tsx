// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { recruiterService } from '../../../services/recruiterService';
import './InvitationsManager.css';

const InvitationsManager = () => {
  const [invitations, setInvitations] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState('invitations');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [invs, jrs, companies] = await Promise.all([
        recruiterService.getInvitations().catch(() => []),
        recruiterService.getJoinRequests().catch(() => []),
        recruiterService.getAllCompanies().catch(() => []),
      ]);
      setInvitations(invs || []);
      setJoinRequests(jrs || []);
      setAllCompanies(companies || []);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('InvitationsManager fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptInvitation = async (invitationId) => {
    setActionLoading(`accept-${invitationId}`);
    try {
      await recruiterService.acceptInvitation(invitationId);
      setInvitations(prev => prev.filter(i => i.id !== invitationId));
      setSuccessMsg('Invitation accepted!');
    } catch (err) {
      setError('Failed to accept invitation.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectInvitation = async (invitationId) => {
    setActionLoading(`reject-${invitationId}`);
    try {
      await recruiterService.rejectInvitation(invitationId);
      setInvitations(prev => prev.filter(i => i.id !== invitationId));
      setSuccessMsg('Invitation declined.');
    } catch (err) {
      setError('Failed to decline invitation.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRequestToJoin = async (companyId) => {
    setActionLoading(`join-${companyId}`);
    try {
      await recruiterService.requestToJoin(companyId);
      const jrs = await recruiterService.getJoinRequests().catch(() => []);
      setJoinRequests(jrs || []);
      setSuccessMsg('Join request sent!');
    } catch (err) {
      setError('Failed to send join request.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelJoinRequest = async (joinRequestId) => {
    setActionLoading(`cancel-${joinRequestId}`);
    try {
      await recruiterService.cancelJoinRequest(joinRequestId);
      setJoinRequests(prev => prev.filter(j => j.id !== joinRequestId));
      setSuccessMsg('Join request cancelled.');
    } catch (err) {
      setError('Failed to cancel join request.');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const map = {
      Pending: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: 'solar:clock-circle-linear' },
      Accepted: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: 'solar:check-circle-linear' },
      Rejected: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: 'solar:close-circle-linear' },
    };
    const s = map[status] || map.Pending;
    return (
      <span className="im-status-badge" style={{ color: s.color, background: s.bg }}>
        <Icon icon={s.icon} />
        {status}
      </span>
    );
  };

  // Filter out companies the recruiter has already joined or has pending requests for
  const pendingCompanyIds = new Set(joinRequests.map(j => j.companyId));

  return (
    <div className="im-container">
      <div className="im-header">
        <div className="im-header-left">
          <Icon icon="solar:letter-opened-bold" className="im-header-icon" />
          <div>
            <h2 className="im-title">Invitations & Requests</h2>
            <p className="im-subtitle">Manage company invitations and join requests</p>
          </div>
        </div>
        <button className="im-refresh-btn" onClick={fetchData} disabled={isLoading}>
          <Icon icon="solar:refresh-linear" className={isLoading ? 'im-spinning' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {successMsg && (
        <div className="im-toast im-toast-success">
          <Icon icon="solar:check-circle-bold" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="im-toast im-toast-error">
          <Icon icon="solar:danger-triangle-bold" />
          <span>{error}</span>
          <button className="im-toast-dismiss" onClick={() => setError('')}>
            <Icon icon="solar:close-circle-linear" />
          </button>
        </div>
      )}

      <div className="im-tabs">
        <button
          className={`im-tab ${activeTab === 'invitations' ? 'active' : ''}`}
          onClick={() => setActiveTab('invitations')}
        >
          <Icon icon="solar:letter-linear" />
          <span>Invitations</span>
          {invitations.length > 0 && <span className="im-tab-count">{invitations.length}</span>}
        </button>
        <button
          className={`im-tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <Icon icon="solar:hand-shake-linear" />
          <span>Join Requests</span>
          {joinRequests.length > 0 && <span className="im-tab-count">{joinRequests.length}</span>}
        </button>
        <button
          className={`im-tab ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          <Icon icon="solar:buildings-2-linear" />
          <span>Browse Companies</span>
        </button>
      </div>

      <div className="im-content">
        {isLoading ? (
          <div className="im-loading">
            <div className="im-spinner" />
            <span>Loading...</span>
          </div>
        ) : activeTab === 'invitations' ? (
          invitations.length === 0 ? (
            <div className="im-empty">
              <Icon icon="solar:mailbox-linear" className="im-empty-icon" />
              <h3>No Pending Invitations</h3>
              <p>You'll see company invitations here when they arrive.</p>
            </div>
          ) : (
            <div className="im-list">
              {invitations.map(inv => (
                <div key={inv.id} className="im-card">
                  <div className="im-card-icon">
                    <Icon icon="solar:buildings-2-bold" />
                  </div>
                  <div className="im-card-info">
                    <h4 className="im-card-title">{inv.companyName || 'Company'}</h4>
                    <p className="im-card-meta">
                      <Icon icon="solar:calendar-minimalistic-linear" />
                      {formatDate(inv.createdAt || inv.sentAt)}
                    </p>
                  </div>
                  <div className="im-card-actions">
                    <button
                      className="im-action-btn im-accept"
                      onClick={() => handleAcceptInvitation(inv.id)}
                      disabled={actionLoading === `accept-${inv.id}`}
                    >
                      {actionLoading === `accept-${inv.id}` ? (
                        <div className="im-btn-spinner" />
                      ) : (
                        <Icon icon="solar:check-circle-linear" />
                      )}
                      <span>Accept</span>
                    </button>
                    <button
                      className="im-action-btn im-reject"
                      onClick={() => handleRejectInvitation(inv.id)}
                      disabled={actionLoading === `reject-${inv.id}`}
                    >
                      {actionLoading === `reject-${inv.id}` ? (
                        <div className="im-btn-spinner" />
                      ) : (
                        <Icon icon="solar:close-circle-linear" />
                      )}
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : activeTab === 'requests' ? (
          joinRequests.length === 0 ? (
            <div className="im-empty">
              <Icon icon="solar:hand-shake-linear" className="im-empty-icon" />
              <h3>No Join Requests</h3>
              <p>Browse companies and request to join one.</p>
            </div>
          ) : (
            <div className="im-list">
              {joinRequests.map(jr => (
                <div key={jr.id} className="im-card">
                  <div className="im-card-icon im-card-icon-request">
                    <Icon icon="solar:buildings-2-bold" />
                  </div>
                  <div className="im-card-info">
                    <h4 className="im-card-title">{jr.companyName || 'Company'}</h4>
                    <p className="im-card-meta">
                      <Icon icon="solar:calendar-minimalistic-linear" />
                      {formatDate(jr.createdAt)}
                    </p>
                  </div>
                  <div className="im-card-actions">
                    {getStatusBadge(jr.status || 'Pending')}
                    {(jr.status === 'Pending' || !jr.status) && (
                      <button
                        className="im-action-btn im-cancel"
                        onClick={() => handleCancelJoinRequest(jr.id)}
                        disabled={actionLoading === `cancel-${jr.id}`}
                      >
                        {actionLoading === `cancel-${jr.id}` ? (
                          <div className="im-btn-spinner" />
                        ) : (
                          <Icon icon="solar:close-circle-linear" />
                        )}
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Browse Companies tab */
          allCompanies.length === 0 ? (
            <div className="im-empty">
              <Icon icon="solar:buildings-2-linear" className="im-empty-icon" />
              <h3>No Companies Found</h3>
              <p>There are no companies available to join at this time.</p>
            </div>
          ) : (
            <div className="im-list">
              {allCompanies.map(company => {
                const hasPending = pendingCompanyIds.has(company.id);
                return (
                  <div key={company.id} className="im-card">
                    <div className="im-card-icon im-card-icon-browse">
                      <Icon icon="solar:buildings-2-bold" />
                    </div>
                    <div className="im-card-info">
                      <h4 className="im-card-title">{company.name}</h4>
                      {company.email && (
                        <p className="im-card-meta">
                          <Icon icon="solar:letter-linear" />
                          {company.email}
                        </p>
                      )}
                    </div>
                    <div className="im-card-actions">
                      {hasPending ? (
                        <span className="im-status-badge" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                          <Icon icon="solar:clock-circle-linear" />
                          Request Pending
                        </span>
                      ) : (
                        <button
                          className="im-action-btn im-join"
                          onClick={() => handleRequestToJoin(company.id)}
                          disabled={actionLoading === `join-${company.id}`}
                        >
                          {actionLoading === `join-${company.id}` ? (
                            <div className="im-btn-spinner" />
                          ) : (
                            <Icon icon="solar:add-circle-linear" />
                          )}
                          <span>Request to Join</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InvitationsManager;
