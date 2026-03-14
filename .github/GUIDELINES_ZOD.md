# Zod Guidelines

> **Project stack**: This project uses **Zod v4** (`zod@^4.3.6`) for schema validation.
> All forms use **React Hook Form** with `zodResolver` from `@hookform/resolvers/zod`.
>
> **Zod v4 key differences from v3:**
>
> - Use `.issues` instead of `.errors` on `ZodError`
> - `z.string().email()` etc. are deprecated — use `z.email()` at top level
> - `z.nativeEnum()` is deprecated — use `z.enum()`
> - `.strict()` / `.passthrough()` / `.strip()` are deprecated — use `z.strictObject()` / `z.looseObject()`
> - `errorMap` is dropped — use `error` param
> - `invalid_type_error` / `required_error` are dropped
> - `safeParse` returns `{ success, data, error }` — access issues via `result.error.issues`

---

# Zod LLMs Reference

Source: https://zod.dev/llms.txt

## Key Documentation Links

### Getting Started

- [Introduction](https://zod.dev/)
- [Basic usage](https://zod.dev/basics)
- [Defining a schema](https://zod.dev/basics?id=defining-a-schema)
- [Parsing data](https://zod.dev/basics?id=parsing-data)
- [Handling errors](https://zod.dev/basics?id=handling-errors)
- [Inferring types](https://zod.dev/basics?id=inferring-types)

### Migration Guide

- [Zod 4 release notes](https://zod.dev/v4)
- [Migration guide (v3 → v4)](https://zod.dev/v4/changelog)
- [Versioning in Zod 4](https://zod.dev/v4/versioning)

### API Reference

- [Full API reference](https://zod.dev/api)
- [Primitives](https://zod.dev/api?id=primitives)
- [Strings](https://zod.dev/api?id=strings)
- [String formats](https://zod.dev/api?id=string-formats)
- [Numbers](https://zod.dev/api?id=numbers)
- [Booleans](https://zod.dev/api?id=booleans)
- [Objects](https://zod.dev/api?id=objects)
- [Arrays](https://zod.dev/api?id=arrays)
- [Unions](https://zod.dev/api?id=unions)
- [Discriminated unions](https://zod.dev/api?id=discriminated-unions)
- [Enums](https://zod.dev/api?id=enums)
- [Optionals](https://zod.dev/api?id=optionals)
- [Nullables](https://zod.dev/api?id=nullables)
- [Refinements (.refine)](https://zod.dev/api?id=refine)
- [.superRefine()](https://zod.dev/api?id=superrefine)
- [Transforms](https://zod.dev/api?id=transforms)
- [Defaults](https://zod.dev/api?id=defaults)
- [Pipes](https://zod.dev/api?id=pipes)

### Error Handling

- [Customizing errors](https://zod.dev/error-customization)
- [The error param](https://zod.dev/error-customization?id=the-error-param)
- [Global error customization](https://zod.dev/error-customization?id=global-error-customization)
- [Formatting errors](https://zod.dev/error-formatting)
- [z.prettifyError()](https://zod.dev/error-formatting?id=zprettifyerror)
- [z.flattenError()](https://zod.dev/error-formatting?id=zflattenerror)

### Advanced

- [Metadata and registries](https://zod.dev/metadata)
- [JSON Schema conversion](https://zod.dev/json-schema)
- [Codecs](https://zod.dev/codecs)
- [Zod Mini (tree-shakable)](https://zod.dev/packages/mini)
- [Zod Core](https://zod.dev/packages/core)
- [Ecosystem integrations](https://zod.dev/ecosystem)
- [For library authors](https://zod.dev/library-authors)

## Usage Pattern in This Project

```ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const schema = z.object({
  email: z.string().min(1, "Email required").email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

type Fields = z.infer<typeof schema>;

const {
  control,
  handleSubmit,
  formState: { errors },
  setError,
} = useForm<Fields>({
  resolver: zodResolver(schema),
});

// Per-field error: errors.email?.message
// Server error: setError("root", { message: "..." })
```
