# GymNotes Folder Structure & Organization Guidelines

## Project Root Structure

```
GymNotes/
├── .github/                      # Project documentation and guidelines
│   ├── ARCHITECTURE.md           # System architecture overview
│   ├── DATABASE_SCHEMA.md        # Database schema and relationships
│   ├── FOLDER_STRUCTURE.md       # This file
│   ├── TECH_STACK.md             # Technology setup and dependencies
│   └── GUIDELINES.md             # Coding standards and best practices
│
├── app/                          # Expo Router pages (file-based routing)
│   ├── _layout.tsx               # Root layout wrapper
│   ├── index.tsx                 # Home screen
│   ├── (tabs)/                   # Tab-based navigation group
│   │   ├── _layout.tsx           # Tab layout
│   │   ├── plans.tsx             # Workout plans screen
│   │   ├── today.tsx             # Today's workout screen
│   │   ├── history.tsx           # Workout history screen
│   │   └── profile.tsx           # User profile screen
│   │
│   ├── (modal)/                  # Modal screens group
│   │   ├── plan-details.tsx      # Plan detail view
│   │   ├── create-plan.tsx       # Create new plan
│   │   ├── start-session.tsx     # Start workout session
│   │   └── add-set.tsx           # Add set/exercise to session
│   │
│   └── (auth)/                   # Authentication screens group
│       ├── login.tsx
│       ├── signup.tsx
│       └── forgot-password.tsx
│
├── src/                          # Application source code (non-routing)
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base UI components (styled with NativeWind)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── index.ts          # Barrel export
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── SafeAreaView.tsx
│   │   │   ├── Container.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── common/               # Common feature components
│   │   │   ├── ExerciseCard.tsx
│   │   │   ├── WorkoutSetForm.tsx
│   │   │   ├── PlanListItem.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts              # Main components barrel export
│   │
│   ├── stores/                   # Zustand state management
│   │   ├── authStore.ts          # Authentication state
│   │   ├── planStore.ts          # Workout plans state
│   │   ├── workoutStore.ts       # Current workout session state
│   │   ├── exerciseStore.ts      # Exercise library state
│   │   ├── uiStore.ts            # UI state (modals, notifications)
│   │   └── index.ts              # Barrel export
│   │
│   ├── services/                 # External services integration
│   │   ├── firebase.ts           # Firebase config and initialization
│   │   ├── auth.ts               # Authentication service
│   │   ├── plans.ts              # Plans CRUD operations
│   │   ├── workouts.ts           # Workout session operations
│   │   ├── exercises.ts          # Exercise operations
│   │   └── index.ts              # Barrel export
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts            # Authentication hook
│   │   ├── usePlans.ts           # Plans management hook
│   │   ├── useWorkoutSession.ts  # Workout session hook
│   │   ├── useMuscleGroups.ts    # Muscle group utilities hook
│   │   └── index.ts              # Barrel export
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── schema.ts             # Database schema interfaces
│   │   ├── firestore.ts          # Firestore-specific types
│   │   ├── api.ts                # API request/response types
│   │   ├── ui.ts                 # UI component prop types
│   │   └── index.ts              # Barrel export
│   │
│   ├── utils/                    # Utility functions
│   │   ├── constants.ts          # App constants and enums
│   │   ├── formatters.ts         # Data formatting utilities
│   │   ├── validators.ts         # Input validation helpers
│   │   ├── dates.ts              # Date manipulation utilities
│   │   ├── analytics.ts          # Analytics calculations
│   │   └── index.ts              # Barrel export
│   │
│   ├── config/                   # Configuration files
│   │   ├── firebase.config.ts    # Firebase configuration (DO NOT COMMIT credentials)
│   │   ├── theme.ts              # NativeWind theme customization
│   │   └── index.ts
│   │
│   └── constants/                # App-wide constants
│       ├── muscleGroups.ts       # Muscle group definitions
│       ├── exercises.ts          # Default exercise library
│       └── index.ts
│
├── assets/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.example                  # Example environment variables (commit this)
├── .env.local                    # Local environment variables (DO NOT COMMIT)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── app.json                      # Expo configuration
├── babel.config.js               # Babel configuration (NativeWind setup)
├── tailwind.config.js            # NativeWind/Tailwind configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # Project documentation
```

---

## Folder Guidelines

### `/app` - Expo Router Pages

**Purpose**: File-based routing pages (screens)

**Guidelines**:
- One screen per file
- Use `.tsx` extension
- Follow Expo Router naming conventions:
  - `(group)` for route groups/navigation stacks
  - `[id]` for dynamic segments
  - `_layout.tsx` for layout wrappers
- Keep pages thin: delegate logic to hooks and components
- Import components and hooks from `@/src`

**Example**:
```tsx
// app/(tabs)/plans.tsx
import { PlansScreen } from '@/src/components';
import { usePlans } from '@/src/hooks';

export default function PlansPage() {
  const { plans, loading } = usePlans();
  return <PlansScreen plans={plans} loading={loading} />;
}
```

---

### `/src/components` - UI Components

**Purpose**: Reusable, isolated UI components

**Organization**:
- `ui/`: Base UI components (Button, Input, Card, etc.)
- `layout/`: Layout wrapper components
- `common/`: Feature-specific components (ExerciseCard, PlanListItem)

**Guidelines**:
- Each component in its own file or folder
- Use TypeScript interfaces for props (in `types/ui.ts`)
- Style with NativeWind (className attribute)
- Keep components pure and stateless when possible
- Export components from index.ts (barrel export)
- Use composition over prop drilling

