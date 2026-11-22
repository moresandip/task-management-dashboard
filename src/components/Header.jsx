import React, { useState, useRef, useEffect } from 'react';
import { LogIn, LogOut, Settings as SettingsIcon, CheckSquare, User, ChevronDown } from 'lucide-react';

export default function Header({ 
  title = "Overview", 
  user, 
  onOpenLogin, 
  onLogout, 
  onNavigateTab 
}) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  return (
    <header className="top-header" role="banner">
      <div className="header-left">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span className="breadcrumb-parent">Workspaces</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{title}</span>
        </nav>
      </div>

      <div className="header-right">
        {user ? (
          <div className="user-profile-wrapper" ref={profileRef}>
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              aria-expanded={profileMenuOpen}
              aria-label="User profile and account menu"
            >
              <div className="avatar-circle">
                <span>{user.initials || 'JD'}</span>
              </div>
              <ChevronDown size={14} className="profile-arrow" />
            </button>

            {profileMenuOpen && (
              <div className="profile-dropdown-menu" role="menu">
                <div className="profile-dropdown-header">
                  <div className="dropdown-user-name">{user.name}</div>
                  <div className="dropdown-user-email">{user.email}</div>
                  {user.role && <div className="dropdown-user-role">{user.role}</div>}
                </div>

                <div className="dropdown-divider"></div>

                <button
                  type="button"
                  className="dropdown-menu-item"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigateTab('tasks');
                  }}
                >
                  <CheckSquare size={16} />
                  <span>My Tasks</span>
                </button>

                <button
                  type="button"
                  className="dropdown-menu-item"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigateTab('settings');
                  }}
                >
                  <SettingsIcon size={16} />
                  <span>Settings</span>
                </button>

                <div className="dropdown-divider"></div>

                <button
                  type="button"
                  className="dropdown-menu-item logout-item"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="primary-btn header-signin-btn"
            onClick={onOpenLogin}
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
