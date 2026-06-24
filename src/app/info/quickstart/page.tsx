"use client";

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function QuickstartPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="quickstart-page">
      <style jsx global>{`
        .quickstart-page {
          min-height: 100vh;
          background: var(--content-bg);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quickstart-container {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .quickstart-header {
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

        .quickstart-title-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quickstart-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--black);
          line-height: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quickstart-subtitle {
          font-size: 16px;
          color: var(--black-75);
          max-width: 800px;
        }

        /* Callout Box */
        .disclaimer-card {
          background: rgba(47, 128, 237, 0.05);
          border-left: 4px solid var(--blue);
          border-radius: 8px;
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          box-shadow: 0 2px 12px rgba(0,0,0,0.01);
        }

        .disclaimer-icon {
          color: var(--blue);
          font-size: 24px;
          flex-shrink: 0;
        }

        .disclaimer-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .disclaimer-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--black);
        }

        .disclaimer-text {
          font-size: 14px;
          color: var(--black-75);
          line-height: 1.5;
        }

        /* Two Column Content */
        .quickstart-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 32px;
        }

        @media (max-width: 968px) {
          .quickstart-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card styling matching the dashboard */
        .content-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px dashed var(--stroke-gray);
          padding-bottom: 16px;
        }

        .card-icon {
          color: var(--blue);
          font-size: 22px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--black);
        }

        /* Table Design */
        .credentials-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .role-group-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--blue);
          border-left: 3px solid var(--blue);
          padding-left: 8px;
        }

        .credentials-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .credentials-table th, .credentials-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--stroke-gray-50);
        }

        .credentials-table th {
          background: var(--light-gray-alt);
          font-weight: 600;
          color: var(--black-75);
        }

        .credentials-table tr:hover td {
          background: var(--light-gray-alt);
        }

        .copy-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 6px;
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
          font-family: monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--black-75);
        }

        .copy-pill:hover {
          background: var(--stroke-gray-50);
          color: var(--black);
        }

        .copy-pill:active {
          transform: scale(0.96);
        }

        /* Visual Architecture flow */
        .arch-flow {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 10px 0;
        }

        .flow-node {
          background: var(--light-gray-alt);
          border: 1px solid var(--stroke-gray);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s, border-color 0.2s;
        }

        .flow-node:hover {
          transform: translateY(-2px);
          border-color: var(--blue);
        }

        .node-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--blue-01);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .node-icon-box.green {
          background: rgba(8, 172, 22, 0.1);
          color: #08AC16;
        }

        .node-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .node-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--black);
        }

        .node-desc {
          font-size: 12px;
          color: var(--black-75);
        }

        .flow-arrow {
          display: flex;
          justify-content: center;
          color: var(--black-50);
          font-size: 20px;
          margin: -10px 0;
        }

        /* Terminal/Code Blocks */
        .terminal-block {
          background: #182939;
          border-radius: 12px;
          padding: 16px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          color: #ECEFF4;
          overflow-x: auto;
          position: relative;
        }

        .terminal-header {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff5f56;
        }

        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .terminal-copy-btn {
          position: absolute;
          right: 12px;
          top: 12px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: #ECEFF4;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
        }

        .terminal-copy-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        /* Quick Info Link Cards */
        .link-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .link-card {
          border: 1px solid var(--stroke-gray);
          background: var(--white);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--black);
          text-decoration: none;
          transition: all 0.2s;
        }

        .link-card:hover {
          border-color: var(--blue);
          background: var(--light-gray-alt);
          transform: translateY(-2px);
        }

        .link-card-icon {
          font-size: 24px;
          color: var(--blue);
        }

        .link-card-text {
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>

      <div className="quickstart-container">
        {/* Navigation Breadcrumbs */}
        <div className="quickstart-header">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <Link href="/" className="back-link">
              <Icon icon="solar:arrow-left-linear" /> Back to Dashboard
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/endpoints" className="back-link">
              <Icon icon="solar:api-linear" /> API Endpoints
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/commits" className="back-link">
              <Icon icon="solar:git-commit-linear" /> Commit History
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/showcase" className="back-link">
              <Icon icon="solar:videocamera-record-linear" /> Showcase Video
            </Link>
          </div>
          <div className="quickstart-title-area">
            <h1 className="quickstart-title">
              <Icon icon="solar:rocket-linear" style={{ color: 'var(--blue)' }} /> System Quickstart & Architecture
            </h1>
            <p className="quickstart-subtitle">
              Comprehensive setup guides, visual system architecture flows, and seeded testing accounts for evaluating role-based TaskManager workflows.
            </p>
          </div>
        </div>

        {/* Security Warning Callout */}
        <div className="disclaimer-card">
          <Icon icon="solar:shield-warning-bold-duotone" className="disclaimer-icon" />
          <div className="disclaimer-content">
            <h4 className="disclaimer-title">Security & Seed Data Disclaimer</h4>
            <p className="disclaimer-text">
              All demo credentials and database records are mock datasets generated automatically via the backend seeding script (`DataSeed.cs`). The system contains absolutely <strong>no real, confidential, or sensitive personal information</strong>.
            </p>
          </div>
        </div>

        {/* Info Domain Highlight Callout */}
        <div className="disclaimer-card" style={{ background: 'rgba(192, 132, 252, 0.05)', borderLeftColor: '#c084fc' }}>
          <Icon icon="solar:info-square-bold-duotone" className="disclaimer-icon" style={{ color: '#c084fc' }} />
          <div className="disclaimer-content">
            <h4 className="disclaimer-title" style={{ color: '#7b2cb5' }}>Interactive Evaluation Hub</h4>
            <p className="disclaimer-text">
              This Quickstart page is part of our integrated <strong>/info domain</strong>. Use the navigation bar above or the links below to explore the live, database-synchronized <strong>API Endpoints Catalog</strong>, real-time <strong>GitHub Commits Timeline</strong>, and the <strong>Product Showcase Video</strong>! All detailed information is dynamically rendered in these dedicated sections.
            </p>
          </div>
        </div>


        {/* Core Layout Grid */}
        <div className="quickstart-grid">
          
          {/* Left Column: Guides & Operations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Startup Guides Card */}
            <div className="content-card">
              <div className="card-header-row">
                <Icon icon="solar:terminal-linear" className="card-icon" />
                <h2 className="card-title">Local Running Guide</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '14px', color: 'var(--black-75)', lineHeight: '1.5' }}>
                  Webiz TaskManager is fully decoupled. Follow the steps below to run both backend API services and frontend client dashboards locally:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--black-50)', textTransform: 'uppercase' }}>1. Run the Backend API (.NET 8 + PostgreSQL)</span>
                  <div className="terminal-block">
                    <div className="terminal-header">
                      <div className="dot"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <button className="terminal-copy-btn" onClick={() => handleCopy("cd HRTodoManagement && ./setup_backend.sh", "backend")}>
                      {copiedText === "backend" ? "Copied!" : "Copy"}
                    </button>
                    <code>
                      $ cd HRTodoManagement<br />
                      $ ./setup_backend.sh <span style={{ color: 'var(--black-50)' }}># Boots up database and C# Web API</span>
                    </code>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--black-50)', textTransform: 'uppercase' }}>2. Run the Frontend Dashboard (Next.js 16)</span>
                  <div className="terminal-block">
                    <div className="terminal-header">
                      <div className="dot"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <button className="terminal-copy-btn" onClick={() => handleCopy("cd taskmanager-webiz && npm install && npm run dev", "frontend")}>
                      {copiedText === "frontend" ? "Copied!" : "Copy"}
                    </button>
                    <code>
                      $ cd taskmanager-webiz<br />
                      $ npm install<br />
                      $ npm run dev <span style={{ color: 'var(--black-50)' }}># Starts Next.js on http://localhost:3000</span>
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Seeded Credentials Card (Excludes Recruiter email/password) */}
            <div className="content-card">
              <div className="card-header-row">
                <Icon icon="solar:users-group-two-rounded-linear" className="card-icon" />
                <h2 className="card-title">Seeded Evaluation Accounts</h2>
              </div>
              
              <div className="credentials-section">
                
                {/* Companies Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h3 className="role-group-title">Company Workspace (Full Admin)</h3>
                  <table className="credentials-table">
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Email Username</th>
                        <th>Password Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Quantum Leap AI</strong></td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("ops@quantum-leap.com", "ops-email")}>
                            ops@quantum-leap.com
                          </button>
                        </td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("K9#zL&2pQ!vR5tB*", "ops-pass")}>
                            K9#zL&2pQ!vR5tB*
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Green Grid Energy</strong></td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("hr@green-grid.org", "hr-email")}>
                            hr@green-grid.org
                          </button>
                        </td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("mX7$vN1_kP9@jH2s", "hr-pass")}>
                            mX7$vN1_kP9@jH2s
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Recruiter Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <h3 className="role-group-title">Recruiter Workspace (Hiring Pipeline Monitor)</h3>
                  <table className="credentials-table">
                    <thead>
                      <tr>
                        <th>Recruiter Name</th>
                        <th>Email Username</th>
                        <th>Password Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Garry Kasparov</strong></td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("garry.kasparov@recruiter.net", "recruiter-email")}>
                            garry.kasparov@recruiter.net
                          </button>
                        </td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("G@rryK!sp#88", "recruiter-pass")}>
                            G@rryK!sp#88
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                {/* Talents Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <h3 className="role-group-title">Talent Workspace (Task Board & Invites)</h3>
                  <table className="credentials-table">
                    <thead>
                      <tr>
                        <th>Talent Name</th>
                        <th>Email Username</th>
                        <th>Password Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Alex Mercer</strong> (Employed)</td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("alex.mercer@talent.net", "alex-email")}>
                            alex.mercer@talent.net
                          </button>
                        </td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("A1@xM!rC3r#99", "alex-pass")}>
                            A1@xM!rC3r#99
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Riley Reid</strong> (Employed)</td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("riley.reid@talent.net", "riley-email")}>
                            riley.reid@talent.net
                          </button>
                        </td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("R!l3yR3!d$77", "riley-pass")}>
                            R!l3yR3!d$77
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Alan Turing</strong> (Available)</td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("alan.turing@talent.net", "alan-email")}>
                            alan.turing@talent.net
                          </button>
                        </td>
                        <td>
                          <button className="copy-pill" onClick={() => handleCopy("A!anTur!ng#22", "alan-pass")}>
                            A!anTur!ng#22
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Visual Architecture Flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Architecture Card */}
            <div className="content-card">
              <div className="card-header-row">
                <Icon icon="solar:structure-linear" className="card-icon" />
                <h2 className="card-title">System Architecture Flow</h2>
              </div>
              
              <div className="arch-flow">
                
                <div className="flow-node">
                  <div className="node-icon-box">
                    <Icon icon="logos:nextjs-icon" />
                  </div>
                  <div className="node-details">
                    <h4 className="node-title">Next.js Client Dashboards</h4>
                    <span className="node-desc">Role-based Views (React 19 + TS)</span>
                  </div>
                </div>

                <div className="flow-arrow">
                  <Icon icon="solar:arrow-down-linear" />
                </div>

                <div className="flow-node">
                  <div className="node-icon-box">
                    <Icon icon="solar:card-transfer-linear" />
                  </div>
                  <div className="node-details">
                    <h4 className="node-title">Axios Services Client</h4>
                    <span className="node-desc">Cookie-Based Authentication Header</span>
                  </div>
                </div>

                <div className="flow-arrow">
                  <Icon icon="solar:arrow-down-linear" />
                </div>

                <div className="flow-node">
                  <div className="node-icon-box green">
                    <Icon icon="logos:dotnet" />
                  </div>
                  <div className="node-details">
                    <h4 className="node-title">ASP.NET Core REST API</h4>
                    <span className="node-desc">Middlewares, RBAC, Services & DTOs</span>
                  </div>
                </div>

                <div className="flow-arrow">
                  <Icon icon="solar:arrow-down-linear" />
                </div>

                <div className="flow-node">
                  <div className="node-icon-box" style={{ background: 'rgba(51, 103, 145, 0.1)', color: '#336791' }}>
                    <Icon icon="logos:postgresql" />
                  </div>
                  <div className="node-details">
                    <h4 className="node-title">PostgreSQL Database</h4>
                    <span className="node-desc">EF Core Persistence & Schema Relations</span>
                  </div>
                </div>

              </div>

              <div style={{ borderTop: '1px dashed var(--stroke-gray)', paddingTop: '16px', fontSize: '13px', color: 'var(--black-75)', lineHeight: '1.5' }}>
                <strong>Cookie Auth Flow:</strong> Upon login, the ASP.NET server issues secure session credentials. The browser saves them in cookies and automatically appends them to subsequent API requests, enabling secure, state-persistent Role-Based Access Control (RBAC).
              </div>
            </div>

            {/* GitHub Repositories Card */}
            <div className="content-card">
              <div className="card-header-row">
                <Icon icon="solar:git-repository-linear" className="card-icon" />
                <h2 className="card-title">GitHub Repositories</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a 
                  href="https://github.com/Ravelcut/webiz-internship.git" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="link-card"
                >
                  <Icon icon="logos:github-icon" className="link-card-icon" />
                  <span className="link-card-text">Frontend Repository</span>
                </a>
                <a 
                  href="https://github.com/Ravelcut/webiz-internship-backend.git" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="link-card"
                >
                  <Icon icon="logos:github-icon" className="link-card-icon" style={{ filter: 'hue-rotate(120deg)' }} />
                  <span className="link-card-text">Backend Repository</span>
                </a>
              </div>
            </div>

            {/* Quick Links Nav Card */}
            <div className="content-card" style={{ gap: '16px' }}>
              <div className="card-header-row" style={{ paddingBottom: '12px' }}>
                <Icon icon="solar:documents-linear" className="card-icon" />
                <h2 className="card-title">Documentation & Code Reports</h2>
              </div>

              <div className="link-grid">
                <Link href="/info/endpoints" className="link-card">
                  <Icon icon="solar:api-bold" className="link-card-icon" />
                  <span className="link-card-text">API Catalog</span>
                </Link>
                <Link href="/info/commits" className="link-card">
                  <Icon icon="solar:git-commit-bold" className="link-card-icon" />
                  <span className="link-card-text">Git Commits</span>
                </Link>
              </div>

              <a 
                href="./PERSONAL_CONTRIBUTION_REPORT.md" 
                target="_blank" 
                rel="noreferrer" 
                className="link-card" 
                style={{ justifyContent: 'center', background: 'var(--blue-01)', borderColor: 'var(--blue)' }}
              >
                <Icon icon="solar:document-text-bold" className="link-card-icon" />
                <span className="link-card-text" style={{ color: 'var(--blue)' }}>View Personal Contribution Report</span>
              </a>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
