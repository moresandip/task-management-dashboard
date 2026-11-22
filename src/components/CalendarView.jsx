import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function CalendarView({ tasks, onEditTask, onOpenNewTask }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 22)); // Nov 2026

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Group tasks by due date string (YYYY-MM-DD)
  const tasksByDate = {};
  tasks.forEach((task) => {
    if (task.dueDate) {
      if (!tasksByDate[task.dueDate]) tasksByDate[task.dueDate] = [];
      tasksByDate[task.dueDate].push(task);
    }
  });

  // Calculate days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push(d);
  }

  const formatDayKey = (day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  return (
    <div className="calendar-view-container">
      {/* Calendar Header */}
      <div className="calendar-header-bar">
        <div>
          <h1 className="hero-title">Calendar & Deadlines</h1>
          <p className="hero-subtitle">Track project milestones and upcoming task deadlines across the month.</p>
        </div>

        <div className="calendar-month-controls">
          <div className="month-display">
            <CalendarIcon size={18} className="month-icon" />
            <span className="month-title">{monthNames[month]} {year}</span>
          </div>
          <div className="month-nav-arrows">
            <button type="button" className="carousel-arrow-btn prev-btn" onClick={handlePrevMonth} aria-label="Previous Month">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="carousel-arrow-btn next-btn" onClick={handleNextMonth} aria-label="Next Month">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid-card">
        {/* Days of Week Header */}
        <div className="calendar-weekdays-row">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday-cell">{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="calendar-days-grid">
          {daysArray.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="calendar-day-cell empty-cell"></div>;
            }

            const dateKey = formatDayKey(day);
            const dayTasks = tasksByDate[dateKey] || [];
            const isToday = day === 22 && month === 10 && year === 2026;

            return (
              <div key={dateKey} className={`calendar-day-cell ${isToday ? 'is-today' : ''}`}>
                <div className="day-number-header">
                  <span className={`day-number ${isToday ? 'today-pill' : ''}`}>{day}</span>
                  {dayTasks.length > 0 && (
                    <span className="day-task-count-pill">{dayTasks.length}</span>
                  )}
                </div>

                <div className="day-task-items">
                  {dayTasks.map((t) => (
                    <div 
                      key={t.id} 
                      className={`calendar-task-chip ${t.status === 'Completed' ? 'chip-completed' : t.status === 'In progress' ? 'chip-progress' : 'chip-todo'}`}
                      onClick={() => onEditTask(t)}
                      title={`${t.title} (${t.status}) - Click to edit`}
                    >
                      <span className="chip-dot"></span>
                      <span className="chip-title">{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
