# GymNotes Documentation Index

Welcome to GymNotes! This directory contains comprehensive documentation for your React Native fitness tracking application.

## 📚 Quick Navigation

### Getting Started
- **Start here:** [`INDEX.md`](INDEX.md) - Master index and complete navigation
- **Setup guide:** [`PHASE1_CHECKLIST.md`](PHASE1_CHECKLIST.md) - Step-by-step setup (includes TanStack Query!)
- **Full roadmap:** [`plan-gymNotes.prompt.md`](plan-gymNotes.prompt.md) - Complete 8-phase implementation plan (with TanStack Query)

### Core Documentation (in .github/)

#### 🏛️ Architecture & Design
- [`.github/ARCHITECTURE.md`](../.github/ARCHITECTURE.md) - System overview, core principles, and technology stack

#### 🗄️ Database & Data Model
- [`.github/DATABASE_SCHEMA.md`](../.github/DATABASE_SCHEMA.md) - Complete schema, relationships, TypeScript interfaces

#### 📁 Project Organization  
- [`.github/FOLDER_STRUCTURE.md`](../.github/FOLDER_STRUCTURE.md) - Directory layout, naming conventions, file organization

#### ⚙️ Setup & Configuration
- [`.github/TECH_STACK.md`](../.github/TECH_STACK.md) - Dependencies, installation, NativeWind setup, Firebase config, **TanStack Query setup** (NEW!)

#### 💻 Development Standards
- [`.github/GUIDELINES.md`](../.github/GUIDELINES.md) - Code quality, patterns, component structure, **TanStack Query patterns** (NEW!), best practices

---

## 🚀 Quick Start

### Phase 1: Setup (Do This First!)

1. Install dependencies (including TanStack Query):
   ```bash
   npm install nativewind tailwindcss zustand immer firebase @tanstack/react-query
   ```

2. Create folder structure:
   ```bash
   mkdir -p src/{components/{ui,layout,common},stores,services,hooks,types,utils,config,constants}
   ```

3. Set up configuration files (templates in `.github/TECH_STACK.md`):
   - `tailwind.config.js`
   - Update `babel.config.js`
   - Update `tsconfig.json`
   - `.env.example` and `.env.local`
   - **`src/config/queryClient.ts`** - TanStack Query setup (NEW!)

