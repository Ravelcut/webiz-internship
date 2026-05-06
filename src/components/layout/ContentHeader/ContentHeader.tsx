// @ts-nocheck
import React from 'react';
import TabBar from '../TabBar/TabBar';
import ActionBar from '../ActionBar/ActionBar';
import './ContentHeader.css';

const ContentHeader = ({ activeTab, onTabChange, onNewTask, onFilterToggle, isFilterOpen }) => {
  return (
    <div className="content-header">
      <div className="header-tabs">
        <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      </div>
      <div className="header-actions">
        <ActionBar 
          onNewTask={onNewTask} 
          onFilterToggle={onFilterToggle} 
          isFilterOpen={isFilterOpen}
        />
      </div>
    </div>
  );
};

export default ContentHeader;
