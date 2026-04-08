import React from 'react';
import { Icon } from '@iconify/react';
import '../Widgets.css';

const ContactDetailsCard = ({ contact }) => {
  const fields = [
    { label: 'Mobile number', value: contact.mobile, icon: 'solar:phone-linear', highlightIcon: 'logos:whatsapp-icon' },
    { label: 'Mail', value: contact.email, icon: 'solar:letter-linear' },
    { label: 'Country', value: contact.country, icon: 'solar:flag-linear' },
    { label: 'City', value: contact.city, icon: 'solar:city-linear' },
    { label: 'Street address', value: contact.address, icon: 'solar:map-point-linear' },
    { label: 'Zip code', value: contact.zip, icon: 'solar:mailbox-linear' },
    { label: 'Recruiter Email', value: contact.recruiterEmail, icon: 'solar:letter-linear' },
    { label: 'Recruiter ID', value: contact.recruiterId, icon: 'solar:user-id-linear' },
    { label: 'WhatsApp', value: contact.whatsapp, icon: 'solar:chat-round-dots-linear', highlightIcon: 'solar:link-linear' },
  ];

  return (
    <div className="widget-card contact-details-card">
      <div className="widget-header">
        <Icon icon="solar:user-linear" className="header-icon" />
        <h3 className="widget-title">Contact Details</h3>
      </div>

      <div className="contact-grid">
        {fields.map((field, index) => (
          <div key={index} className="contact-field">
            <div className="contact-field-icon">
              <Icon icon={field.icon} />
            </div>
            <div className="contact-field-info">
              <span className="field-label">{field.label}</span>
              <div className="field-value-row">
                <span className="field-value">{field.value}</span>
                {field.highlightIcon && <Icon icon={field.highlightIcon} className="val-addon" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetailsCard;