4. Configure Firebase:
   - Create project at [firebase.google.com](https://firebase.google.com)
   - Copy credentials to `.env.local`
   - Create `src/config/firebase.ts`

5. Setup TanStack Query:
   - Create `src/config/queryClient.ts`
   - Wrap app with QueryClientProvider
   - See `.github/TECH_STACK.md` for details

6. Start development:
   ```bash
   npm start
   ```

**Estimated Time:** 2-3 hours

---

## 📖 Document Descriptions

### `INDEX.md` (This folder)
**Master index** - Complete navigation guide, reading recommendations, cross-references. Start here!

### `DOCS.md` (This file)
**Quick reference guide** - Overview and fast links to all documentation.

### `PHASE1_CHECKLIST.md` (This folder)
**Complete setup guide** - Step-by-step Phase 1 implementation with verification. Includes TanStack Query configuration!

### `plan-gymNotes.prompt.md` (This folder)
**Implementation roadmap** - 8 phases with detailed breakdown, time estimates, code templates. **Updated with TanStack Query integration!**

### `.github/ARCHITECTURE.md`
**System design** - Core principles, technology stack overview, database architecture, key features, and next steps.

### `.github/DATABASE_SCHEMA.md`
**Data model** - Complete schema definitions, Firestore structure, entity relationships, design rationale, and future extensions.

### `.github/FOLDER_STRUCTURE.md`
**Project organization** - Directory structure with detailed guidelines for each folder, file naming conventions, import aliases, and growing tips.

### `.github/TECH_STACK.md`
**Setup & configuration** - Dependencies, installation steps, NativeWind configuration, Firebase setup, **TanStack Query configuration** (NEW!), development workflow, and troubleshooting.

### `.github/GUIDELINES.md`
**Code standards** - TypeScript usage, component structure, NativeWind styling, Zustand patterns, **TanStack Query patterns** (NEW!), Firebase services, custom hooks, error handling, naming conventions, and performance optimization.

---

## 🎯 What's New: TanStack Query Integration

**TanStack Query** is a powerful server state management library that:
- Manages Firebase data caching
- Handles automatic synchronization
- Provides background refetching
- Supports offline scenarios
- Deduplicates requests
- Manages loading/error states automatically

**Key Files:**
- `src/config/queryClient.ts` - Query client configuration
- `src/services/queryKeys.ts` - Centralized query key factory
- `src/hooks/useGetPlans.ts`, `useCreatePlan.ts`, etc. - Query hooks

**Learn More:**
- See `plan-gymNotes.prompt.md` for integration overview
- See `.github/GUIDELINES.md` section 6 for patterns
- See `.github/TECH_STACK.md` for setup

---

## 🎯 Implementation Phases (Updated)

| Phase | Duration | Focus |
|-------|----------|-------|
| 1 | 2-3 hrs | Foundation & Setup (+ TanStack Query) |
| 2 | 4-6 hrs | Core Components |
| 3 | 2-3 hrs | Types & Schema |
| 4 | 4-5 hrs | Query Service Layer (NEW!) |
| 5 | 2-3 hrs | Zustand for UI State |
| 6 | 5-6 hrs | Query Hooks + Custom Hooks |
| 7 | 10-12 hrs | Main Screens (with TanStack Query) |
| 8 | 5-7 hrs | Polish & Optimization |
| **Total** | **34-45 hrs** | **Complete App** |

---

## 🚀 Reading Order Recommendations

### For Complete Understanding (1 hour)
1. Read this file (5 min)
2. Read `plan-gymNotes.prompt.md` (20 min) - See TanStack Query integration
3. Read `.github/ARCHITECTURE.md` (10 min)
4. Read `.github/DATABASE_SCHEMA.md` (15 min)
5. Skim `.github/GUIDELINES.md` TanStack Query section (10 min)

### For Immediate Setup (2-3.5 hours)
1. Read `PHASE1_CHECKLIST.md` (15 min)
2. Follow `PHASE1_CHECKLIST.md` exactly (2-3 hours)
3. Test development environment
4. Verify TanStack Query is configured

### For Development (35-45 min)
1. Read `.github/GUIDELINES.md` completely (35 min)
2. Pay special attention to TanStack Query patterns section
3. Review code examples
4. Ready to code!

---

## 📊 Tech Stack Summary

```
Framework:        React Native 0.81.5 + Expo 54.0.32
Styling:          NativeWind (Tailwind CSS)
UI State:         Zustand 4.4.1
Server State:     TanStack Query 5.0.0+ ⭐ NEW!
Backend:          Firebase (Firestore + Auth)
Language:         TypeScript (strict mode)
```

### Two Types of State

**Zustand (UI State)**
- Modal visibility
- Search filters
- Theme selection
- Navigation state

**TanStack Query (Server State)**
- Cached workout plans
- User sessions
- Exercise library
- All Firebase data

---

## 🔗 Cross-Reference Links

| Need | Document |
|------|----------|
| Overview | `INDEX.md` |
| Quick links | This file (`DOCS.md`) |
| Step-by-step setup | `PHASE1_CHECKLIST.md` |
| Full roadmap | `plan-gymNotes.prompt.md` |
| System design | `.github/ARCHITECTURE.md` |
| Database | `.github/DATABASE_SCHEMA.md` |
| File organization | `.github/FOLDER_STRUCTURE.md` |
| Configuration | `.github/TECH_STACK.md` |
| Code standards | `.github/GUIDELINES.md` |
| TanStack Query setup | `.github/TECH_STACK.md` section 7 |
| TanStack Query patterns | `.github/GUIDELINES.md` section 6 |

---

## ✅ Verification Checklist

Before you start coding, ensure:
- [ ] Read `INDEX.md` or this file
- [ ] Understand TanStack Query is included
- [ ] Ready to follow `PHASE1_CHECKLIST.md`
- [ ] Familiar with tech stack
- [ ] Know where documentation is

---

## 💡 Pro Tips

1. **Start with `INDEX.md`** - Complete navigation and reading guide
2. **Follow `PHASE1_CHECKLIST.md` exactly** - Don't skip TanStack Query steps!
3. **Keep `.github/GUIDELINES.md` open** while coding - Reference TanStack Query patterns
4. **Review `plan-gymNotes.prompt.md`** for big picture - Understand query integration
5. **Check `.github/TECH_STACK.md`** for configuration details

---

## 🚀 Next Steps

1. **Read this file** (you're doing it!) ✓
2. **Open `INDEX.md`** - Master navigation guide
3. **Read `PHASE1_CHECKLIST.md`** - Understand setup
4. **Follow `PHASE1_CHECKLIST.md`** - Execute setup (2-3 hours)
5. **Read `.github/GUIDELINES.md`** - Learn code standards
6. **Start building!** - Follow `plan-gymNotes.prompt.md`

---

## 📞 Need Help?

| Question | Answer |
|----------|--------|
| Where do I start? | Open `INDEX.md` |
| How do I setup? | Follow `PHASE1_CHECKLIST.md` |
| What's TanStack Query? | See `plan-gymNotes.prompt.md` |
| Where's my code go? | See `.github/FOLDER_STRUCTURE.md` |
| Code standards? | See `.github/GUIDELINES.md` |
| TanStack Query patterns? | See `.github/GUIDELINES.md` section 6 |
| Setup issue? | See `.github/TECH_STACK.md` troubleshooting |

---

## 🎊 You're Ready!

All documentation is in the `docs/` folder and `.github/` folder.

**Next:** Open [`INDEX.md`](INDEX.md) for complete navigation!

---

**Happy coding! 🏋️💪**

*Everything you need to build a professional React Native fitness app with TanStack Query is documented.*

