// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './AdvancedEntityDropdown.css';

const clientEntities = [
  { id: 'c1', name: 'Johnson & Johnson', logo: 'simple-icons:dyson', color: '#000000' },
  { id: 'c2', name: 'Gillette', logo: 'simple-icons:starbucks', color: '#00704A' },
  { id: 'c3', name: 'Louis Vuitton', logo: 'simple-icons:dominos', color: '#E4002B' },
  { id: 'c4', name: 'Facebook', logo: 'simple-icons:bmw', color: '#FFFFFF', isHighlighted: true },
];

const AdvancedEntityDropdown = ({ onClose }) => {
  return (
    <div className="advanced-entity-dropdown">
        
        {/* Entity Type Input */}
        <div className="advanced-input-wrapper">
          <div className="advanced-input">
            <div className="input-label-float">
              <span>Entity Type</span>
            </div>
            <div className="input-value-row">
              <Icon icon="solar:user-linear" className="type-icon-small" />
              <span className="input-name">Talent</span>
            </div>
            <Icon icon="solar:alt-arrow-down-linear" className="input-chevron" />
          </div>
        </div>

        {/* Select Entity Input */}
        <div className="advanced-input-wrapper">
          <div className="advanced-input">
            <div className="input-label-float">
              <span>Select Entity</span>
            </div>
            <div className="input-value-row">
              <div className="input-avatar">
                <img src="https://i.pravatar.cc/100?u=savannah" alt="SN" />
              </div>
              <span className="input-name">Savannah Nguyen</span>
            </div>
            <Icon icon="solar:alt-arrow-down-linear" className="input-chevron" />
          </div>
        </div>

        <div className="advanced-divider" />

        {/* Filtered Entity List */}
        <div className="advanced-entity-list">
          {clientEntities.map((entity) => (
            <div
              key={entity.id}
              className={`advanced-item ${entity.isHighlighted ? 'active' : ''}`}
            >
              <div className="item-avatar-box" style={{ background: entity.color, padding: entity.logo === 'simple-icons:bmw' ? '0' : '6px' }}>
                <Icon icon={entity.logo} style={{ width: '100%', height: '100%', color: entity.color === '#FFFFFF' ? '#000000' : '#FFFFFF' }} />
              </div>
              <span className="item-name">{entity.name}</span>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AdvancedEntityDropdown;
