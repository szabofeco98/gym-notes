# GymNotes Technology Stack Setup

## Overview

This document covers the technologies, libraries, and setup required for GymNotes development.

---

## Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React Native | 0.81.5 | Mobile app framework |
| Expo | ~54.0.32 | Development platform & build system |
| Expo Router | ~6.0.22 | File-based routing |
| React | 19.1.0 | UI library |
| TypeScript | ~5.9.2 | Static typing |
| NativeWind | ^4.0.0+ | Tailwind CSS for React Native |
| Zustand | ^4.4.0+ | UI state management |
| TanStack Query | ^5.0.0+ | Server state management (NEW!) |
| Firebase | ^9.0.0+ | Backend services |

---

## Dependencies by Category

### UI & Styling

```json
{
  "nativewind": "^4.0.1",
  "@nativewind/core": "^1.0.0",
  "tailwindcss": "^3.3.0"
}
```

**Purpose**: Utility-first styling with Tailwind CSS for React Native
**Setup**: See NativeWind Configuration section

### State Management

```json
{
  "zustand": "^4.4.1",
  "immer": "^10.0.0"
}
```

**Purpose**: Lightweight, performant state management
- Zustand: Store creation and hooks
- Immer: Immutable state updates

### Backend

```json
{
  "firebase": "^9.21.0",
  "@react-native-firebase/app": "^18.0.0",
  "@react-native-firebase/auth": "^18.0.0",
  "@react-native-firebase/firestore": "^18.0.0"
}
```

**Purpose**: Backend services, authentication, and database
- User authentication
- Real-time database (Firestore)
- Cloud storage for images/videos (future)

### Navigation & Routing (Already Installed)

```json
{
  "expo-router": "~6.0.22",
  "@react-navigation/native": "^7.1.8",
  "@react-navigation/bottom-tabs": "^7.4.0"
}
```

**Purpose**: File-based routing and bottom tab navigation

### Development Tools

```json
{
  "typescript": "~5.9.2",
  "eslint": "^9.25.0",
  "eslint-config-expo": "~10.0.0"
}
```

---

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
npm install nativewind tailwindcss zustand immer firebase
```

### Step 2: Configure NativeWind

#### Create `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#F59E0B",
        neutral: "#6B7280",
        error: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};
```

#### Update `babel.config.js`

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

#### Update `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "nativewind",
    "lib": ["es2020", "dom"],
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

### Step 3: Setup Firebase

#### Create `.env.example`

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

#### Create `.env.local` (DO NOT COMMIT)

```env
# Copy from your Firebase Console
EXPO_PUBLIC_FIREBASE_API_KEY=xxxxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx
EXPO_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
EXPO_PUBLIC_FIREBASE_APP_ID=xxxxx
```

#### Create `src/config/firebase.ts`

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(firebaseApp);

// Initialize Firestore
export const db = getFirestore(firebaseApp);
```

#### Update `.gitignore`

```
# Environment variables
.env
.env.local
.env.*.local

# Firebase emulator
firebase-debug.log
ui-debug.log
```

### Step 4: Create Folder Structure

```bash
# From project root
mkdir -p src/{components/{ui,layout,common},stores,services,hooks,types,utils,config,constants}
```

### Step 5: Update package.json Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "type-check": "tsc --noEmit",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios"
  }
}
```

---

## Development Workflow

### Starting Development

```bash
# Install dependencies (first time)
npm install

# Start development server
npm start

# For Android emulator
npm run android

# For iOS simulator
npm run ios
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Firebase Project Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project: "GymNotes"
   - Enable Google Analytics (optional)

2. **Configure Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   - Enable "Google" (optional for future)

3. **Create Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode (for development)
   - Choose location (closest to your users)

4. **Set Security Rules** (for development):

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow read-only access to shared exercises
    match /exercises/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Only via admin
    }
  }
}
```

5. **Get Firebase Config**:
   - Go to Project Settings
   - Copy config under "Your apps"
   - Add to `.env.local`

