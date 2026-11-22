import React, { useState, useRef, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  Circle, 
  Calendar, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Toggle status in cycle or mark complete
  const handleToggleStatus = () => {
    if (task.status === 'Completed') {
      onStatusChange(task.id, 'To do');
    } else if (task.status === 'To do') {
      onStatusChange(task.id, 'In progress');
    } else {
      onStatusChange(task.id, 'Completed');
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-badge-high';
      case 'Medium':
        return 'priority-badge-medium';
      case 'Low':
        return 'priority-badge-low';
      default:
        return 'priority-badge-default';
    }
  };

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'design':
        return 'category-badge-design';
      case 'development':
        return 'category-badge-dev';
      case 'content':
        return 'category-badge-content';
      case 'research':
        return 'category-badge-research';
      default:
        return 'category-badge-default';
    }
  };

  // Format date helper (e.g. 2026-11-22 -> Nov 22)
  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'No date';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const isCompleted = task.status === 'Completed';
  const isInProgress = task.status === 'In progress';

  return (
    <article className={`task-row-card ${isCompleted ? 'is-completed' : ''}`}>
      {/* Status Checkbox / Indicator Button */}
      <button
        type="button"
        className={`task-status-checkbox ${isCompleted ? 'checked' : isInProgress ? 'in-progress' : 'todo'}`}
        onClick={handleToggleStatus}
        aria-label={`Current status: ${task.status}. Click to change status`}
        title={`Status: ${task.status} (Click to toggle)`}
      >
        {isCompleted ? (
          <Check size={14} strokeWidth={3} className="check-icon" />
        ) : isInProgress ? (
          <div className="in-progress-dot" />
        ) : (
          <Circle size={16} strokeWidth={1.5} className="todo-circle" />
        )}
      </button>

      {/* Main Task Info */}
      <div className="task-main-info">
        <h3 className={`task-title ${isCompleted ? 'strikethrough' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      {/* Badges and Metadata */}
      <div className="task-meta-group">
        {/* Category Pill */}
        {task.category && (
          <span className={`task-category-pill ${getCategoryClass(task.category)}`}>
            {task.category}
          </span>
        )}

        {/* Priority Pill */}
        <span className={`task-priority-pill ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>

        {/* Due Date */}
        <div className="task-due-date" title={`Due: ${task.dueDate}`}>
          <Calendar size={14} className="calendar-icon" aria-hidden="true" />
          <span>{formatDueDate(task.dueDate)}</span>
        </div>
      </div>

      {/* Actions Kebab Menu */}
      <div className="task-actions-menu-container" ref={menuRef}>
        <button
          type="button"
          className="task-menu-trigger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={`Options for task: ${task.title}`}
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <div className="task-dropdown-menu" role="menu">
            <div className="dropdown-section-title">Change Status</div>
            <button
              type="button"
              className="dropdown-menu-item"
              role="menuitem"
              onClick={() => {
                onStatusChange(task.id, 'To do');
                setMenuOpen(false);
              }}
            >
              <Circle size={14} />
              <span>Mark as To-do</span>
            </button>
            <button
              type="button"
              className="dropdown-menu-item"
              role="menuitem"
              onClick={() => {
                onStatusChange(task.id, 'In progress');
                setMenuOpen(false);
              }}
            >
              <Clock size={14} />
              <span>Mark as In Progress</span>
            </button>
            <button
              type="button"
              className="dropdown-menu-item"
              role="menuitem"
              onClick={() => {
                onStatusChange(task.id, 'Completed');
                setMenuOpen(false);
              }}
            >
              <CheckCircle2 size={14} />
              <span>Mark as Completed</span>
            </button>

            <div className="dropdown-divider"></div>

            <button
              type="button"
              className="dropdown-menu-item"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onEdit(task);
              }}
            >
              <Edit3 size={14} />
              <span>Edit task</span>
            </button>

            <button
              type="button"
              className="dropdown-menu-item delete-item"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onDelete(task);
              }}
            >
              <Trash2 size={14} />
              <span>Delete task</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
