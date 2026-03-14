# Appwrite Guidelines

> **Project Override**: This project uses **Appwrite** as its backend (NOT Firebase).
> All authentication, database, and storage operations use `react-native-appwrite` v0.25+.
>
> - Auth: `account.createEmailPasswordSession(...)`, `account.create(...)`, `account.deleteSession(...)`, `account.createOAuth2Token(...)`
> - Database: `databases.createDocument(...)`, `databases.listDocuments(...)`, `databases.deleteDocument(...)` — always use **object-parameter style**, never positional args
> - Forms: All forms use **React Hook Form** + **Zod** (v4) validation — see `GUIDELINES_ZOD.md`
> - State: All global state uses **Zustand** — see `GUIDELINES_ZUSTAND.md`
> - Data fetching: **TanStack Query** — see `GUIDELINES_TANSTACK.md`

---

# Appwrite LLMs Reference

Source: https://appwrite.io/llms.txt

## Key Documentation Links

### Authentication

- [Authentication overview](https://appwrite.io/docs/products/auth)
- [Accounts API](https://appwrite.io/docs/products/auth/accounts)
- [Email and password login](https://appwrite.io/docs/products/auth/email-password)
- [OAuth 2 login](https://appwrite.io/docs/products/auth/oauth2)
- [Anonymous login](https://appwrite.io/docs/products/auth/anonymous)
- [Magic URL login](https://appwrite.io/docs/products/auth/magic-url)
- [Email OTP](https://appwrite.io/docs/products/auth/email-otp)
- [Multi-factor authentication](https://appwrite.io/docs/products/auth/mfa)
- [SSR login](https://appwrite.io/docs/products/auth/server-side-rendering)
- [Checking auth status](https://appwrite.io/docs/products/auth/checking-auth-status)
- [JWT login](https://appwrite.io/docs/products/auth/jwt)
- [Teams](https://appwrite.io/docs/products/auth/teams)
- [Labels](https://appwrite.io/docs/products/auth/labels)
- [Preferences](https://appwrite.io/docs/products/auth/preferences)
- [Identities](https://appwrite.io/docs/products/auth/identities)
- [Security](https://appwrite.io/docs/products/auth/security)
- [Manage users](https://appwrite.io/docs/products/auth/users)
- [Verify user](https://appwrite.io/docs/products/auth/verify-user)

### Databases (Legacy SDK — Collections/Documents API)

- [Databases overview](https://appwrite.io/docs/products/databases)
- [Collections](https://appwrite.io/docs/products/databases/legacy/collections)
- [Documents](https://appwrite.io/docs/products/databases/legacy/documents)
- [Queries](https://appwrite.io/docs/products/databases/legacy/queries)
- [Permissions](https://appwrite.io/docs/products/databases/legacy/permissions)
- [Order](https://appwrite.io/docs/products/databases/legacy/order)
- [Pagination](https://appwrite.io/docs/products/databases/legacy/pagination)
- [Relationships](https://appwrite.io/docs/products/databases/legacy/relationships)
- [Atomic numeric operations](https://appwrite.io/docs/products/databases/legacy/atomic-numeric-operations)
- [Bulk operations](https://appwrite.io/docs/products/databases/legacy/bulk-operations)
- [Type generation](https://appwrite.io/docs/products/databases/legacy/type-generation)
- [Quick start](https://appwrite.io/docs/products/databases/legacy/quick-start)

### Storage

- [Storage overview](https://appwrite.io/docs/products/storage)
- [Buckets](https://appwrite.io/docs/products/storage/buckets)
- [Upload and download](https://appwrite.io/docs/products/storage/upload-download)
- [Image transformations](https://appwrite.io/docs/products/storage/images)
- [Storage permissions](https://appwrite.io/docs/products/storage/permissions)
- [File tokens](https://appwrite.io/docs/products/storage/file-tokens)

### Functions

- [Functions overview](https://appwrite.io/docs/products/functions)
- [Deploy from Git](https://appwrite.io/docs/products/functions/deploy-from-git)
- [Deploy manually](https://appwrite.io/docs/products/functions/deploy-manually)
- [Execution](https://appwrite.io/docs/products/functions/execute)
- [Develop Appwrite Functions](https://appwrite.io/docs/products/functions/develop)

### Quick Starts

- [React Native quickstart](https://appwrite.io/docs/quick-starts/react-native)
- [React Native prompt](https://appwrite.io/docs/quick-starts/react-native/prompt)

### Platform & Security

- [Platform overview](https://appwrite.io/docs/advanced/platform)
- [Permissions](https://appwrite.io/docs/advanced/platform/permissions)
- [Rate limits](https://appwrite.io/docs/advanced/platform/rate-limits)
- [Events](https://appwrite.io/docs/advanced/platform/events)
- [Error handling](https://appwrite.io/docs/advanced/platform/error-handling)
- [Response codes](https://appwrite.io/docs/advanced/platform/response-codes)
- [Security](https://appwrite.io/docs/advanced/security)
- [MFA](https://appwrite.io/docs/advanced/security/mfa)

### APIs & SDKs

- [API reference](https://appwrite.io/docs/references)
- [SDKs](https://appwrite.io/docs/sdks)
- [GraphQL](https://appwrite.io/docs/apis/graphql)
- [Realtime](https://appwrite.io/docs/apis/realtime)

### Migrations

- [Migrate from Firebase](https://appwrite.io/docs/advanced/migrations/firebase)
- [Migrations overview](https://appwrite.io/docs/advanced/migrations)

### Tooling

- [MCP for Appwrite API](https://appwrite.io/docs/tooling/mcp/api)
- [MCP for Appwrite docs](https://appwrite.io/docs/tooling/mcp/docs)
- [CLI installation](https://appwrite.io/docs/tooling/command-line/installation)
- [Skills](https://appwrite.io/docs/tooling/skills)

### Tutorials

- [Google OAuth with Expo Router](https://appwrite.io/blog/post/google-oauth-expo)
- [Implementing Google OAuth with Expo Router](https://appwrite.io/blog/post/google-oauth-expo)
- [Fixing OAuth2 issues in Appwrite](https://appwrite.io/blog/post/fixing-oauth2-issues-in-appwrite-cloud)
