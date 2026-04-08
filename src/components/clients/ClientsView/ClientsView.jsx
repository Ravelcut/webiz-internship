import React from 'react';
import { Icon } from '@iconify/react';
import ClientsTable from '../ClientsTable/ClientsTable';
import ClientsFooter from '../ClientsFooter/ClientsFooter';
import { clientsData, clientStats } from '../../../data/mockData';
import './ClientsView.css';

const ClientsView = ({ onNewTask, onSelectCompany }) => {
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
        <ClientsTable clients={clientsData} onNewTask={onNewTask} onSelectCompany={onSelectCompany} />
      </div>

      <ClientsFooter stats={clientStats} />
    </div>
  );
};

export default ClientsView;
