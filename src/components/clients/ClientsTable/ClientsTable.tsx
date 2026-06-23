// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './ClientsTable.css';

const ClientsTable = ({ clients, onNewTask, onSelectCompany }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    if (activeMenuId === null) return;

    const handleOutsideClick = (event) => {
      const container = document.querySelector(`.col-actions[data-client-id="${activeMenuId}"]`);
      if (container && !container.contains(event.target)) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [activeMenuId]);

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="clients-table-container">
      <div className="clients-table-header">
        <div className="col col-name">Full name <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-am">Assigned AM</div>
        <div className="col col-rep">Representative <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-contact">Contact <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-projects">Projects <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-status">Status <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-positions">Open Positions <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-score">Score <Icon icon="solar:alt-arrow-down-linear" /></div>
        <div className="col col-actions"></div>
      </div>

      <div className="clients-table-rows">
        {clients.map((client) => (
          <div key={client.id} className="client-row" onClick={() => onSelectCompany(client)}>
            <div className="col col-name">
              <div className="client-info">
                <div className="client-logo" style={{ background: `${client.logoColor}15`, color: client.logoColor }}>
                  <Icon icon={client.logo} />
                </div>
                <div className="client-name-wrapper">
                  <span className="client-name">{client.name}</span>
                  {client.unseenMessages > 0 && (
                    <div className="message-badge">
                      <Icon icon="solar:chat-round-dots-linear" />
                      <span>{client.unseenMessages}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col col-am">{client.assignedAM}</div>
            <div className="col col-rep">{client.representative}</div>

            <div className="col col-contact">
              <div className="contact-icons">
                <Icon icon="solar:phone-linear" className="contact-icon" />
                <Icon icon="solar:letter-linear" className="contact-icon" />
              </div>
            </div>

            <div className="col col-projects">
              <div className="projects-badge">{client.projects} projects</div>
            </div>

            <div className="col col-status">
              <div className="status-container">
                <div className="status-badge-green">Status <Icon icon="solar:alt-arrow-down-linear" /></div>
              </div>
            </div>

            <div className="col col-positions">
              <div className="positions-badge">{client.openPositions} position</div>
            </div>

            <div className="col col-score">{client.score}%</div>

            <div className="col col-actions" data-client-id={client.id}>
              <button className="row-action-btn" onClick={(e) => toggleMenu(e, client.id)}>
                <Icon icon="solar:menu-dots-bold" />
              </button>
              
              {activeMenuId === client.id && (
                <div className="action-dropdown glass" onClick={(e) => e.stopPropagation()}>
                  <button className="dropdown-item" onClick={(e) => { e.stopPropagation(); onNewTask(client); setActiveMenuId(null); }}>
                    <Icon icon="solar:clipboard-list-linear" />
                    <span>Create a Task</span>
                  </button>
                  <button className="dropdown-item delete" onClick={(e) => e.stopPropagation()}>
                    <Icon icon="solar:trash-bin-trash-linear" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsTable;

