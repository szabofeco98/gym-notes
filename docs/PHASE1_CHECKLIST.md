# Phase 1: Foundation & Setup - Checklist (with TanStack Query)

**Estimated Time:** 2-3 hours  
**Goal:** Prepare development environment for building the app

**New:** This includes TanStack Query setup alongside Firebase! 🎉

---

## ✅ Prerequisites

Before starting, ensure you have:
- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Git configured
- [ ] Android Studio (for Android) or Xcode (for iOS)
- [ ] Emulator or physical device ready

---

## 📦 Step 1: Install Dependencies (15 min) - Updated with TanStack Query

```bash
npm install nativewind tailwindcss zustand immer firebase @tanstack/react-query
```

**After installation, verify:**
```bash
npm list nativewind zustand firebase @tanstack/react-query
```

**Dependencies to verify:**
- [ ] NativeWind installed
- [ ] Tailwind CSS installed
- [ ] Zustand installed
- [ ] Firebase installed
- [ ] Immer installed
- [ ] **TanStack Query installed** ⭐ NEW!
- [ ] No peer dependency warnings

---

## 📁 Step 2: Create Folder Structure (15 min)

Run this from project root:

```bash
mkdir -p src/{components/{ui,layout,common},stores,services,hooks,types,utils,config,constants}
```

**Verify all folders created:**
```bash
Get-Item -Path "src\*" -Recurse -Directory | Select-Object FullName
```

**Folders to verify:**
- [ ] `src/components/ui/`
- [ ] `src/components/layout/`
- [ ] `src/components/common/`
- [ ] `src/stores/`
- [ ] `src/services/`
- [ ] `src/hooks/`
- [ ] `src/types/`
- [ ] `src/utils/`
- [ ] `src/config/`
- [ ] `src/constants/`

---

## ⚙️ Step 3: Configure Babel (10 min)

Edit `babel.config.js`:

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

- [ ] `babel.config.js` updated
- [ ] NativeWind preset added
- [ ] jsxImportSource set to "nativewind"

---

## 🎨 Step 4: Configure Tailwind (10 min)

Create `tailwind.config.js` in project root:

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

- [ ] `tailwind.config.js` created
- [ ] Content paths configured
- [ ] Custom colors defined
- [ ] Custom spacing defined

---

## 📝 Step 5: Configure TypeScript (10 min)

Update `tsconfig.json`:

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
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

- [ ] `tsconfig.json` updated
- [ ] Strict mode enabled
- [ ] jsxImportSource set
- [ ] Path aliases configured

---

## 🔐 Step 6: Setup Environment Variables (15 min)

### 6.1 Create `.env.example`

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

- [ ] `.env.example` created
- [ ] Example values filled in

### 6.2 Create `.env.local`

Copy `.env.example` to `.env.local` and fill with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=xxxxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx
EXPO_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
EXPO_PUBLIC_FIREBASE_APP_ID=xxxxx
```

- [ ] `.env.local` created
- [ ] Firebase credentials added
- [ ] `.env.local` added to `.gitignore`

### 6.3 Update `.gitignore`

Add to `.gitignore`:

```
# Environment variables
.env
.env.local
.env.*.local

# Firebase emulator
firebase-debug.log
ui-debug.log
```

- [ ] `.gitignore` updated
- [ ] `.env.local` ignored

---

## 🔥 Step 7: Firebase Project Setup (30 min)

### 7.1 Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `GymNotes`
4. Accept terms and create project

- [ ] Firebase project created
- [ ] Project accessible in console

### 7.2 Enable Authentication

1. Go to Authentication → Sign-in method
2. Enable "Email/Password"
3. (Optional) Enable "Google Sign-In"

- [ ] Email/Password enabled
- [ ] Authentication configured

### 7.3 Create Firestore Database

1. Go to Firestore Database
2. Click "Create database"
3. Start in "test mode"
4. Choose location (closest to your users)

- [ ] Firestore database created
- [ ] Database in test mode (for development)

### 7.4 Get Firebase Config

1. Go to Project Settings (gear icon)
2. Find "Your apps" section
3. Select or create web app
4. Copy the config object

- [ ] Firebase config obtained
- [ ] Config saved somewhere safe

### 7.5 Update `.env.local`

Copy each value from Firebase config:
- apiKey → EXPO_PUBLIC_FIREBASE_API_KEY
- authDomain → EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
- projectId → EXPO_PUBLIC_FIREBASE_PROJECT_ID
- storageBucket → EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
- messagingSenderId → EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- appId → EXPO_PUBLIC_FIREBASE_APP_ID

- [ ] All credentials added to `.env.local`
- [ ] Credentials verified from Firebase console

---

## 🔧 Step 8: Create Firebase Config File (10 min)

Create `src/config/firebase.ts`:

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

- [ ] `src/config/firebase.ts` created
- [ ] Imports correct
- [ ] Config initialized

---

## 🔑 Step 9: Setup TanStack Query (15 min) - NEW!

### 9.1 Create Query Client Config

Create `src/config/queryClient.ts`:

```typescript
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

- [ ] `src/config/queryClient.ts` created
- [ ] Default options configured
- [ ] Query client exported

### 9.2 Setup QueryClientProvider in Root Layout

Update `app/_layout.tsx`:

