import React from 'react';
import { 
  LayoutGrid, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'My tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      {/* Brand / Logo */}
      <div className="brand-container">
        <div className="brand-logo" aria-hidden="true">
          <div className="logo-dots-grid">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <span className="brand-title">FocusBoard</span>
      </div>

      {/* Workspace section label */}
      <div className="sidebar-section-label">WORKSPACE</div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="nav-icon" size={18} />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Pro / Productivity widget */}
      <div className="sidebar-footer-card">
        <div className="footer-card-icon">
          <Sparkles size={16} />
        </div>
        <div className="footer-card-content">
          <p className="footer-card-title">Stay in flow</p>
          <p className="footer-card-desc">Review completed goals daily to boost momentum.</p>
        </div>
      </div>
    </aside>
  );
}
