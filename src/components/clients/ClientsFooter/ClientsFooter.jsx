import React from 'react';
import './ClientsFooter.css';

const ClientsFooter = ({ stats }) => {
  return (
    <div className="clients-footer">
      <div className="stat-item">
        <span className="stat-label">COMPANIES</span>
        <span className="stat-value">{stats.companies}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">EMPLOYEES</span>
        <span className="stat-value">{stats.employees}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">PRICE</span>
        <span className="stat-value">{stats.price}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">COST</span>
        <span className="stat-value">{stats.cost}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">PROFIT</span>
        <span className="stat-value">{stats.profit}</span>
      </div>
    </div>
  );
};

export default ClientsFooter;
