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

### State Management
- **Zustand** ^4.4.1 - Lightweight state management
- **Immer** ^10.0.0 - Immutable state updates

### Backend & Services
- **Firebase** ^9.21.0 - Backend as a service
  - Authentication (Email/Password, Google Sign-In)
  - Firestore (Real-time database)
  - Cloud Storage (future: form videos/images)

### Development & Quality
- **ESLint** ^9.25.0 - Code linting
- **TypeScript** ~5.9.2 - Strict type checking

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
├── .github/                    # Documentation (THIS)
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
│   ├── stores/                 # Zustand state stores
│   ├── services/               # Firebase operations
│   ├── hooks/                  # Custom React hooks
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
- [ ] `npm install nativewind tailwindcss zustand immer firebase`
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

#### 1.4 Create Folder Structure
- [ ] Create all directories in `src/`
- [ ] Create `src/types/`, `src/stores/`, `src/services/`, etc.
- [ ] Create barrel exports (index.ts files)

**Time Estimate**: 2-3 hours  
**Deliverable**: Working development environment

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

### Phase 4: State Management (Zustand Stores)

**Goal**: Implement global app state

#### 4.1 Create Stores
- [ ] `src/stores/authStore.ts` - User authentication state
  - `currentUser`, `isAuthenticated`, `setUser`, `logout`
- [ ] `src/stores/planStore.ts` - Workout plans state
  - `plans`, `selectedPlanId`, `setPlans`, `selectPlan`
- [ ] `src/stores/workoutStore.ts` - Active workout session
  - `currentSession`, `sets`, `addSet`, `updateSet`, `completeSession`
- [ ] `src/stores/exerciseStore.ts` - Exercise library
  - `exercises`, `filterByMuscleGroup`
- [ ] `src/stores/uiStore.ts` - UI state
  - `activeModal`, `notifications`, `openModal`, `closeModal`

#### 4.2 Configure Zustand
- [ ] Use immer middleware for immutable updates
- [ ] Add devtools for debugging (optional)
- [ ] Export all stores from `src/stores/index.ts`

**Time Estimate**: 3-4 hours  
**Deliverable**: Zustand stores ready for services

---

### Phase 5: Firebase Services Layer

**Goal**: Implement Firestore CRUD operations

#### 5.1 Authentication Service
- [ ] `src/services/auth.ts`
  - `signUp(email, password)`
  - `login(email, password)`
  - `logout()`
  - `getCurrentUser()`

#### 5.2 Plans Service
- [ ] `src/services/plans.ts`
  - `fetchPlans(userId)`
  - `createPlan(userId, plan)`
  - `updatePlan(userId, planId, updates)`
  - `deletePlan(userId, planId)`

#### 5.3 Day Plans Service
- [ ] `src/services/dayPlans.ts`
  - `fetchDayPlans(userId, planId)`
  - `createDayPlan(userId, planId, dayPlan)`
  - `reorderExercises(userId, planId, dayPlanId, exercises)`

#### 5.4 Workouts Service
- [ ] `src/services/workouts.ts`
  - `startSession(userId, dayPlanId)`
  - `addSet(userId, sessionId, set)`
  - `completeSession(userId, sessionId)`
  - `fetchSessions(userId, filters?)`

#### 5.5 Exercises Service
- [ ] `src/services/exercises.ts`
  - `fetchExercises()`
  - `searchExercises(query)`
  - `getExercisesByMuscleGroup(muscleGroup)`

#### 5.6 Error Handling
- [ ] Implement error wrapper for Firebase errors
- [ ] Create meaningful error messages
- [ ] Log errors for debugging

**Time Estimate**: 6-8 hours  
**Deliverable**: Full CRUD operations for all entities

---

### Phase 6: Custom Hooks

**Goal**: Create data fetching and logic hooks

#### 6.1 Authentication Hooks
- [ ] `src/hooks/useAuth.ts`
  - Returns: `{ user, loading, error, login, signup, logout }`
  - Combines auth service + auth store

#### 6.2 Plans Hooks
- [ ] `src/hooks/usePlans.ts`
  - Returns: `{ plans, loading, error, refetch }`
- [ ] `src/hooks/usePlanDetails.ts`
  - Returns: `{ plan, dayPlans, loading, error }`

#### 6.3 Workout Hooks
- [ ] `src/hooks/useWorkoutSession.ts`
  - Returns: `{ session, sets, addSet, completeSession, loading }`
