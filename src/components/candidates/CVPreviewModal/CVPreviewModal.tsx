// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './CVPreviewModal.css';

const CVPreviewModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  // Custom mock CV data based on the candidate's name
  const isAlex = candidate.name.toLowerCase().includes('alex');
  
  const cvData = {
    title: isAlex ? 'Lead Backend Engineer / Tech Lead' : 'Senior Software Engineer',
    summary: isAlex 
      ? 'High-performing Software Architect and Backend Engineer with 8+ years of experience specializing in highly scalable C#, ASP.NET Core, and PostgreSQL services. Passionate about building robust systems, mentoring engineers, and implementing efficient CI/CD pipelines.'
      : 'Passionate and detail-oriented Senior Engineer with 6+ years of fullstack development experience. Skilled in modern web technologies, responsive UI architectures, and cloud deployments.',
    experience: isAlex ? [
      {
        role: 'Lead Software Architect',
        company: 'Quantum Leap AI',
        period: '2023 - Present',
        bullets: [
          'Designed and developed high-throughput C# microservices, boosting transaction throughput by 42%.',
          'Spearheaded transition from legacy systems to dockerized environments running on Kubernetes.',
          'Mentored 10+ junior and mid-level developers, implementing clean code and architecture reviews.'
        ]
      },
      {
        role: 'Senior Backend Developer',
        company: 'Initech Corp',
        period: '2020 - 2023',
        bullets: [
          'Designed scalable API architectures using ASP.NET Core and PostgreSQL, reducing latency by 35%.',
          'Built custom real-time messaging hubs using WebSockets and Redis caching.',
          'Collaborated with product teams to design enterprise database schemas and optimize query paths.'
        ]
      },
      {
        role: 'Fullstack Software Engineer',
        company: 'Umbrella Corporation',
        period: '2018 - 2020',
        bullets: [
          'Developed responsive web interfaces using React/Redux and built serverless node backend endpoints.',
          'Reduced build pipeline times by 50% by optimizing CI/CD workflows and unit testing configurations.'
        ]
      }
    ] : [
      {
        role: 'Senior Full Stack Developer',
        company: 'Tech Solutions Ltd',
        period: '2021 - Present',
        bullets: [
          'Engineered interactive frontend dashboards using React, TypeScript, and modern CSS frameworks.',
          'Developed RESTful APIs with Node.js/Express, optimizing database response speeds by 25%.',
          'Worked closely with UI/UX designers to implement pixel-perfect, accessible layouts.'
        ]
      },
      {
        role: 'Software Engineer',
        company: 'AppForge Studio',
        period: '2019 - 2021',
        bullets: [
          'Maintained and optimized legacy backend codebases, resolving memory leaks and logic bugs.',
          'Collaborated in an agile scrum team to deliver product features on bi-weekly sprints.'
        ]
      }
    ],
    skills: isAlex 
      ? ['.NET Core / C#', 'PostgreSQL', 'SQL Server', 'REST APIs', 'Docker', 'Kubernetes', 'Redis', 'CI/CD Pipelines', 'Git', 'Agile/Scrum']
      : ['JavaScript/TypeScript', 'React', 'HTML5 & CSS3', 'Node.js', 'Express', 'SQL & MongoDB', 'Git', 'Responsive Design', 'RESTful Services', 'UI/UX Best Practices'],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: isAlex ? 'Georgia Institute of Technology' : 'Boston University',
        year: isAlex ? '2017' : '2018'
      }
    ],
    languages: ['English (Native)', 'Spanish (Conversational)']
  };

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-card glass shadow-premium animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* Modal Toolbar */}
        <div className="cv-modal-toolbar">
          <div className="toolbar-left">
            <Icon icon="solar:document-text-bold" className="toolbar-icon" />
            <span className="toolbar-title">Preview CV - {candidate.name}</span>
          </div>
          <div className="toolbar-right">
            <button className="toolbar-btn secondary-btn" onClick={() => window.print()}>
              <Icon icon="solar:printer-linear" />
              <span>Print</span>
            </button>
            <button className="toolbar-btn primary-btn" onClick={() => alert('Download started!')}>
              <Icon icon="solar:download-linear" />
              <span>Download</span>
            </button>
            <button className="close-btn" onClick={onClose}>
              <Icon icon="solar:close-circle-linear" />
            </button>
          </div>
        </div>

        {/* CV Paper Mockup */}
        <div className="cv-paper-container">
          <div className="cv-paper">
            {/* Header Section */}
            <div className="cv-header">
              <div className="cv-profile-box">
                <div className="cv-avatar-placeholder">
                  {candidate.name.charAt(0).toUpperCase()}
                </div>
                <div className="cv-name-title">
                  <h1 className="cv-candidate-name">{candidate.name}</h1>
                  <p className="cv-candidate-title">{cvData.title}</p>
                </div>
              </div>
              <div className="cv-contact-info">
                <div className="contact-item">
                  <Icon icon="solar:letter-linear" />
                  <span>{candidate.email}</span>
                </div>
                <div className="contact-item">
                  <Icon icon="solar:smartphone-linear" />
                  <span>+1 (555) 019-2834</span>
                </div>
                <div className="contact-item">
                  <Icon icon="solar:map-point-linear" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="cv-divider"></div>

            {/* Content Layout */}
            <div className="cv-content-layout">
              {/* Main Column */}
              <div className="cv-main-col">
                <div className="cv-section">
                  <h3 className="cv-section-title">Professional Summary</h3>
                  <p className="cv-section-text">{cvData.summary}</p>
                </div>

                <div className="cv-section">
                  <h3 className="cv-section-title">Work Experience</h3>
                  <div className="experience-list">
                    {cvData.experience.map((exp, idx) => (
                      <div key={idx} className="experience-item">
                        <div className="exp-header">
                          <span className="exp-role">{exp.role}</span>
                          <span className="exp-period">{exp.period}</span>
                        </div>
                        <div className="exp-company">{exp.company}</div>
                        <ul className="exp-bullets">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="cv-side-col">
                <div className="cv-section">
                  <h3 className="cv-section-title">Key Skills</h3>
                  <div className="skills-badge-container">
                    {cvData.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="cv-section">
                  <h3 className="cv-section-title">Education</h3>
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="education-item">
                      <div className="edu-degree">{edu.degree}</div>
                      <div className="edu-institution">{edu.institution}</div>
                      <div className="edu-year">Class of {edu.year}</div>
                    </div>
                  ))}
                </div>

                <div className="cv-section">
                  <h3 className="cv-section-title">Languages</h3>
                  <ul className="lang-list">
                    {cvData.languages.map((lang, idx) => (
                      <li key={idx}>{lang}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreviewModal;
