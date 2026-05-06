// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { tasksData } from '../../../data/mockData';
import './SearchEntityDropdown.css';

const STATUS_COLOR_MAP = {
  'In Progress': '#F19100',
  'To Do': '#EAF2FD',
  'Completed': '#08AC16',
};

const SearchEntityDropdown = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTasks = query.trim()
    ? tasksData.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.assignee.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : tasksData.slice(0, 5);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-results-container">
      <div className="search-active-input">
        <input
          ref={inputRef}
          type="text"
          className="search-active-field"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-clear-btn" onClick={handleClear}>
            <Icon icon="solar:close-circle-bold" />
          </button>
        )}
      </div>

      <div className="search-results-dropdown">
        <div className="search-results-list">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`search-result-row ${hoveredIndex === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <div className="result-left">
                <div
                  className="result-status-bar"
                  style={{ background: STATUS_COLOR_MAP[task.status] || '#EAF2FD' }}
                />
                <span className="result-title">{task.title}</span>
              </div>
              <div className="result-avatar">
                <span className="result-avatar-initials">
                  {task.assignee.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="search-results-footer">
          <Icon icon="solar:magnifer-linear" className="footer-search-icon" />
          <span className="footer-text">View all results</span>
        </div>
      </div>
    </div>
  );
};

export default SearchEntityDropdown;