- [ ] `src/hooks/useWorkoutHistory.ts`
  - Returns: `{ sessions, stats, loading, error }`

#### 6.4 Exercise Hooks
- [ ] `src/hooks/useExercises.ts`
  - Returns: `{ exercises, loading, error, search }`

**Time Estimate**: 4-5 hours  
**Deliverable**: Data layer ready for screens

---

### Phase 7: Main Application Screens

**Goal**: Build main user-facing screens

#### 7.1 Authentication Screens (`app/(auth)/`)
- [ ] `login.tsx` - Email/password login
- [ ] `signup.tsx` - User registration
- [ ] `forgot-password.tsx` - Password reset

#### 7.2 Tab Navigation (`app/(tabs)/`)
- [ ] `plans.tsx` - List all workout plans
- [ ] `today.tsx` - Today's workout session
- [ ] `history.tsx` - Past workout history
- [ ] `profile.tsx` - User profile settings

#### 7.3 Detail Screens (`app/(modal)/`)
- [ ] `plan-details.tsx` - Plan breakdown with exercises
- [ ] `create-plan.tsx` - Create/edit plan
- [ ] `start-session.tsx` - Begin workout
- [ ] `add-set.tsx` - Log exercise set

#### 7.4 Screen Features
- [ ] Navigation between screens
- [ ] Loading states on all screens
- [ ] Error handling & retry logic
- [ ] Pull-to-refresh for lists

**Time Estimate**: 10-12 hours  
**Deliverable**: Working app with all screens

---

### Phase 8: Polish & Optimization

**Goal**: Performance, UX refinement, production readiness

#### 8.1 Performance
- [ ] Implement `memo()` for expensive components
- [ ] Optimize FlatList rendering
- [ ] Profile with React DevTools
- [ ] Reduce re-renders

#### 8.2 User Experience
- [ ] Add animations with Reanimated (already installed)
- [ ] Haptic feedback for interactions (Expo Haptics available)
- [ ] Toast notifications for actions
- [ ] Proper loading skeletons

#### 8.3 Error Handling
- [ ] Global error boundary
- [ ] Fallback UI for network errors
- [ ] Offline detection
- [ ] Error logging (optional: Sentry)

#### 8.4 Testing
- [ ] Manual testing on Android/iOS
- [ ] Test authentication flow
- [ ] Test CRUD operations
- [ ] Test error scenarios

**Time Estimate**: 4-6 hours  
**Deliverable**: Production-ready app

---

## Quick Start Commands

```bash
# Install dependencies
npm install
npm install nativewind tailwindcss zustand immer firebase

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
3. **Clean Separation** - Services ↔ Hooks ↔ Components
4. **NativeWind Styling** - Use className for all styling
5. **Minimal State** - Only UI state in Zustand, data in hooks
6. **Firebase First** - Treat Firestore as source of truth

---

## Common Patterns to Follow

### Data Flow
```
Firebase (Source of Truth)
  ↓
Services (CRUD operations)
  ↓
Hooks (Data fetching + error handling)
  ↓
Components (UI rendering)
  ↓
Zustand (UI state management)
```

### Component Template
```tsx
// 1. Imports
import { View } from 'react-native';
import { useHook } from '@/hooks';
import { Component } from '@/components';

// 2. Props interface
interface Props {
  id: string;
  onPress: () => void;
}

// 3. Component function
export const MyScreen: React.FC<Props> = ({ id, onPress }) => {
  const { data, loading } = useHook(id);

  return (
    <View className="flex-1 bg-white">
      <Component data={data} />
    </View>
  );
};
```

---

## Next Steps

1. **Start Phase 1** (Foundation & Setup)
   - Install dependencies
   - Configure NativeWind, TypeScript, Firebase
   - Create folder structure

2. **Reference Documentation**
   - `.github/TECH_STACK.md` - Detailed setup
   - `.github/FOLDER_STRUCTURE.md` - Organization guidelines
   - `.github/GUIDELINES.md` - Code standards

3. **Build Incrementally**
   - Complete one phase before starting next
   - Test thoroughly after each phase
   - Commit working code frequently

---

## Questions or Issues?

Refer to the comprehensive documentation in `.github/`:
- **ARCHITECTURE.md** - System design overview
- **DATABASE_SCHEMA.md** - Data model details
- **TECH_STACK.md** - Technology setup and config
- **FOLDER_STRUCTURE.md** - Project organization
- **GUIDELINES.md** - Code standards and patterns

