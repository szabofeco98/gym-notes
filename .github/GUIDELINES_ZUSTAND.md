# Zustand Guidelines

> **Project stack**: This project uses **Zustand v4** with the **Immer** middleware for immutable state updates.
>
> - `useAuthStore` — manages the authenticated Appwrite `Models.User` + loading/error state
> - `useSessionStore` — manages the active Appwrite `Models.Session`
> - All stores use `immer` middleware for nested updates
> - Do NOT use Redux reducer patterns; prefer direct Zustand action style

---

# Zustand LLMs Reference

Source: https://zustand.docs.pmnd.rs/llms.txt

## Key Documentation Links

### Getting Started

- [Introduction](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)
- [Comparison with other libraries](https://zustand.docs.pmnd.rs/learn/getting-started/comparison)

### Guides

- [Updating state](https://zustand.docs.pmnd.rs/learn/guides/updating-state)
- [Immutable state and merging](https://zustand.docs.pmnd.rs/learn/guides/immutable-state-and-merging)
- [Slices pattern](https://zustand.docs.pmnd.rs/learn/guides/slices-pattern)
- [Practice with no store actions](https://zustand.docs.pmnd.rs/learn/guides/practice-with-no-store-actions)
- [Auto generating selectors](https://zustand.docs.pmnd.rs/learn/guides/auto-generating-selectors)
- [Prevent rerenders with useShallow](https://zustand.docs.pmnd.rs/learn/guides/prevent-rerenders-with-use-shallow)
- [Flux inspired practice](https://zustand.docs.pmnd.rs/learn/guides/flux-inspired-practice)
- [How to reset state](https://zustand.docs.pmnd.rs/learn/guides/how-to-reset-state)
- [Initialize state with props](https://zustand.docs.pmnd.rs/learn/guides/initialize-state-with-props)
- [Testing](https://zustand.docs.pmnd.rs/learn/guides/testing)
- [SSR and Hydration](https://zustand.docs.pmnd.rs/learn/guides/ssr-and-hydration)
- [Setup with Next.js](https://zustand.docs.pmnd.rs/learn/guides/nextjs)
- [TypeScript Beginner Guide](https://zustand.docs.pmnd.rs/learn/guides/beginner-typescript)
- [Advanced TypeScript Guide](https://zustand.docs.pmnd.rs/learn/guides/advanced-typescript)

### API Reference

- [create](https://zustand.docs.pmnd.rs/reference/apis/create)
- [createStore](https://zustand.docs.pmnd.rs/reference/apis/create-store)
- [createWithEqualityFn](https://zustand.docs.pmnd.rs/reference/apis/create-with-equality-fn)
- [shallow](https://zustand.docs.pmnd.rs/reference/apis/shallow)
- [useStore](https://zustand.docs.pmnd.rs/reference/hooks/use-store)
- [useShallow](https://zustand.docs.pmnd.rs/reference/hooks/use-shallow)

### Middleware

- [persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
- [immer](https://zustand.docs.pmnd.rs/reference/middlewares/immer)
- [devtools](https://zustand.docs.pmnd.rs/reference/middlewares/devtools)
- [redux](https://zustand.docs.pmnd.rs/reference/middlewares/redux)
- [combine](https://zustand.docs.pmnd.rs/reference/middlewares/combine)
- [subscribeWithSelector](https://zustand.docs.pmnd.rs/reference/middlewares/subscribe-with-selector)

### Integrations

- [Persisting store data](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data)
- [Immer middleware](https://zustand.docs.pmnd.rs/reference/integrations/immer-middleware)
- [Third-party libraries](https://zustand.docs.pmnd.rs/reference/integrations/third-party-libraries)

### Migration

- [Migrate to v5 from v4](https://zustand.docs.pmnd.rs/reference/migrations/migrating-to-v5)

### MCP Server

Available at: `https://docs.pmnd.rs/api/sse`

## Usage Pattern in This Project

```ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Models } from "react-native-appwrite";

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),
  })),
);
```
