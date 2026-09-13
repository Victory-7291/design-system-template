import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils.js";

const textVariants = cva("text-[var(--color-text-primary)] font-sans antialiased", {
  variants: {
    variant: {
      display: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none",
      h1: "text-3xl md:text-4xl font-bold tracking-tight leading-tight",
      h2: "text-2xl md:text-3xl font-semibold tracking-tight leading-snug",
      h3: "text-xl md:text-2xl font-semibold tracking-tight",
      body: "text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[65ch]",
      caption: "text-xs text-[var(--color-text-muted)] leading-normal tracking-wide",
      eyebrow: "text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)]",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const Text: React.FC<TextProps> = ({
  as: Component = "p",
  variant,
  className,
  children,
  ...props
}) => {
  return (
    <Component className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  );
};
