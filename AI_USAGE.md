# AI Usage Disclosure

## 1. Tools Used
- **Claude / Gemini AI Assistant (Antigravity)**: Architectural planning, layout analysis from Figma frames, component scaffolding, and styling guidance.

---

## 2. Representative Prompts

### Prompt 1: Component Breakdown & State Flow
> *"Analyze the Figma frames for FocusBoard (Desktop 1440x1000, Mobile 390x1128, and Create-Task Form 760x822). Provide a clean, modular React component architecture that ensures a single source of truth for task state and derived statistics."*

### Prompt 2: localStorage Hook with Safe Fallbacks
> *"Create a robust React custom hook `useLocalStorage` that synchronizes state with browser localStorage, safely handling JSON serialization, SSR edge cases, and preventing sample data from overwriting existing user data."*

### Prompt 3: Mobile Responsive Layout Transformation
> *"How should the desktop dashboard layout (with sidebar and horizontal task rows) transform cleanly at the 390px mobile breakpoint while preserving touch targets, accessibility, and matching the Figma mobile specification?"*

---

## 3. AI-Assisted Areas
- **CSS Design Tokens & Spacing**: Setting up custom properties for colors, shadows, and pill badges matching the Figma palette.
- **Interactive Carousel Logic**: Circular indexing for the 3 Focus Notes slides with indicator tabs.
- **Accessible Form & Modal Dialogs**: Ensuring keyboard navigation (Escape to dismiss, focus states, and ARIA labels).

---

## 4. Verified and Corrected Suggestion

### Issue Identified:
The AI initially suggested calculating completion percentage and filter counts inside `useEffect` and storing them in separate state variables (`setTotalTasks`, `setCompletedTasks`, etc.).

### Correction Made:
This suggestion was **rejected and corrected** because storing derived values in React state causes redundant re-renders, potential state synchronization bugs, and stale values. Instead, all metrics and tab badge counts are derived directly using `useMemo` from the single `tasks` state array. This guarantees that any CRUD action immediately updates overview stats and filter counts simultaneously with zero race conditions.
