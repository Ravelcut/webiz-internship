// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { talentService } from '../../../services/talentService';
import './TopHeader.css';

const TopHeader = ({ onMenuClick, activeModule, profile, userRole, onRefreshData }) => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
  const [actionStates, setActionStates] = useState({}); // { [invId]: 'accepting' | 'accepted' | 'rejecting' | 'rejected' }
  const trayRef = useRef(null);
  const bellRef = useRef(null);

  const getInitials = () => {
    if (profile) {
      if (profile.companyName) {
        return profile.companyName.substring(0, 2).toUpperCase();
      }
      const first = profile.name ? profile.name.charAt(0) : '';
      const last = profile.lastname ? profile.lastname.charAt(0) : '';
      return (first + last).toUpperCase() || 'CP';
    }
    return 'NP';
  };

  // Fetch invitations when tray opens (only for talent users)
  const fetchInvitations = async () => {
    if (userRole !== 'talent') return;
    setIsLoadingInvitations(true);
    try {
      const data = await talentService.getInvitations();
      setInvitations(data || []);
    } catch (err) {
      console.error('Failed to fetch invitations:', err);
      setInvitations([]);
    } finally {
      setIsLoadingInvitations(false);
    }
  };

  // Fetch on mount if talent
  useEffect(() => {
    if (userRole === 'talent') {
      fetchInvitations();
    }
  }, [userRole]);

  // Re-fetch when tray opens
  useEffect(() => {
    if (isTrayOpen && userRole === 'talent') {
      fetchInvitations();
    }
  }, [isTrayOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        trayRef.current && !trayRef.current.contains(e.target) &&
        bellRef.current && !bellRef.current.contains(e.target)
      ) {
        setIsTrayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pendingInvitations = invitations.filter(
    inv => inv.invitationStatus === 'Pending' || inv.invitationStatus === 0
  );

  const handleAccept = async (invId) => {
    setActionStates(prev => ({ ...prev, [invId]: 'accepting' }));
    try {
      await talentService.acceptInvitation(invId);
      setActionStates(prev => ({ ...prev, [invId]: 'accepted' }));
      // Remove after brief feedback
      setTimeout(() => {
        setInvitations(prev => prev.filter(i => i.id !== invId));
        setActionStates(prev => {
          const next = { ...prev };
          delete next[invId];
          return next;
        });
        if (onRefreshData) onRefreshData();
      }, 1200);
    } catch (err) {
      console.error('Failed to accept invitation:', err);
      setActionStates(prev => {
        const next = { ...prev };
        delete next[invId];
        return next;
      });
    }
  };

  const handleReject = async (invId) => {
    setActionStates(prev => ({ ...prev, [invId]: 'rejecting' }));
    try {
      await talentService.rejectInvitation(invId);
      setActionStates(prev => ({ ...prev, [invId]: 'rejected' }));
      // Remove after brief feedback
      setTimeout(() => {
        setInvitations(prev => prev.filter(i => i.id !== invId));
        setActionStates(prev => {
          const next = { ...prev };
          delete next[invId];
          return next;
        });
        if (onRefreshData) onRefreshData();
      }, 1200);
    } catch (err) {
      console.error('Failed to reject invitation:', err);
      setActionStates(prev => {
        const next = { ...prev };
        delete next[invId];
        return next;
      });
    }
  };

  const getHeaderContent = () => {
    switch(activeModule) {
      case 'jobs':
        return (
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={onMenuClick}>
              <Icon icon="carbon:menu" />
            </button>
             <Icon icon="solar:suitcase-linear" className="logo-icon blue" />
            <span className="header-title">My Jobs</span>
            <div className="header-breadcrumbs">
              <span className="breadcrumb-path">Company / </span>
              <span className="breadcrumb-current">{profile?.companyName || 'Internity'}</span>
              <Icon icon="solar:alt-arrow-down-linear" className="breadcrumb-chevron" />
            </div>
          </div>
        );
      case 'people':
        return (
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={onMenuClick}>
              <Icon icon="carbon:menu" />
            </button>
            <Icon icon="solar:users-group-rounded-linear" className="logo-icon blue" />
            <span className="header-title">Candidates</span>
          </div>
        );
      case 'companies':
        return (
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={onMenuClick}>
              <Icon icon="carbon:menu" />
            </button>
            <Icon icon="solar:buildings-2-linear" className="logo-icon blue" />
            <span className="header-title">Companies</span>
          </div>
        );
      default:
        return (
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={onMenuClick}>
              <Icon icon="carbon:menu" />
            </button>
            <Icon icon="solar:widget-5-bold" className="logo-icon blur" />
            <span className="header-title">Task Manager</span>
          </div>
        );
    }
  };

  return (
    <div className="top-header">
      {getHeaderContent()}

      <div className="header-right">
        <div className="header-actions">
          <div
            className="icon-circle light bell-wrapper"
            ref={bellRef}
            onClick={() => setIsTrayOpen(!isTrayOpen)}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <Icon icon="solar:bell-linear" className="bell-icon" />
            {userRole === 'talent' && pendingInvitations.length > 0 && (
              <span className="bell-badge-dot" />
            )}
          </div>
          <div className="icon-circle blue">
            <span className="avatar-initials">{getInitials()}</span>
          </div>
        </div>

        <div className="project-selector">
          <span className="project-name">{profile?.companyName || 'Legato'}</span>
          <Icon icon="solar:alt-arrow-down-linear" className="chevron-icon" />
        </div>
      </div>

      {/* Notification Tray */}
      {isTrayOpen && (
        <div className="notification-tray" ref={trayRef}>
          <div className="notification-tray-header">
            <h3>Notifications</h3>
            {pendingInvitations.length > 0 && (
              <span className="notification-count">{pendingInvitations.length}</span>
            )}
          </div>

          <div className="notification-tray-body">
            {isLoadingInvitations ? (
              <div className="notification-empty">
                <div className="notification-spinner" />
                <span>Loading notifications...</span>
              </div>
            ) : userRole !== 'talent' ? (
              <div className="notification-empty">
                <Icon icon="solar:bell-off-linear" className="notification-empty-icon" />
                <span>No notifications</span>
              </div>
            ) : pendingInvitations.length === 0 ? (
              <div className="notification-empty">
                <Icon icon="solar:check-read-linear" className="notification-empty-icon" />
                <span>All caught up!</span>
              </div>
            ) : (
              pendingInvitations.map((inv) => {
                const state = actionStates[inv.id];
                const companyName = inv.company?.companyName || 'Unknown Company';
                const contactName = inv.company
                  ? `${inv.company.name || ''} ${inv.company.lastname || ''}`.trim()
                  : '';

                return (
                  <div
                    key={inv.id}
                    className={`notification-item ${state === 'accepted' ? 'accepted' : ''} ${state === 'rejected' ? 'rejected' : ''}`}
                  >
                    <div className="notification-item-icon">
                      <Icon icon="solar:buildings-2-bold-duotone" />
                    </div>
                    <div className="notification-item-content">
                      <span className="notification-item-title">
                        Invitation from <strong>{companyName}</strong>
                      </span>
                      {contactName && (
                        <span className="notification-item-sub">
                          by {contactName}
                        </span>
                      )}

                      {state === 'accepted' ? (
                        <span className="notification-item-status accepted">
                          <Icon icon="solar:check-circle-bold" /> Accepted
                        </span>
                      ) : state === 'rejected' ? (
                        <span className="notification-item-status rejected">
                          <Icon icon="solar:close-circle-bold" /> Rejected
                        </span>
                      ) : (
                        <div className="notification-item-actions">
                          <button
                            className="notification-accept-btn"
                            onClick={() => handleAccept(inv.id)}
                            disabled={state === 'accepting' || state === 'rejecting'}
                          >
                            {state === 'accepting' ? (
                              <div className="btn-spinner" />
                            ) : (
                              <>
                                <Icon icon="solar:check-circle-linear" />
                                Accept
                              </>
                            )}
                          </button>
                          <button
                            className="notification-reject-btn"
                            onClick={() => handleReject(inv.id)}
                            disabled={state === 'accepting' || state === 'rejecting'}
                          >
                            {state === 'rejecting' ? (
                              <div className="btn-spinner" />
                            ) : (
                              <>
                                <Icon icon="solar:close-circle-linear" />
                                Reject
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeader;
