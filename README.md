# 🚀 AI-Powered Job Application Tracker

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Coverage](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge) ![AI Engine](https://img.shields.io/badge/AI%20Engine-Groq%20Llama%203-blueviolet?style=for-the-badge)

A **production-grade**, full-stack career management platform that combines advanced job application tracking with AI-powered technical interview simulation. Built with **Next.js 16**, **TypeScript**, and **Groq (Llama-3.3-70b)**, featuring enterprise-level testing infrastructure and automated CI/CD.

---

## 🎯 Core Features

### 🤖 AI Career Lab - Technical Interview Simulator

The crown jewel of this platform is a sophisticated AI interview system that simulates real technical screening interviews.

#### **Intelligent Interview Engine**

- **Advanced AI Persona**: Powered by Groq's Llama-3.3-70b model, the system adopts a "Senior Technical Lead" persona with human-like conversation flow
- **Adaptive Difficulty Scaling**: Automatically adjusts question complexity based on the candidate's experience level:
  - **Fresher Mode**: Focuses on fundamentals (React basics, JavaScript core concepts, CSS fundamentals)
  - **Senior Mode**: Emphasizes system design, architectural patterns, and production debugging scenarios
- **Real-time Streaming**: Leverages Groq's ultra-fast LPU (Language Processing Unit) for near-instant responses, creating a natural conversation rhythm
- **Context-Aware Follow-ups**: The AI analyzes previous answers to generate relevant follow-up questions, mimicking real interviewer behavior

#### **Strict Evaluation Protocol**

- **Brutal Scoring System (0-10 scale)**:
  - **0.0-1.5**: Low-effort responses, gibberish, or evasive answers (e.g., single-word replies like "yes", "no", "I don't know")
  - **2.0-4.5**: Significant knowledge gaps, vague explanations, or incorrect technical facts
  - **5.0-7.0**: Competent foundational knowledge but lacks architectural depth
  - **8.0-10.0**: Mastery-level responses with precise terminology and production insight
- **Anti-Hallucination Logic**: Penalizes candidates who provide technically incorrect information or fabricate answers
- **Non-Negotiable Standards**: The AI enforces strict theoretical question-only policy—no live coding tasks, ensuring focus on conceptual understanding

#### **Comprehensive Feedback Reports**

After the interview concludes, candidates receive a detailed markdown report featuring:

- **Overall Score**: Numerically quantified performance metric
- **Gap Analysis**: Specific technical areas requiring improvement (e.g., "Event Loop Internals", "CSS Grid vs Flexbox Trade-offs")
- **Actionable Advice**: Concrete next steps for skill development, including recommended resources and focus areas
- **Experience-Level Contextualization**: Feedback is tailored to whether you're a junior, mid-level, or senior engineer

#### **Technical Implementation Highlights**

- **Groq API Integration**: OpenAI-compatible REST endpoints with streaming support
- **Robust Error Handling**: Graceful fallback to score 0.0 on API failures (429 rate limits, 500 server errors)
- **JSON Extraction Logic**: Advanced regex-based parsing to handle markdown-wrapped responses from the AI
- **Session State Management**: React state machine tracks interview progression through 6 phases (intro + 5 technical questions)

---

### 📋 Advanced Job Application Tracking

A feature-rich Kanban system designed for managing hundreds of applications across multiple stages.

#### **Visual Kanban Board**

- **Drag-and-Drop Pipeline**: Built with `@dnd-kit` for smooth, accessible drag interactions
- **Five Default Stages**:
  1. **Wish List**: Companies you're targeting but haven't applied to yet
  2. **Applied**: Applications submitted and awaiting response
  3. **Interviewing**: Active interview processes
  4. **Offer**: Received job offers
  5. **Rejected**: Closed opportunities (for reflection and learning)
- **Real-time Optimistic Updates**: UI updates instantly before server confirmation, then rolls back on failure
- **Automatic Order Management**: Server-side logic maintains card order integrity when dragging across columns

#### **Rich Application Cards**

Each job card displays:

- **Core Information**: Company name, position title, location
- **Financial Details**: Salary range (validated with strict regex: `$120k`, `100000`, `90k-110k`)
- **Metadata**: Application URL, custom tags (e.g., "React", "Remote"), notes
- **Timestamps**: Creation and last update dates
- **Status Badges**: Visual indicators for application stage
- **Quick Actions**: Edit, Delete, and Launch AI Interview buttons

#### **Intelligent Search & Filtering**

- **Debounced Search**: 300ms delay prevents excessive re-renders during typing
- **Multi-Field Matching**: Searches across company name, position, location, and tags simultaneously
- **Real-time Results**: Instant filtering without page reloads
- **Persistent State**: Search terms survive page navigation

#### **Data Export**

- **One-Click CSV Export**: Generates timestamped CSV files with all application data
- **Formatted Output**: Includes company, position, status, location, salary, tags, notes, and description
- **Excel-Compatible**: Uses `papaparse` for proper CSV formatting

---

### 🛡️ Enterprise-Grade Security & Auth

#### **Modern Authentication**

- **Better Auth Integration**: Leverages the latest Better Auth v1.4+ with MongoDB adapter
- **Email/Password Flow**: Secure credential-based authentication with bcrypt hashing
- **Session Management**: Cookie-based sessions with 1-hour cache for performance
- **Auto-Board Initialization**: Database hook automatically creates a "Job Hunt" board for new users

#### **Authorization Middleware**

- **Server Action Protection**: Every mutation verifies session ownership
- **Row-Level Security**: Database queries filter by `userId` to prevent unauthorized access
- **Board Ownership Checks**: Validates user owns the board before allowing modifications

---

### 🎨 Premium UI/UX Design

#### **Architectural Design System**

- **Custom Color Palette**: "Obsidian & Lime" theme
  - `--color-neutral-obsidian`: `#0a0a0b` (Deep blacks)
  - `--color-primary-500`: `#84cc16` (Electric Lime accent)
  - `--color-neutral-silver`: `#a1a1aa` (Muted text)
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur and subtle borders
- **Micro-Interactions**: Hover states, scale transformations, glow effects on interactive elements
- **Responsive Grid System**: Mobile-first design with breakpoints at `sm`, `md`, `lg`, `xl`

#### **Typography**

- **Primary Font**: Inter (body text, optimal readability)
- **Display Font**: Outfit (headings, high impact)
- **System Font Fallback**: Ensures consistency across all platforms

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

```bash
npm run seed:jobs
```

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
```

### **Environment Variables for Production**

Ensure these are set in your hosting platform:

- `MONGODB_URI`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_BETTER_AUTH_URL` (should be your production URL)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 🙏 Acknowledgments

- **Groq** for providing ultra-fast AI inference
- **Vercel** for Next.js and hosting platform
- **Radix UI** for accessible component primitives
- **shadcn/ui** for design inspiration

---

**Built with precision and care. Ready for production.** ⚡
