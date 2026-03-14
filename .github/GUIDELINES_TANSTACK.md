# TanStack Guidelines

> **Project stack**: This project uses **TanStack Query v5** (React Query) for all async data fetching and server-state management.
>
> - All query hooks live in `src/hooks/`
> - `QueryClient` is configured in `src/config/queryClient.ts`
> - Cache invalidation is done via `queryClient.invalidateQueries({ queryKey: [...] })`
> - Query keys are centralized in `src/services/queryKeys.ts`
> - Use `useMutation` for create/update/delete operations with `onSuccess` invalidation

---

# TanStack LLMs Reference

Source: https://tanstack.com/llms.txt

## Key Documentation Links

### TanStack Query (Primary — used in this project)

- [Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Installation](https://tanstack.com/query/latest/docs/framework/react/installation)
- GitHub: https://github.com/tanstack/query
- Supported frameworks: react, preact, solid, vue, svelte, angular

### TanStack Router

- [Overview](https://tanstack.com/router)
- GitHub: https://github.com/tanstack/router
- Supported frameworks: react, solid

### TanStack Start (Full-stack framework)

- [Overview](https://tanstack.com/start/latest/docs/framework/react/overview)
- GitHub: https://github.com/tanstack/router

### TanStack Table

- [Introduction](https://tanstack.com/table/latest/docs/introduction)
- GitHub: https://github.com/tanstack/table

### TanStack Form

- [Overview](https://tanstack.com/form)
- GitHub: https://github.com/tanstack/form
- Note: This project uses **React Hook Form** instead of TanStack Form

### TanStack Store

- [Overview](https://tanstack.com/store/latest/docs/overview)
- GitHub: https://github.com/tanstack/store
- Note: This project uses **Zustand** instead of TanStack Store

### TanStack Virtual

- [Introduction](https://tanstack.com/virtual/latest/docs/introduction)
- GitHub: https://github.com/tanstack/virtual

### TanStack DB

- [Overview](https://tanstack.com/db/latest/docs/overview)
- GitHub: https://github.com/tanstack/db

### TanStack AI

- [Getting started](https://tanstack.com/ai/latest/docs/getting-started/overview)
- GitHub: https://github.com/tanstack/ai

### TanStack Pacer

- [Overview](https://tanstack.com/pacer/latest/docs/overview)

### TanStack CLI

- [Overview](https://tanstack.com/cli/latest/docs/overview)

## Usage Pattern in This Project

```ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { planService } from "@/services/planService";
import { QUERY_KEYS } from "@/services/queryKeys";

// Query
export function usePlans(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.plans(userId),
    queryFn: () => planService.getPlans(userId),
    enabled: !!userId,
  });
}

// Mutation with cache invalidation
export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: planService.createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allPlans });
    },
  });
}
```
