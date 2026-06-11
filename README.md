# TaskManager Webiz - High-Fidelity Management Dashboard

TaskManager Webiz is a premium, feature-rich task and talent management platform built with React, Next.js, and TypeScript. It is integrated directly with a C# ASP.NET Core API backend to provide a live, real-time interface for managing tasks, clients, candidates, and job applications.

## 🚀 Tech Stack

- **Core:** React 19, Next.js 16+ (using Turbopack)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (Custom Modular System)
- **Icons:** [Iconify](https://iconify.design/) (Solar, Carbon, and custom SVG icons)
- **Database/Backend Integration:** Integrated with an ASP.NET Core REST API (`HRTodoManagement`) with Npgsql PostgreSQL backend.
- **Typography:** Inter & Outfit (Google Fonts)

---

## 📂 Project Structure

```bash
src/
├── app/                 # Next.js App Router (page.tsx main app interface)
├── components/
│   ├── board/           # Kanban Board implementation (Columns & Cards)
│   ├── candidates/      # Talent management (Table, Detail View, CV widgets)
│   ├── clients/         # Client & Company management (Overview & Detail)
│   ├── jobs/            # Job application tracking & Job Detail views
│   ├── layout/          # Global layout (Sidebar, TopHeader, Navigation)
│   ├── planner/         # List-based planner (Today/Tomorrow/Upcoming)
│   ├── shared/          # Reusable high-fidelity components
│   │   ├── NewTaskModal # Multi-functional task creation modal
│   │   ├── TaskComments # Side-panel/Embedded discussion system
│   │   ├── EmptyState   # Premium SVG-illustrated empty states
│   │   └── Dropdowns    # Specialized entity search and selection
│   └── table/           # Advanced data tables
├── constants/           # Shared enums and styling maps
├── services/            # Axios API client integrations connecting to the C# Backend
│   ├── api.ts           # Central API configuration
│   ├── jobService.ts    # Job management endpoint bindings
│   ├── talentService.ts # Talent profile and application handlers
│   └── companyService.ts# Company profile and task management endpoints
└── index.css            # Global design tokens and base styles
```

---

## ✨ Key Features

### 1. Live Backend API Feeds
- **Zero Mock Data:** Entirely decoupled from static files; all dashboard stats, tasks, company details, and talents derive directly from the PostgreSQL backend database.
- **Synchronized Workflows:** Creating tasks, updating job statuses, and inviting talents syncs instantly via REST API endpoints.

### 2. Interactive Job Detail Views
- **Job Position Switcher:** Dropdown overlay listing all jobs in the workspace allowing dynamic position switching.
- **Status Picker:** Instant status dropdown pills ("Active", "Hired", "Frozen") that update the backend and persist details.
- **Starred Candidates:** Allows starring (favoriting) candidates with real-time updates to the "My Choices" filter pool.
- **Live Search & Filters:** Dynamic candidate search filtering by name, role, or skill tags.
- **List & Grid Layouts:** Switch seamlessly between a classic table representation and custom grid cards featuring avatars, match-score progress indicators, and recruitment stage pills.

### 3. Multi-View Task Management
- **Planner View:** Grouped tasks by timeline (Today, Tomorrow, Upcoming) with overdue alerts.
- **Kanban Board:** Interactive status tracking with custom columns and card-based metadata.
- **Table View:** Dense data representation with sorting and quick action triggers.

### 4. Smart Team Discussions
- **Task Comments:** Side panel with reply threads, edit, and delete lifecycle flows.

---

## 🎨 Design System

The project adheres to a strict Design System defined in `src/index.css`.

### Tokens
- **Primary Blue:** `#2F80ED` (Actions & Active states)
- **Backgrounds:** `#F4F6F8` (App Shell), `#FFFFFF` (Cards), `#F5F8FD` (Input areas)
- **Text:** `#182939` (Heading), `#687A9E` (Secondary), `#B4BDCE` (Subtle)
- **Status Indicators:**
  - `Active / To-Do`: `#2F80ED`
  - `In Progress / Screening`: `#F19100`
  - `Hired / Completed`: `#08AC16`
  - `Frozen / High Priority`: `#ED5757`

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

## 📝 Maintenance Notes

- When adding new icons, prefer the `solar:` set from Iconify to maintain visual consistency.
- Ensure all new modals use the `ntm-backdrop` system to handle z-index and focus trapping.
- Keep components modular: if a widget exceeds 200 lines, consider breaking it into sub-components in its local directory.
