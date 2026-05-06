// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import '../Widgets.css';

const ProjectsCarousel = ({ projects }) => {
  return (
    <div className="widget-card projects-carousel">
      <div className="widget-header">
        <div className="header-left-group">
          <Icon icon="solar:users-group-rounded-linear" className="header-icon" />
          <h3 className="widget-title">Projects</h3>
        </div>
        
        <div className="project-filters">
          <button className="filter-pill active">Ongoing</button>
          <button className="filter-pill">History</button>
        </div>

        <div className="carousel-nav">
          <button className="nav-btn"><Icon icon="solar:alt-arrow-left-linear" /></button>
          <button className="nav-btn active"><Icon icon="solar:alt-arrow-right-linear" /></button>
        </div>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-logo-bg">
              <Icon icon={project.logo} className="project-logo" />
            </div>
            <div className="project-info">
              <span className="project-name">{project.name}</span>
              <span className="project-type">{project.type}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        <div className="dot"></div>
        <div className="dot active"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
