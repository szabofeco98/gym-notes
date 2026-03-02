# GymNotes Database Schema

## Overview

The database schema is organized into two logical layers:
- **Template Layer**: Plan structure and exercise definitions
- **Execution Layer**: Actual workout sessions and performance tracking

This separation enables reusable workout plans while maintaining accurate history.

---

## Template Layer (Plan Definition)

### PLAN
Represents a reusable workout program/split.

```typescript
interface Plan {
  id: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Relationships:**
- One PLAN → Many DAY_PLAN

**Firebase Path:** `/plans/{planId}`

---

### DAY_PLAN
Represents a specific day within a workout plan (e.g., "Chest Day", "Pull Day").

```typescript
interface DayPlan {
  id: string;
  name: string;
  planId: string; // FK → PLAN.id
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Relationships:**
- Many to One: PLAN (via planId)
- One DAY_PLAN → Many DAY_PLAN_EXERCISE
- One DAY_PLAN → Many WORKOUT_SESSION

**Firebase Path:** `/plans/{planId}/dayPlans/{dayPlanId}`

---

### EXERCISE
Master list of exercises with muscle group categorization.

```typescript
interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'chest' | 'back' | 'legs' | 'shoulders' | 'biceps' | 'triceps' | 'forearms' | 'abs' | 'cardio';
  description?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Relationships:**
- One EXERCISE → Many DAY_PLAN_EXERCISE

**Firebase Path:** `/exercises/{exerciseId}`

---

### DAY_PLAN_EXERCISE
Junction table connecting exercises to specific days in a plan and controlling order.

```typescript
interface DayPlanExercise {
  id: string;
  dayPlanId: string; // FK → DAY_PLAN.id
  exerciseId: string; // FK → EXERCISE.id
  orderIndex: number; // Controls exercise order within the day
  targetSets?: number; // Optional: recommended number of sets
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Relationships:**
- Many to One: DAY_PLAN (via dayPlanId)
- Many to One: EXERCISE (via exerciseId)
- One DAY_PLAN_EXERCISE → Many WORKOUT_SET

**Firebase Path:** `/plans/{planId}/dayPlans/{dayPlanId}/exercises/{dayPlanExerciseId}`

---

## Execution Layer (Workout Tracking)

### WORKOUT_SESSION
Represents one completed workout (actual execution of a day plan on a specific date).

```typescript
interface WorkoutSession {
  id: string;
  dayPlanId: string; // FK → DAY_PLAN.id
  date: Timestamp; // Date the workout was completed
  startTime?: Timestamp;
  endTime?: Timestamp;
  notes?: string;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Relationships:**
- Many to One: DAY_PLAN (via dayPlanId)
- One WORKOUT_SESSION → Many WORKOUT_SET

**Purpose:** Separate plan structure from real execution, enabling:
- Multiple workouts per plan
- Accurate history tracking
- Performance progression analysis

**Firebase Path:** `/workoutSessions/{sessionId}`

---

### WORKOUT_SET
Individual set performance data from a workout session.

```typescript
interface WorkoutSet {
  id: string;
  workoutSessionId: string; // FK → WORKOUT_SESSION.id
  dayPlanExerciseId: string; // FK → DAY_PLAN_EXERCISE.id
  setNumber: number; // 1st set, 2nd set, etc.
  weight: number; // in pounds or kg
  reps: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  comment?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Relationships:**
- Many to One: WORKOUT_SESSION (via workoutSessionId)
- Many to One: DAY_PLAN_EXERCISE (via dayPlanExerciseId)

**Purpose:**
- Store actual set performance
- Support multiple sets per exercise
- Enable progression tracking
- Track RPE for advanced analytics

**Firebase Path:** `/workoutSessions/{sessionId}/sets/{setId}`

---

## Relationship Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEMPLATE LAYER (Plans)                       │
├─────────────────────────────────────────────────────────────────┤
│
│  PLAN (Workout Program)
│   │
│   └─→ DAY_PLAN (Chest Day, Pull Day, etc.)
│        │
│        └─→ DAY_PLAN_EXERCISE (linking exercises)
│             │
│             └─→ EXERCISE (Bench Press, Squats, etc.)
│
│
├─────────────────────────────────────────────────────────────────┐
│                  EXECUTION LAYER (Sessions)                     │
├─────────────────────────────────────────────────────────────────┤
│
│  WORKOUT_SESSION (Completed workout on specific date)
│   │
│   └─→ WORKOUT_SET (Individual set: weight, reps)
│
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example

1. **Create Plan**: User creates "Push/Pull/Legs" split
2. **Create Days**: Add "Push Day", "Pull Day", "Leg Day"
3. **Add Exercises**: Assign exercises to each day
4. **Start Session**: User starts "Push Day" workout on 2025-03-02
5. **Log Sets**: User logs sets (weight, reps) for each exercise
6. **Complete Session**: Workout marked as completed

---

## Firestore Collection Structure

```
/plans/{planId}
  ├── dayPlans/{dayPlanId}
  │   └── exercises/{dayPlanExerciseId}
  └── [plan metadata]

/exercises/{exerciseId}
  └── [exercise data]

/workoutSessions/{sessionId}
  ├── sets/{setId}
  │   └── [set data]
  └── [session metadata]
```

---

## Design Rationale

### Why Separate Template from Execution?

1. **Reusability**: One plan can be used multiple times
2. **History Accuracy**: Each session records actual performance
3. **Progression Tracking**: Compare sets across multiple sessions
4. **Flexibility**: Users can modify their actual performance vs. the original plan
5. **Future Extensions**: Support for RPE, volume calculations, periodization

### Why DAY_PLAN_EXERCISE?

- Controls exercise order independently per day
- Stores plan-specific metadata (targetSets, notes)
- Enables many-to-many relationship between days and exercises
- Provides unique identifier for referencing in WORKOUT_SET

### Why Reference dayPlanExerciseId in WORKOUT_SET?

- Maintains link to the original plan template
- Enables comparison between planned vs. actual
- Supports analytics: "Did I do better this week than last week?"

---

## Future Extensions

1. **Warm-up Tracking**: Add warmupSets field to WORKOUT_SET
2. **RPE & Volume**: Track Rate of Perceived Exertion and total volume
3. **Plate Calculator**: Metadata for plate calculations per exercise
4. **Video/Photos**: Store form check media per set
5. **Periodization**: Add period tracking (macro/micro cycles)
6. **Rest Times**: Track rest duration between sets
7. **Achievements**: User milestones and personal records

