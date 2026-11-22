import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Find a task..." }) {
  return (
    <div className="search-bar-wrapper">
      <Search className="search-icon" size={16} aria-hidden="true" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks by title or keyword"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange("")}
          aria-label="Clear search input"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
