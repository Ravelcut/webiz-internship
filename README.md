# TaskManager Webiz - High-Fidelity Management Dashboard

TaskManager Webiz is a premium, feature-rich task and talent management platform built with React. It provides a modular and highly interactive interface for managing tasks, clients, candidates, and job applications with a focus on high-fidelity design and seamless user experience.

## 🚀 Tech Stack

- **Core:** React 18+
- **Styling:** Vanilla CSS (Custom Modular System)
- **Icons:** [Iconify](https://iconify.design/) (Solar, Carbon, and custom SVG icons)
- **Build Tool:** Vite
- **Typography:** Inter (Google Fonts)

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── board/           # Kanban Board implementation (Columns & Cards)
│   ├── candidates/      # Talent management (Table, Detail View, Resume widgets)
│   ├── clients/         # Client & Company management (Overview & Detail)
│   ├── jobs/            # Job application tracking
│   ├── layout/          # Global layout (Sidebar, TopHeader, Navigation)
│   ├── planner/         # List-based planner (Today/Tomorrow/Upcoming)
│   ├── shared/          # Reusable high-fidelity components
│   │   ├── NewTaskModal # Multi-functional task creation modal
│   │   ├── TaskComments # Side-panel/Embedded discussion system
│   │   ├── EmptyState   # Premium SVG-illustrated empty states
│   │   └── Dropdowns    # Specialized entity search and selection
│   └── table/           # Advanced data tables
├── data/                # Mock data system
├── App.jsx              # Main shell and routing logic
└── index.css            # Global design tokens and base styles
```

---

## ✨ Key Features

### 1. Multi-View Task Management
- **Planner View:** Grouped tasks by timeline (Today, Tomorrow, Upcoming) with overdue alerts.
- **Kanban Board:** Interactive status tracking with custom columns and card-based metadata.
- **Table View:** Dense data representation with sorting and quick action triggers.

### 2. Advanced Task Creation (`NewTaskModal`)
- **Smart Entity Binding:** Dynamically search and link tasks to Clients, Jobs, or Talent.
- **Status & Priority:** Floating labels with color-coded indicators.
- **Integrated Discussions:** Embedded comment thread within the modal for quick context.

### 3. Team Discussion System
- **Side Panel (`TaskCommentsPanel`):** Dedicated context for deep discussions, accessible from any task view.
- **Real-time Input:** Character counters, file attachment previews, and reply threading.
- **Comment Lifecycle:** Fully interactive "Edit" and "Delete" flows with optimistic UI patterns.

### 4. Modular Detail Views
- **Company Detail:** Displays related projects, contacts, and active tasks.
- **Candidate Detail:** Modular resume-style layout including work history, education, and skill widgets.

---

## 🎨 Design System

The project adheres to a strict Design System defined in `src/index.css`.

### Tokens
- **Primary Blue:** `#2F80ED` (Actions & Active states)
- **Backgrounds:** `#F7F7F7` (App Shell), `#FDFDFD` (Cards), `#F5F8FD` (Input areas)
- **Text:** `#182939` (Heading), `#687A9E` (Secondary), `#B4BDCE` (Subtle)
- **Status Indicators:**
  - `To-Do`: `#2F80ED`
  - `In Progress`: `#F19100`
  - `Completed`: `#08AC16`
  - `High Priority`: `#ED5757`

### Aesthetics
- **Shadows:** Multi-layered soft shadows for depth (`box-shadow: 0px 8px 16px rgba(19, 19, 20, 0.1)`).
- **Animations:** Smooth entry transitions (`fadeIn`, `slideInRight`, `ntmSlideUp`).
- **Typography:** Weighted `Inter` font for maximum readability and a premium "SaaS" feel.

---

## 🛠 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🛠 Future Roadmap for Developers

- **Dynamic Data API:** Replace `mockData.js` with Axios/Fetch calls to a backend service.
- **Drag & Drop:** Implement `react-beautiful-dnd` or `dnd-kit` for the Kanban Board.
- **Global State:** Transition from `App.jsx` prop-drilling to **Context API** or **Zustand** for shared states (like the Comments visibility).
- **Filtering Logic:** Connect the `FilterBar` UI to the task list filtering functions.

---

## 📝 Maintenance Notes

- When adding new icons, prefer the `solar:` set from Iconify to maintain visual consistency.
- Ensure all new modals use the `ntm-backdrop` system to handle z-index and focus trapping.
- Keep components modular: if a widget exceeds 200 lines, consider breaking it into sub-components in its local directory.
