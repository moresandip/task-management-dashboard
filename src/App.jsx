import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import DeleteModal from './components/DeleteModal';
import MobileNav from './components/MobileNav';

import SettingsView from './components/SettingsView';
import CalendarView from './components/CalendarView';
import MyTasksView from './components/MyTasksView';
import LoginModal from './components/LoginModal';

import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_TASKS } from './data/sampleTasks';

import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Plus 
} from 'lucide-react';

const DEFAULT_USER = {
  name: 'Jane Doe',
  email: 'jane.doe@focusboard.io',
  role: 'Senior Product Designer',
  initials: 'JD'
};

export default function App() {
  // Navigation State: 'overview' | 'tasks' | 'calendar' | 'settings'
  const [activeNavTab, setActiveNavTab] = useState('overview');

  // Theme State: 'light' | 'dark' persisted in localStorage
  const [theme, setTheme] = useLocalStorage('focusboard_theme', 'light');

  // Synchronize HTML data-theme attribute with state
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // User Auth State persisted in localStorage
  const [user, setUser] = useLocalStorage('focusboard_user', DEFAULT_USER);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Core Tasks State persisted in localStorage with key 'focusboard_tasks'
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', INITIAL_TASKS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // =========================================================================
  // Derived Statistics (dynamically calculated)
  // =========================================================================
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      todo,
      completionPercent
    };
  }, [tasks]);

  // =========================================================================
  // Filtered Tasks
  // =========================================================================
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        const matchesCategory = (task.category || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      if (statusFilter !== 'all') {
        if (task.status !== statusFilter) {
          return false;
        }
      }

      if (priorityFilter !== 'all') {
        if (task.priority !== priorityFilter) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const isFiltered = Boolean(searchQuery.trim() || statusFilter !== 'all' || priorityFilter !== 'all');

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  // =========================================================================
  // CRUD Handlers
  // =========================================================================
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsFormModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
    } else {
      setTasks((prev) => [taskData, ...prev]);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const progress = newStatus === 'Completed' ? 100 : newStatus === 'In progress' ? 50 : 0;
          return { ...t, status: newStatus, progress };
        }
        return t;
      })
    );
  };

  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  // =========================================================================
  // Auth Handlers (Login / Logout)
  // =========================================================================
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // =========================================================================
  // Data Management Handlers
  // =========================================================================
  const handleResetTasks = () => {
    setTasks(INITIAL_TASKS);
    alert('Tasks have been reset to the default 8 sample tasks!');
  };

  const handleClearTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks from browser storage?')) {
      setTasks([]);
    }
  };

  const handleExportTasks = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `focusboard_tasks_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getHeaderTitle = () => {
    switch (activeNavTab) {
      case 'tasks':
        return 'My tasks';
      case 'calendar':
        return 'Calendar';
      case 'settings':
        return 'Settings';
      default:
        return 'Overview';
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeNavTab} 
        onSelectTab={setActiveNavTab} 
        user={user}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-container">
        {/* Header */}
        <Header 
          title={getHeaderTitle()} 
          user={user}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          onNavigateTab={setActiveNavTab}
        />

        {/* Dynamic View Rendering based on activeNavTab */}
        <main className="dashboard-content" role="main">
          {activeNavTab === 'overview' && (
            <>
              {/* Welcome Heading & New Task Action */}
              <div className="dashboard-hero">
                <div>
                  <h1 className="hero-title">Your work, in focus.</h1>
                  <p className="hero-subtitle">
                    Plan your day, stay organized, and celebrate small wins.
                  </p>
                </div>
                
                <button
                  type="button"
                  className="primary-btn desktop-new-task-btn"
                  onClick={handleOpenCreateModal}
                  aria-label="Create new task"
                >
                  <Plus size={16} />
                  <span>New task</span>
                </button>

                <button
                  type="button"
                  className="mobile-fab-btn"
                  onClick={handleOpenCreateModal}
                  aria-label="Create new task"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Focus Notes 3-Slide Carousel */}
              <FocusNotes activeTasksCount={stats.inProgress} />

              {/* Overview Statistics Cards */}
              <section className="overview-stats-grid" aria-label="Dashboard Overview Statistics">
                <StatCard
                  title="Total tasks"
                  value={stats.total}
                  subtitle="Across all projects"
                  icon={ClipboardList}
                  iconBgColor="#EEF2FF"
                  iconColor="#4F46E5"
                />
                <StatCard
                  title="In progress"
                  value={stats.inProgress}
                  subtitle="Keep the momentum"
                  icon={Clock}
                  iconBgColor="#EFF6FF"
                  iconColor="#3B82F6"
                />
                <StatCard
                  title="Completed"
                  value={stats.completed}
                  subtitle={`${stats.completionPercent}% finished this week`}
                  icon={CheckCircle2}
                  iconBgColor="#ECFDF5"
                  iconColor="#10B981"
                />
              </section>

              {/* Tasks Section Preview */}
              <section className="my-tasks-section" aria-label="My tasks list and filters">
                <div className="tasks-section-header">
                  <div>
                    <h2 className="tasks-section-title">My tasks</h2>
                    <p className="tasks-section-subtitle">
                      Manage and track everything in one place.
                    </p>
                  </div>
                  <button 
                    type="button" 
                    className="view-all-link"
                    onClick={() => setActiveNavTab('tasks')}
                  >
                    View all tasks
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="tasks-filter-bar">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Find a task..."
                  />

                  <FilterTabs
                    activeStatus={statusFilter}
                    onSelectStatus={setStatusFilter}
                    selectedPriority={priorityFilter}
                    onSelectPriority={setPriorityFilter}
                    statusCounts={{
                      all: stats.total,
                      inProgress: stats.inProgress,
                      completed: stats.completed,
                      todo: stats.todo
                    }}
                    isFiltered={isFiltered}
                    onResetFilters={handleResetFilters}
                  />
                </div>

                {/* Task List Component */}
                <TaskList
                  tasks={filteredTasks}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                  onStatusChange={handleStatusChange}
                  onOpenNewTask={handleOpenCreateModal}
                  searchQuery={searchQuery}
                  hasActiveFilters={isFiltered}
                  onResetFilters={handleResetFilters}
                />
              </section>
            </>
          )}

          {activeNavTab === 'tasks' && (
            <MyTasksView
              tasks={tasks}
              filteredTasks={filteredTasks}
              stats={stats}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              isFiltered={isFiltered}
              onResetFilters={handleResetFilters}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleOpenDeleteModal}
              onStatusChange={handleStatusChange}
              onOpenNewTask={handleOpenCreateModal}
            />
          )}

          {activeNavTab === 'calendar' && (
            <CalendarView 
              tasks={tasks} 
              onEditTask={handleOpenEditModal}
              onOpenNewTask={handleOpenCreateModal}
            />
          )}

          {activeNavTab === 'settings' && (
            <SettingsView
              user={user}
              onUpdateUser={setUser}
              theme={theme}
              onSelectTheme={setTheme}
              onLogout={handleLogout}
              onResetTasks={handleResetTasks}
              onClearTasks={handleClearTasks}
              onExportTasks={handleExportTasks}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeNavTab} onSelectTab={setActiveNavTab} />

      {/* Create / Edit Task Modal */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ''}
      />

      {/* Authentication / Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
