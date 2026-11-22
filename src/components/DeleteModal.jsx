import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle
}) {
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

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-container delete-confirm-modal" 
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="delete-icon-badge">
          <AlertTriangle size={24} className="warning-icon" />
        </div>

        <h3 id="delete-dialog-title" className="delete-modal-title">
          Delete task?
        </h3>

        <p id="delete-dialog-desc" className="delete-modal-desc">
          Are you sure you want to delete <strong className="task-highlight-title">"{taskTitle}"</strong>? This action cannot be undone.
        </p>

        <div className="modal-footer delete-footer">
          <button
            type="button"
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-confirm-btn"
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
