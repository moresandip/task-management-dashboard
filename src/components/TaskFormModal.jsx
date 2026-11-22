import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../data/sampleTasks';

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingTask = null
}) {
  const isEditing = Boolean(editingTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);

  // Today's ISO date string (YYYY-MM-DD)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        setTitle(editingTask.title || '');
        setDescription(editingTask.description || '');
        setCategory(editingTask.category || 'Design');
        setStatus(editingTask.status || 'To do');
        setPriority(editingTask.priority || 'Medium');
        setDueDate(editingTask.dueDate || getTodayDate());
      } else {
        // Reset defaults
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('To do');
        setPriority('Medium');
        setDueDate(getTodayDate());
      }
      setErrors({});

      // Focus first input
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, editingTask]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      validationErrors.title = 'Task title is required and cannot be empty.';
    }

    if (!dueDate) {
      validationErrors.dueDate = 'Due date is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const taskData = {
      title: trimmedTitle,
      description: description.trim(),
      category,
      status,
      priority,
      dueDate
    };

    if (isEditing) {
      onSubmit({
        ...editingTask,
        ...taskData
      });
    } else {
      onSubmit({
        id: `task-${Date.now()}`,
        ...taskData,
        progress: status === 'Completed' ? 100 : status === 'In progress' ? 50 : 0
      });
    }

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-container task-form-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-form-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 id="modal-form-title" className="modal-title">
              {isEditing ? "Edit task" : "Create new task"}
            </h2>
            <p className="modal-subtitle">
              {isEditing 
                ? "Update your task details and maintain progress." 
                : "Add your task details to stay on top of your work."}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Task Title */}
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Task title <span className="required-star">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title-input"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Update pricing page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              required
              aria-invalid={errors.title ? "true" : "false"}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="error-message">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-desc-input" className="form-label">
              Description
            </label>
            <textarea
              id="task-desc-input"
              className="form-textarea"
              rows={4}
              placeholder="Add notes about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status & Priority Grid */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="task-status-select" className="form-label">
                Status
              </label>
              <select
                id="task-status-select"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">
                Priority
              </label>
              <select
                id="task-priority-select"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & Due Date Grid */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="task-category-select" className="form-label">
                Category
              </label>
              <select
                id="task-category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date-input" className="form-label">
                Due date <span className="required-star">*</span>
              </label>
              <input
                id="task-due-date-input"
                type="date"
                className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                }}
                required
                aria-invalid={errors.dueDate ? "true" : "false"}
              />
              {errors.dueDate && (
                <p className="error-message">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </p>
              )}
            </div>
          </div>

          <div className="form-note">
            <span className="required-star">*</span> Required field.
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-submit-btn"
            >
              {isEditing ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
