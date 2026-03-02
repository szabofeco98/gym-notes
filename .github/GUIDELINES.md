# GymNotes Development Guidelines

## Code Quality Standards

### TypeScript Usage

**Strict Mode Enabled** ✅

All code must:
- Use full TypeScript types (no `any` unless absolutely necessary)
- Define interfaces/types for all function parameters and return values
- Use strict null checks
- Document complex types with JSDoc comments

```typescript
// ✅ Good
interface WorkoutSession {
  id: string;
  dayPlanId: string;
  date: Date;
  completed: boolean;
}

export const updateSession = (
  sessionId: string, 
  updates: Partial<WorkoutSession>
): Promise<void> => {
  // Implementation
};

// ❌ Bad
export const updateSession = (sessionId: any, updates: any) => {
  // Implementation
};
```

### File Organization

**One responsibility per file**

- One screen per file in `app/`
- One component per file in `src/components/`
- One hook per file in `src/hooks/`
- Group related utilities in single files

### Import Order

Maintain consistent import order:

```typescript
// 1. React & React Native
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

// 2. Third-party libraries
import { create } from 'zustand';

// 3. Local imports (organized by depth)
import { Button, Card } from '@/components';
import { usePlans } from '@/hooks';
import { Plan } from '@/types';
import { formatDate } from '@/utils';

// 4. Empty line after imports
export const MyComponent = () => { /* ... */ };
```

---

## Component Development

### Component Structure

```typescript
import { View, Text, Pressable } from 'react-native';
import { useMemo } from 'react';

interface ComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

/**
 * MyComponent - Brief description of what it does
 * 
 * @component
 * @example
 * return (
 *   <MyComponent title="Click me" onPress={() => console.log('clicked')} />
 * )
 */
export const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => {
  const baseClass = 'px-4 py-2 rounded-lg';
  const variantClass = variant === 'primary' 
    ? 'bg-blue-500' 
    : 'bg-gray-500';

  return (
    <Pressable 
      className={`${baseClass} ${variantClass}`} 
      onPress={onPress}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
};
```

### Props Interface Pattern

- Define props interfaces in component file or `src/types/ui.ts`
- Use JSDoc comments for complex props
- Mark optional props clearly with `?`

```typescript
interface CardProps {
  title: string;
  subtitle?: string;
  /** Array of workout exercises */
  exercises: Exercise[];
  onPress: (exerciseId: string) => void;
}
```

### Styling with NativeWind

**Use className for all styling**

```typescript
// ✅ Good
<View className="bg-white p-4 rounded-lg shadow-md">
  <Text className="text-lg font-semibold text-gray-900">Title</Text>
</View>

// ❌ Avoid
<View style={{ backgroundColor: 'white', padding: 16 }}>
  <Text style={{ fontSize: 18, fontWeight: '600' }}>Title</Text>
</View>

// ⚠️ Only use inline styles for dynamic values
<View className="bg-white p-4" style={{ width: dynamicWidth }}>
```

### Reusable Components Checklist

- [ ] Component is isolated and doesn't depend on app state
- [ ] All props are typed with TypeScript interface
- [ ] Component has JSDoc comment
- [ ] Styling uses NativeWind (className)
- [ ] No console.log or debug code
- [ ] Component exported from barrel file (index.ts)

---

## State Management with Zustand

### Store Structure

```typescript
// src/stores/planStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Plan } from '@/types';

interface PlanState {
  // State
  plans: Plan[];
  selectedPlanId: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  setPlans: (plans: Plan[]) => void;
  selectPlan: (planId: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePlanStore = create<PlanState>()(
  immer((set) => ({
    plans: [],
    selectedPlanId: null,
    loading: false,
    error: null,

    setPlans: (plans) => set({ plans }),
    selectPlan: (planId) => set({ selectedPlanId: planId }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  }))
);
```

### Store Usage in Components

```typescript
export const PlansScreen = () => {
  const { plans, loading, error, setPlans } = usePlanStore();

  useEffect(() => {
    // Fetch and update store
    fetchPlans().then(setPlans);
  }, [setPlans]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <FlatList
      data={plans}
      renderItem={({ item }) => <PlanCard plan={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
```

### Store Best Practices

- ✅ Use stores for UI state (selections, filters, modals)
- ✅ Keep stores focused and single-responsibility
- ✅ Use immer middleware for immutable updates
- ❌ Don't over-use stores for data that could be props
- ❌ Don't put complex business logic in stores (use hooks instead)

---

## Custom Hooks

### Hook Structure

```typescript
// src/hooks/usePlans.ts
import { useEffect, useState } from 'react';
import { fetchPlans as fetchPlansService } from '@/services/plans';
import { Plan } from '@/types';

interface UsePlansReturn {
  plans: Plan[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const usePlans = (userId: string): UsePlansReturn => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlansService(userId);
      setPlans(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [userId]);

  return { plans, loading, error, refetch: fetchPlans };
};
```

### Hook Return Pattern

Hooks should return structured objects:

```typescript
// ✅ Good - Structured return
const { data, loading, error, refetch } = useData();

// ❌ Bad - Array destructuring with unclear order
const [data, loading, error, refetch] = useData();
```

---

## Service Layer (Firebase)

### Service Structure

