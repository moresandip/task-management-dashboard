/**
 * Initial sample tasks matching the Figma design reference.
 * Minimum 6 tasks with diverse statuses, priorities, categories and due dates.
 */
export const INITIAL_TASKS = [
  {
    id: "task-101",
    title: "Design landing page",
    description: "Website redesign · Due soon. Create high-fidelity desktop and mobile layouts for product launch.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-22",
    progress: 82
  },
  {
    id: "task-102",
    title: "Fix mobile navigation",
    description: "Frontend sprint · Blocked. Ensure hamburger drawer closes on outside touch and links navigate correctly.",
    category: "Development",
    status: "In progress",
    priority: "Medium",
    dueDate: "2026-11-24",
    progress: 65
  },
  {
    id: "task-103",
    title: "Review onboarding copy",
    description: "Content updates · Approved. Verify clarity and tone for user onboarding modal sequences.",
    category: "Content",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-19",
    progress: 100
  },
  {
    id: "task-104",
    title: "Customer feedback synthesis",
    description: "User research sprint. Compile survey findings and interview notes into prioritized feature requests.",
    category: "Research",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-18",
    progress: 100
  },
  {
    id: "task-105",
    title: "Implement dark mode theme",
    description: "Design system token refresh. Set up CSS custom properties and theme toggle switch.",
    category: "Development",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-28",
    progress: 0
  },
  {
    id: "task-106",
    title: "Update API authentication headers",
    description: "Security enhancement. Add Bearer token rotation handling and refresh token logic.",
    category: "Development",
    status: "To do",
    priority: "High",
    dueDate: "2026-11-25",
    progress: 0
  },
  {
    id: "task-107",
    title: "Design system icon set",
    description: "UI kit expansion. Export SVG assets at 16px, 20px, and 24px with consistent stroke weights.",
    category: "Design",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-30",
    progress: 0
  },
  {
    id: "task-108",
    title: "Q4 Strategy alignment deck",
    description: "Executive presentation. Review milestone accomplishments and resource allocation for Q1.",
    category: "Planning",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-15",
    progress: 100
  }
];

export const CATEGORIES = [
  "Design",
  "Development",
  "Content",
  "Research",
  "Planning",
  "DevOps",
  "Other"
];

export const PRIORITIES = ["High", "Medium", "Low"];

export const STATUSES = ["To do", "In progress", "Completed"];
