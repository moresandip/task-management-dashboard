import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  Palette, 
  Bell, 
  Shield, 
  Download, 
  RotateCcw, 
  Trash2, 
  LogOut, 
  Check, 
  Save,
  Moon,
  Sun
} from 'lucide-react';

export default function SettingsView({ 
  user, 
  onUpdateUser, 
  theme = 'light',
  onSelectTheme,
  onLogout, 
  onResetTasks, 
  onExportTasks,
  onClearTasks 
}) {
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  
  // Profile form state
  const [name, setName] = useState(user?.name || 'Jane Doe');
  const [email, setEmail] = useState(user?.email || 'jane.doe@focusboard.io');
  const [role, setRole] = useState(user?.role || 'Senior Product Designer');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Preferences state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'FB';

    onUpdateUser({
      ...user,
      name,
      email,
      role,
      initials
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="settings-page-wrapper">
      {/* Page Header */}
      <div className="settings-header">
        <h1 className="settings-main-title">Workspace & Account Settings</h1>
        <p className="settings-subtitle">Manage your personal profile, workspace preferences, and application data.</p>
      </div>

      <div className="settings-layout">
        {/* Settings Navigation Tabs */}
        <nav className="settings-nav-sidebar" aria-label="Settings categories">
          <button
            type="button"
            className={`settings-nav-btn ${activeSettingsTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSettingsTab('profile')}
          >
            <User size={18} />
            <span>Profile & Account</span>
          </button>
          <button
            type="button"
            className={`settings-nav-btn ${activeSettingsTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveSettingsTab('preferences')}
          >
            <Palette size={18} />
            <span>Appearance & Theme</span>
          </button>
          <button
            type="button"
            className={`settings-nav-btn ${activeSettingsTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSettingsTab('notifications')}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button
            type="button"
            className={`settings-nav-btn ${activeSettingsTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveSettingsTab('data')}
          >
            <Shield size={18} />
            <span>Data & Storage</span>
          </button>

          <div className="settings-nav-divider"></div>

          <button
            type="button"
            className="settings-nav-btn logout-nav-btn"
            onClick={onLogout}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </nav>

        {/* Settings Tab Content */}
        <div className="settings-content-card">
          {/* 1. Profile & Account Tab */}
          {activeSettingsTab === 'profile' && (
            <div className="settings-section">
              <div className="section-title-row">
                <div>
                  <h2 className="section-title">Profile Information</h2>
                  <p className="section-desc">Update your personal details and avatar initials.</p>
                </div>
                {saveSuccess && (
                  <span className="save-badge-success">
                    <Check size={14} /> Saved!
                  </span>
                )}
              </div>

              {/* Profile Avatar Preview */}
              <div className="profile-avatar-row">
                <div className="settings-avatar-circle">
                  <span>{user?.initials || 'JD'}</span>
                </div>
                <div className="avatar-info">
                  <div className="avatar-name">{name}</div>
                  <div className="avatar-email">{email}</div>
                  <div className="avatar-role-badge">{role}</div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="settings-form">
                <div className="form-group">
                  <label htmlFor="settings-name" className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <User size={16} className="field-icon" />
                    <input
                      id="settings-name"
                      type="text"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="settings-email" className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input
                      id="settings-email"
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="settings-role" className="form-label">Job Title / Role</label>
                  <div className="input-with-icon">
                    <Briefcase size={16} className="field-icon" />
                    <input
                      id="settings-role"
                      type="text"
                      className="form-input"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>

                <div className="settings-form-actions">
                  <button type="submit" className="primary-btn">
                    <Save size={16} />
                    <span>Save profile</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. Appearance & Theme */}
          {activeSettingsTab === 'preferences' && (
            <div className="settings-section">
              <h2 className="section-title">Appearance & Theme</h2>
              <p className="section-desc">Customize how FocusBoard looks and feels on your screen.</p>

              <div className="preferences-grid">
                <div 
                  className={`theme-option-card ${theme === 'light' ? 'selected' : ''}`}
                  onClick={() => onSelectTheme && onSelectTheme('light')}
                >
                  <div className="theme-card-icon light-icon">
                    <Sun size={24} />
                  </div>
                  <div className="theme-card-title">Light Theme</div>
                  <p className="theme-card-desc">Default clean white aesthetic matching the Figma specification.</p>
                </div>

                <div 
                  className={`theme-option-card ${theme === 'dark' ? 'selected' : ''}`}
                  onClick={() => onSelectTheme && onSelectTheme('dark')}
                >
                  <div className="theme-card-icon dark-icon">
                    <Moon size={24} />
                  </div>
                  <div className="theme-card-title">Dark Theme</div>
                  <p className="theme-card-desc">High-contrast slate theme designed for low-light environments.</p>
                </div>
              </div>

              <div className="toggle-list">
                <div className="toggle-row">
                  <div>
                    <div className="toggle-label">Automatic Progress Synchronization</div>
                    <div className="toggle-desc">Automatically update task completion metrics when statuses change.</div>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. Notifications */}
          {activeSettingsTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="section-title">Notification Preferences</h2>
              <p className="section-desc">Choose when and how you want to be notified about task deadlines.</p>

              <div className="toggle-list">
                <div className="toggle-row">
                  <div>
                    <div className="toggle-label">Daily Focus Reminders</div>
                    <div className="toggle-desc">Receive a summary of high-priority tasks waiting for your attention every morning.</div>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                  />
                </div>

                <div className="toggle-row">
                  <div>
                    <div className="toggle-label">Due Date Warnings</div>
                    <div className="toggle-desc">Get notified 24 hours before a scheduled task deadline expires.</div>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={taskReminders}
                    onChange={(e) => setTaskReminders(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. Data & Storage Management */}
          {activeSettingsTab === 'data' && (
            <div className="settings-section">
              <h2 className="section-title">Data & Storage Management</h2>
              <p className="section-desc">Manage local browser persistence (`localStorage`) and export task data.</p>

              <div className="data-action-cards">
                <div className="data-card">
                  <div className="data-card-info">
                    <Download size={22} className="data-card-icon" />
                    <div>
                      <h4 className="data-title">Export Tasks as JSON</h4>
                      <p className="data-desc">Download a complete backup of your tasks and metadata in JSON format.</p>
                    </div>
                  </div>
                  <button type="button" className="secondary-btn" onClick={onExportTasks}>
                    Download JSON
                  </button>
                </div>

                <div className="data-card">
                  <div className="data-card-info">
                    <RotateCcw size={22} className="data-card-icon" />
                    <div>
                      <h4 className="data-title">Reset to Default Sample Tasks</h4>
                      <p className="data-desc">Restore the original 8 Figma sample tasks and reset custom modifications.</p>
                    </div>
                  </div>
                  <button type="button" className="secondary-btn" onClick={onResetTasks}>
                    Reset Tasks
                  </button>
                </div>

                <div className="data-card danger-card">
                  <div className="data-card-info">
                    <Trash2 size={22} className="data-card-icon danger-icon" />
                    <div>
                      <h4 className="data-title danger-title">Clear All Task Data</h4>
                      <p className="data-desc">Permanently remove all tasks from browser storage (`localStorage`).</p>
                    </div>
                  </div>
                  <button type="button" className="delete-confirm-btn" onClick={onClearTasks}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
