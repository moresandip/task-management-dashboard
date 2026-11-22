import React from 'react';
import { ChevronDown, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterTabs({
  activeStatus,
  onSelectStatus,
  selectedPriority,
  onSelectPriority,
  statusCounts = {},
  onResetFilters,
  isFiltered = false
}) {
  const tabs = [
    { id: 'all', label: 'All tasks', count: statusCounts.all ?? 0 },
    { id: 'In progress', label: 'In progress', count: statusCounts.inProgress ?? 0 },
    { id: 'Completed', label: 'Completed', count: statusCounts.completed ?? 0 },
    { id: 'To do', label: 'To-do', count: statusCounts.todo ?? 0 }
  ];

  return (
    <div className="filter-controls-row">
      {/* Status tabs */}
      <div className="status-tabs-list" role="tablist" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectStatus(tab.id)}
            >
              <span>{tab.label}</span>
              <span className={`tab-count-badge ${isActive ? 'active-badge' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter by Priority and Reset */}
      <div className="filter-actions-right">
        <div className="priority-select-wrapper">
          <label htmlFor="priority-filter-select" className="sr-only">Filter by Priority</label>
          <span className="priority-select-label">Priority:</span>
          <select
            id="priority-filter-select"
            className="priority-dropdown"
            value={selectedPriority}
            onChange={(e) => onSelectPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <ChevronDown size={14} className="dropdown-arrow-icon" aria-hidden="true" />
        </div>

        {isFiltered && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onResetFilters}
            title="Reset all search and filters"
            aria-label="Reset all search and filters"
          >
            <RotateCcw size={14} />
            <span className="reset-text">Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
