import React from 'react';
import { Icon } from '@iconify/react';
import '../Widgets.css';

const BillingInfoCard = ({ billing }) => {
  const fields = [
    { label: 'Bank', value: billing.bank, icon: 'solar:bank-linear' },
    { label: 'Country', value: billing.country, icon: 'solar:flag-linear' },
  ];

  return (
    <div className="widget-card billing-info-card">
      <div className="widget-header">
        <Icon icon="solar:card-linear" className="header-icon" />
        <h3 className="widget-title">Billing Information</h3>
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

export default BillingInfoCard;
