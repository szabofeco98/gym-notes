# GymNotes Project Kickoff Plan

## Project Overview

**GymNotes** is a React Native fitness tracking application built with Expo. It enables users to create reusable workout plans, execute them, and track performance metrics. The architecture separates planning (template layer) from execution (session layer) for clean history tracking and progression analysis.

---

## Technology Stack

### Core Framework
- **React Native** 0.81.5 - Mobile app framework
- **Expo** ~54.0.32 - Development platform
- **Expo Router** ~6.0.22 - File-based routing
- **React** 19.1.0 - UI library
- **TypeScript** ~5.9.2 - Static typing with strict mode

### Styling & UI
- **NativeWind** ^4.0.1 - Tailwind CSS for React Native
- **Tailwind CSS** ^3.3.0 - Utility-first CSS framework

### State Management & Data Fetching
- **Zustand** ^4.4.1 - Lightweight global state management
- **Immer** ^10.0.0 - Immutable state updates
- **TanStack Query** ^5.0.0+ - Server state management (data fetching, caching, synchronization)

### Backend & Services
- **Firebase** ^9.21.0 - Backend as a service
  - Authentication (Email/Password, Google Sign-In)
  - Firestore (Real-time database)
  - Cloud Storage (future: form videos/images)

### Development & Quality
- **ESLint** ^9.25.0 - Code linting
- **TypeScript** ~5.9.2 - Strict type checking

---

## Technology Stack Breakdown

### Zustand vs TanStack Query: Clear Separation

**Zustand** - Global UI State Management
- User preferences (theme, modal visibility)
- Navigation state
- UI temporary state (filters, search input)
- Small amounts of app-wide data

**TanStack Query** - Server State Management
- Cached data from Firebase
- Automatic background refetching
- Offline support
- Request deduplication
- Automatic garbage collection

**Why Both?**
- Zustand handles UI state (fast, minimal)
- TanStack Query handles data state (powerful, resilient)
- Clean separation of concerns
- Each tool does one thing well

---

## Database Schema Summary

### Two-Layer Architecture

**Template Layer** (Plan Definition)
- `PLAN` - Workout program/split
- `DAY_PLAN` - Specific day within a plan
- `EXERCISE` - Master exercise list
- `DAY_PLAN_EXERCISE` - Exercise assignment to days

**Execution Layer** (Workout Tracking)
- `WORKOUT_SESSION` - One completed workout
- `WORKOUT_SET` - Individual set performance (weight, reps, RPE)

### Key Design Decision

Separating template from execution enables:
- Reusable workout plans
- Accurate history/progression tracking
- Performance comparison across sessions
- Clean architecture for future analytics

---

## Project Folder Structure

```
GymNotes/
├── docs/                       # 📚 Documentation (NEW)
│   ├── INDEX.md
│   ├── DOCS.md
│   ├── PHASE1_CHECKLIST.md
│   └── plan-gymNotes.prompt.md
│
├── .github/                    # Implementation guidelines
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── FOLDER_STRUCTURE.md
│   ├── TECH_STACK.md
│   └── GUIDELINES.md
│
├── app/                        # Expo Router pages (file-based routing)
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (tabs)/                 # Tab navigation group
│   │   ├── plans.tsx
│   │   ├── today.tsx
│   │   ├── history.tsx
│   │   └── profile.tsx
│   ├── (modal)/                # Modal screens
│   └── (auth)/                 # Auth screens
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base UI (Button, Input, Card, etc.)
│   │   ├── layout/             # Layout wrappers
│   │   └── common/             # Feature components
│   ├── stores/                 # Zustand state stores (UI state only)
│   ├── services/               # Firebase operations & query keys
│   ├── hooks/                  # TanStack Query hooks + custom hooks
│   ├── types/                  # TypeScript interfaces
│   ├── utils/                  # Helper functions
│   ├── config/                 # Configuration
│   └── constants/              # Constants & enums
│
└── assets/                     # Static images, icons, fonts
```

---

## Implementation Roadmap

### Phase 1: Foundation & Setup (Start Here)

**Goal**: Set up development environment and project structure

#### 1.1 Install Dependencies
- [ ] `npm install nativewind tailwindcss zustand immer firebase @tanstack/react-query`
- [ ] Verify all dependencies in package.json

#### 1.2 Configure Development Tools
- [ ] Create `tailwind.config.js` with custom theme
- [ ] Update `babel.config.js` for NativeWind
- [ ] Update `tsconfig.json` with path aliases
- [ ] Update `.gitignore` for `.env.local`

#### 1.3 Setup Firebase
- [ ] Create Firebase project at console.firebase.google.com
- [ ] Enable Authentication (Email/Password)
- [ ] Create Firestore database
- [ ] Copy credentials to `.env.local`
- [ ] Create `src/config/firebase.ts`

#### 1.4 Setup TanStack Query
- [ ] Create `src/config/queryClient.ts` with QueryClient configuration
- [ ] Create `QueryClientProvider` wrapper in root layout
- [ ] Configure defaults (staleTime, gcTime, retry logic)

