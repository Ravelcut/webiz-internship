// @ts-nocheck
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './InlineDropdown.css';

const InlineDropdown = ({ options, value, onChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      updatePosition();
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, updatePosition]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="inline-dropdown-wrapper" ref={triggerRef}>
      <div className="inline-dropdown-trigger" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>
        {children}
      </div>
      {isOpen && createPortal(
        <div
          className="inline-dropdown-menu"
          style={{ top: menuPos.top, left: menuPos.left }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`inline-dropdown-item ${option.value === value ? 'selected' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleSelect(option); }}
            >
              {option.dot && (
                <span className="inline-dropdown-dot" style={{ background: option.dot }} />
              )}
              {option.swatch && (
                <span className="inline-dropdown-swatch" style={{ background: option.swatch, color: option.swatchText || '#fff' }}>
                  {option.label}
                </span>
              )}
              {!option.swatch && (
                <span className="inline-dropdown-label">{option.label}</span>
              )}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default InlineDropdown;
