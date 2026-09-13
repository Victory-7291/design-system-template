/**
 * Universal font tokens for the Design System.
 * Font variables (--font-sans, --font-mono) are declared by @design-system/tokens
 * so that consuming applications never need a hard dependency on next/font.
 */
export const fonts = {
  sans: "var(--font-sans, Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
  mono: "var(--font-mono, 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)",
} as const;

export const fontVariables = {
  sans: "--font-sans",
  mono: "--font-mono",
} as const;