#### 1.5 Create Folder Structure
- [ ] Create all directories in `src/`
- [ ] Create `src/types/`, `src/stores/`, `src/services/`, `src/hooks/`, etc.
- [ ] Create barrel exports (index.ts files)

**Time Estimate**: 2-3 hours  
**Deliverable**: Working development environment with TanStack Query

---

### Phase 2: Core Reusable Components

**Goal**: Build foundational UI component library with NativeWind

#### 2.1 Base UI Components
- [ ] `Button.tsx` - Primary, secondary, danger variants
- [ ] `Input.tsx` - Text input with validation
- [ ] `Card.tsx` - Container component
- [ ] `Badge.tsx` - Tag/label component
- [ ] `Modal.tsx` - Modal dialog
- [ ] `Loader.tsx` - Loading indicator
- [ ] `Icon.tsx` - Icon wrapper with Expo Vector Icons

#### 2.2 Layout Components
- [ ] `SafeAreaView.tsx` - Safe area wrapper
- [ ] `Container.tsx` - Content container
- [ ] Export from `src/components/ui/index.ts`

#### 2.3 Feature Components
- [ ] `ExerciseCard.tsx` - Display exercise with metadata
- [ ] `PlanCard.tsx` - Display workout plan
- [ ] `WorkoutSetForm.tsx` - Form to log sets
- [ ] Export from `src/components/common/index.ts`

#### 2.4 Styling System
- [ ] Define custom colors in tailwind.config.js
- [ ] Create spacing scale (xs, sm, md, lg, xl)
- [ ] Document color/spacing system in GUIDELINES.md

**Time Estimate**: 4-6 hours  
**Deliverable**: Component library with Storybook-like showcase screen

---

### Phase 3: Type System & Database Schema

**Goal**: Define TypeScript interfaces matching Firestore schema

#### 3.1 Create Type Definitions
- [ ] `src/types/schema.ts` - Database entities
  - `Plan`, `DayPlan`, `Exercise`, `DayPlanExercise`
  - `WorkoutSession`, `WorkoutSet`
- [ ] `src/types/firestore.ts` - Firestore helpers (Timestamp, etc.)
- [ ] `src/types/ui.ts` - Component prop interfaces
- [ ] `src/types/api.ts` - Request/response types
- [ ] Export all from `src/types/index.ts`

#### 3.2 Create Constants
- [ ] `src/constants/muscleGroups.ts` - Muscle group enum/list
- [ ] `src/constants/exercises.ts` - Default exercise library
- [ ] Add to `src/constants/index.ts`

**Time Estimate**: 2-3 hours  
**Deliverable**: Type-safe schema interfaces

---

### Phase 4: Query Service Layer

**Goal**: Implement Firebase services with TanStack Query

#### 4.1 Create Query Keys
- [ ] `src/services/queryKeys.ts` - Centralized query key factory
  - Plans queries
  - Workouts queries
  - Exercises queries
  - Sessions queries

#### 4.2 Firebase Services
- [ ] `src/services/auth.ts` - Authentication service
- [ ] `src/services/plans.ts` - Plans CRUD + query functions
- [ ] `src/services/workouts.ts` - Workouts CRUD + query functions
- [ ] `src/services/exercises.ts` - Exercises queries

#### 4.3 Error Handling
- [ ] Implement error wrapper for Firebase errors
- [ ] Create meaningful error messages
- [ ] Integrate with TanStack Query error handling

**Time Estimate**: 4-5 hours  
**Deliverable**: Query-ready service layer

---

### Phase 5: State Management (Zustand + Zustand UI)

**Goal**: Implement UI state with Zustand

#### 5.1 Create Stores
- [ ] `src/stores/authStore.ts` - User authentication state
- [ ] `src/stores/uiStore.ts` - UI state (modals, notifications)
- [ ] `src/stores/filterStore.ts` - Filter/search state

#### 5.2 Configure Zustand
- [ ] Use immer middleware for immutable updates
- [ ] Add devtools for debugging (optional)
- [ ] Export all stores from `src/stores/index.ts`

**Time Estimate**: 2-3 hours  
**Deliverable**: Zustand stores for UI state

---

### Phase 6: Custom Hooks (TanStack Query + Custom)

**Goal**: Create query hooks and custom logic hooks

#### 6.1 Query Hooks (TanStack Query)
- [ ] `src/hooks/useGetPlans.ts` - Fetch user plans
- [ ] `src/hooks/useGetPlanDetails.ts` - Fetch specific plan with days
- [ ] `src/hooks/useGetWorkoutHistory.ts` - Fetch completed workouts
- [ ] `src/hooks/useGetExercises.ts` - Fetch exercises
- [ ] `src/hooks/useCreatePlan.ts` - Mutation for creating plan
- [ ] `src/hooks/useStartSession.ts` - Mutation for starting workout

#### 6.2 Custom Hooks
- [ ] `src/hooks/useAuth.ts` - Authentication logic
- [ ] `src/hooks/useFilteredPlans.ts` - Filter plans on client
- [ ] `src/hooks/useWorkoutSession.ts` - Active session logic