```typescript
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

- [ ] QueryClientProvider imported
- [ ] App wrapped with provider
- [ ] Query client configured

### 9.3 Create Query Keys Factory

Create `src/services/queryKeys.ts`:

```typescript
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

- [ ] `src/services/queryKeys.ts` created
- [ ] Query keys structured
- [ ] Keys organized by domain

---

## 🎯 Step 10: Create Barrel Exports (10 min)

Create index.ts files for easier imports:

### `src/components/index.ts`
```typescript
// Placeholder - will add exports later
export {};
```

### `src/stores/index.ts`
```typescript
// Placeholder - will add exports later (Zustand for UI state only)
export {};
```

### `src/hooks/index.ts`
```typescript
// Placeholder - will add exports later (TanStack Query + custom hooks)
export {};
```

### `src/services/index.ts`
```typescript
// Placeholder - will add exports later
export { queryKeys } from './queryKeys';
```

### `src/types/index.ts`
```typescript
// Placeholder - will add exports later
export {};
```

### `src/utils/index.ts`
```typescript
// Placeholder - will add exports later
export {};
```

- [ ] `src/components/index.ts` created
- [ ] `src/stores/index.ts` created
- [ ] `src/hooks/index.ts` created
- [ ] `src/services/index.ts` created (with queryKeys export)
- [ ] `src/types/index.ts` created
- [ ] `src/utils/index.ts` created

---

## 🚀 Step 11: Test Development Environment (30 min)

### 11.1 Clear Cache
```bash
npm start -- --reset-cache
```

- [ ] Cache cleared

### 11.2 Start Development Server
```bash
npm start
```

- [ ] Dev server started
- [ ] Expo CLI running
- [ ] No errors in console

### 11.3 Test on Device/Emulator

Choose one:

**Android:**
```bash
npm run android
```
- [ ] App builds successfully
- [ ] App opens on emulator/device
- [ ] No TypeScript errors

**iOS:**
```bash
npm run ios
```
- [ ] App builds successfully
- [ ] App opens on simulator/device
- [ ] No TypeScript errors

### 11.4 Test NativeWind
Modify `app/index.tsx` to test styling:

```tsx
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-xl font-bold">
        NativeWind is working! ✅
      </Text>
    </View>
  );
}
```

- [ ] NativeWind className works
- [ ] Styles applied correctly
- [ ] No console warnings

### 11.5 Test TanStack Query
In `app/index.tsx`, verify QueryClientProvider is loaded:

```tsx
// If no errors about "QueryClientProvider is not defined", you're good!
```

- [ ] No QueryClientProvider errors
- [ ] Query client initialized
- [ ] React Query DevTools ready (optional: can add in dev)

---

## ✨ Step 12: Verify All Systems (10 min)

Run type checker:
```bash
npx tsc --noEmit
```

- [ ] TypeScript strict check passes
- [ ] No type errors

Run linter:
```bash
npm run lint
```

- [ ] ESLint passes
- [ ] No linting errors

---

## 📚 Step 13: Document Your Setup (5 min)

Create configuration commit:
```bash
git add .env.example tailwind.config.js babel.config.js tsconfig.json
git commit -m "[setup] Initial configuration with TanStack Query"
```

- [ ] Configuration committed (WITHOUT `.env.local`)
- [ ] `.env.local` remains untracked
- [ ] TanStack Query configured

---

## ✅ Phase 1 Complete!

Congratulations! You've successfully:

- ✅ Installed all dependencies (including TanStack Query!)
- ✅ Configured development tools
- ✅ Set up TypeScript and NativeWind
- ✅ Created Firebase project
- ✅ Setup TanStack Query
- ✅ Set up folder structure
- ✅ Tested development environment

**What You Now Have:**
- Firebase for backend
- TanStack Query for server state management
- Zustand for UI state management
- NativeWind for styling
- TypeScript for type safety

**Next Step:** Read `docs/PHASE1_CHECKLIST.md` and start Phase 2 (Core Components)

**Time Spent:** 2-3 hours

---

## 🆘 Troubleshooting

**Issue:** NativeWind styles not applying
- **Solution:** Restart dev server with `npm start -- --reset-cache`

**Issue:** Firebase connection error
- **Solution:** Check `.env.local` has all credentials, verify Firestore database exists

**Issue:** QueryClientProvider not defined
- **Solution:** Make sure `app/_layout.tsx` imports and uses `QueryClientProvider` from step 9.2

**Issue:** TanStack Query imports fail
- **Solution:** Verify `@tanstack/react-query` is installed with `npm list @tanstack/react-query`

**Issue:** TypeScript errors
- **Solution:** Run `npx tsc --noEmit` to see full errors

**Issue:** Port already in use
- **Solution:** Kill process on port 8081 or use different port with `--port` flag

---

## 📞 Need Help?

Refer to:
- **Setup Issues:** `.github/TECH_STACK.md` Troubleshooting section
- **TanStack Query:** `.github/TECH_STACK.md` TanStack Query Configuration
- **Configuration:** `.github/TECH_STACK.md` Configuration section
- **Firebase Setup:** `.github/TECH_STACK.md` Firebase Project Setup
- **General:** `.github/ARCHITECTURE.md`

---

**Ready to start building? 🚀 Head to Phase 2: Core Components**

See `docs/plan-gymNotes.prompt.md` Phase 2 for next steps!

