// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './SelectEntity.css';

const entityTypes = [
  { id: 'talent', label: 'Talent', icon: 'solar:user-linear' },
  { id: 'client', label: 'Client', icon: 'carbon:building' },
  { id: 'job', label: 'Job', icon: 'solar:file-text-linear' },
];

const clientEntities = [
  { id: 'c1', name: 'Johnson & Johnson', logo: 'simple-icons:dyson', color: '#000000' },
  { id: 'c2', name: 'Gillette', logo: 'simple-icons:starbucks', color: '#00704A' },
  { id: 'c3', name: 'Louis Vuitton', logo: 'simple-icons:dominos', color: '#E4002B' },
  { id: 'c4', name: 'Facebook', logo: 'simple-icons:bmw', color: '#FFFFFF', isHighlighted: true },
];

const SelectEntity = ({ onClose }) => {
  const [activeType, setActiveType] = useState('client');
  const [selectedEntity, setSelectedEntity] = useState({
    name: 'Savannah Nguyen',
    avatar: 'SN',
    color: '#8B949C',
  });


  return (
    <div className="select-entity-dropdown">
        <div className="entity-type-tabs">
          {entityTypes.map((type) => (
            <button
              key={type.id}
              className={`entity-type-tab ${activeType === type.id ? 'active' : ''}`}
              onClick={() => setActiveType(type.id)}
            >
              <Icon icon={type.icon} className="tab-entity-icon" />
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        <div className="entity-divider" />

        <div className="entity-select-body">
          <div className="entity-input-wrapper">
            <div className="entity-input">
              <div className="input-label-float">
                <span>Select Entity</span>
              </div>
              <div className="input-value-row">
                <div className="input-avatar">
                  <img src="https://i.pravatar.cc/100?u=savannah" alt="SN" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                </div>
                <span className="input-name">{selectedEntity.name}</span>
              </div>
              <Icon icon="solar:alt-arrow-down-linear" className="input-chevron" />
            </div>
          </div>

          <div className="entity-list">
            {clientEntities.map((entity) => (
              <div
                key={entity.id}
                className={`entity-list-item ${entity.isHighlighted ? 'hovered' : ''}`}
                onClick={() => {
                  setSelectedEntity(entity);
                }}
              >
                <div className="entity-item-avatar" style={{ background: entity.color, overflow: 'hidden', padding: entity.logo === 'simple-icons:bmw' ? '0' : '6px' }}>
                  <Icon icon={entity.logo} style={{ width: '100%', height: '100%', color: entity.color === '#FFFFFF' ? '#000000' : '#FFFFFF' }} />
                </div>
                <span className="entity-item-name">{entity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default SelectEntity;