```typescript
// src/services/plans.ts
import { db } from '@/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Plan, DayPlan, DAY_PLAN_EXERCISE } from '@/types';

/**
 * Fetch all workout plans for a user
 */
export const fetchPlans = async (userId: string): Promise<Plan[]> => {
  try {
    const plansRef = collection(db, `users/${userId}/plans`);
    const snapshot = await getDocs(plansRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Plan));
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw new Error('Failed to fetch workout plans');
  }
};

/**
 * Create a new workout plan
 */
export const createPlan = async (
  userId: string,
  plan: Omit<Plan, 'id'>
): Promise<Plan> => {
  try {
    const plansRef = collection(db, `users/${userId}/plans`);
    const docRef = await addDoc(plansRef, {
      ...plan,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...plan,
    };
  } catch (error) {
    console.error('Error creating plan:', error);
    throw new Error('Failed to create workout plan');
  }
};
```

### Service Best Practices

- ✅ Use typed parameters and return values
- ✅ Handle errors and provide meaningful messages
- ✅ Add JSDoc comments for all exports
- ✅ Keep services pure (no component state)
- ❌ Don't call hooks from services
- ❌ Don't directly update UI from services

---

## Error Handling

### Pattern

```typescript
// Service layer
export const fetchData = async () => {
  try {
    const result = await api.get('/data');
    return result;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`Firebase error: ${error.message}`);
    }
    throw new Error('Failed to fetch data');
  }
};

// Hook layer
export const useData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError);
  }, []);

  return { data, error };
};

// Component layer
export const DataScreen = () => {
  const { data, error } = useData();

  if (error) {
    return <ErrorBoundary message={error.message} />;
  }

  return <DataView data={data} />;
};
```

---

## Naming Conventions

### Variables & Functions

```typescript
// ✅ Good
const isUserAuthenticated = true;
const handlePlanSubmit = () => {};
const fetchWorkoutData = async () => {};

// ❌ Bad
const authenticated = true; // ambiguous
const onPlanClick = () => {}; // "on" is vague
const getWorkout = async () => {}; // missing async indicator
```

### Boolean Variables

```typescript
// Use is/has/should prefixes
const isLoading = true;
const hasError = false;
const shouldShowModal = true;
```

### Event Handlers

```typescript
// Use handle + action pattern
const handlePress = () => {};
const handleSubmit = () => {};
const handleInputChange = () => {};
```

### Async Functions

```typescript
// Use fetch/get/create/update/delete verbs
const fetchPlans = async () => {};
const createWorkout = async () => {};
const updateSession = async () => {};
const deleteExercise = async () => {};
```

---

## Performance Optimization

### Memoization

```typescript
import { memo, useMemo } from 'react';

// Memoize expensive components
export const ExerciseCard = memo(({ exercise, onPress }) => {
  return <View>...</View>;
}, (prev, next) => prev.exercise.id === next.exercise.id);

// Memoize computed values
const sortedExercises = useMemo(() => {
  return exercises.sort((a, b) => a.name.localeCompare(b.name));
}, [exercises]);
```

### List Optimization

```typescript
// Use keyExtractor for FlatList
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
/>
```

### Reduce Re-renders

```typescript
// ✅ Extract to separate component
const Item = memo(({ item, onPress }) => (
  <Pressable onPress={() => onPress(item.id)}>
    <Text>{item.name}</Text>
  </Pressable>
));

// ❌ Inline function causes re-render
<Pressable onPress={() => handlePress(item.id)}>
  <Text>{item.name}</Text>
</Pressable>
```

---

## Testing & Debugging

### Console Usage

```typescript
// ✅ During development
console.log('DEBUG:', state);

// ❌ Never commit console logs
console.log('temp debug');
```

Remove all debug logs before committing.

### Error Logging

```typescript
// Use error handler for production errors
import { captureException } from '@/services/errorHandler';

try {
  await riskyOperation();
} catch (error) {
  captureException(error); // Send to error tracking
  throw error; // Re-throw for local handling
}
```

---

## Git & Commits

### Commit Message Format

```
[feature|fix|refactor|docs] Brief description

Optional longer description with details.
```

**Examples**:
```
[feature] Add workout session logging

[fix] Fix NativeWind className not applied to nested views

[refactor] Extract common styling to theme.ts

[docs] Update database schema documentation
```

### Branch Naming

```
feature/workout-tracking
fix/firebase-auth-issue
refactor/component-structure
docs/setup-guide
```

---

## Code Review Checklist

- [ ] TypeScript strict mode - no `any` types
- [ ] All functions have type signatures
- [ ] Components are reusable and isolated
- [ ] Styling uses NativeWind className
- [ ] Error handling is implemented
- [ ] No console.log statements left
- [ ] No commented-out code
- [ ] Imports are organized
- [ ] File is in correct folder
- [ ] Tests pass (when applicable)

---

## Common Patterns

### Combining Zustand + Hooks

```typescript
// Store for UI state
const useUIStore = create((set) => ({
  selectedExerciseId: null,
  setSelectedExerciseId: (id) => set({ selectedExerciseId: id }),
}));

// Hook for data fetching
const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    fetchExercises().then(setExercises);
  }, []);
  return exercises;
};

// Component
export const ExerciseList = () => {
  const exercises = useExercises();
  const { selectedExerciseId, setSelectedExerciseId } = useUIStore();

  return (
    <FlatList
      data={exercises}
      renderItem={({ item }) => (
        <ExerciseCard
          exercise={item}
          selected={item.id === selectedExerciseId}
          onPress={() => setSelectedExerciseId(item.id)}
        />
      )}
    />
  );
};
```

### Loading States

```typescript
export const DataScreen = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return <ActivityIndicator size="large" className="flex-1 justify-center" />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-4">{error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return <DataView data={data} />;
};
```

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://nativewind.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Firebase Documentation](https://firebase.google.com/docs)

