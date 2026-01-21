# 🚀 AI-Powered Job Application Tracker

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Coverage](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge) ![AI Engine](https://img.shields.io/badge/AI%20Engine-Groq%20Llama%203-blueviolet?style=for-the-badge)

A **production-grade**, full-stack career management platform that combines advanced job application tracking with AI-powered technical mock interview simulation. Built with **Next.js 16**, **TypeScript**, and **Groq (Llama-3.3-70b)**, featuring enterprise-level testing infrastructure and automated CI/CD.

---

## 🎯 Core Features

### 🤖 AI Career Lab - Technical Interview Simulator

Simulates real technical screening interviews using an adaptive AI engine.

#### **🔥 Key Capabilities**

| Feature                    | Description                                                                                      |
| :------------------------- | :----------------------------------------------------------------------------------------------- |
| **🧠 Intelligent Engine**  | "Senior Technical Lead" persona (Llama-3.3-70b) with adaptive difficulty from Fresher to Senior. |
| **⚡ Real-time Streaming** | Instant, natural responses powered by Groq's LPU.                                                |
| **🔄 Context-Aware**       | Generates relevant follow-ups based on your previous answers.                                    |

#### **📝 Strict Evaluation Protocol**

> _"No live coding. Pure conceptual understanding."_

- **🎯 Brutal Scoring (0-10)**: From **0.0** (Gibberish) to **10.0** (Mastery).
- **🚫 Anti-Hallucination**: Penalizes incorrect technical facts or fabricated answers.
- **📊 Detailed Feedback**:
  - **Gap Analysis**: Specific areas to improve.
  - **Actionable Advice**: Curated resources for growth.
  - **Contextual**: Tailored to your seniority level.

#### **⚙️ Technical Underpinnings**

- **Groq API**: OpenAI-compatible streaming endpoints.
- **Resilience**: Robust fallbacks for API failures (429/500).
- **Parsing**: Advanced regex-based JSON extraction.
- **State Machine**: 6-phase interview tracking architecture.

---

### 📋 Advanced Job Application Tracking

Manage your career pipeline with a high-performance Kanban system.

#### **🏗️ Visual Kanban Board**

| Stage               | Description                                   |
| :------------------ | :-------------------------------------------- |
| **🌟 Wish List**    | Target companies you haven't applied to yet.  |
| **📨 Applied**      | Applications submitted and awaiting response. |
| **🗣️ Interviewing** | Active interview loops in progress.           |
| **🎉 Offer**        | Received job offers!                          |
| **❌ Rejected**     | Closed opportunities for reflection.          |

#### **💎 Rich Features**

- **🖱️ Drag-and-Drop**: Smooth `@dnd-kit` interactions with optimistic UI updates.
- **📇 Smart Cards**:
  - **Salary Validation**: Strict regex checks (e.g., `$120k`).
  - **Metadata**: Custom tags, URLs, and notes.
- **🔍 Intelligent Search**: Debounced (300ms), multi-field filtering across all data.
- **📤 Data Export**: One-click **CSV Export** (Excel-compatible).

---

### 🛡️ Enterprise-Grade Security & Auth

Built-in protection for your data.

- **🔒 Authentication**: **Better Auth** (v1.4+) with MongoDB adapter.
- **🔑 Secure Flow**: Email/Password with **bcrypt** hashing.
- **⚡ Sessions**: High-performance cached cookie sessions.
- **🛡️ Authorization**:
  - **Server Protection**: Strict session verification.
  - **Row-Level Security**: Data scoped to `userId`.
  - **Ownership Checks**: Board modification validation.

---

### 🎨 Premium UI/UX Design

#### **Animations**

- **Tailwind Animate CSS**: Smooth entrance animations (`fade-in`, `slide-in-from-bottom`)
- **Custom Keyframes**: Floating effect for hero section visuals
- **Reduced Motion Support**: Respects user's prefers-reduced-motion settings

---

### 📊 Analytics Dashboard

#### **Real-Time Statistics**

- **Total Applications**: Count of all tracked opportunities
- **Active Interviews**: Live count of in-progress interview stages
- **Offers Received**: Number of pending job offers
- **Success Rate**: Calculated metric (Offers / Total Applications)

#### **Visual Stat Cards**

- **Gradient Backgrounds**: Each card uses distinct color schemes matching its metric type
- **Icon Integration**: Lucide React icons for visual hierarchy
- **Hover Effects**: Scale transformations and glow overlays

---

## 🛠️ Technical Stack

### **Core Framework**

- **Next.js 16** (App Router): Server Components, Streaming, Server Actions
- **React 19**: Latest concurrent features, automatic batching
- **TypeScript 5**: Strict mode enabled, full type safety

### **Database & ORM**

- **MongoDB**: NoSQL document store for flexible schema
- **Mongoose 9**: ODM with schema validation and middleware hooks

### **AI & Validation**

- **Groq API**: Llama-3.3-70b-versatile model for interview simulation
- **Zod 4**: Runtime schema validation for forms and API responses

### **Styling & UI**

- **Tailwind CSS 4**: Utility-first CSS with custom design tokens
- **Radix UI**: Accessible, unstyled component primitives
- **Lucide React**: Modern icon library with 1000+ icons
- **tw-animate-css**: Tailwind-friendly animation utilities

### **State & Data Fetching**

- **React Server Components**: Zero-bundle server-side rendering
- **Server Actions**: Type-safe mutations without API routes
- **Optimistic UI**: Instant feedback with automatic rollback

### **Testing & Quality**

- **Vitest 4**: Blazing-fast unit test runner with jsdom environment
- **Playwright 1.57**: Cross-browser E2E testing (Chromium, Firefox, WebKit)
- **ESLint 9**: Next.js recommended rules + TypeScript integration

### **DevOps**

- **GitHub Actions**: Automated CI/CD pipeline
- **Better Auth**: Session management with MongoDB adapter

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 20+ (LTS recommended)
- MongoDB instance (Local or Atlas cloud)
- Groq API Key (Free tier: [console.groq.com](https://console.groq.com))

### **Installation**

```bash
# Clone repository
git clone https://github.com/Sadikhal/job-tracker.git
cd job-tracker

# Install dependencies (use npm ci for production)
npm ci
```

### **Environment Configuration**

Create `.env.local` in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority

# Authentication
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# AI Engine (Required for Interview Feature)
GROQ_API_KEY=gsk_your_groq_api_key_here
```

**🔑 Getting Your Groq API Key:**

1. Visit [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up (GitHub/Google OAuth available)
3. Create a new API key
4. Copy and paste into `.env.local`

### **Development Server**

```bash
npm run dev
# Server starts at http://localhost:3000
```

### **Database Seeding (Optional)**

Populate your database with sample applications:

This creates 15 professionally crafted job applications distributed across all 5 pipeline stages.

---

## 🧪 Testing Infrastructure

This project maintains **100% coverage** on critical business logic.

### **Running Tests**

```bash
# Unit Tests (Vitest)
npm run test

# End-to-End Tests (Playwright)
npm run test:e2e

# Interactive UI Mode (Playwright)
npm run test:ui
```

### **Test Coverage**

#### **Unit Tests**

- **Validation Layer**: `lib/validations/job-application.test.ts`
  - Salary format validation (numeric, ranges, k-notation)
  - Required field enforcement
  - URL format validation
- **AI Logic**: `lib/actions/ai-interview.test.ts`
  - Groq API response handling
  - JSON extraction from markdown-wrapped responses
  - Error fallback scenarios (429, 500, network failures)

#### **E2E Tests**

- **Landing Page**: `e2e/landing.test.ts`
  - H1 heading verification
  - CTA button presence
  - Sign-in page navigation

### **CI/CD Pipeline**

Every push to `main` triggers automated testing:

```yaml
# .github/workflows/ci.yml
Steps:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (npm ci)
4. Install Playwright browsers
5. Run unit tests
6. Run E2E tests
7. Report failures
```

**Build Status**: Tests must pass before merge is allowed.

---

## 📂 Project Architecture

```
├── app/                    # Next.js App Router
│   ├── api/auth/          # Better Auth API routes
│   ├── dashboard/         # Main application dashboard
│   ├── sign-in/           # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx         # Root layout (fonts, providers)
│   └── page.tsx           # Landing page
│
├── components/            # React Components
│   ├── ai/               # AI Interview system
│   │   ├── interview-arena.tsx    # Main interview UI
│   │   └── simulation-dialog.tsx  # Launch dialog
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── ai-lab-tab.tsx        # AI Career Lab tab
│   │   ├── search-bar.tsx        # Debounced search
│   │   ├── stage-grid.tsx        # Column-based view
│   │   └── stats-cards.tsx       # Analytics cards
│   ├── shared/           # Reusable utilities
│   │   ├── badge.tsx
│   │   ├── empty-state.tsx
│   │   ├── footer.tsx
│   │   └── loading-spinner.tsx
│   ├── ui/               # Radix UI wrappers
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── create-job-dialog.tsx     # Application form
│   ├── job-application-card.tsx  # Kanban card
│   ├── kanban-board.tsx          # Drag-and-drop board
│   └── navbar.tsx                # Global navigation
│
├── lib/                  # Business Logic
│   ├── actions/         # Server Actions
│   │   ├── ai-interview.ts      # AI interview logic
│   │   ├── board.ts             # Board queries
│   │   └── job-applications.ts  # CRUD operations
│   ├── auth/            # Authentication
│   │   ├── auth.ts              # Better Auth config
│   │   └── auth-client.ts       # Client hooks
│   ├── hooks/           # React Hooks
│   │   └── useBoards.ts         # Board state management
│   ├── models/          # Mongoose Schemas
│   │   ├── board.ts
│   │   ├── column.ts
│   │   └── job-application.ts
│   ├── validations/     # Zod Schemas
│   │   ├── auth.ts
│   │   └── job-application.ts
│   ├── db.ts            # MongoDB connection pooling
│   ├── export-utils.ts  # CSV generation
│   ├── init-user-board.ts # New user setup
│   └── utils.ts         # Utility functions
│
├── e2e/                 # Playwright E2E Tests
│   └── landing.test.ts
│
├── scripts/             # Utility Scripts
│   └── seed.ts          # Database seeding
│
├── .github/workflows/   # CI/CD
│   └── ci.yml           # GitHub Actions pipeline
│
└── public/              # Static Assets
```

---

## 🔒 Security Best Practices

### **Input Sanitization**

- All user inputs pass through Zod validation before reaching the database
- Server Actions validate session + ownership before mutations
- MongoDB query filters prevent NoSQL injection

### **Environment Variables**

- Secrets stored in `.env.local` (gitignored)
- Production secrets managed via hosting platform (Vercel, Railway)
- Never commit API keys to version control

### **Authentication**

- bcrypt password hashing
- Secure HTTP-only cookies
- CSRF protection via Better Auth

---

## 📦 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add GROQ_API_KEY
vercel env add NEXT_PUBLIC_BETTER_AUTH_URL
vercel env add BETTER_AUTH_SECRET
```

### **Environment Variables for Production**

Ensure these are set in your hosting platform:

- `MONGODB_URI`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_BETTER_AUTH_URL` (should be your production URL)
- `BETTER_AUTH_SECRET`

---
