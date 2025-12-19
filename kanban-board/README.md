# Kanban Board Application

A fully interactive, accessible Kanban board built with React that allows users to manage tasks using drag-and-drop functionality.

## 🚀 Features

- Four columns: To Do, In Progress, Review, Done
- Add, edit, and delete tasks
- Drag and drop tasks between and within columns
- Task priority indicators (Low / Medium / High)
- Search tasks by title or description
- Filter tasks by assignee and priority
- Persistent state using localStorage
- Fully responsive (desktop, tablet, mobile)
- Keyboard accessible and screen-reader friendly

## 🛠 Tech Stack

- React (Vite)
- @dnd-kit (drag and drop)
- JavaScript (ES6)
- CSS
- localStorage

## 📂 Project Structure
src/
├── components/
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── Task.jsx
│   └── TaskModal.jsx
├── data/
│   └── initialData.js
├── utils/
│   ├── storage.js
│   └── id.js
└── main.jsx


## ⚙️ Setup Instructions

git clone <your-repo-url>
cd kanban-board
npm install
npm run dev


Open http://localhost:5174

## 🧠 Architecture Decisions

Used a normalized state structure to manage tasks and columns efficiently.

Centralized all core state and logic inside the Board component to ensure consistency.

Implemented drag-and-drop using @dnd-kit, chosen for its accessibility and keyboard support.

Persisted application state using localStorage to maintain data across browser sessions.

Followed a component-based architecture for better  reusability and maintainability.

Supports touch-based drag-and-drop for mobile devices.


## ⚖️ Trade-offs

No backend; persistence handled via localStorage

Manual testing instead of automated tests due to time constraints

## ♿ Accessibility

All interactive elements are keyboard accessible.

Tasks can be moved using keyboard controls via @dnd-kit.

Screen reader announcements are provided using ARIA live regions.

Semantic HTML elements such as buttons and form controls are used throughout the application.

## 🧪 Testing

No automated tests were written.

Manual testing was performed to verify:

Adding, editing, and deleting tasks

Drag-and-drop between and within columns

Search and filter functionality

localStorage persistence on page reload

Responsive behavior across screen sizes

Keyboard navigation and screen reader announcements

## 🌍 Live Demo

Live URL:
👉 https://kanban-board-2ipj.vercel.app/