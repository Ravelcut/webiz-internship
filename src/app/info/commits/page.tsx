"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Commit {
  sha: string;
  html_url: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author?: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export default function CommitsPage() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  // Fetch commits from GitHub API
  useEffect(() => {
    async function fetchCommits() {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/repos/Ravelcut/webiz-internship/commits?per_page=100');
        
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error('API Rate Limit Exceeded. GitHub limits unauthenticated API requests. Please try again later or view directly on GitHub.');
          }
          throw new Error(`Failed to fetch commits: ${res.statusText}`);
        }
        
        const data = await res.json();
        setCommits(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching commits:', err);
        setError(err.message || 'Something went wrong while fetching commits.');
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, []);

  // Format date helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time helper
  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate relative time
  const getRelativeTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  // Parse commit type
  const getCommitType = (message: string) => {
    const cleanMsg = message.trim().toLowerCase();
    if (cleanMsg.startsWith('feat')) return 'feat';
    if (cleanMsg.startsWith('fix')) return 'fix';
    if (cleanMsg.startsWith('docs')) return 'docs';
    if (cleanMsg.startsWith('refactor')) return 'refactor';
    if (cleanMsg.startsWith('chore')) return 'chore';
    if (cleanMsg.startsWith('style')) return 'style';
    if (cleanMsg.startsWith('test')) return 'test';
    if (cleanMsg.startsWith('ci') || cleanMsg.startsWith('build')) return 'build';
    return 'other';
  };

  // Copy SHA to clipboard
  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  // Filter and Search Commits
  const filteredCommits = useMemo(() => {
    return commits.filter((item) => {
      const message = item.commit.message;
      const authorName = item.commit.author.name;
      const authorLogin = item.author?.login || '';
      const sha = item.sha;
      const type = getCommitType(message);

      const matchesSearch = 
        message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authorLogin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sha.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        selectedFilter === 'All' ||
        (selectedFilter === 'Features' && type === 'feat') ||
        (selectedFilter === 'Fixes' && type === 'fix') ||
        (selectedFilter === 'Documentation' && type === 'docs') ||
        (selectedFilter === 'Refactoring' && type === 'refactor') ||
        (selectedFilter === 'Chore' && ['chore', 'style', 'test', 'build'].includes(type)) ||
        (selectedFilter === 'Others' && type === 'other');

      return matchesSearch && matchesFilter;
    });
  }, [commits, searchQuery, selectedFilter]);

  // Group commits by date for timeline rendering
  const groupedCommits = useMemo(() => {
    const groups: { [key: string]: Commit[] } = {};
    filteredCommits.forEach((commit) => {
      const dateKey = formatDate(commit.commit.author.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(commit);
    });
    return Object.entries(groups);
  }, [filteredCommits]);

  // Statistics
  const stats = useMemo(() => {
    const total = commits.length;
    const authors = new Set(commits.map(c => c.commit.author.email || c.commit.author.name)).size;
    const latestDate = commits[0]?.commit.author.date;
    const latest = latestDate ? getRelativeTime(latestDate) : 'N/A';
    
    // Count types
    let feat = 0;
    let fix = 0;
    commits.forEach(c => {
      const type = getCommitType(c.commit.message);
      if (type === 'feat') feat++;
      if (type === 'fix') fix++;
    });

    return { total, authors, latest, feat, fix };
  }, [commits]);

  return (
    <div className="commits-page">
      <style jsx global>{`
        .commits-page {
          min-height: 100vh;
          background: var(--content-bg);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .commits-container {
          max-width: 1000px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .commits-header {
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
        .commits-title-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .commits-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--black);
          line-height: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .commits-subtitle {
          font-size: 16px;
          color: var(--black-75);
          max-width: 700px;
        }
        
        /* Stats Dashboard */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .stat-box {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.02);
        }
        .stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--blue-01);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .stat-icon-wrapper.purple { background: rgba(123, 44, 181, 0.1); color: #7B2CB5; }
        .stat-icon-wrapper.green { background: rgba(8, 172, 22, 0.1); color: #08AC16; }
        .stat-icon-wrapper.orange { background: rgba(241, 145, 0, 0.1); color: #F19100; }
        
        .stat-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-num {
          font-size: 24px;
          font-weight: 700;
          color: var(--black);
          line-height: 30px;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--black-50);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Controls Section */
        .controls-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
        }
        .search-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          border: 1px solid var(--stroke-gray);
          border-radius: 10px;
          background: var(--light-gray-alt);
          padding: 0 16px;
          height: 48px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-container:focus-within {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px var(--blue-01);
          background: var(--white);
        }
        .search-input {
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 15px;
          color: var(--black);
          padding-left: 10px;
        }
        .search-container :global(.search-icon) {
          color: var(--black-50);
          font-size: 20px;
        }
        
        .categories-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tab-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          color: var(--black-75);
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
          transition: all 0.2s;
        }
        .tab-btn:hover {
          background: var(--stroke-gray-50);
          color: var(--black);
        }
        .tab-btn.active {
          background: var(--blue);
          color: var(--white);
          border-color: var(--blue);
        }

        /* Timeline & Commits List */
        .timeline-section {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-left: 20px;
        }
        .timeline-line {
          position: absolute;
          left: 6px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--stroke-gray);
        }
        .timeline-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }
        .timeline-date-header {
          font-size: 14px;
          font-weight: 700;
          color: var(--blue);
          background: var(--content-bg);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid var(--stroke-gray);
          display: inline-flex;
          align-self: flex-start;
          margin-left: -14px;
          z-index: 1;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        
        .commit-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.02);
          position: relative;
          margin-left: 12px;
        }
        .commit-card::before {
          content: '';
          position: absolute;
          left: -32px;
          top: 26px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--white);
          border: 2px solid var(--blue);
          z-index: 2;
          transition: background 0.2s;
        }
        .commit-card:hover {
          transform: translateY(-2px);
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
          border-color: var(--black-50);
        }
        .commit-card:hover::before {
          background: var(--blue);
        }
        
        .commit-author-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
        }
        .author-avatar-fallback {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--blue-01);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }
        .author-names {
          display: flex;
          flex-direction: column;
        }
        .author-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--black);
        }
        .author-login {
          font-size: 12px;
          color: var(--black-50);
          text-decoration: none;
          transition: color 0.2s;
        }
        .author-login:hover {
          color: var(--blue);
        }
        
        .commit-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          color: var(--black-50);
        }
        .commit-time {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .commit-message-container {
          background: var(--light-gray-alt);
          padding: 12px 16px;
          border-radius: 8px;
          border-left: 3px solid var(--blue);
        }
        .commit-message-main {
          font-size: 15px;
          font-weight: 600;
          color: var(--black);
          line-height: 22px;
          word-break: break-word;
        }
        .commit-message-desc {
          font-size: 13px;
          color: var(--black-75);
          line-height: 18px;
          margin-top: 6px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .commit-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          border-top: 1px solid var(--stroke-gray-50);
          padding-top: 12px;
        }
        .badge-type {
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .badge-type.feat { background: #eaf2fd; color: #2F80ED; }
        .badge-type.fix { background: #fdebeb; color: #ED5757; }
        .badge-type.docs { background: #e6f9ec; color: #08AC16; }
        .badge-type.refactor { background: #fef4e6; color: #F19100; }
        .badge-type.chore { background: var(--light-gray); color: var(--black-75); }
        .badge-type.other { background: var(--light-gray); color: var(--black-50); }

        [data-theme="dark"] .badge-type.feat { background: rgba(47, 128, 237, 0.15); }
        [data-theme="dark"] .badge-type.fix { background: rgba(237, 87, 87, 0.15); }
        [data-theme="dark"] .badge-type.docs { background: rgba(8, 172, 22, 0.15); }
        [data-theme="dark"] .badge-type.refactor { background: rgba(241, 145, 0, 0.15); }

        .commit-hash-area {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .commit-sha-badge {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 700;
          font-size: 13px;
          color: var(--black-75);
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .action-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 6px;
          color: var(--black-50);
          background: var(--light-gray);
          border: 1px solid var(--stroke-gray);
          transition: all 0.2s;
          position: relative;
          text-decoration: none;
        }
        .action-icon-btn:hover {
          background: var(--stroke-gray);
          color: var(--black);
        }
        .tooltip-copy {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translate(-50%, -8px);
          background: #333;
          color: #fff;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 10;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 32px;
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 16px;
          gap: 16px;
          text-align: center;
        }
        .empty-icon-wrapper {
          font-size: 48px;
          color: var(--black-50);
        }
        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--black);
        }
        .empty-desc {
          font-size: 14px;
          color: var(--black-75);
          max-width: 400px;
        }

        /* Skeleton Loading */
        .skeleton-card {
          background: var(--white);
          border: 1px solid var(--stroke-gray);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-left: 12px;
          position: relative;
        }
        .skeleton-card::before {
          content: '';
          position: absolute;
          left: -32px;
          top: 26px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--stroke-gray);
          z-index: 2;
        }
        .skeleton-block {
          background: var(--light-gray);
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }

        /* Error Banner */
        .error-card {
          background: #fdebeb;
          border: 1px solid #f8baba;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          box-shadow: 0px 4px 12px rgba(237, 87, 87, 0.08);
        }
        [data-theme="dark"] .error-card {
          background: rgba(237, 87, 87, 0.1);
          border-color: rgba(237, 87, 87, 0.2);
        }
        .error-title {
          font-size: 18px;
          font-weight: 600;
          color: #ED5757;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .error-desc {
          font-size: 14px;
          color: #7d2424;
          max-width: 500px;
          line-height: 22px;
        }
        [data-theme="dark"] .error-desc {
          color: #ECEFF4;
        }
        .error-btn {
          background: #ED5757;
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .error-btn:hover {
          background: #d34848;
        }
      `}</style>

      <div className="commits-container">
        {/* Header */}
        <div className="commits-header">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <Link href="/" className="back-link">
              <Icon icon="lucide:arrow-left" /> Back to Workspace
            </Link>
            <span style={{ color: 'var(--black-50)', opacity: 0.5 }}>|</span>
            <Link href="/info/endpoints" className="back-link">
              <Icon icon="lucide:api" /> API Endpoints
            </Link>
          </div>
          <div className="commits-title-area">
            <h1 className="commits-title">
              <Icon icon="lucide:git-branch" style={{ color: 'var(--blue)' }} /> GitHub Commits
            </h1>
            <p className="commits-subtitle">
              Browse the complete, real-time development timeline, features, and hotfixes of the Webiz Task Manager project.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon-wrapper">
              <Icon icon="lucide:git-commit" />
            </div>
            <div className="stat-text">
              <span className="stat-num">{loading ? '...' : stats.total}</span>
              <span className="stat-label">Total Commits</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon-wrapper purple">
              <Icon icon="lucide:users" />
            </div>
            <div className="stat-text">
              <span className="stat-num">{loading ? '...' : stats.authors}</span>
              <span className="stat-label">Contributors</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon-wrapper green">
              <Icon icon="lucide:sparkles" />
            </div>
            <div className="stat-text">
              <span className="stat-num">{loading ? '...' : stats.feat}</span>
              <span className="stat-label">Features (`feat`)</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon-wrapper orange">
              <Icon icon="lucide:clock" />
            </div>
            <div className="stat-text">
              <span className="stat-num" style={{ fontSize: stats.latest.length > 10 ? '16px' : '24px' }}>
                {loading ? '...' : stats.latest}
              </span>
              <span className="stat-label">Latest Update</span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-card">
          <div className="search-container">
            <Icon icon="lucide:search" className="search-icon" />
            <input
              type="text"
              placeholder="Search by commit message, author, or SHA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="categories-tabs">
            {['All', 'Features', 'Fixes', 'Documentation', 'Refactoring', 'Chore', 'Others'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`tab-btn ${selectedFilter === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="error-card">
            <div className="error-title">
              <Icon icon="lucide:alert-circle" />
              <span>Failed to Load Commits</span>
            </div>
            <p className="error-desc">{error}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => window.location.reload()} className="error-btn">
                <Icon icon="lucide:refresh-cw" /> Retry
              </button>
              <a 
                href="https://github.com/Ravelcut/webiz-internship" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="error-btn" 
                style={{ background: 'var(--light-gray)', color: 'var(--black)', border: '1px solid var(--stroke-gray)' }}
              >
                <Icon icon="lucide:external-link" /> Open Repository on GitHub
              </a>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="timeline-section">
            <div className="timeline-line"></div>
            <div className="timeline-group">
              <div className="skeleton-block" style={{ width: '120px', height: '24px', borderRadius: '20px', marginLeft: '-14px', marginBottom: '8px' }}></div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="skeleton-block" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div className="skeleton-block" style={{ width: '120px', height: '14px' }}></div>
                        <div className="skeleton-block" style={{ width: '80px', height: '10px' }}></div>
                      </div>
                    </div>
                    <div className="skeleton-block" style={{ width: '60px', height: '10px' }}></div>
                  </div>
                  <div className="skeleton-block" style={{ width: '100%', height: '40px', borderRadius: '8px', marginTop: '4px' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <div className="skeleton-block" style={{ width: '50px', height: '18px', borderRadius: '6px' }}></div>
                    <div className="skeleton-block" style={{ width: '100px', height: '20px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Commits List */}
        {!loading && !error && (
          groupedCommits.length > 0 ? (
            <div className="timeline-section">
              <div className="timeline-line"></div>
              {groupedCommits.map(([date, commitsInGroup]) => (
                <div key={date} className="timeline-group">
                  <div className="timeline-date-header">{date}</div>
                  
                  {commitsInGroup.map((item) => {
                    const type = getCommitType(item.commit.message);
                    const msgParts = item.commit.message.split('\n');
                    const subjectLine = msgParts[0];
                    const descLine = msgParts.slice(1).join('\n').trim();
                    const shortSha = item.sha.substring(0, 7);
                    
                    return (
                      <div key={item.sha} className="commit-card">
                        {/* Author Info */}
                        <div className="commit-author-row">
                          <div className="author-info">
                            {item.author?.avatar_url ? (
                              <img 
                                src={item.author.avatar_url} 
                                alt={item.commit.author.name} 
                                className="author-avatar" 
                              />
                            ) : (
                              <div className="author-avatar-fallback">
                                {item.commit.author.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div className="author-names">
                              <span className="author-name">{item.commit.author.name}</span>
                              {item.author && (
                                <a 
                                  href={item.author.html_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="author-login"
                                >
                                  @{item.author.login}
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="commit-meta">
                            <span className="commit-time">
                              <Icon icon="lucide:clock" /> {formatTime(item.commit.author.date)}
                            </span>
                          </div>
                        </div>

                        {/* Commit Message */}
                        <div className="commit-message-container">
                          <div className="commit-message-main">{subjectLine}</div>
                          {descLine && (
                            <div className="commit-message-desc">{descLine}</div>
                          )}
                        </div>

                        {/* Actions & Meta */}
                        <div className="commit-actions-row">
                          <span className={`badge-type ${type}`}>
                            <Icon icon={
                              type === 'feat' ? 'lucide:sparkles' :
                              type === 'fix' ? 'lucide:wrench' :
                              type === 'docs' ? 'lucide:book-open' :
                              type === 'refactor' ? 'lucide:recycle' :
                              'lucide:git-commit'
                            } />
                            {type}
                          </span>
                          
                          <div className="commit-hash-area">
                            <span className="commit-sha-badge">{shortSha}</span>
                            
                            <button 
                              onClick={() => handleCopySha(item.sha)} 
                              className="action-icon-btn"
                              title="Copy Full SHA"
                            >
                              <Icon icon={copiedSha === item.sha ? "lucide:check" : "lucide:copy"} style={copiedSha === item.sha ? { color: 'var(--green)' } : {}} />
                              {copiedSha === item.sha && <span className="tooltip-copy">Copied!</span>}
                            </button>

                            <a 
                              href={item.html_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="action-icon-btn"
                              title="View Commit on GitHub"
                            >
                              <Icon icon="lucide:external-link" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <Icon icon="lucide:search" />
              </div>
              <h3 className="empty-title">No commits found</h3>
              <p className="empty-desc">
                We couldn't find any commits matching "{searchQuery}" under the "{selectedFilter}" category. Try adjusting your search term or filters.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
