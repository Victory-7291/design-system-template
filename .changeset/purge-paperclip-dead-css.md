---
"design-system-template": minor
---

**Purge Paperclip-legacy dead CSS** (~2,700 lines removed from `src/index.css`, plus `src/motion-tokens.css` slimmed to the 4 core motion primitives):

- Deleted all consumer-less extracted token families: the `--sz-*` / `--rad-*` / `--pct-*` Batch 3-4 transcriptions, the `--hex-*` / `--app-logo-tile-*` / `--gradient-extract-*` / `--shadow-extract-*` verbatim block, `--agent-1a…10b` gradients, `--pill-guy-*`, `--folder-color-*`, `--gtc-*`, `--dashboard-*`, `--chip-match-*`, `--ds-doc-annotation-*`, `--bubble-agent*`, `--side-panel-*` / streamlined chrome, `--organization-popover-*`, and the dead `--profile-popover-*` members (row-height / row-gap / label-line-height kept — ThemeToggle consumes them).
- Deleted all consumer-less animation classes and keyframes: the `tc-*` chat-thread family, `agent-cap-*` capsule motif, `hb-*` remnants' sibling blocks (scrollbar auto-hide / while-scrolling, mobile nav / toolbars, dashboard rows, cot ticker, transcript live-tail, decision-disclosure, quicklook, pill-guy, ds-markdown / ds-mdxeditor / mention chips / mermaid themes, ds-thinking), plus their reduced-motion blocks.
- Deleted consumer-less scoped `--motion-*` tokens (marker/bubble/tool enter, status enter/exit, approval pulse, plan/question, turn fold/meta, line scroll, scroll-pill, pane glide, side-panel tab, mobile nav, count tween, interstitial dwell, scrollbar idle delay, duration deliberate/swap/enter/exit, scroll-pill easings) and the 21 `--onboarding-motion-*` tokens.
- The machine-readable token-gate allowlist was trimmed to the three entries whose files still exist; kept tokens: `--tp-transform-opacity`, `--tp-border-color-background-color`, `--z-120`, `--text-nano/micro/compact`, `--native-select-*`, `--success`, `--banner-*`.

No TSX/TS API changes — every removed token, class, and keyframe had zero consumers in the template. Brand-guide copy referencing the removed agent gradients and capsule motif was updated.
