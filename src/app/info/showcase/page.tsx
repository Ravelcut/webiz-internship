"use client";

import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function ShowcasePage() {
  return (
    <div className="showcase-page">
      <style jsx global>{`
        .showcase-page {
          min-height: 100vh;
          background: var(--content-bg);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .showcase-container {
          max-width: 1200px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .showcase-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--blue);
          font-weight: 500;
          text-decoration: none;
          font-size: 14px;
          transition: transform 0.2s;
          align-self: flex-start;
        }
        
        .back-link:hover {
          transform: translateX(-4px);
        }
        
        .showcase-title-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .showcase-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--black);
          line-height: 40px;
        }
        
        .showcase-subtitle {
          font-size: 16px;
          color: var(--black-75);
          max-width: 700px;
        }
        
        /* Two column layout like other views */
        .showcase-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 32px;
        }
        
        @media (max-width: 968px) {
          .showcase-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Video Container Card matching controls-card */
        .video-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .video-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          border: 1px solid var(--stroke-gray);
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        /* Details Card matching controls-card */
        .details-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px dashed var(--stroke-gray);
          padding-bottom: 16px;
        }
        
        .card-icon {
          color: var(--blue);
          font-size: 24px;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--black);
        }
        
        .features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .feature-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          border-bottom: 1px solid var(--light-gray-alt);
          padding-bottom: 16px;
        }
        
        .feature-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        .feature-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--light-gray-alt);
          color: var(--blue);
          flex-shrink: 0;
        }
        
        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .feature-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--black);
        }
        
        .feature-desc {
          font-size: 13px;
          color: var(--black-75);
          line-height: 1.5;
        }
        
        /* Action buttons matching the theme styling */
        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--blue);
          color: var(--white);
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
          transition: background 0.2s, transform 0.1s;
          border: none;
          cursor: pointer;
        }
        
        .action-button:hover {
          background: var(--blue-dark, #1a6fd4);
        }
        
        .action-button:active {
          transform: scale(0.98);
        }
        
        .tech-section {
          border-top: 1px dashed var(--stroke-gray);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .tech-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--black-50);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-tag {
          padding: 4px 8px;
          background: var(--light-gray-alt);
          border: 1px solid var(--stroke-gray);
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          color: var(--black-75);
        }
      `}</style>

      <div className="showcase-container">
        {/* Header section with back navigation */}
        <div className="showcase-header">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link href="/" className="back-link">
              <Icon icon="carbon:arrow-left" />
              უკან დაბრუნება (Dashboard)
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/endpoints" className="back-link">
              <Icon icon="carbon:api" /> API ენდფოინთები
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/commits" className="back-link">
              <Icon icon="carbon:git-commit" /> Commit-ების ისტორია
            </Link>
          </div>
          <div className="showcase-title-area">
            <h1 className="showcase-title">პროექტის ვიდეო პრეზენტაცია (Showcase)</h1>
            <p className="showcase-subtitle">
              ნახეთ სისტემის სრული ვიდეო მიმოხილვა, სადაც დეტალურად არის ნაჩვენები როლებზე დაფუძნებული სამუშაო სივრცეები, რეალურ დროში დავალებების მართვა და კანდიდატთა შერჩევის პროცესი.
            </p>
          </div>
        </div>

        {/* Two-column layout grid */}
        <div className="showcase-grid">
          {/* Video Player Card */}
          <div className="video-card">
            <div className="video-wrapper">
              <video 
                className="video-player" 
                controls 
                autoPlay 
                muted
                preload="auto"
                src="/showcase.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Details Sidebar Card */}
          <div className="details-card">
            <div className="card-header">
              <Icon icon="solar:stars-line-duotone" className="card-icon" />
              <h2 className="card-title">ნაჩვენები ფუნქციონალი</h2>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <Icon icon="solar:users-group-rounded-linear" />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">ავტორიზაცია და როლები</h3>
                  <p className="feature-desc">
                    სისტემაში ჩაშენებულია სამი ტიპის მომხმარებლის (კომპანია, რეკრუტერი, ტალანტი) პანელები თავისი უნიკალური შესაძლებლობებით.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <Icon icon="solar:checklist-linear" />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">დავალებების ინტერაქტიული დაფა</h3>
                  <p className="feature-desc">
                    Kanban Board-ის, List-ისა და Table-ის მეშვეობით დავალებების სტატუსის მართვა და რეალურ დროში განახლება.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <Icon icon="solar:user-plus-linear" />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">კანდიდატთა მართვის პანელი</h3>
                  <p className="feature-desc">
                    კომპანიებს შეუძლიათ ახალი ტალანტების მოწვევა, მოწვევის გაუქმება ან არსებული კანდიდატების სიიდან ამოშლა.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions & Stack */}
            <Link href="/" className="action-button">
              <Icon icon="solar:rocket-linear" />
              სამუშაო მაგიდაზე გადასვლა
            </Link>

            <div className="tech-section">
              <span className="tech-label">ტექნოლოგიური სტეკი</span>
              <div className="tech-tags">
                <span className="tech-tag">Next.js 16</span>
                <span className="tech-tag">React</span>
                <span className="tech-tag">ASP.NET Core</span>
                <span className="tech-tag">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
