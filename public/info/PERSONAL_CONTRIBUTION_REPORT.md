# 📄 Personal Contribution Report
## Project: Webiz TaskManager — Frontend Development

This document provides a detailed breakdown of my individual contributions to the development of the **Webiz TaskManager** platform, specifically focusing on the **Frontend (Next.js & TypeScript)** architecture. This report is structured in accordance with evaluation criteria and feedback to clearly demonstrate the scope of work, architectural decisions, API integrations, and git commits.

---

## 1. 🎯 Executive Summary of Contribution

My primary role in this project was **establishing the frontend architecture, building the high-fidelity user interface (UI), implementing role-based workspaces (RBAC), and fully integrating all REST API endpoints with the C# ASP.NET Core backend.**

Key achievements and implementations include:
*   **Next.js 16+ Migration:** Successfully migrated the codebase from Vite to Next.js App Router and converted the entire frontend to strict **TypeScript** for type safety.
*   **Cookie-Based Authentication:** Integrated secure, state-persistent session handling that automatically validates and scopes workspaces for three distinct roles (Company, Recruiter, Talent).
*   **Multi-View Dashboards:** Designed and implemented three interactive data views: **Kanban Board (with Drag & Drop)**, **Planner View (chronologically grouped)**, and **Dense Task Table**.
*   **Task & Comment Lifecycles:** Created the universal task creation/editing modal (**NewTaskModal**) and built the side-panel **TaskComments** discussion module supporting nested replies and full edit/delete flows.
*   **Talent & Recruiter Management:** Designed the active recruitment panels allowing companies to search, invite, revoke invitations, and remove talents or recruiters in real time.
*   **Interactive Info Explorers:** Developed custom dashboards under `/info` for live exploration of active **REST API endpoints**, **GitHub Commit history**, and the product **Showcase video**.

---

## 2. 📂 File and Directory Structure of Work Done

Below is the directory layout of the frontend codebase highlighting the specific files and directories I created, refactored, and integrated:

```bash
src/
├── app/
│   ├── layout.tsx            # Global Root Layout, theme context providers, and design token imports
│   ├── page.tsx              # Main Workspace Dashboard — dynamically rendered based on active user role
│   └── info/                 # Informational explorer sub-pages
│       ├── commits/          # [Page] Real-time GitHub commit history explorer with timeline visualization
│       ├── endpoints/        # [Page] Interactive API documentation catalog with search and role filters
│       └── showcase/         # [Page] Product showcase presentation page embedding the walkthrough video
├── components/
│   ├── auth/                 # [Folder] Session management (premium login flows, cookie verification)
│   ├── board/                # [Folder] Kanban Board components (columns, cards, drag-and-drop mechanics)
│   ├── candidates/           # [Folder] Talent directory widgets (search tags, match scores, detail drawers)
│   ├── clients/              # [Folder] Company profiles and client management panels
│   ├── jobs/                 # [Folder] Job positions list, starred candidates, and status pills
│   ├── layout/               # [Folder] Sticky app shell (sidebar, navigation, and live notification tray)
│   ├── planner/              # [Folder] Planner boards grouping tasks into Today, Tomorrow, and Upcoming
│   ├── recruiter/            # [Folder] Recruiter workspace dashboard and company join request widgets
│   ├── shared/               # [Folder] Reusable UI components
│   │   ├── NewTaskModal/     # Universal task creation and editing modal with field mapping
│   │   ├── TaskComments/     # Threaded discussion sidebar supporting edit/delete lifecycles
│   │   └── Dropdowns/        # Custom search dropdowns for talents, priorities, and statuses
│   └── table/                # [Folder] High-density task data table with sorting and action triggers
├── services/                 # [Folder] Axios API client integrations connecting to the C# Backend
│   ├── api.ts                # Central Axios client configuration with credential/cookie support
│   ├── authService.ts        # Session authentication calls (login/logout for all three roles)
│   ├── commentService.ts     # CRUD endpoint bindings for task comments
│   ├── companyService.ts     # Company profile, task, recruiter, and employee management endpoints
│   ├── jobService.ts         # Job positions CRUD integration
│   ├── recruiterService.ts   # Recruiter profile and collaboration join request handlers
│   └── talentService.ts      # Talent profile, invitations, and task status updates
└── index.css                 # Global design system tokens, base styles, and utility classes
```

---

## 3. 🔗 Connected REST API Endpoints

To eliminate static mock data, the frontend is directly connected to the C# backend. Below are the key endpoints I integrated into the frontend services:

