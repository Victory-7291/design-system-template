import * as React from "react";
import { cn } from "@design-system/ui";

export interface ArticleShellProps {
  title: string;
  subtitle?: string;
  publishedAt?: string;
  author?: string;
  category?: string;
  children: React.ReactNode;
  className?: string;
}

export const ArticleShell: React.FC<ArticleShellProps> = ({
  title,
  subtitle,
  publishedAt,
  author,
  category,
  children,
  className,
}) => {
  return (
    <article className={cn("w-full max-w-[68ch] mx-auto px-4 py-12 md:py-20 font-sans", className)}>
      <header className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        {category && (
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-action-accent)] font-semibold mb-3 inline-block">
            {category}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.15] mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
            {subtitle}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] font-mono">
          {author && <span>By {author}</span>}
          {author && publishedAt && <span>·</span>}
          {publishedAt && <time dateTime={publishedAt}>{publishedAt}</time>}
        </div>
      </header>

      <main className="article-body">
        {children}
      </main>
    </article>
  );
};
