# GymNotes Application Architecture

## Overview

GymNotes is a React Native fitness tracking application built with Expo. It follows a clean architecture pattern separating the template/plan layer from the execution/session layer, enabling reusable workout plans with accurate history tracking.

## Core Architecture Principles

1. **Separation of Concerns**: Template layer (plans) separated from execution layer (workouts)
2. **Type Safety**: Full TypeScript implementation with strict mode enabled
3. **State Management**: Zustand for predictable, minimal state management
4. **Styling**: NativeWind for utility-first, Tailwind CSS-inspired styling in React Native
5. **Backend**: Firebase Firestore for real-time data sync and authentication
6. **Reusability**: Component-driven development with a shared UI library

## Technology Stack

See `TECH_STACK.md` for detailed setup and dependency information.

### Core Technologies
- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Firebase (Firestore + Authentication)
- **Language**: TypeScript (strict mode)
- **UI Components**: Reusable component library

## Database Schema

See `DATABASE_SCHEMA.md` for complete schema documentation and relationships.

### High-Level Structure

```
Template Layer (Plan Definition)
├── PLAN
├── DAY_PLAN
├── DAY_PLAN_EXERCISE
└── EXERCISE

Execution Layer (Workout Tracking)
├── WORKOUT_SESSION
└── WORKOUT_SET
```

## Folder Structure

See `FOLDER_STRUCTURE.md` for complete project organization and guidelines.

## Development Guidelines

See `GUIDELINES.md` for coding standards, best practices, and conventions.

## Getting Started

1. Install dependencies: `npm install`
2. Configure NativeWind (see `TECH_STACK.md`)
3. Set up Firebase credentials (see `TECH_STACK.md`)
4. Start development: `npm start` or `npm run android`

## Key Features

- **Workout Planning**: Create reusable workout plans with structured daily routines
- **Session Tracking**: Log actual workouts with sets, reps, and weight
- **Progress Analytics**: Track performance over time
- **Exercise Library**: Manage exercises by muscle group
- **Real-time Sync**: Firebase integration for cross-device synchronization

## Next Steps

1. Set up development environment (NativeWind, Firebase)
2. Build core reusable UI components
3. Implement Zustand stores for state management
4. Create database models and Firebase integration
5. Develop main application screens

