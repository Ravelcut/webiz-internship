// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './TopHeader.css';

const TopHeader = ({ onMenuClick, activeModule, profile }) => {
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
          <div className="icon-circle light">
            <Icon icon="solar:bell-linear" className="bell-icon" />
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
    </div>
  );
};

export default TopHeader;
