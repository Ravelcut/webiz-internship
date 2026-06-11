// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { companyService } from '../../../services/companyService';
import { talentService } from '../../../services/talentService';
import { recruiterService } from '../../../services/recruiterService';
import './ProfileSettingsModal.css';

const ProfileSettingsModal = ({ isOpen, onClose, userRole, currentUser, onProfileUpdate }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    description: '',
    employeeCount: 0,
    password: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError('');
    try {
      let data;
      if (userRole === 'company') {
        data = await companyService.getProfile();
        setProfile(data);
        setFormData({
          name: data?.companyName || '',
          lastname: '',
          email: data?.email || '',
          description: data?.companyDescription || '',
          employeeCount: data?.employeeCount ?? 0,
          password: '',
        });
      } else if (userRole === 'talent') {
        data = await talentService.getProfile();
        setProfile(data);
        setFormData({
          name: data?.name || '',
          lastname: data?.lastname || '',
          email: data?.email || '',
          description: '',
          employeeCount: 0,
          password: '',
        });
      } else if (userRole === 'recruiter') {
        data = await recruiterService.getProfile();
        setProfile(data);
        setFormData({
          name: data?.name || '',
          lastname: data?.lastname || '',
          email: data?.email || '',
          description: '',
          employeeCount: 0,
          password: '',
        });
      }
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      console.error('Profile fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSuccess('');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      let updated;
      if (userRole === 'company') {
        updated = await companyService.updateProfile({
          companyName: formData.name,
          companyDescription: formData.description,
          employeeCount: Number(formData.employeeCount),
        });
      } else if (userRole === 'talent') {
        const payload = {
          name: formData.name,
          lastname: formData.lastname,
        };
        if (formData.password) {
          payload.password = formData.password;
        }
        updated = await talentService.updateProfile(payload);
      } else if (userRole === 'recruiter') {
        const payload = {
          name: formData.name,
          lastname: formData.lastname,
        };
        if (formData.password) {
          payload.password = formData.password;
        }
        updated = await recruiterService.updateProfile(payload);
      }
      setSuccess('Profile updated successfully!');
      if (onProfileUpdate) onProfileUpdate(updated);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error('Profile save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const getRoleLabel = () => {
    if (userRole === 'company') return 'Company';
    if (userRole === 'talent') return 'Talent';
    if (userRole === 'recruiter') return 'Recruiter';
    return 'User';
  };

  const getRoleIcon = () => {
    if (userRole === 'company') return 'solar:buildings-2-bold';
    if (userRole === 'talent') return 'solar:user-bold';
    if (userRole === 'recruiter') return 'solar:user-speak-rounded-bold';
    return 'solar:user-bold';
  };

  return (
    <div className="psm-overlay" onClick={onClose}>
      <div className="psm-modal" onClick={e => e.stopPropagation()}>
        <div className="psm-header">
          <div className="psm-header-left">
            <div className="psm-avatar">
              <Icon icon={getRoleIcon()} />
            </div>
            <div>
              <h2 className="psm-title">Profile Settings</h2>
              <span className="psm-role-badge">{getRoleLabel()}</span>
            </div>
          </div>
          <button className="psm-close" onClick={onClose}>
            <Icon icon="solar:close-circle-linear" />
          </button>
        </div>

        <div className="psm-body">
          {isLoading ? (
            <div className="psm-loading">
              <div className="psm-spinner" />
              <span>Loading profile...</span>
            </div>
          ) : (
            <>
              {error && (
                <div className="psm-alert psm-alert-error">
                  <Icon icon="solar:danger-triangle-linear" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="psm-alert psm-alert-success">
                  <Icon icon="solar:check-circle-linear" />
                  <span>{success}</span>
                </div>
              )}

              {userRole === 'company' ? (
                <>
                  <div className="psm-field-group">
                    <label className="psm-label">Company Name</label>
                    <div className="psm-input-wrapper">
                      <Icon icon="solar:buildings-2-linear" className="psm-input-icon" />
                      <input
                        className="psm-input"
                        type="text"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="psm-field-group">
                    <label className="psm-label">Company Description</label>
                    <div className="psm-input-wrapper">
                      <Icon icon="solar:document-text-linear" className="psm-input-icon" />
                      <textarea
                        className="psm-input"
                        style={{ height: '80px', paddingLeft: '42px', resize: 'vertical' }}
                        value={formData.description}
                        onChange={e => handleChange('description', e.target.value)}
                        placeholder="Company description..."
                      />
                    </div>
                  </div>

                  <div className="psm-field-group">
                    <label className="psm-label">Employee Count</label>
                    <div className="psm-input-wrapper">
                      <Icon icon="solar:users-group-rounded-linear" className="psm-input-icon" />
                      <select
                        className="psm-input"
                        value={formData.employeeCount}
                        onChange={e => handleChange('employeeCount', e.target.value)}
                        style={{ appearance: 'none', WebkitAppearance: 'none' }}
                      >
                        <option value={0}>Small (1-3 employees)</option>
                        <option value={1}>Medium (4-20 employees)</option>
                        <option value={2}>Large (21-50 employees)</option>
                        <option value={3}>Larger (50+ employees)</option>
                      </select>
                      <Icon icon="solar:alt-arrow-down-linear" style={{ position: 'absolute', right: '14px', pointerEvents: 'none', color: '#94a3b8' }} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="psm-field-group">
                    <label className="psm-label">First Name</label>
                    <div className="psm-input-wrapper">
                      <Icon icon="solar:user-linear" className="psm-input-icon" />
                      <input
                        className="psm-input"
                        type="text"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder="First name"
                      />
                    </div>
                  </div>

                  <div className="psm-field-group">
                    <label className="psm-label">Last Name</label>
                    <div className="psm-input-wrapper">
                      <Icon icon="solar:user-linear" className="psm-input-icon" />
                      <input
                        className="psm-input"
                        type="text"
                        value={formData.lastname}
                        onChange={e => handleChange('lastname', e.target.value)}
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="psm-field-group">
                    <label className="psm-label">New Password (leave empty to keep current)</label>
                    <div className="psm-input-wrapper">
                      <Icon icon="solar:key-linear" className="psm-input-icon" />
                      <input
                        className="psm-input"
                        type="password"
                        value={formData.password}
                        onChange={e => handleChange('password', e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="psm-field-group">
                <label className="psm-label">Email Address (Read-Only)</label>
                <div className="psm-input-wrapper">
                  <Icon icon="solar:letter-linear" className="psm-input-icon" />
                  <input
                    className="psm-input"
                    type="email"
                    value={formData.email}
                    disabled
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="psm-footer">
          <button className="psm-btn psm-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="psm-btn psm-btn-save"
            onClick={handleSave}
            disabled={isSaving || isLoading}
          >
            {isSaving ? (
              <><div className="psm-btn-spinner" /><span>Saving...</span></>
            ) : (
              <><Icon icon="solar:diskette-linear" /><span>Save Changes</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
