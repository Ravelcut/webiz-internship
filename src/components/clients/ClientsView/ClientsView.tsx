// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import ClientsTable from '../ClientsTable/ClientsTable';
import ClientsFooter from '../ClientsFooter/ClientsFooter';
import { companyService } from '../../../services/companyService';
import { talentService } from '../../../services/talentService';
import { recruiterService } from '../../../services/recruiterService';
import './ClientsView.css';

const ClientsView = ({ onNewTask, onSelectCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const userRole = localStorage.getItem('userRole');
        let rawCompanies = null;

        if (userRole === 'talent') {
          rawCompanies = await talentService.getAllCompanies();
        } else if (userRole === 'recruiter') {
          rawCompanies = await recruiterService.getAllCompanies();
        } else {
          rawCompanies = null;
        }

        if (rawCompanies && Array.isArray(rawCompanies) && rawCompanies.length > 0) {
          const mapped = rawCompanies.map((c, idx) => {
            const colors = ['#A855F7', '#EC4899', '#6366F1', '#EF4444', '#8B5CF6', '#F59E0B', '#4F46E5', '#DB2777'];
            return {
              id: c.id,
              logo: 'solar:buildings-2-bold',
              logoColor: colors[idx % colors.length],
              name: c.companyName || 'Anonymous Company',
              assignedAM: '-',
              representative: c.email || '-',
              projects: 0,
              status: 'Active',
              openPositions: 0,
              score: 100,
              unseenMessages: 0,
              isVerified: true
            };
          });
          setCompanies(mapped);
        } else {
          setCompanies([]);
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const clientStats = {
    companies: companies.length,
    employees: companies.length * 3,
    price: '82,980$',
    cost: '12,980$',
    profit: '70,000$'
  };

  return (
    <div className="clients-view">
      <div className="clients-header">
        <div className="clients-search-wrapper">
          <Icon icon="solar:magnifer-linear" className="search-icon" />
          <input type="text" placeholder="Start searching..." className="clients-search-input" />
        </div>

        <div className="clients-actions">
          <div className="action-group">
            <button className="secondary-action-btn">
              <Icon icon="solar:file-download-linear" />
              <span>Export in Excel</span>
            </button>
            <button className="secondary-action-btn">
              <Icon icon="solar:settings-linear" />
              <span>Customize Table</span>
            </button>
          </div>
          <button className="primary-action-btn">
            <Icon icon="solar:add-circle-linear" />
            <span>New Company</span>
          </button>
        </div>
      </div>

      <div className="clients-content">
        {isLoading ? (
          <div className="loading-spinner">Loading companies...</div>
        ) : (
          <ClientsTable clients={companies} onNewTask={onNewTask} onSelectCompany={onSelectCompany} />
        )}
      </div>

      <ClientsFooter stats={clientStats} />
    </div>
  );
};

export default ClientsView;
