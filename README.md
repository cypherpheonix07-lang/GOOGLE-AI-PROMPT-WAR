# TeamSync — Team Collaboration Tool

A high-performance web platform designed to improve team coordination, communication, and task visibility. Built with React, Firebase, and Google Services.

## 🚀 Features

- **Real-time Kanban Board**: Track tasks through "To Do", "In Progress", and "Done" statuses with instant synchronization across all team members.
- **Team Messaging**: Persistent, real-time chat for seamless team coordination.
- **Role-Based Access Control (RBAC)**: Secure access levels for Admins, Managers, and Members.
- **AI-Powered Insights**: (Integrated via Gemini API) Automated task summaries and prioritization suggestions.
- **Premium Design System**: Modern glassmorphism UI with smooth animations and accessibility (WCAG 2.1 compliance).

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Framer Motion (Animations), Lucide React (Icons).
- **Backend**: Firebase Authentication, Firestore (Real-time Database).
- **Security**: Firebase Security Rules, Input Validation.

## 📦 Setup Instructions

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Firebase Configuration**:
   - Create a project on [Firebase Console](https://console.firebase.google.com/).
   - Enable **Email/Password Authentication**.
   - Create a **Firestore Database** in test mode (or production with rules).
   - Copy your config into `src/firebase.js`.

3. **Gemini AI Integration**:
   - Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
   - Add it to your `.env` file as `VITE_GEMINI_API_KEY`.

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

The app follows a modular architecture with a clear separation of concerns:
- `src/AuthContext.jsx`: Manages global user state and roles.
- `src/firebase.js`: Centralized Firebase initialization.
- `src/components/`: Reusable UI components.
- `src/index.css`: Design system tokens and global styles.

## ♿ Accessibility & SEO

- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<h1>-<h3>`, and `<form>`.
- **ARIA Labels**: All interactive elements include descriptive labels for screen readers.
- **Keyboard Navigation**: Fully navigable via keyboard with visible focus states.
- **SEO**: Optimized meta tags and structured data in `index.html`.

---
Built with ❤️ for Google AI Prompt War.
