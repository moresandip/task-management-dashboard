import React from 'react';
import { 
  LayoutGrid, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon,
  Sparkles,
  LogOut,
  LogIn
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  onSelectTab, 
  user, 
  onLogout, 
  onOpenLogin 
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'My tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      {/* Brand / Logo */}
      <div className="brand-container" onClick={() => onSelectTab('overview')} style={{ cursor: 'pointer' }}>
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

      {/* Bottom User Profile / Auth Strip */}
      {user ? (
        <div className="sidebar-user-card">
          <div className="sidebar-user-info" onClick={() => onSelectTab('settings')}>
            <div className="avatar-circle-sm">
              <span>{user.initials || 'JD'}</span>
            </div>
            <div className="sidebar-user-text">
              <span className="sidebar-user-name">{user.name}</span>
              <span className="sidebar-user-role">{user.role || 'Member'}</span>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-logout-icon-btn"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="sidebar-signin-btn"
          onClick={onOpenLogin}
        >
          <LogIn size={16} />
          <span>Sign In</span>
        </button>
      )}

      {/* Productivity widget */}
      <div className="sidebar-footer-card">
        <div className="footer-card-icon">
          <Sparkles size={16} />
        </div>
        <div className="footer-card-content">
          <p className="footer-card-title">Stay in flow</p>
          <p className="footer-card-desc">Organize, focus & accomplish goals seamlessly.</p>
        </div>
      </div>
    </aside>
  );
}