| API Endpoint | HTTP Method | Frontend Service & Method | Workflow / Associated Role |
| :--- | :---: | :--- | :--- |
| `/api/Auth/login` | `POST` | `authService.login` | Authenticates a Company user using secure cookies |
| `/api/Auth/login/talent` | `POST` | `authService.loginTalent` | Authenticates a Talent user using secure cookies |
| `/api/Auth/login/recruiter` | `POST` | `authService.loginRecruiter` | Authenticates a Recruiter user using secure cookies |
| `/api/Auth/logout` | `POST` | `authService.logout` | Terminates session and clears active cookies |
| `/api/Company/assignments` | `GET` | `companyService.getAssignments` | Fetches all tasks created by the company |
| `/api/Company/assignments` | `POST` | `companyService.createAssignment` | Creates a new task and assigns it to a talent |
| `/api/Company/assignments` | `PUT` | `companyService.updateAssignment` | Edits task details (title, priority, deadline) |
| `/api/Company/assignments/{id}`| `DELETE` | `companyService.deleteAssignment` | Permanently deletes a task from the system |
| `/api/Talent/assignments` | `GET` | `talentService.getAssignments` | Fetches tasks assigned specifically to the active talent |
| `/api/Talent/assignments/state`| `PUT` | `talentService.updateAssignmentState`| Updates task status (To-Do, In Progress, Done) |
| `/api/Comments/assignment/{id}`| `GET` | `commentService.getComments` | Retrieves all comments for a specific task |
| `/api/Comments` | `POST` | `commentService.createComment` | Creates a new comment or reply under a task |
| `/api/Company/talents/all` | `GET` | `companyService.getAllTalents` | Queries all registered talents for recruitment |
| `/api/Company/talents/invite/{id}`| `POST`| `companyService.inviteTalent` | Sends a collaboration invitation to a talent |
| `/api/Company/talents/invitations/{id}`| `DELETE`| `companyService.revokeInvitation`| Revokes an active, pending talent invitation |
| `/api/Company/talents/{id}` | `DELETE` | `companyService.removeTalent` | Disassociates (removes) a talent from the company |
| `/api/Talent/invitations` | `GET` | `talentService.getInvitations` | Retrieves incoming invitations for the active talent |
| `/api/Talent/invitations/{id}/accept`| `POST`| `talentService.acceptInvitation`| Accepts a company's invitation to collaborate |
| `/api/Talent/invitations/{id}/reject`| `POST`| `talentService.rejectInvitation`| Rejects a company's invitation to collaborate |

---

## 4. 🛠️ How Core Features Work (Preparation for Project Defense)

For the project defense and evaluation, here is the technical breakdown of how the primary features operate and synchronize with the backend:

### A. Task Creation & Editing (NewTaskModal)
*   **Workflow:** When a Company administrator clicks "New Task", the `NewTaskModal` is triggered. The modal prompts the user for a Title, Description, Deadline, Priority (Low, Medium, High, Urgent), and an Assignee (selected from the list of company talents).
*   **API Binding:** Submitting the form sends a `POST` request to `/api/Company/assignments` containing the mapped payload. For edits, a `PUT` request is sent to the same endpoint with the task's ID.
*   **UI Sync:** The UI updates immediately. The task card displays the assignee's avatar, a color-coded priority badge, and a calendar deadline indicator.

### B. Task Status Transitions (Optimistic Updates)
*   **Workflow:** Task statuses (**To-Do**, **In Progress**, **Done**) can be transitioned in two ways:
    1. Dragging and dropping a card between columns on the **Kanban Board**.
    2. Clicking the completion checkbox on a task card in the **Planner** or **Table** views, which transitions the task directly to **Done**.
*   **API Binding:** Companies update tasks via a `PUT` request to `/api/Company/assignments`. Talents update their assigned tasks via a `PUT` request to `/api/Talent/assignments/state` (verified on the backend to prevent cross-user tampering).
*   **Optimistic UI rendering:** The frontend implements **Optimistic Updates**. When a user moves a task, the UI immediately updates to its target column or checkmark state before the server responds. If the network request fails, the task card gracefully snaps back to its original state, ensuring a seamless user experience.

