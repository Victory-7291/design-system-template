# create-design-system-template

Official CLI scaffolding tool for [design-system-template](https://github.com/Victory-7291/design-system-template) — an autonomous, production-grade anti-slop Tailwind CSS v4 design system with automated quality gates and OKLCH color token governance.

## Quick Start

### Interactive Mode

```bash
npx create-design-system-template
# or
npm create design-system-template
# or
bun create design-system-template
# or
pnpm create design-system-template
```

### One-Shot Command (Flags & Arguments)

```bash
# Standalone application starter (Next.js / Vite)
npx create-design-system-template my-ds --mode standalone --package-manager bun

# Monorepo shared package (e.g. for Turborepo / pnpm workspaces)
npx create-design-system-template @repo/design-system --mode package --package-manager pnpm
```

## Options

| Flag | Description | Default |
| :--- | :--- | :--- |
| `[name]` | Project name or target directory | Interactive prompt (`my-design-system`) |
| `-m, --mode <mode>` | Template mode: `standalone` or `package` | Interactive prompt |
| `-p, --package-manager <pm>` | Package manager: `bun`, `pnpm`, `npm`, `yarn` | Auto-detected / `bun` |
| `-d, --dir <directory>` | Custom directory path | `./<name>` |
| `--disable-git` | Skip Git repository initialization | `false` |
| `--skip-install` | Skip dependency installation | `false` |
| `--branch <branch>` | Git branch or tag to download | `main` |

## Template Modes

1. **Standalone Application Starter (`--mode standalone`)**:
   - Complete application workspace with Vite / Next.js support.
   - Built-in Storybook 10 workshop.
   - 4 automated anti-slop token gates (`check:tokens`, `check:brand`, `check:a11y`, `check`).
   - 59 automated Vitest unit tests.
   - Locally bundled Inter Variable WOFF2 typography.
   - Automatic `git init` and initial commit.

2. **Monorepo Shared Package (`--mode package`)**:
   - Ready-to-use `@repo/design-system` package for Turborepo, pnpm workspaces, or Bun monorepos.
   - Stripped application shell files; preserves all 26+ Radix/CVA UI primitives, OKLCH tokens, and motion tokens.
   - Standardized package `"exports"` for frictionless workspace imports.

## License

[MIT](https://github.com/Victory-7291/design-system-template/blob/main/LICENSE)
