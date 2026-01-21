# 🚀 AI-Powered Job Application Tracker

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Coverage](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge) ![AI Engine](https://img.shields.io/badge/AI%20Engine-Groq%20Llama%203-blueviolet?style=for-the-badge)

 Full-stack career management platform designed to track applications and simulate technical interviews using advanced AI. Built with **Next.js 16**, **TypeScript**, and **Groq (Llama-3)**, featuring a production-grade CI/CD pipeline and comprehensive testing infrastructure.

---

## ✨ Features (The "Why")

### 🤖 AI Career Lab (Groq Powered)

- **Real-time Technical Interviews**: Simulates a "Senior Tech Lead" persona directly in the browser.
- **Adaptive Difficulty**: Automatically adjusts questions based on the user's role (e.g., Fresher vs. Senior).
- **Brutal Scoring System (0-10)**: Uses strict, non-hallucinating logic to penalize vague answers and prevent "grade inflation."
- **Instant Feedback**: Generates detailed markdown reports with specific gap analysis and architectural advice.

### 🛡️ Enterprise-Grade Quality Assurance

- **Automated CI/CD**: GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push.
- **Unit Testing (Vitest)**: 100% coverage on core business logic (`lib/validations`, `lib/actions`).
- **End-to-End Testing (Playwright)**: Automated browser testing for critical user flows (Landing -> Dashboard).
- **Strict Validation**: **Zod** schemas enforce data integrity for salaries, URLs, and form inputs.

### 🎨 Premium UI/UX

- **Visual Kanban Board**: Drag-and-drop pipeline management powered by `@dnd-kit`.
- **Architectural Design System**: Custom "Obsidian & Lime" theme with glassmorphism and micro-interactions.
- **Responsive Architecture**: Fully mobile-optimized interface with dynamic layouts.

---

## 🛠️ Tech Stack

### Core

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Database**: MongoDB (Mongoose)
- **Authentication**: Better Auth

### AI & Logic

- **Engine**: Groq API (Llama-3.3-70b-versatile)
- **Validation**: Zod
- **Testing**: Vitest (Unit), Playwright (E2E)

### Styling

- **CSS Engine**: Tailwind CSS 4
- **Animation**: `tw-animate-css` + Native CSS Variables
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 20+
- MongoDB URI (Local or Atlas)
- Groq API Key (Free tier available at [console.groq.com](https://console.groq.com))

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd job-application-tracker

# Install dependencies
npm ci
```

### 3. Environment Setup

Create a `.env.local` file in the root:

```env
# Database
MONGODB_URI=mongodb+srv://...

# Authentication
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# High-Speed AI Engine
GROQ_API_KEY=gsk_...
```

### 4. Run Development Server

```bash
npm run dev
# App will launch at http://localhost:3000
```

---

## 🧪 Testing & Validation

This project relies on a **"Test-Driven"** mentality. You can run the full suite locally:

### Unit Tests

Validates strict salary schemas and AI prompt engineering logic.

```bash
npm run test
```

### E2E Tests

Simulates a real user browser session to verify landing pages and critical forms.

```bash
npm run test:e2e
```

### CI/CD Pipeline

Every push to `main` triggers:

1.  Dependency Installation
2.  Playwright Browser Setup
3.  **Unit Tests Execution**
4.  **E2E Validation**
5.  Build Verification

---

## 📂 Project Structure

```bash
├── 📂 app            # Next.js App Router (Pages & Layouts)
├── 📂 components     # Reusable UI Components
│   ├── 📂 ai         # AI Interview Logic & Arena
│   └── 📂 dashboard  # Kanban Board & Stats
├── 📂 lib            # Business Logic
│   ├── 📂 actions    # Server Actions (Mutations)
│   ├── 📂 models     # Database Schema (Mongoose)
│   └── 📂 validations# Zod Schemas (Single Source of Truth)
├── 📂 e2e            # Playwright End-to-End Tests
├── 📂 .github        # CI/CD Workflows
└── 📄 vitest.config.ts # Testing Configuration
```

---

## 🔒 Security & Best Practices

- **Strict Input Sanitization**: All inputs passed through Zod before reaching the DB.
- **Environment Isolation**: Secrets managed via `.env.local` and GitHub Secrets.
- **Clean Code**: No legacy comments or dead code paths.

---
