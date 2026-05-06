// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './Widgets.css';

const ProfileCard = ({ candidate, onNewTask }) => {
  return (
    <div className="widget-card profile-card">
      <div className="profile-main">
        <div className="profile-image-section">
          <div className="profile-img-wrapper">
            <img 
              src={candidate.avatar || 'https://i.pravatar.cc/150?u=giorgi'} 
              alt={candidate.name} 
              className="profile-img" 
            />
          </div>
          <div className="upload-video-btn">
            <div className="upload-icon-wrapper">
              <Icon icon="solar:file-upload-linear" className="upload-icon" />
            </div>
            <span>Upload Video</span>
          </div>
        </div>

        <div className="profile-info-section">
          <h2 className="profile-name">{candidate.name}</h2>
          <span className="profile-subtitle">{candidate.role}</span>

          <div className="info-list">
            <div className="info-item">
              <div className="info-icon-bg"><Icon icon="solar:suitcase-linear" /></div>
              <div className="info-text">
                <span className="info-label">Position</span>
                <span className="info-value">{candidate.position}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-bg"><Icon icon="solar:layers-linear" /></div>
              <div className="info-text">
                <span className="info-label">Experience</span>
                <span className="info-value">{candidate.experience}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-bg"><Icon icon="solar:user-circle-linear" /></div>
              <div className="info-text">
                <span className="info-label">Age</span>
                <span className="info-value">{candidate.age}</span>
              </div>
            </div>
          </div>

          <button 
            className="create-task-link"
            onClick={() => onNewTask({
              type: 'user',
              typeName: 'Talent',
              name: candidate.name,
            })}
          >
            Create a Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
