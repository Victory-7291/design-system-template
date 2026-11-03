---
"design-system-template": major
---

**Remove Paperclip-legacy dead contexts and hooks** (zero consumers — the brand guide and `main.tsx` only ever mount `ThemeProvider` + `ToastProvider`):

- Deleted `DialogContext` (NewIssue/NewGoal/NewAgent dialog stacks, the `IssueWorkMode` type, and the onboarding wizard API — the `/onboarding` route it references does not exist in the template).
- Deleted `SidebarContext` (mobile drawer + retired icon-rail compatibility shim: `collapsed`/`peeking`/`forceCollapsed`/`routeRequestsCollapsed` were all inert by design).
- Deleted `BreadcrumbContext` (breadcrumb hierarchy + company-name page-title builder for a product surface that no longer exists).
- Deleted `hooks/usePrefersReducedMotion` (no consumers; reduced-motion is handled globally in CSS).
- Trimmed `ToastContext` dead exports: `useToast` and `useOptionalToastState` (`useOptionalToastActions` stays — `lib/use-copy-action.ts` consumes it).
- Storybook preview now wraps only Theme + Toast + Tooltip providers.

This continues the repo's stated lifecycle rule: a file in `context/`/`hooks/`/`lib/` earns its place by having a real consumer. Tests updated accordingly (6 suites, 16 tests).