**Time Estimate**: 5-6 hours  
**Deliverable**: Data layer with automatic caching & sync

---

### Phase 7: Main Application Screens

**Goal**: Build main user-facing screens with TanStack Query

#### 7.1 Authentication Screens (`app/(auth)/`)
- [ ] `login.tsx` - Email/password login
- [ ] `signup.tsx` - User registration
- [ ] `forgot-password.tsx` - Password reset

#### 7.2 Tab Navigation (`app/(tabs)/`)
- [ ] `plans.tsx` - List all workout plans (with useGetPlans)
- [ ] `today.tsx` - Today's workout session (with useStartSession)
- [ ] `history.tsx` - Past workout history (with useGetWorkoutHistory)
- [ ] `profile.tsx` - User profile settings

#### 7.3 Detail Screens (`app/(modal)/`)
- [ ] `plan-details.tsx` - Plan breakdown with exercises (with useGetPlanDetails)
- [ ] `create-plan.tsx` - Create/edit plan (with useCreatePlan)
- [ ] `start-session.tsx` - Begin workout
- [ ] `add-set.tsx` - Log exercise set

#### 7.4 Screen Features
- [ ] Navigation between screens
- [ ] Loading states from TanStack Query
- [ ] Error handling & retry logic
- [ ] Pull-to-refresh using queryClient.refetchQueries()

**Time Estimate**: 10-12 hours  
**Deliverable**: Working app with all screens

---

### Phase 8: Polish & Optimization

**Goal**: Performance, UX refinement, production readiness

#### 8.1 TanStack Query Optimization
- [ ] Configure staleTime and gcTime appropriately
- [ ] Implement background refetching
- [ ] Setup offline persistence (optional)
- [ ] Monitor query performance

#### 8.2 Performance
- [ ] Implement `memo()` for expensive components
- [ ] Optimize FlatList rendering
- [ ] Profile with React DevTools
- [ ] Reduce re-renders

#### 8.3 User Experience
- [ ] Add animations with Reanimated (already installed)
- [ ] Haptic feedback for interactions (Expo Haptics available)
- [ ] Toast notifications for actions
- [ ] Proper loading skeletons

#### 8.4 Error Handling
- [ ] Global error boundary
- [ ] Fallback UI for network errors
- [ ] Offline detection
- [ ] Error logging (optional: Sentry)

#### 8.5 Testing
- [ ] Manual testing on Android/iOS
- [ ] Test authentication flow
- [ ] Test data synchronization
- [ ] Test error scenarios

**Time Estimate**: 5-7 hours  
**Deliverable**: Production-ready app

---

## Quick Start Commands

```bash
# Install dependencies (including TanStack Query)
npm install
npm install nativewind tailwindcss zustand immer firebase @tanstack/react-query

# Start development
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Key Principles

1. **Type Safety First** - Strict TypeScript throughout
2. **Component Reusability** - Build isolated, composable UI components
3. **Clean Separation** - Services ↔ Queries ↔ Components ↔ Zustand
4. **NativeWind Styling** - Use className for all styling
5. **Minimal UI State** - Only UI state in Zustand
6. **Server State in TanStack Query** - All Firebase data cached and synchronized
7. **Firebase First** - Treat Firestore as source of truth

---

## Common Patterns to Follow

### Data Flow with TanStack Query
```
Firebase (Source of Truth)
  ↓
Services (CRUD operations)
  ↓
TanStack Query (Caching, sync, offline)
  ↓
Query Hooks (useGetPlans, useCreatePlan, etc.)
  ↓
Components (UI rendering)
  ↓
Zustand (UI state only: modals, filters, theme)
```

### Component Template with TanStack Query
```tsx
import { View, FlatList } from 'react-native';
import { useGetPlans } from '@/hooks';
import { PlanCard } from '@/components';

export const PlansScreen = () => {
  const { data: plans, isLoading, error } = useGetPlans();

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <FlatList
      data={plans}
      renderItem={({ item }) => <PlanCard plan={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
```

---

## Next Steps

1. **Start Phase 1** (Foundation & Setup)
   - Install dependencies (including TanStack Query)
   - Configure TanStack Query
   - Set up folder structure

2. **Reference Documentation**
   - `docs/PHASE1_CHECKLIST.md` - Step-by-step setup
   - `.github/TECH_STACK.md` - Detailed setup
   - `.github/GUIDELINES.md` - Code standards

3. **Build Incrementally**
   - Complete one phase before starting next
   - Test thoroughly after each phase
   - Commit working code frequently

---

## Questions or Issues?

Refer to the comprehensive documentation:
- **docs/INDEX.md** - Documentation index
- **docs/DOCS.md** - Quick reference
- **.github/ARCHITECTURE.md** - System design overview
- **.github/DATABASE_SCHEMA.md** - Data model details
- **.github/TECH_STACK.md** - Technology setup and config
- **.github/FOLDER_STRUCTURE.md** - Project organization
- **.github/GUIDELINES.md** - Code standards and patterns

