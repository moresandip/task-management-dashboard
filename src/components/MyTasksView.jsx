import React from 'react';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';
import TaskList from './TaskList';
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react';

export default function MyTasksView({
  tasks,
  filteredTasks,
  stats,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  isFiltered,
  onResetFilters,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onOpenNewTask
}) {
  return (
    <div className="my-tasks-page">
      {/* Page Header */}
      <div className="tasks-page-header">
        <div>
          <h1 className="hero-title">My Tasks Workspace</h1>
          <p className="hero-subtitle">Comprehensive overview of all your assignments, priority sprints, and project deliverables.</p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={onOpenNewTask}
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Quick Status Bar */}
      <div className="tasks-quick-metrics">
        <div className="metric-pill">
          <ListTodo size={16} className="metric-icon" />
          <span>Total: <strong>{stats.total}</strong></span>
        </div>
        <div className="metric-pill">
          <Clock size={16} className="metric-icon info-icon" />
          <span>In Progress: <strong>{stats.inProgress}</strong></span>
        </div>
        <div className="metric-pill">
          <CheckCircle2 size={16} className="metric-icon success-icon" />
          <span>Completed: <strong>{stats.completed}</strong></span>
        </div>
        <div className="metric-pill">
          <span>Completion: <strong>{stats.completionPercent}%</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tasks-filter-bar">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Filter by title, description or category..."
        />

        <FilterTabs
          activeStatus={statusFilter}
          onSelectStatus={onStatusFilterChange}
          selectedPriority={priorityFilter}
          onSelectPriority={onPriorityFilterChange}
          statusCounts={{
            all: stats.total,
            inProgress: stats.inProgress,
            completed: stats.completed,
            todo: stats.todo
          }}
          isFiltered={isFiltered}
          onResetFilters={onResetFilters}
        />
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
        onStatusChange={onStatusChange}
        onOpenNewTask={onOpenNewTask}
        searchQuery={searchQuery}
        hasActiveFilters={isFiltered}
        onResetFilters={onResetFilters}
      />
    </div>
  );
}
