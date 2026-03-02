# GymNotes Documentation Index

Welcome to GymNotes! This directory contains comprehensive documentation for your React Native fitness tracking application.

## 📚 Quick Navigation

### Getting Started
- **Start here:** [`.github/README.md`](.github/README.md) - Quick reference and next steps
- **Full roadmap:** [`plan-gymNotes.prompt.md`](plan-gymNotes.prompt.md) - Complete 8-phase implementation plan

### Core Documentation

#### 🏛️ Architecture & Design
- [`ARCHITECTURE.md`](.github/ARCHITECTURE.md) - System overview, core principles, and technology stack

#### 🗄️ Database & Data Model
- [`DATABASE_SCHEMA.md`](.github/DATABASE_SCHEMA.md) - Complete schema, relationships, TypeScript interfaces

#### 📁 Project Organization  
- [`FOLDER_STRUCTURE.md`](.github/FOLDER_STRUCTURE.md) - Directory layout, naming conventions, file organization

#### ⚙️ Setup & Configuration
- [`TECH_STACK.md`](.github/TECH_STACK.md) - Dependencies, installation, NativeWind setup, Firebase config

#### 💻 Development Standards
- [`GUIDELINES.md`](.github/GUIDELINES.md) - Code quality, patterns, component structure, best practices

---

## 🚀 Quick Start

### Phase 1: Setup (Do This First!)

1. Install dependencies:
   ```bash
   npm install nativewind tailwindcss zustand immer firebase
   ```

2. Create folder structure:
   ```bash
   mkdir -p src/{components/{ui,layout,common},stores,services,hooks,types,utils,config,constants}
   ```

3. Set up configuration files (templates in `TECH_STACK.md`):
   - `tailwind.config.js`
   - Update `babel.config.js`
   - Update `tsconfig.json`
   - `.env.example` and `.env.local`

4. Configure Firebase:
   - Create project at [firebase.google.com](https://firebase.google.com)
   - Copy credentials to `.env.local`
   - Create `src/config/firebase.ts`

5. Start development:
   ```bash
   npm start
   ```

**Estimated Time:** 2-3 hours

---

## 📖 Document Descriptions

### `.github/README.md`
**Quick reference guide** - Overview of what was created, immediate action items, and documentation navigation.

### `plan-gymNotes.prompt.md`
**Complete implementation roadmap** - 8 phases with detailed breakdown, time estimates, and code templates.

### `ARCHITECTURE.md`
**System design** - Core principles, technology stack overview, database architecture, key features, and next steps.

### `DATABASE_SCHEMA.md`
**Data model** - Complete schema definitions, Firestore structure, entity relationships, design rationale, and future extensions.

### `FOLDER_STRUCTURE.md`
**Project organization** - Directory structure with detailed guidelines for each folder, file naming conventions, import aliases, and growing tips.

### `TECH_STACK.md`
**Setup & configuration** - Dependencies, installation steps, NativeWind configuration, Firebase setup, development workflow, and troubleshooting.

### `GUIDELINES.md`
**Code standards** - TypeScript usage, component structure, NativeWind styling, Zustand patterns, Firebase services, custom hooks, error handling, naming conventions, and performance optimization.

---

## 🎯 Implementation Phases

| Phase | Duration | Focus |
|-------|----------|-------|
| 1 | 2-3 hrs | Foundation & Setup |
| 2 | 4-6 hrs | Core Components |
| 3 | 2-3 hrs | Types & Schema |
| 4 | 3-4 hrs | State Management |
| 5 | 6-8 hrs | Firebase Services |
| 6 | 4-5 hrs | Custom Hooks |
| 7 | 10-12 hrs | Main Screens |
| 8 | 4-6 hrs | Polish & Optimization |
| **Total** | **35-45 hrs** | **Complete App** |

---

## 🛠️ Technology Stack

```
Frontend:        React Native 0.81.5 + Expo 54.0.32
Routing:         Expo Router (file-based)
Styling:         NativeWind (Tailwind CSS)
State Mgmt:      Zustand 4.4.1
Backend:         Firebase 9.21.0 (Auth + Firestore)
Language:        TypeScript 5.9.2 (strict mode)
```

---

## 📊 Database Architecture

### Two-Layer System

**Template Layer** (Plan Definition)
- PLAN → DAY_PLAN → DAY_PLAN_EXERCISE → EXERCISE

**Execution Layer** (Workout Tracking)
- WORKOUT_SESSION → WORKOUT_SET

This separation enables reusable plans with accurate history tracking and progression analysis.

---

## 🎨 Key Principles

1. **Type Safety First** - Strict TypeScript throughout
2. **Component Reusability** - Build isolated, composable components
3. **Clean Separation** - Services → Hooks → Components → Zustand
4. **NativeWind Styling** - Use className for all styling
5. **Minimal State** - Only UI state in Zustand
6. **Firebase First** - Treat Firestore as source of truth

---

## 📋 File Locations

| Type | Location | Example |
|------|----------|---------|
| Screens/Pages | `app/` | `app/(tabs)/plans.tsx` |
| Components | `src/components/` | `src/components/ui/Button.tsx` |
| State Stores | `src/stores/` | `src/stores/planStore.ts` |
| Firebase Ops | `src/services/` | `src/services/plans.ts` |
| Data Hooks | `src/hooks/` | `src/hooks/usePlans.ts` |
| TypeScript Types | `src/types/` | `src/types/schema.ts` |
| Utilities | `src/utils/` | `src/utils/formatters.ts` |
| Config | `src/config/` | `src/config/firebase.ts` |
| Constants | `src/constants/` | `src/constants/muscleGroups.ts` |

---

## ✅ Pre-Development Checklist

- [ ] Read `.github/README.md` (5 min)
- [ ] Review `plan-gymNotes.prompt.md` Phase 1 (15 min)
- [ ] Follow `TECH_STACK.md` Setup section (2 hrs)
- [ ] Create folder structure (15 min)
- [ ] Test development environment (30 min)
- [ ] Read `GUIDELINES.md` for code standards (20 min)
- [ ] Ready to start Phase 2!

---

## 🔗 Cross-References

Each document references others for deeper information:

- **Need setup help?** → `TECH_STACK.md`
- **Where to put files?** → `FOLDER_STRUCTURE.md`
- **Code patterns?** → `GUIDELINES.md`
- **Database details?** → `DATABASE_SCHEMA.md`
- **Overall approach?** → `ARCHITECTURE.md`
- **Full roadmap?** → `plan-gymNotes.prompt.md`

---

## 💡 Usage Tips

1. **Bookmark this file** for quick access to all docs
2. **Read Phase 1** of the plan first
3. **Reference GUIDELINES.md** while coding
4. **Check FOLDER_STRUCTURE.md** when adding new files
5. **Consult DATABASE_SCHEMA.md** when creating types

---

## 📞 Quick Links

- **Firebase Console:** https://console.firebase.google.com
- **React Native Docs:** https://reactnative.dev/docs
- **Expo Docs:** https://docs.expo.dev
- **NativeWind Docs:** https://nativewind.dev
- **Zustand Docs:** https://github.com/pmndrs/zustand
- **TypeScript Docs:** https://www.typescriptlang.org/docs

---

**Ready? Start with Phase 1 in `plan-gymNotes.prompt.md` or read the quick reference in `.github/README.md`**

Happy building! 🏋️💪

