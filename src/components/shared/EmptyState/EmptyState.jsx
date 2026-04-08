import React from 'react';
import { Icon } from '@iconify/react';
import './EmptyState.css';

const EmptyState = ({ onAction }) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-illustration">
        <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Decorative Circles */}
          <circle cx="120" cy="100" r="70" fill="#EAEEF9" />
          <circle cx="210" cy="40" r="6" fill="#EAEEF9" opacity="0.6" />
          <circle cx="30" cy="160" r="8" fill="#EAEEF9" opacity="0.8" />
          
          {/* Back Document */}
          <g filter="url(#docShadow)">
            <rect x="75" y="45" width="90" height="110" rx="4" fill="url(#docGradient)" />
            <rect x="85" y="65" width="55" height="12" rx="2" fill="#D5DDEA" />
            <rect x="85" y="82" width="55" height="12" rx="2" fill="#D5DDEA" />
            <rect x="85" y="99" width="55" height="12" rx="2" fill="#D5DDEA" />
          </g>

          {/* Front Document */}
          <g filter="url(#docShadow)">
            <rect x="95" y="55" width="90" height="110" rx="4" fill="white" />
            <rect x="105" y="75" width="55" height="12" rx="2" fill="#D5DDEA" />
            <rect x="105" y="92" width="55" height="12" rx="2" fill="#D5DDEA" />
            <rect x="105" y="109" width="35" height="12" rx="2" fill="#D5DDEA" />
          </g>

          {/* Circular Add Button */}
          <g filter="url(#btnShadow)">
            <circle cx="175" cy="155" r="16" fill="url(#btnGradient)" />
            <path d="M175 147V163M167 155H183" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          <defs>
            <linearGradient id="docGradient" x1="120" y1="45" x2="120" y2="155" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDFEFF" />
              <stop offset="1" stopColor="#ECF0F5" />
            </linearGradient>
            <linearGradient id="btnGradient" x1="175" y1="139" x2="175" y2="171" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B0BACC" />
              <stop offset="1" stopColor="#969EAE" />
            </linearGradient>
            <filter id="docShadow" x="65" y="35" width="110" height="130" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feOffset dy="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.396 0 0 0 0 0.478 0 0 0 0 0.576 0 0 0 0.2 0" />
              <feBlend mode="normal" in="SourceGraphic" result="shape" />
            </filter>
            <filter id="btnShadow" x="155" y="139" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feOffset dy="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.184 0 0 0 0 0.212 0 0 0 0 0.247 0 0 0 0.15 0" />
              <feBlend mode="normal" in="SourceGraphic" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="empty-state-content">
        <h2 className="empty-state-title">Nothing here... yet.</h2>
        <p className="empty-state-subtitle">Start by adding your first task and take charge of your to-do list</p>
        
        <button className="empty-state-btn" onClick={onAction}>
          <Icon icon="solar:add-circle-bold" className="btn-add-icon" />
          <span>New Task</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
