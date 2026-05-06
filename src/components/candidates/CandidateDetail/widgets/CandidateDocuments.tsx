// @ts-nocheck
import React from 'react';
import { Icon } from '@iconify/react';
import './Widgets.css';

const CandidateDocuments = ({ candidate }) => {
  const documents = [
    { name: 'Giorgi_CV_Final.pdf', type: 'PDF', size: '2.4 MB', date: '21 Oct 2025' },
    { name: 'Portfolio_2025.pdf', type: 'PDF', size: '15.8 MB', date: '15 Oct 2025' },
    { name: 'Recommendation_Letter.docx', type: 'DOCX', size: '450 KB', date: '10 Oct 2025' },
    { name: 'ID_Card_Copy.jpg', type: 'JPG', size: '1.2 MB', date: '01 Oct 2025' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return 'solar:file-text-bold';
      case 'DOCX': return 'solar:file-text-linear';
      case 'JPG': return 'solar:gallery-bold';
      default: return 'solar:file-linear';
    }
  };

  return (
    <div className="candidate-documents-tab fade-in">
      <div className="documents-grid">
        {documents.map((doc, index) => (
          <div key={index} className="document-card shadow-premium">
            <div className="doc-icon-wrapper">
              <Icon icon={getFileIcon(doc.type)} className={`doc-icon ${doc.type.toLowerCase()}`} />
            </div>
            <div className="doc-info">
              <span className="doc-name">{doc.name}</span>
              <div className="doc-meta">
                <span>{doc.size}</span>
                <span className="dot">•</span>
                <span>{doc.date}</span>
              </div>
            </div>
            <div className="doc-actions">
              <button className="doc-action-btn"><Icon icon="solar:download-linear" /></button>
              <button className="doc-action-btn"><Icon icon="solar:eye-linear" /></button>
            </div>
          </div>
        ))}
        
        <div className="add-document-card">
          <Icon icon="solar:add-circle-linear" className="add-icon" />
          <span>Upload New Document</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateDocuments;
