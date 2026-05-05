import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import ClientsTable from '../ClientsTable/ClientsTable';
import ClientsFooter from '../ClientsFooter/ClientsFooter';
import { clientStats } from '../../../data/mockData';
import { companyService } from '../../../services/companyService';
import './ClientsView.css';

const ClientsView = ({ onNewTask, onSelectCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

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
