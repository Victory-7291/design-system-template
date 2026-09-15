# Design System Downstream Application Usage Guide

> **Audience**: Frontend engineers, full-stack developers, and AI Coding Agents composing UI in downstream application codebases.  
> **Objective**: Establishes standards for importing and consuming `@design-system/tokens`, `@design-system/ui`, and `@design-system/content-ui` without visual drift or styling redundancy.

---

## 1. Quickstart & Global Style Integration

Follow these steps to initialize the design system in any application (Next.js, Vite, Remix, etc.):

### 1.1 Dependency Declaration
Declare workspace dependencies in the application's `package.json`:

```json
{
  "dependencies": {
    "@design-system/tokens": "workspace:*",
    "@design-system/ui": "workspace:*"
  }
}
```
*Note: For long-form editorial, blog, or documentation pages, also install `@design-system/content-ui`.*

### 1.2 Global CSS Setup (Tailwind CSS v4)
In your global CSS entry point (`app/globals.css` or `src/styles.css`), import design tokens prior to importing Tailwind CSS:

```css
/* 1. Inject design tokens and Tailwind v4 @theme directives */
@import "@design-system/tokens/css";

/* 2. Import Tailwind CSS v4 engine */
@import "tailwindcss";

/* 3. Base page reset */
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  min-height: 100dvh;
}
```

---

## 2. Root Layout & Theme Configuration (ThemeProvider)

To ensure seamless light/dark mode switching without SSR hydration flicker, wrap the root layout with `ThemeProvider`:

```tsx
// app/layout.tsx (Next.js App Router Example)
import "@design-system/tokens/css";
import "./globals.css";
import { ThemeProvider, ModeToggle } from "@design-system/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-[100dvh] flex flex-col">
        <ThemeProvider>
          {/* Header Example */}
          <header className="border-b border-border px-6 py-4 flex items-center justify-between">
            <span className="font-bold tracking-tight">Application</span>
            <ModeToggle />
          </header>

          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 3. Component Consumption Standards

### 3.1 Standard Interactive Primitives (`@design-system/ui`)
All standard interface controls should be imported from the 53 primitives exposed by `@design-system/ui`:

```tsx
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from "@design-system/ui";

export function ProjectStatusCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Badge variant="secondary">Active</Badge>
        </div>
        <CardDescription>Composed using standard design system primitives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter project name..." />
        <Button className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
}
```

### 3.2 Editorial Layout Primitives (`@design-system/content-ui`)
For long-form reading, documentation, or blog articles, utilize `@design-system/content-ui`:

```tsx
import { ArticleShell, Callout, Prose } from "@design-system/content-ui";

export function ArticlePage() {
  return (
    <ArticleShell
      title="Building an AI-Native Design System"
      subtitle="From atomic tokens to automated CI verification pipelines"
      author="Design Systems Team"
      publishedAt="2026-09-16"
      category="Architecture"
    >
      <Prose>
        <p>
          In an AI-augmented engineering environment, the design system acts as an executable
          contract guaranteeing cross-platform consistency.
        </p>

        <Callout type="info" title="Core Design Rule">
          Zero hardcoded color values, strict semantic token bindings, and comprehensive WCAG 2.1 AA contrast compliance.
        </Callout>
      </Prose>
    </ArticleShell>
  );
}
```

---

## 4. Styling Conventions & Governance Rules

### 4.1 Recommended Practices (Do's)
- **Consume Semantic Classes**: Use `bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-card-foreground`.
- **Preserve Tactile Micro-Motions**: Utilize `active:scale-[0.97]` and `duration-fast` on clickable interactive triggers.
- **Maintain Single Primary CTA**: Ensure only one high-contrast primary button is present in any single viewport.

### 4.2 Prohibited Practices (Don'ts)
- **No Hardcoded Hex/RGB Values**: Never write arbitrary color strings like `bg-[#121212]` or `text-[#000]` in application JSX.
- **No Direct Foundation Token Consumption**: Application code must never reference foundation tokens (e.g., `var(--ds-foundation-color-neutral-950)`) directly; consume semantic variables or Tailwind classes instead.
- **No Nested Card Containers**: Avoid nesting cards within cards; structure content hierarchy using whitespace, subtle dividers, and surface elevation tiers.
- **No Uncalibrated Drop Shadows**: Use standard elevation tokens rather than custom multi-color gradient shadows.
