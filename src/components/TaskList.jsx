import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, Plus } from 'lucide-react';

export default function TaskList({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onOpenNewTask,
  searchQuery,
  hasActiveFilters,
  onResetFilters 
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-tasks-container">
        <div className="empty-icon-circle">
          <ClipboardList size={32} />
        </div>
        <h3 className="empty-title">
          {searchQuery || hasActiveFilters ? "No matching tasks found" : "No tasks yet"}
        </h3>
        <p className="empty-subtitle">
          {searchQuery || hasActiveFilters
            ? "Try adjusting your search query, status tabs, or priority filter."
            : "Get started by creating your very first task to stay organized."}
        </p>
        <div className="empty-actions">
          {searchQuery || hasActiveFilters ? (
            <button
              type="button"
              className="secondary-btn"
              onClick={onResetFilters}
            >
              Reset filters
            </button>
          ) : (
            <button
              type="button"
              className="primary-btn"
              onClick={onOpenNewTask}
            >
              <Plus size={16} />
              <span>Create new task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-wrapper" role="list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
