import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBgColor = "#EEF2FF", 
  iconColor = "#4F46E5" 
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div 
          className="stat-icon-wrapper" 
          style={{ backgroundColor: iconBgColor, color: iconColor }}
          aria-hidden="true"
        >
          {Icon && <Icon size={20} />}
        </div>
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
}