**Example**:
```tsx
// src/components/ui/Button.tsx
import { Pressable, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => {
  const baseClass = 'px-4 py-2 rounded-lg';
  const variantClass = variant === 'primary' 
    ? 'bg-blue-500' 
    : 'bg-gray-500';
  
  return (
    <Pressable className={`${baseClass} ${variantClass}`} onPress={onPress}>
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
};
```

---

### `/src/stores` - Zustand State Management

**Purpose**: Global state management

**Guidelines**:
- One store per major domain (auth, plans, workouts)
- Use Zustand hooks pattern
- Keep store actions focused and minimal
- Store only derived UI state, not all data
- Use `immer` middleware for immutable updates
- Define types alongside store definitions

**Example**:
```tsx
// src/stores/planStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface PlanStore {
  selectedPlanId: string | null;
  setSelectedPlanId: (id: string | null) => void;
}

export const usePlanStore = create<PlanStore>()(
  immer((set) => ({
    selectedPlanId: null,
    setSelectedPlanId: (id) => set({ selectedPlanId: id }),
  }))
);
```

---

### `/src/services` - External Service Integration

**Purpose**: Firebase operations, API calls, external integrations

**Guidelines**:
- One service file per major feature (auth, plans, workouts)
- No React hooks in services (pure functions)
- Return typed responses matching schemas
- Handle errors and throw informative messages
- Keep sensitive config in `.env.local`
- Never commit API keys or credentials

**Example**:
```tsx
// src/services/plans.ts
import { db } from './firebase';
import { Plan } from '@/src/types';

export const fetchPlans = async (userId: string): Promise<Plan[]> => {
  const plansRef = db.collection('users').doc(userId).collection('plans');
  const snapshot = await plansRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plan));
};
```

---

### `/src/hooks` - Custom React Hooks

**Purpose**: Reusable stateful logic and side effects

**Guidelines**:
- Use for fetching data and managing side effects
- Combine services with Zustand for state management
- Return structured objects with data, loading, error states
- One hook per file
- Name hooks with `use` prefix

**Example**:
```tsx
// src/hooks/usePlans.ts
import { useEffect, useState } from 'react';
import { usePlanStore } from '@/src/stores';
import { fetchPlans } from '@/src/services';

export const usePlans = (userId: string) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPlans(userId)
      .then(setPlans)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { plans, loading, error };
};
```

---

### `/src/types` - TypeScript Definitions

**Purpose**: Centralized type definitions

**Files**:
- `schema.ts`: Database schema interfaces (matches Firestore)
- `firestore.ts`: Firestore-specific types
- `api.ts`: Request/response types
- `ui.ts`: Component prop interfaces

**Guidelines**:
- Export all types from index.ts
- Keep interfaces aligned with database schema
- Use `Timestamp` from Firestore SDK
- Document complex types with JSDoc comments

---

### `/src/utils` - Utility Functions

**Purpose**: Helper functions and calculations

**Organization**:
- `constants.ts`: Enums and constant values
- `formatters.ts`: Data formatting (dates, numbers)
- `validators.ts`: Input validation
- `dates.ts`: Date calculations
- `analytics.ts`: Workout analytics calculations

---

### `/src/config` - Configuration

**Purpose**: App configuration and theme

**Files**:
- `firebase.config.ts`: Firebase initialization (load from .env.local)
- `theme.ts`: NativeWind/Tailwind theme extensions
- `.env.example`: Template for environment variables
- `.env.local`: **DO NOT COMMIT** - Local credentials

---

## Import Aliases

Configure TypeScript path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/src/*": ["./src/*"],
      "@/components": ["./src/components/index.ts"],
      "@/stores": ["./src/stores/index.ts"],
      "@/hooks": ["./src/hooks/index.ts"],
      "@/services": ["./src/services/index.ts"],
      "@/types": ["./src/types/index.ts"],
      "@/utils": ["./src/utils/index.ts"]
    }
  }
}
```

**Usage**:
```tsx
import { Button } from '@/components';
import { usePlans } from '@/hooks';
import { Plan } from '@/types';
```

---

## File Naming Conventions

- **Screens**: kebab-case (e.g., `workout-session.tsx`)
- **Components**: PascalCase (e.g., `ExerciseCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useWorkoutSession.ts`)
- **Services**: camelCase (e.g., `firebase.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `planStore.ts`)
- **Types**: PascalCase (e.g., `schema.ts` contains `Plan`, `Exercise`)
- **Utils**: camelCase (e.g., `formatters.ts`)

---

## Barrel Exports

Create `index.ts` files for easy imports:

```tsx
// src/components/index.ts
export { Button, Input, Card } from './ui';
export { SafeAreaView, Container } from './layout';
export { ExerciseCard, PlanListItem } from './common';
```

Then import like:
```tsx
import { Button, ExerciseCard } from '@/components';
```

---

## Growing the Project

When adding new features:

1. **Create feature types** in `src/types/schema.ts`
2. **Add service functions** in `src/services/`
3. **Create custom hook** in `src/hooks/`
4. **Build components** in `src/components/`
5. **Add state management** in `src/stores/` if needed
6. **Create pages/screens** in `app/`

Example: Adding a "Rest Day Notes" feature
```
src/types/schema.ts          → RestDayNote interface
src/services/restDays.ts     → CRUD operations
src/hooks/useRestDays.ts     → Data fetching
src/components/RestDayCard.tsx
src/stores/restDayStore.ts   → If needed
app/(tabs)/rest-days.tsx     → Screen
```