---

## NativeWind Styling Examples

### Basic Component

```tsx
import { View, Text, Pressable } from 'react-native';

export const Button = ({ title, onPress }) => {
  return (
    <Pressable 
      className="bg-blue-500 px-4 py-2 rounded-lg active:bg-blue-600"
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </Pressable>
  );
};
```

### Responsive Layout

```tsx
import { View } from 'react-native';

export const Card = ({ children }) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      {children}
    </View>
  );
};
```

### Dark Mode

```tsx
import { useColorScheme } from 'react-native';

export const ThemedView = ({ children }) => {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white';
  
  return (
    <View className={bgColor}>
      {children}
    </View>
  );
};
```

---

## TanStack Query Setup Example (NEW!)

### Step 1: Create Query Client Configuration

```typescript
// src/config/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Step 2: Wrap App with QueryClientProvider

```tsx
// app/_layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/config/queryClient';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
```

### Step 3: Create Query Keys Factory

```typescript
// src/services/queryKeys.ts
export const queryKeys = {
  all: ['plans'] as const,
  plans: () => [...queryKeys.all, 'plans'] as const,
  plansDetail: () => [...queryKeys.plans(), 'detail'] as const,
  planDetail: (id: string) => [...queryKeys.plansDetail(), id] as const,

  workouts: () => ['workouts'] as const,
  workoutSessions: () => [...queryKeys.workouts(), 'sessions'] as const,
  workoutSessionDetail: (id: string) => [...queryKeys.workoutSessions(), id] as const,

  exercises: () => ['exercises'] as const,
  exercisesByMuscleGroup: (muscleGroup: string) => [
    ...queryKeys.exercises(),
    'byMuscleGroup',
    muscleGroup,
  ] as const,
};
```

### Step 4: Create Query Hooks

```typescript
// src/hooks/useGetPlans.ts
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/src/services/queryKeys';
import { fetchPlans } from '@/src/services/plans';

export const useGetPlans = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.plans(),
    queryFn: () => fetchPlans(userId),
    enabled: !!userId,
  });
};
```

### Step 5: Create Mutation Hooks

```typescript
// src/hooks/useCreatePlan.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/src/services/queryKeys';
import { createPlan } from '@/src/services/plans';

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanInput) => createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans(),
      });
    },
  });
};
```

### What TanStack Query Provides

- **Automatic Caching**: Firebase data cached and reused
- **Background Refetching**: Keep data fresh automatically
- **Deduplication**: Multiple requests for same data = single request
- **Offline Support**: Work with cached data when offline
- **Loading/Error States**: Built-in `isLoading`, `error`, etc.
- **Request Retries**: Automatic retry on failure
- **Garbage Collection**: Clean up old data automatically

---

## Zustand Setup Example

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AppState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    isLoading: false,
    error: null,
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
  }))
);
```

---

## Recommended VS Code Extensions

- ESLint
- TypeScript Vue Plugin
- Expo Tools
- Tailwind CSS IntelliSense
- Thunder Client or REST Client

---

## Troubleshooting

### NativeWind Styling Not Applied

**Solution**: Ensure babel.config.js includes NativeWind preset and jsxImportSource is set in tsconfig.json

### Firebase Connection Error

**Solution**: 
- Check `.env.local` has correct credentials
- Verify Firebase project security rules allow access
- Check Firestore database is in test mode (development)

### ESLint Errors

**Solution**: Run `npm run lint -- --fix` to auto-fix issues

### Type Errors

**Solution**: Run `npm run type-check` to identify issues

---

## Next Steps

1. ✅ Install all dependencies
2. ✅ Configure NativeWind and TypeScript
3. ✅ Set up Firebase project and credentials
4. ✅ Create folder structure
5. → Build core reusable components (see FOLDER_STRUCTURE.md)
6. → Implement Zustand stores
7. → Create database models and services

