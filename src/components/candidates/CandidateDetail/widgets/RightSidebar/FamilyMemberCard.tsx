// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import '../Widgets.css';

const FamilyMemberCard = ({ family }) => {
  const fields = [
    { label: 'Full Name', value: family.name, icon: 'solar:user-rounded-linear' },
    { label: 'Relation', value: family.relation, icon: 'solar:users-group-rounded-linear' },
    { label: 'Phone Number', value: family.phone, icon: 'solar:phone-linear' },
    { label: 'Emergency', value: family.emergency, icon: 'solar:danger-linear' },
  ];

  return (
    <div className="widget-card family-member-card">
      <div className="widget-header">
        <Icon icon="solar:users-group-rounded-linear" className="header-icon" />
        <h3 className="widget-title">Family Member</h3>
      </div>

      <div className="contact-grid">
        {fields.map((field, index) => (
          <div key={index} className="contact-field">
            <div className="contact-field-icon">
              <Icon icon={field.icon} />
            </div>
            <div className="contact-field-info">
              <span className="field-label">{field.label}</span>
              <span className="field-value">{field.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyMemberCard;
