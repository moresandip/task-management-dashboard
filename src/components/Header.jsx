import React from 'react';
import { Bell, Search, Plus } from 'lucide-react';

export default function Header({ onOpenNewTask, title = "Overview" }) {
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
        {/* User profile avatar */}
        <div className="user-profile" title="Signed in as Jane Doe">
          <div className="avatar-circle">
            <span>JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
