import type { Meta, StoryObj } from "@storybook/react";
import { ArticleShell, Callout, Prose } from "@design-system/content-ui";
import { Button } from "@design-system/ui";

const meta: Meta = {
  title: "Content/EditorialDemo",
};

export default meta;

export const SampleArticle: StoryObj = {
  render: () => (
    <ArticleShell
      title="Building an AI-Native Design System"
      subtitle="How code-as-design, strict token compilation, and visual sandboxes unlock autonomous consistency."
      category="Engineering & Architecture"
      author="Design Systems Team"
      publishedAt="2026-09-13"
    >
      <Prose>
        <p>
          A design system for an AI-native organization is not an archive of Figma frames.
          It is an executable pipeline where tokens, typed primitives, and regression tests act as hard boundaries for coding agents.
        </p>

        <Callout variant="tip" title="Single Source of Truth">
          Tokens are authored in platform-agnostic W3C DTCG JSON format, compiled directly into Tailwind v4 variables and TypeScript types.
        </Callout>

        <h2>The Architecture Boundary</h2>
        <p>
          Instead of scattering unconstrained CSS or letting AI invent arbitrary purple glows, our agent UI contract enforces strict design discipline:
        </p>
        <ul>
          <li><strong>Zero Uncalibrated Gradients:</strong> Color carries semantic intent rather than generic decorative noise.</li>
          <li><strong>Single Accent Policy:</strong> One locked accent color across the entire user experience.</li>
          <li><strong>Reading Ergonomics:</strong> Reading line width strictly capped at 68 characters.</li>
        </ul>

        <Callout variant="warning" title="Agent Guardrail">
          Agents cannot hand-roll hex codes or custom box-shadows. Every visible primitive must query the design catalog first.
        </Callout>

        <div className="pt-6">
          <Button variant="default" size="lg">
            Explore Documentation
          </Button>
        </div>
      </Prose>
    </ArticleShell>
  ),
};
