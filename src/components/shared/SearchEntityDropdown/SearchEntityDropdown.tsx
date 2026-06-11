// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './SearchEntityDropdown.css';

const STATUS_COLOR_MAP = {
  'Pending': '#EAF2FD',
  'InProgress': '#F19100',
  'InReview': '#E0F2FE',
  'Done': '#08AC16',
};

const SearchEntityDropdown = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const savedList = localStorage.getItem('taskmanager_list_tasks');
    if (savedList) {
      try {
        setTasks(JSON.parse(savedList));
      } catch (err) {
        console.error('Failed to parse cached tasks:', err);
      }
    }
  }, []);

  const filteredTasks = query.trim()
    ? tasks.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : tasks.slice(0, 5);

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
                  {(
                    task.talent?.name ||
                    task.employee?.name ||
                    task.assignee ||
                    'U'
                  ).charAt(0).toUpperCase()}
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
