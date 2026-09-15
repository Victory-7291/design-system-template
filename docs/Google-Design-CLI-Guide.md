# Google Design CLI (`@google/design.md`) Practical Guide & CI Pipeline Integration

> **This guide details the core capabilities of the official Google `@google/design.md` CLI tool, its four primary command workflows, parameter specifications, and automated integration within continuous integration (CI/CD) pipelines.**

---

## 1. Tool Overview: More Than a Static Linter

`@google/design.md` is an industrial-grade, agent-first CLI toolchain created within the Google Stitch ecosystem for **plain-text design systems**. It serves three distinct engineering functions:

1. **Accessibility & Design Quality Gate**: Validates YAML structure, detects broken token references and orphaned variables, and calculates foreground-to-background contrast ratios against WCAG 2.1 AA mathematical standards.
2. **Semantic Regression Radar**: Compares two versions of `DESIGN.md` across PR branches, auditing token additions, deletions, and modifications while flagging destructive design regressions (`regression: true`).
3. **Multi-Platform Token Exporter**: Compiles plain-text design specifications into modern frontend formats, including Tailwind CSS v4 `@theme`, Tailwind v3 JSON, W3C DTCG standard JSON, and native CSS custom properties.

---

## 2. Core Commands & Syntax

The CLI binary aliases include `design.md` and `designmd`. It can be invoked via `bunx design.md <command>` or configured in `package.json` scripts.

### 2.1 `lint`: Structural Verification & WCAG Contrast Auditing
- **Purpose**: Parses `DESIGN.md` syntax and validates WCAG 2.1 AA mathematical contrast ratios.
- **Syntax**:
  ```bash
  design.md lint [OPTIONS] <FILE>
  ```
- **Core Checks**:
  - **Schema Validation**: Ensures required metadata (`version`, `name`) and top-level blocks (`colors`, `typography`, `rounded`, `spacing`, `components`) conform to Google Stitch specifications.
  - **Broken Reference Detection (`broken-ref`)**: Identifies references (e.g., `{colors.foo}`) pointing to undeclared tokens.
  - **Orphaned Token Detection (`orphaned-tokens`)**: Flags declared palette tokens not consumed by any component definition.
  - **Automated Contrast Calculations (`contrast-ratio`)**: Extracts `textColor` and `backgroundColor` pairs for each component, calculating luminance contrast in sRGB space. Normal text must satisfy **≥ 4.5:1**, while large display text must satisfy **≥ 3.0:1**.
- **Options**:
  - `--format="json"`: Emits machine-readable JSON containing `findings` and `summary` (ideal for CI evaluation).
  - `--format="text"`: Emits formatted plain text for terminal display.
  - `<FILE>`: Target path, or `-` to read from standard input.

### 2.2 `diff`: Semantic Version Comparison & Regression Auditing
- **Purpose**: Analyzes the delta between two design specifications (e.g., a pull request branch vs. `main`).
- **Syntax**:
  ```bash
  design.md diff [OPTIONS] <BEFORE> <AFTER>
  ```
- **Output Capabilities**:
  - Categorized change breakdowns for `colors`, `typography`, `rounded`, `spacing`, and `components` (`added`, `removed`, `modified`).
  - **Quality Delta Tracking (`findings.delta`)**: Measures net increases in errors and warnings between versions.
  - **Regression Boolean Flag (`regression`)**: Automatically resolves to `true` if a change introduces new contrast violations or schema errors, enabling CI pipelines to reject pull requests.

### 2.3 `export`: Multi-Target Token Compilation
- **Purpose**: Exports plain-text design tokens directly into downstream design and code environments.
- **Syntax**:
  ```bash
  design.md export <FILE> --format=<FORMAT> [--prefix=<PREFIX>]
  ```
- **Supported Formats (`--format`)**:
  - `css-tailwind`: Outputs modern **Tailwind CSS v4 `@theme`** directives (`--color-*`, `--font-*`, `--spacing-*`, `--radius-*`).
  - `dtcg`: Emits standard **W3C Design Tokens Community Group (2025.10)** compliant JSON dictionaries.
  - `css-vars`: Exports native CSS variables with custom prefixing (e.g., `--prefix=ds-` produces `--ds-color-primary: #09090b;`).
  - `json-tailwind` / `tailwind`: Generates Tailwind v2/v3 compatible `theme.extend` configuration objects.

### 2.4 `spec`: Self-Documenting Specification Output
- **Purpose**: Prints the active Google Stitch specification markdown text supported by the CLI engine.
- **Syntax**:
  ```bash
  design.md spec
  ```

---

## 3. Automated CI/CD Pipeline Integration

### Pipeline 1: Pull Request Syntax & Accessibility Gate (`lint:design`)
Ensures no malformed syntax or WCAG contrast regressions enter the repository.

#### Configuration (`package.json` & `turbo.json`)
```json
// package.json
{
  "scripts": {
    "lint:design": "design.md lint DESIGN.md --format text"
  }
}
```

```json
// turbo.json
{
  "tasks": {
    "lint:design": {
      "inputs": ["DESIGN.md"],
      "outputs": []
    }
  }
}
```

#### CI Workflow Definition (GitHub Actions)
```yaml
- name: Verify Plain-Text Design System
  run: bun run lint:design
```

---

### Pipeline 2: Semantic Regression Interceptor (`diff:design`)
Compares the PR branch against `origin/main` to block breaking design regressions:

```bash
git show origin/main:DESIGN.md > /tmp/base-DESIGN.md
bunx design.md diff /tmp/base-DESIGN.md DESIGN.md --format json > /tmp/diff-result.json

IS_REGRESSION=$(jq '.regression' /tmp/diff-result.json)
if [ "$IS_REGRESSION" = "true" ]; then
  echo "❌ Design regression detected! A11y violations or schema errors introduced."
  exit 1
fi
```

---

### Pipeline 3: Automated Multi-Platform Export
Compiles tokens to different formats during distribution builds:

```bash
# Export CSS custom properties
bunx design.md export DESIGN.md --format=css-vars --prefix=ds- > packages/design-tokens/dist/stitch.css

# Export Tailwind v4 @theme declarations
bunx design.md export DESIGN.md --format=css-tailwind > packages/design-tokens/dist/theme.css
```

---

## 4. Troubleshooting & Best Practices

1. **`contrast-ratio` Warnings**:
   - Inspect the component's `textColor` and `backgroundColor` pairing. Ensure normal text meets ≥ 4.5:1 contrast against its background. In light mode, pair dark text with light backgrounds; in dark mode, pair white text with dark backgrounds.
2. **`broken-ref` Errors**:
   - Verify that token aliases match declared keys in the `colors`, `typography`, or `rounded` blocks.
3. **`orphaned-tokens` Notices**:
   - Palette colors declared in `colors` that are not referenced in the `components` section produce warnings. Consume these tokens in component definitions or document them as reserved palette scales.