### C. Team Discussions (TaskComments Module)
*   **Workflow:** Clicking any task opens a detailed drawer displaying the description and the `TaskComments` sidebar. Team members can post, reply to, edit, or delete comments.
*   **API Binding:** Opening the drawer triggers a `GET` request to `/api/Comments/assignment/{id}` to pull discussions chronologically. Posting a comment triggers a `POST` request to `/api/Comments`.
*   **Session-Scoped Control:** Comment authorship is securely verified on the backend via the active session cookie. The frontend dynamically renders edit/delete buttons only for comments authored by the currently logged-in user.

### D. Invitations & Role-Based Workspaces (RBAC)
*   **Talent Invitations:** From the "Talents" panel, companies can query the talent directory and send recruitment invites. This triggers a `POST` request to `/api/Company/talents/invite/{talentId}`. On the talent's dashboard, a real-time notification banner appears, allowing them to accept or reject the invitation. Upon acceptance, the talent is added to the company's active employees list.
*   **Role-Based UI:** The app shell dynamically adapts based on the logged-in role:
    *   **Company:** Access to complete project management, recruitment directories, and active personnel controls.
    *   **Talent:** Limited to tasks assigned to them, allowing status transitions and commenting.
    *   **Recruiter:** Focused on job boards and monitoring hiring pipelines.

---

## 5. 🛠️ Git Commit History Representing My Work

The progressive development of these features and my direct authorship of the codebase are represented by the following Git commits in the frontend repository:

| Commit SHA | Type | Commit Message | Scope and Impact |
| :--- | :---: | :--- | :--- |
| `16b4814` | `docs` | update project structure in README to match actual directory layout | Refactored folder structure documentation |
| `5d43001` | `feat` | interconnect all info pages (commits, endpoints, showcase) and unify headers | Interconnected sub-pages and standardized top headers |
| `5af191a` | `feat` | add product showcase video page and fix candidate/job delete workflows | Created video showcase page and resolved delete workflows |
| `2aee22c` | `feat` | implement interactive API Endpoints and GitHub Commits explorers | Created real-time API and GitHub commits dashboard pages |
| `5007812` | `feat` | integrate real database/API feeds and implement interactive Job Detail | Connected live API data feeds to job position views |
| `f3d29d8` | `feat` | implement database-backed jobs entity integration with full CRUD | Integrated full REST CRUD operations for job positions |
| `7ce92a8` | `fix` | retrieve companies using recruiterService to prevent 403 error | Resolved authorization 403 errors on recruiter company fetches |
| `50a2750` | `fix` | fetch fresh list of join requests on request to join | Fixed join request sync on recruiters workspace |
| `6a55e82` | `fix` | resolve nested scroll container warning and make header sticky | Optimized UI scroll cascading and fixed sticky headers |
| `b489476` | `fix` | hide completed/done tasks from planner and table views | Filtered completed tasks from planner/table dashboards |
| `fdaf529` | `fix` | handle 404 response on invitation revocation gracefully | Gracefully handled state synchronization on revoked invites |
| `4d180c0` | `fix` | default priority to Medium and status to Pending | Standardized initial task payloads before API submission |
| `1dcbd19` | `feat` | add notification tray, sent invitations, comments sync, task editing | Integrated live notification tray, comment sync, and task edits |
| `a7f1ee0` | `feat` | implement talent role authentication, dashboard and session handling | Implemented talent login, dashboard views, and cookie sessions |
| `dab551a` | `feat` | complete Next.js typescript conversion, API integration, security | Completed Next.js App Router migration and strict TS typing |
| `dd34a1f` | `fix` | make checkmarks functional with optimistic updates and align sizes | Fixed checklist checkbox sizes and optimistic status sync |
| `aa312ed` | `feat` | implement cookie-based authentication and refactor company service | Implemented cookie auth and decoupled company service layers |
| `e60e5e6` | `feat` | integrate backend services and implement premium login page | Built high-fidelity login interface and backend bindings |
| `9ceae71` | `feat` | implement state persistence and interactive Kanban board | Built Kanban board layout with client-side state persistence |
| `bdffe8b` | `feat` | add drag and drop functionality to kanban board | Integrated full HTML5 drag-and-drop handlers for kanban cards |
| `220e020` | `feat` | implement high-fidelity Task Manager dashboard with comments | Crafted initial UI dashboard shell and comments panel |

---

## 6. 🏆 Conclusion

As a result of these implementations, the **Webiz TaskManager** frontend is a high-performance, fully production-ready client application. It boasts high-fidelity visual design, responsive interactions (drag & drop, optimistic state updates), robust session security (cookie auth), and a clean, fully-typed modular codebase.

All seed credentials and instructions on how to boot up the environment are available in the central **[Root README](../README.md)**.
