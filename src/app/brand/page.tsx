"use client";

import { useEffect, useState } from "react";
import pkg from "../../../package.json";
import {
  BookOpen,
  Bot,
  Check,
  ChevronDown,
  CircleDot,
  Command as CommandIcon,
  DollarSign,
  Hexagon,
  History,
  Inbox,
  LayoutDashboard,
  Layers,
  ListTodo,
  Mail,
  Plus,
  Search,
  Settings,
  Target,
  Trash2,
  Upload,
  User,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable-panels";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { RadioCardGroup } from "@/components/ui/radio-card";

import { ThemeToggle } from "@/components/ThemeToggle";
import { EmptyState } from "@/components/EmptyState";
import { InlineBanner } from "@/components/InlineBanner";
import {
  StatusBadge,
  AgentStatusBadge,
  AgentStatusCapsule,
  IssueStatusBadge,
} from "@/components/StatusBadge";
import { StatusGlyph } from "@/components/StatusGlyph";
import { StatusIcon } from "@/components/StatusIcon";
import { useToastActions } from "@/context/ToastContext";
import { agentStatusDot, agentStatusDotDefault } from "@/lib/status-colors";

/* ------------------------------------------------------------------ */
/*  Section registry — drives the sidebar TOC and the scroll spy       */
/* ------------------------------------------------------------------ */

/** Single-sourced from package.json — never retype the version in copy. */
const VERSION = `v${pkg.version.split(".").slice(0, 2).join(".")}`;

const SECTIONS = [
  { id: "foundations", num: "01", label: "Foundations" },
  { id: "typography", num: "02", label: "Typography" },
  { id: "color", num: "03", label: "Color" },
  { id: "spacing", num: "04", label: "Spacing & layout" },
  { id: "radius", num: "05", label: "Border radius" },
  { id: "iconography", num: "06", label: "Iconography" },
  { id: "motion", num: "07", label: "Motion" },
  { id: "components", num: "08", label: "Components" },
  { id: "status", num: "09", label: "States & status" },
  { id: "tokens", num: "10", label: "Design tokens" },
] as const;

function useScrollSpy() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  useEffect(() => {
    // Last section whose top has crossed a line ~120px below the viewport top.
    // Above the first section (the hero) that is always the first entry.
    const onScroll = () => {
      const pos = window.scrollY + 120;
      let current: string = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------ */
/*  Layout chrome                                                      */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Layers className="size-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Design System
          </span>
          <span className="font-mono text-(length:--text-nano) text-muted-foreground">
            {VERSION}
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:inline-flex">
          <span className="font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
            Version
          </span>
          <span className="font-mono text-(length:--text-micro)">
            {VERSION} — template
          </span>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="sticky top-14 hidden w-64 shrink-0 self-start px-6 py-10 lg:block">
      <p className="mb-6 font-mono text-(length:--text-micro) text-muted-foreground">
        Design System {VERSION} <span className="mx-1">·</span>{" "}
        {new Date().getFullYear()}
      </p>
      <nav aria-label="Sections">
        <ul>
          {SECTIONS.map(({ id, num, label }) => {
            const isActive = id === active;
            return (
              <li key={id} className="border-b border-border">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  className={`flex items-center gap-3 py-3 font-mono text-sm transition-colors ${
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-(length:--text-micro) opacity-70">
                    {num}
                  </span>
                  <span>·</span>
                  <span>
                    {label}
                    {isActive ? " —" : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Section shells                                                     */
/* ------------------------------------------------------------------ */

function SectionShell({
  id,
  num,
  kicker,
  title,
  lede,
  children,
}: {
  id: string;
  num: string;
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 space-y-8 border-t border-border pt-16"
    >
      <span className="inline-flex items-center overflow-hidden rounded-full border border-border bg-card text-xs">
        <span className="px-3 py-1.5 font-mono text-muted-foreground">
          {num}
        </span>
        <span className="border-l border-border px-3 py-1.5 font-medium uppercase tracking-widest">
          {kicker}
        </span>
      </span>
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      )}
      {children}
    </section>
  );
}

function SubSection({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 pt-4">
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2.5">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {aside && (
          <span className="font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
            {aside}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Mono eyebrow + bold statement + muted body — the foundations card. */
function PrincipleCard({
  num,
  kicker,
  statement,
  body,
}: {
  num: string;
  kicker: string;
  statement: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
        {num} · {kicker}
      </p>
      <p className="mt-2 text-lg font-semibold tracking-tight">{statement}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Swatch card — color block + name + token map + description         */
/* ------------------------------------------------------------------ */

function SwatchCard({
  name,
  cssVar,
  description,
}: {
  name: string;
  cssVar: string;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div
        className="h-20 border-b border-border"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="space-y-1 p-4">
        <p className="text-sm font-semibold">{name}</p>
        <p className="font-mono text-(length:--text-micro) text-muted-foreground">
          {cssVar}
        </p>
        <p className="pt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

/** TOKEN | VALUE | VISUAL | USAGE row used by the spacing table. */
const SPACING_ROWS: { t: string; v: string; bar: number; u: string }[] = [
  { t: "gap-1 · p-1", v: "4px", bar: 4, u: "Icon-to-label, chip internals" },
  { t: "gap-2 · p-2", v: "8px", bar: 8, u: "Tight gaps, badge padding" },
  {
    t: "gap-3 · p-3",
    v: "12px · 0.75rem",
    bar: 12,
    u: "Compact card padding, control gaps",
  },
  {
    t: "gap-4 · p-4",
    v: "16px · 1rem",
    bar: 16,
    u: "Default card padding, form field gaps",
  },
  {
    t: "gap-6 · p-6",
    v: "24px · 1.5rem",
    bar: 24,
    u: "Card section padding, grid gutters",
  },
  { t: "gap-8 · p-8", v: "32px · 2rem", bar: 32, u: "Subsection blocks" },
  { t: "py-16", v: "64px · 4rem", bar: 64, u: "Section rhythm on long pages" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DesignGuide() {
  const { pushToast } = useToastActions();
  const active = useScrollSpy();
  const [status, setStatus] = useState("todo");
  const [selectValue, setSelectValue] = useState("in_progress");
  const [menuChecked, setMenuChecked] = useState(true);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [switchLg, setSwitchLg] = useState(false);
  const [radioValue, setRadioValue] = useState("balanced");

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar active={active} />

        <main className="min-w-0 flex-1 px-6 pb-24 lg:px-10">
          {/* ======================================================== */}
          {/*  HERO                                                    */}
          {/* ======================================================== */}
          <div className="space-y-8 pb-16 pt-16">
            <span className="inline-flex items-center overflow-hidden rounded-full border border-border bg-card text-xs">
              <span className="px-3 py-1.5 font-mono text-muted-foreground">
                {VERSION}
              </span>
              <span className="border-l border-border px-3 py-1.5 font-medium uppercase tracking-widest">
                Design System
              </span>
            </span>
            <h1 className="max-w-3xl text-6xl font-semibold tracking-tight md:text-7xl">
              The Design System Template.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              One token model, one surface.{" "}
              <code className="font-mono text-sm">src/index.css</code> is
              canonical — every component vendors the same colors, type, and
              radius. Extracted from the Paperclip product UI: direct.
              Confident. Never decorative.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => scrollToSection("components")}
              >
                Browse components <ChevronDown />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => scrollToSection("tokens")}
              >
                View design tokens
              </Button>
            </div>

            {/* Meta table */}
            <div className="max-w-md overflow-hidden rounded-lg border border-border bg-card">
              {[
                [
                  "Status",
                  <span key="s" className="flex items-center justify-end gap-2">
                    <span className="size-2 rounded-full bg-(--status-task-done)" />
                    Active
                  </span>,
                ],
                ["Version", VERSION],
                ["Token layer", "src/index.css"],
                ["Primitives", "25 parts"],
                ["Themes", "light · dark"],
                ["Stack", "React · Tailwind v4"],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="flex items-center justify-between border-b border-border px-4 py-2.5 last:border-0"
                >
                  <span className="font-mono text-(length:--text-micro) uppercase tracking-widest text-muted-foreground">
                    {label}
                  </span>
                  <span className="font-mono text-(length:--text-micro)">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/*  01 FOUNDATIONS                                          */}
          {/* ======================================================== */}
          <SectionShell
            id="foundations"
            num="01"
            kicker="Foundations"
            title={
              <>
                Editorial gravity.
                <br />
                Operator density.
              </>
            }
            lede={
              <>
                Every screen answers, in order: what is happening, does it need
                me, what do I do about it. Density comes from information, never
                from chrome.
              </>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <PrincipleCard
                num="01"
                kicker="One way to say each thing"
                statement="One component per job."
                body="One Button, one Card, one Badge, one EmptyState. Variants are props, not new components. Before creating a component, prove no existing one covers the job."
              />
              <PrincipleCard
                num="02"
                kicker="Tokens are the only source"
                statement="No hex, no raw px."
                body="All color, spacing, radius, type, and motion values come from the token layer. Tailwind palette classes are hardcoded values in spirit — semantic roles only."
              />
              <PrincipleCard
                num="03"
                kicker="Hierarchy through structure"
                statement="Every border must justify itself."
                body="Prefer position, size, and weight over fills and dividers. A screen should survive the removal of one visual layer."
              />
              <PrincipleCard
                num="04"
                kicker="Status is systematic"
                statement="Learn the vocabulary once."
                body="Running, paused, blocked, awaiting-approval map to a single semantic status token set used identically everywhere — badge, row, chart, log."
              />
              <PrincipleCard
                num="05"
                kicker="Machine values look machine-made"
                statement="Telemetry reads in mono."
                body="IDs, costs, token counts, timestamps, and log output use the monospace token and consistent formatting helpers — never ad-hoc per screen."
              />
              <PrincipleCard
                num="06"
                kicker="Words are part of the system"
                statement="Buttons name the action."
                body="One name per concept across the entire UI. Errors say what happened and what to do. Empty states say what to do first."
              />
            </div>

            <SubSection title="Surfaces" aside="Where the system applies">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                One token layer spans every surface built from this template.
                The canonical source is{" "}
                <code className="font-mono text-xs text-foreground">
                  src/index.css
                </code>{" "}
                (Tailwind v4, no tailwind config file); components consume
                tokens through utilities only. Theme, density, and content
                adapt; the vocabulary doesn&apos;t.
              </p>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  02 TYPOGRAPHY                                           */}
          {/* ======================================================== */}
          <SectionShell
            id="typography"
            num="02"
            kicker="Typography"
            title={
              <>
                Two stacks.
                <br />
                Each with one job.
              </>
            }
            lede="Inter carries body text, UI labels, and display weight. The system mono stack carries the engineering credibility — telemetry, code, timestamps. Nothing else."
          >
            <SubSection title="Families" aside="Two stacks">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
                    Sans
                  </p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight">
                    Inter
                  </p>
                  <p className="mt-1 font-mono text-(length:--text-micro) text-muted-foreground">
                    100–900 variable · InterVariable
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The workhorse. Body, labels, navigation, buttons, and
                    display headings (with tight tracking).
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
                    Mono
                  </p>
                  <p className="mt-2 font-mono text-4xl font-medium tracking-tight">
                    Mono
                  </p>
                  <p className="mt-1 font-mono text-(length:--text-micro) text-muted-foreground">
                    ui-monospace · SFMono · Menlo
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The engineering layer. Identifiers, hex codes, tool calls,
                    telemetry chips —{" "}
                    <code className="font-mono text-xs">tabular-nums</code>{" "}
                    always on.
                  </p>
                </div>
              </div>
            </SubSection>

            <SubSection title="Type ramp" aside="Use the role, not the size">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-6 border-b border-border px-4 py-2 font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
                  <span className="w-28 shrink-0">Role</span>
                  <span className="flex-1">Sample</span>
                  <span className="hidden w-56 shrink-0 text-right md:block">
                    Spec
                  </span>
                </div>
                {[
                  {
                    role: "display",
                    sample: (
                      <span className="text-5xl font-semibold tracking-tight">
                        Display
                      </span>
                    ),
                    spec: "text-5xl · 600 · tight",
                  },
                  {
                    role: "title",
                    sample: (
                      <span className="text-2xl font-semibold tracking-tight">
                        Section title
                      </span>
                    ),
                    spec: "text-2xl · 600 · tight",
                  },
                  {
                    role: "heading",
                    sample: (
                      <span className="text-sm font-semibold">Card title</span>
                    ),
                    spec: "text-sm · 600",
                  },
                  {
                    role: "body",
                    sample: (
                      <span className="text-sm">
                        Body text for reading and scanning.
                      </span>
                    ),
                    spec: "text-sm · 400",
                  },
                  {
                    role: "muted",
                    sample: (
                      <span className="text-sm text-muted-foreground">
                        Muted supporting description.
                      </span>
                    ),
                    spec: "text-sm · muted",
                  },
                  {
                    role: "label",
                    sample: (
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Section label
                      </span>
                    ),
                    spec: "text-xs · 600 · caps",
                  },
                  {
                    role: "micro",
                    sample: (
                      <span className="text-(length:--text-micro) text-muted-foreground">
                        Micro caption
                      </span>
                    ),
                    spec: "--text-micro · 11px",
                  },
                  {
                    role: "mono id",
                    sample: (
                      <span className="font-mono text-xs">
                        TSK-101 · 240ms · $0.42
                      </span>
                    ),
                    spec: "font-mono · text-xs",
                  },
                ].map(({ role, sample, spec }) => (
                  <div
                    key={role}
                    className="flex items-center gap-6 border-b border-border px-4 py-4 last:border-0"
                  >
                    <span className="w-28 shrink-0 font-mono text-(length:--text-micro) text-muted-foreground">
                      {role}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{sample}</span>
                    <span className="hidden w-56 shrink-0 text-right font-mono text-(length:--text-nano) text-muted-foreground md:block">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  03 COLOR                                                */}
          {/* ======================================================== */}
          <SectionShell
            id="color"
            num="03"
            kicker="Color"
            title={
              <>
                A neutral spine.
                <br />
                Color only where it means.
              </>
            }
            lede={
              <>
                OKLCH grays — white surfaces separated by borders, not tonal
                fills. Semantic tokens swap under{" "}
                <code className="font-mono text-sm">.dark</code>; status hues
                carry product meaning and are literal in both themes.
              </>
            }
          >
            <SubSection title="Semantic tokens" aside="Theme-aware">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <SwatchCard
                  name="Background"
                  cssVar="--background"
                  description="Page canvas. Everything sits on it."
                />
                <SwatchCard
                  name="Foreground"
                  cssVar="--foreground"
                  description="Primary text and icon fills."
                />
                <SwatchCard
                  name="Card"
                  cssVar="--card"
                  description="Cards and panels — bordered, not filled."
                />
                <SwatchCard
                  name="Popover"
                  cssVar="--popover"
                  description="Overlay surfaces: menus, popovers, tooltips."
                />
                <SwatchCard
                  name="Primary"
                  cssVar="--primary"
                  description="Neutral primary action and emphasis."
                />
                <SwatchCard
                  name="Secondary"
                  cssVar="--secondary"
                  description="Secondary fills and quiet controls."
                />
                <SwatchCard
                  name="Muted"
                  cssVar="--muted"
                  description="Subtle fills, skeletons, hover washes."
                />
                <SwatchCard
                  name="Muted foreground"
                  cssVar="--muted-foreground"
                  description="Captions, placeholders, mono labels."
                />
                <SwatchCard
                  name="Accent"
                  cssVar="--accent"
                  description="Hover fills and active nav items."
                />
                <SwatchCard
                  name="Destructive"
                  cssVar="--destructive"
                  description="Destructive actions only — it must earn its place."
                />
                <SwatchCard
                  name="Border"
                  cssVar="--border"
                  description="Hairline borders and dividers."
                />
                <SwatchCard
                  name="Input"
                  cssVar="--input"
                  description="Control borders, distinct from hairlines in dark mode."
                />
                <SwatchCard
                  name="Ring"
                  cssVar="--ring"
                  description="Focus rings."
                />
              </div>
            </SubSection>

            <SubSection title="Sidebar & chart" aside="Auxiliary tiers">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <SwatchCard
                  name="Sidebar"
                  cssVar="--sidebar"
                  description="Shell surface for the app sidebar."
                />
                <SwatchCard
                  name="Sidebar border"
                  cssVar="--sidebar-border"
                  description="Sidebar hairlines."
                />
                <SwatchCard
                  name="Sidebar accent"
                  cssVar="--sidebar-accent"
                  description="Sidebar hover and active fills."
                />
                <SwatchCard
                  name="Chart 1–5"
                  cssVar="--chart-1"
                  description="A five-step grayscale series for data viz; meaning comes from labels, not hue."
                />
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  04 SPACING & LAYOUT                                     */}
          {/* ======================================================== */}
          <SectionShell
            id="spacing"
            num="04"
            kicker="Spacing & layout"
            title={
              <>
                4-point base.
                <br />
                One rhythm per container.
              </>
            }
            lede="Spacing routes through Tailwind's 4px base — every value is a multiple. Vertical rhythm inside a container uses one gap value, not per-element margins, and siblings never carry both margin and gap."
          >
            <SubSection title="The scale" aside="Tailwind base · 4px">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-6 border-b border-border px-4 py-2 font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
                  <span className="w-36 shrink-0">Token</span>
                  <span className="hidden w-36 shrink-0 md:block">Value</span>
                  <span className="hidden w-32 shrink-0 md:block">Visual</span>
                  <span>Usage</span>
                </div>
                {SPACING_ROWS.map(({ t, v, bar, u }) => (
                  <div
                    key={t}
                    className="flex items-center gap-6 border-b border-border px-4 py-3 last:border-0"
                  >
                    <span className="w-36 shrink-0 font-mono text-(length:--text-micro)">
                      {t}
                    </span>
                    <span className="hidden w-36 shrink-0 font-mono text-(length:--text-micro) text-muted-foreground md:block">
                      {v}
                    </span>
                    <span className="hidden w-32 shrink-0 md:block">
                      <span
                        className="block h-3 bg-foreground/25"
                        style={{ width: bar * 2 }}
                      />
                    </span>
                    <span className="text-xs text-muted-foreground">{u}</span>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="Layout containers" aside="Two widths">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-mono text-(length:--text-micro)">
                    max-w-4xl
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reading column for documents, settings, and detail pages.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-mono text-(length:--text-micro)">
                    max-w-7xl
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    App frame for shell + content layouts — this page.
                  </p>
                </div>
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  05 BORDER RADIUS                                        */}
          {/* ======================================================== */}
          <SectionShell
            id="radius"
            num="05"
            kicker="Border radius"
            title={
              <>
                One anchor.
                <br />
                The whole ladder follows.
              </>
            }
            lede={
              <>
                Radius isn&apos;t a set of magic numbers — it&apos;s a single
                knob.{" "}
                <code className="font-mono text-sm">--radius: 0.5rem</code>{" "}
                (8px) is the anchor and every other step is calc&apos;d off it,
                so the entire corner language retunes from one variable.
              </>
            }
          >
            <SubSection title="The ladder" aside="One anchor · calc() ladder">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex flex-wrap items-end justify-center gap-5">
                  {[
                    ["sm", "×0.6 · 4.8px", "var(--radius-sm)", false],
                    ["md", "×0.8 · 6.4px", "var(--radius-md)", false],
                    ["lg · anchor", "×1.0 · 8px", "var(--radius-lg)", true],
                    ["xl", "×1.4 · 11.2px", "var(--radius-xl)", false],
                    ["2xl", "×1.8 · 14.4px", "var(--radius-2xl)", false],
                    ["3xl", "×2.2 · 17.6px", "var(--radius-3xl)", false],
                    ["4xl", "×2.6 · 20.8px", "var(--radius-4xl)", false],
                  ].map(([label, mult, radius, anchor]) => (
                    <div
                      key={label as string}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`size-16 bg-foreground/85 ${
                          anchor
                            ? "ring-2 ring-ring ring-offset-2 ring-offset-card"
                            : ""
                        }`}
                        style={{ borderRadius: radius as string }}
                      />
                      <span className="text-xs font-medium">{label}</span>
                      <span className="font-mono text-(length:--text-nano) text-muted-foreground">
                        {mult}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-center font-mono text-(length:--text-micro) leading-relaxed text-muted-foreground">
                  usage: xs inputs/chips · md buttons · lg cards/popovers · xl+
                  dialogs/sheets
                </p>
              </div>
            </SubSection>

            <SubSection
              title="Special shapes"
              aside="Rounded-full · off the ladder"
            >
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  [
                    "Pill",
                    "Badges and status chips — full-round reads as metadata.",
                    "h-10 w-20 rounded-full",
                  ],
                  [
                    "Capsule",
                    "The agent motif — a capsule is an agent, never chrome.",
                    "h-16 w-8 rounded-full",
                  ],
                  [
                    "Circle",
                    "Avatars and floating actions.",
                    "size-14 rounded-full",
                  ],
                ].map(([label, desc, cls]) => (
                  <div
                    key={label as string}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    <span className={`shrink-0 bg-foreground/85 ${cls}`} />
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  06 ICONOGRAPHY                                          */}
          {/* ======================================================== */}
          <SectionShell
            id="iconography"
            num="06"
            kicker="Iconography"
            title="Functional. Not decorative."
            lede={
              <>
                Icons come from{" "}
                <code className="font-mono text-sm">lucide-react</code> — one
                library, consistently stroked. They label actions, states, or
                functionality; they never compete with content for attention.
              </>
            }
          >
            <SubSection title="Icon grid" aside="Lucide · 24px · 2px stroke">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                  {[
                    ["Inbox", Inbox],
                    ["ListTodo", ListTodo],
                    ["CircleDot", CircleDot],
                    ["Hexagon", Hexagon],
                    ["Target", Target],
                    ["LayoutDashboard", LayoutDashboard],
                    ["Bot", Bot],
                    ["DollarSign", DollarSign],
                    ["History", History],
                    ["Search", Search],
                    ["Plus", Plus],
                    ["Trash2", Trash2],
                    ["Settings", Settings],
                    ["User", User],
                    ["Mail", Mail],
                    ["Upload", Upload],
                    ["Zap", Zap],
                    ["Layers", Layers],
                  ].map(([name, Icon]) => {
                    const LucideIcon = Icon as React.FC<{ className?: string }>;
                    return (
                      <div
                        key={name as string}
                        className="flex flex-col items-center gap-2 rounded-md border border-border p-4"
                      >
                        <LucideIcon className="size-5" />
                        <span className="font-mono text-(length:--text-nano) text-muted-foreground">
                          {name as string}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SubSection>

            <SubSection title="Sizing" aside="Three steps">
              <div className="flex items-end gap-8 rounded-lg border border-border bg-card p-6">
                {[
                  ["size-3", "12px", "size-3"],
                  ["size-4", "16px — default", "size-4"],
                  ["size-5", "20px — feature", "size-5"],
                ].map(([token, desc, cls]) => (
                  <div
                    key={token as string}
                    className="flex flex-col items-center gap-2"
                  >
                    <Settings className={`${cls} text-foreground`} />
                    <span className="font-mono text-(length:--text-micro)">
                      {token}
                    </span>
                    <span className="font-mono text-(length:--text-nano) text-muted-foreground">
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  07 MOTION                                               */}
          {/* ======================================================== */}
          <SectionShell
            id="motion"
            num="07"
            kicker="Motion"
            title="Purposeful. Never showy."
            lede="Animation signals life and state. Enter is faster than exit reads; exits are shorter than entrances. Everything honors prefers-reduced-motion at the token layer."
          >
            <SubSection title="Tokens" aside="One home · :root">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-6 border-b border-border px-4 py-2 font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
                  <span className="w-44 shrink-0">Token</span>
                  <span className="hidden flex-1 md:block">Value</span>
                  <span className="flex-1">Where</span>
                </div>
                {[
                  [
                    "--motion-ease-out-expo",
                    "cubic-bezier(.16, 1, .3, 1)",
                    "Entrances, hover lifts, primary motion",
                  ],
                  [
                    "--motion-ease-standard",
                    "cubic-bezier(.4, 0, .2, 1)",
                    "Default UI transitions",
                  ],
                  [
                    "--motion-duration-instant",
                    "80ms",
                    "Hover color shifts, focus rings",
                  ],
                  [
                    "--motion-duration-fast",
                    "160ms",
                    "Enter/exit of small elements",
                  ],
                  [
                    "--motion-duration-base",
                    "240ms",
                    "Panels, dialogs, reveals",
                  ],
                  [
                    "--motion-duration-slow",
                    "360ms",
                    "Large surfaces, onboarding",
                  ],
                ].map(([token, value, where]) => (
                  <div
                    key={token}
                    className="flex items-center gap-6 border-b border-border px-4 py-3 last:border-0"
                  >
                    <span className="w-44 shrink-0 font-mono text-(length:--text-micro)">
                      {token}
                    </span>
                    <span className="hidden flex-1 font-mono text-(length:--text-micro) text-muted-foreground md:block">
                      {value}
                    </span>
                    <span className="flex-1 text-xs text-muted-foreground">
                      {where}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">
                  No hardcoded timing in components.
                </strong>{" "}
                Durations and easings reference these tokens; a check script
                rejects raw ms and cubic-bezier values outside the token layer.
              </p>
            </SubSection>

            <SubSection title="Live signals" aside="Reduced-motion aware">
              <div className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-6">
                {(["running", "paused", "error"] as const).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <AgentStatusCapsule status={s} />
                    <span className="font-mono text-(length:--text-micro) text-muted-foreground">
                      {s}
                    </span>
                  </div>
                ))}
                <span className="shimmer-text-muted shimmer-text font-mono text-(length:--text-micro)">
                  Working…
                </span>
                <span className="typing-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  08 COMPONENTS                                           */}
          {/* ======================================================== */}
          <SectionShell
            id="components"
            num="08"
            kicker="Components"
            title={
              <>
                One part per job.
                <br />
                Tested states.
              </>
            }
            lede="shadcn/ui patterns on Radix primitives, variants via class-variance-authority, icons from lucide-react. Everything renders in light and dark; every interactive control has explicit default, hover, focus, and disabled states."
          >
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-(length:--text-nano) uppercase tracking-widest text-muted-foreground">
                Shared primitives · src/components/ui/
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-mono">
                  alert-dialog · avatar · badge · breadcrumb · button · card ·
                  checkbox · collapsible · command · dialog · dropdown-menu ·
                  input · label · popover · radio-card · resizable-panels ·
                  scroll-area · select · separator · sheet · skeleton · tabs ·
                  textarea · toggle-switch · tooltip
                </span>
                . <strong className="text-foreground">One</strong> of each —
                variants are props, not new components.
              </p>
            </div>

            <SubSection title="Buttons" aside="7 variants · 4 sizes · icon">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="default">Default</Button>
                <Button variant="cta">CTA</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="icon-xs">
                  <Search />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Search />
                </Button>
                <Button variant="outline" size="icon">
                  <Search />
                </Button>
                <Button variant="outline" size="icon-lg">
                  <Search />
                </Button>
                <Button>
                  <Plus /> New task
                </Button>
                <Button variant="outline">
                  <Upload /> Upload
                </Button>
                <Button variant="destructive">
                  <Trash2 /> Delete
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </SubSection>

            <SubSection title="Badges" aside="6 variants">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="ghost">Ghost</Badge>
                <Badge variant="link">Link</Badge>
              </div>
            </SubSection>

            <SubSection
              title="Form controls"
              aside="Input · textarea · checkbox · toggle · radio card"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="input-sample">Standard input</Label>
                    <Input id="input-sample" placeholder="Default input" />
                    <Input placeholder="Disabled input" disabled />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="textarea-sample">Textarea</Label>
                    <Textarea
                      id="textarea-sample"
                      placeholder="Write something..."
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="check1" defaultChecked />
                      <Label htmlFor="check1">Checked item</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="check2" />
                      <Label htmlFor="check2">Unchecked item</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="check3" disabled />
                      <Label htmlFor="check3">Disabled item</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-default">Toggle · default</Label>
                      <ToggleSwitch
                        id="switch-default"
                        checked={switchOn}
                        onCheckedChange={setSwitchOn}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-lg">Toggle · large</Label>
                      <ToggleSwitch
                        id="switch-lg"
                        size="lg"
                        checked={switchLg}
                        onCheckedChange={setSwitchLg}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="switch-disabled"
                        className="text-muted-foreground"
                      >
                        Toggle · disabled
                      </Label>
                      <ToggleSwitch
                        id="switch-disabled"
                        disabled
                        checked={false}
                        onCheckedChange={() => {}}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      On-state uses the status-system green (
                      <code className="font-mono">--status-task-done</code>),
                      not primary — deliberate ruling, don&apos;t swap for the
                      registry Switch.
                    </p>
                  </div>
                  <RadioCardGroup
                    ariaLabel="Reasoning effort"
                    value={radioValue}
                    onValueChange={setRadioValue}
                    options={[
                      {
                        value: "fast",
                        title: "Fast",
                        description: "Short tasks with tight latency budgets.",
                      },
                      {
                        value: "balanced",
                        title: "Balanced",
                        description: "The default for everyday work.",
                      },
                      {
                        value: "deep",
                        title: "Deep",
                        description: "Long-horizon planning and review.",
                      },
                      {
                        value: "custom",
                        title: "Custom",
                        description: "Requires an enterprise plan.",
                        disabled: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </SubSection>

            <SubSection title="Select" aside="Default · sm">
              <div className="grid gap-6 md:grid-cols-2">
                <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="high">
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SubSection>

            <SubSection
              title="Overlays"
              aside="Dialog · alert · sheet · popover · tooltip · menu · collapsible"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        Standard layout with header, content, and footer.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <Label>Name</Label>
                        <Input placeholder="Enter a name" className="mt-1.5" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe..."
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Alert dialog</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This permanently removes the task and its run history.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">
                        Delete task
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Sheet</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Task Properties</SheetTitle>
                      <SheetDescription>
                        Edit metadata without leaving the current page.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 px-4">
                      <div className="space-y-1">
                        <Label htmlFor="sheet-title">Title</Label>
                        <Input
                          id="sheet-title"
                          defaultValue="Improve onboarding docs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="sheet-description">Description</Label>
                        <Textarea
                          id="sheet-description"
                          defaultValue="Capture setup pitfalls and screenshots."
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="space-y-2">
                    <p className="text-sm font-medium">Agent heartbeat</p>
                    <p className="text-xs text-muted-foreground">
                      Last run succeeded 24s ago. Next timer run in 9m.
                    </p>
                    <Button size="xs">Wake now</Button>
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>This is a tooltip</TooltipContent>
                </Tooltip>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Menu <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem>
                      <Check className="h-4 w-4" />
                      Mark as done
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BookOpen className="h-4 w-4" />
                      Open docs
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={menuChecked}
                      onCheckedChange={(value) =>
                        setMenuChecked(value === true)
                      }
                    >
                      Watch task
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Collapsible
                  open={collapsibleOpen}
                  onOpenChange={setCollapsibleOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline">
                      {collapsibleOpen ? "Hide" : "Show"} filters
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 rounded-md border border-border p-3">
                    <div className="space-y-2">
                      <Label htmlFor="owner-filter">Owner</Label>
                      <Input
                        id="owner-filter"
                        placeholder="Filter by agent name"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </SubSection>

            <SubSection
              title="Navigation"
              aside="Breadcrumb · tabs · command · scroll area"
            >
              <div className="space-y-5">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Design System</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Task List</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="runs">Runs</TabsTrigger>
                    <TabsTrigger value="config">Config</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <p className="py-3 text-sm text-muted-foreground">
                      Pill variant content.
                    </p>
                  </TabsContent>
                  <TabsContent value="runs">
                    <p className="py-3 text-sm text-muted-foreground">
                      Runs tab content.
                    </p>
                  </TabsContent>
                  <TabsContent value="config">
                    <p className="py-3 text-sm text-muted-foreground">
                      Config tab content.
                    </p>
                  </TabsContent>
                </Tabs>
                <Tabs defaultValue="summary">
                  <TabsList variant="line">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    <p className="py-3 text-sm text-muted-foreground">
                      Line variant content.
                    </p>
                  </TabsContent>
                  <TabsContent value="details">
                    <p className="py-3 text-sm text-muted-foreground">
                      Details content.
                    </p>
                  </TabsContent>
                  <TabsContent value="comments">
                    <p className="py-3 text-sm text-muted-foreground">
                      Comments content.
                    </p>
                  </TabsContent>
                </Tabs>

                <div className="rounded-md border border-border">
                  <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Pages">
                        <CommandItem>
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </CommandItem>
                        <CommandItem>
                          <CircleDot className="h-4 w-4" />
                          Tasks
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Actions">
                        <CommandItem>
                          <CommandIcon className="h-4 w-4" />
                          Open command palette
                        </CommandItem>
                        <CommandItem>
                          <Plus className="h-4 w-4" />
                          Create new task
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>

                <ScrollArea className="h-36 rounded-md border border-border">
                  <div className="space-y-2 p-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-border p-2 text-sm"
                      >
                        Heartbeat run #{i + 1}: completed successfully
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex flex-wrap gap-6">
                  <Card className="block w-60 p-3 space-y-0.5">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-accent text-accent-foreground">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer">
                      <CircleDot className="h-4 w-4" />
                      Tasks
                      <Badge
                        variant="ghost"
                        className="ml-auto bg-primary text-primary-foreground px-1.5"
                      >
                        12
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer">
                      <Bot className="h-4 w-4" />
                      Agents
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer">
                      <Hexagon className="h-4 w-4" />
                      Projects
                    </div>
                  </Card>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="xs">
                        <AvatarFallback>XS</AvatarFallback>
                      </Avatar>
                      <Avatar size="sm">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>DF</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarFallback>LG</AvatarFallback>
                      </Avatar>
                      <AvatarGroup>
                        <Avatar>
                          <AvatarFallback>A1</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>A2</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>A3</AvatarFallback>
                        </Avatar>
                        <AvatarGroupCount>+5</AvatarGroupCount>
                      </AvatarGroup>
                    </div>
                    <div className="flex items-center border border-border rounded-md w-fit">
                      <button className="px-3 py-1.5 text-xs font-medium bg-accent text-foreground rounded-l-md">
                        <ListTodo className="h-3.5 w-3.5 inline mr-1" />
                        List
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 rounded-r-md">
                        <Target className="h-3.5 w-3.5 inline mr-1" />
                        Org
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SubSection>

            <SubSection title="Surfaces" aside="One card · two modes">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Static container</CardTitle>
                    <CardDescription>
                      Default mode for grouping information without action
                      triggers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Borders and backgrounds are strictly justified by content
                      hierarchy.
                    </p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm">Action</Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
                <Card
                  interactive
                  onClick={() =>
                    pushToast({
                      title: "Card opened",
                      body: "The interactive card is a click target.",
                      tone: "info",
                    })
                  }
                >
                  <CardHeader>
                    <CardTitle>Interactive target</CardTitle>
                    <CardDescription>
                      The <code className="font-mono">interactive</code> prop
                      adds a pointer cursor, quiet hover border, and focus ring.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Ideal for resource tiles, project links, or run items.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    icon: Bot,
                    value: "12",
                    label: "Active agents",
                    description: "+3 this week",
                  },
                  { icon: CircleDot, value: "48", label: "Open tasks" },
                  {
                    icon: DollarSign,
                    value: "$1,234",
                    label: "Monthly cost",
                    description: "Under budget",
                  },
                  { icon: Zap, value: "99.9%", label: "Uptime" },
                ].map(({ icon: Icon, value, label, description }) => (
                  <Card key={label}>
                    <CardContent className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {label}
                        </span>
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{value}</p>
                      {description && (
                        <p className="text-xs text-muted-foreground">
                          {description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Metric cards are a composed pattern from Card primitives —
                promote to an app component only when a second consumer appears.
              </p>
            </SubSection>

            <SubSection
              title="Feedback"
              aside="Banner · toast · skeleton · empty state"
            >
              <div className="space-y-3">
                <InlineBanner
                  tone="info"
                  title="Built-in agent."
                  actions={
                    <Button variant="outline" size="sm">
                      Reset to defaults
                    </Button>
                  }
                >
                  Ships with the system and powers scheduled runs. It can be
                  paused but not deleted.
                </InlineBanner>
                <InlineBanner
                  tone="warning"
                  title="Routine is paused."
                  actions={<Button size="sm">Resume routine</Button>}
                >
                  Its agent was paused 2 days ago, so new runs aren&apos;t being
                  generated.
                </InlineBanner>
                <InlineBanner tone="danger" compact>
                  Compact variant for embedding inside dialogs and modals.
                </InlineBanner>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    pushToast({
                      title: "Run queued",
                      body: "The agent will pick it up within a minute.",
                      tone: "info",
                    })
                  }
                >
                  Toast · info
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    pushToast({ title: "Settings saved", tone: "success" })
                  }
                >
                  Toast · success
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    pushToast({
                      title: "Rate limit approaching",
                      body: "80% of the monthly token budget is used.",
                      tone: "warn",
                    })
                  }
                >
                  Toast · warn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    pushToast({
                      title: "Connection lost",
                      body: "Reconnecting… past runs are unaffected.",
                      tone: "error",
                    })
                  }
                >
                  Toast · error
                </Button>
                <span className="self-center text-xs text-muted-foreground">
                  For background outcomes not already visible on screen.
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-border p-4 space-y-3">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-8 w-full max-w-sm" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <div className="rounded-md border border-border">
                  <EmptyState
                    icon={Inbox}
                    title="No tasks yet"
                    message="Tasks are where agents do their work."
                    description="Create your first task to see it here."
                    action="New task"
                    onAction={() => {}}
                  />
                </div>
              </div>
            </SubSection>

            <SubSection title="Split view" aside="Resizable panels">
              <div className="h-44 overflow-hidden rounded-lg border border-border">
                <ResizablePanelGroup>
                  <ResizablePanel minSize="120px" className="bg-muted/30">
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Panel A
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel
                    minSize="120px"
                    collapsible
                    collapsedSize="40px"
                    className="bg-muted/10"
                  >
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Panel B (collapsible)
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel minSize="120px" className="bg-muted/30">
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Panel C
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  09 STATES & STATUS                                      */}
          {/* ======================================================== */}
          <SectionShell
            id="status"
            num="09"
            kicker="States & status"
            title={
              <>
                Color is meaning.
                <br />
                Shape is meaning.
              </>
            }
            lede={
              <>
                One color language across every entity. The governing rule:{" "}
                <strong className="text-foreground">blue = liveness</strong> —
                actively running work is blue; queued, idle, or inert work is
                not. Base hues live in the token layer (
                <code className="font-mono text-sm">--status-task-*</code>,{" "}
                <code className="font-mono text-sm">--status-agent-*</code>) and
                are WCAG-tuned for both modes.
              </>
            }
          >
            <SubSection
              title="The full vocabulary"
              aside="One set · everywhere"
            >
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "active",
                  "running",
                  "paused",
                  "idle",
                  "archived",
                  "planned",
                  "achieved",
                  "completed",
                  "failed",
                  "timed_out",
                  "succeeded",
                  "error",
                  "pending_approval",
                  "backlog",
                  "todo",
                  "in_progress",
                  "in_review",
                  "blocked",
                  "done",
                  "terminated",
                  "cancelled",
                  "pending",
                  "revision_requested",
                  "approved",
                  "rejected",
                ].map((s) => (
                  <StatusBadge key={s} status={s} />
                ))}
              </div>
            </SubSection>

            <SubSection title="Task chips" aside="Glyph + sentence case">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "backlog",
                  "todo",
                  "in_progress",
                  "in_review",
                  "done",
                  "blocked",
                  "cancelled",
                ].map((s) => (
                  <IssueStatusBadge key={s} status={s} />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  A task waiting on its external conversation renders idle —
                  blocked on a human reply, not making progress:
                </span>
                <IssueStatusBadge
                  status="in_review"
                  externalConversationState="waiting"
                />
              </div>
            </SubSection>

            <SubSection title="Unified glyph" aside="One family · three sizes">
              <div className="flex flex-wrap items-center gap-6">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size} className="flex items-center gap-2">
                    <StatusGlyph status="in_progress" size={size} />
                    <StatusGlyph status="done" size={size} />
                    <StatusGlyph status="blocked" size={size} />
                    <span className="font-mono text-(length:--text-micro) text-muted-foreground">
                      {size}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  "backlog",
                  "todo",
                  "in_progress",
                  "in_review",
                  "done",
                  "blocked",
                  "cancelled",
                  "in_queue",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <StatusGlyph status={s} />
                    <span className="font-mono text-(length:--text-micro) text-muted-foreground">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <StatusIcon status={status} onChange={setStatus} />
                <span className="text-sm text-muted-foreground">
                  Click the icon to change status (current: {status})
                </span>
              </div>
            </SubSection>

            <SubSection
              title="Agent states"
              aside="Capsule + chip · pulse & blink"
            >
              <div className="flex flex-wrap items-center gap-6">
                {["idle", "running", "paused", "error"].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <AgentStatusCapsule status={s} />
                    <AgentStatusBadge status={s} />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {(
                  ["running", "active", "paused", "error", "archived"] as const
                ).map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className={`inline-flex h-full w-full rounded-full ${
                          agentStatusDot[label] ?? agentStatusDotDefault
                        }`}
                      />
                    </span>
                    <span className="font-mono text-(length:--text-micro) text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Running pulses, error blinks; both honor{" "}
                <code className="font-mono">prefers-reduced-motion</code>.
              </p>
            </SubSection>
          </SectionShell>

          {/* ======================================================== */}
          {/*  10 DESIGN TOKENS                                        */}
          {/* ======================================================== */}
          <SectionShell
            id="tokens"
            num="10"
            kicker="Design tokens"
            title="One canonical source."
            lede={
              <>
                <code className="font-mono text-sm">src/index.css</code> is the
                single source of truth: every value is a CSS custom property,
                exposed to Tailwind v4 through{" "}
                <code className="font-mono text-sm">@theme inline</code> — there
                is no tailwind config file. Same values, one flow, no
                hand-copied hex.
              </>
            }
          >
            <SubSection
              title="CSS variables"
              aside="Canonical · semantic layer"
            >
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <span className="font-mono text-(length:--text-micro) text-muted-foreground">
                    src/index.css · :root
                  </span>
                  <Badge
                    variant="outline"
                    className="font-mono text-(length:--text-nano)"
                  >
                    oklch · light + dark
                  </Badge>
                </div>
                {[
                  ["--background", "Page canvas"],
                  ["--foreground", "Primary text"],
                  ["--card", "Bordered surfaces, never filled"],
                  ["--popover", "Overlay surfaces"],
                  ["--primary", "Neutral primary action"],
                  ["--secondary", "Quiet fills"],
                  ["--muted", "Subtle fills, skeletons"],
                  ["--muted-foreground", "Captions, mono labels"],
                  ["--accent", "Hover fills"],
                  ["--destructive", "Destructive actions only"],
                  ["--border", "Hairlines + dividers"],
                  ["--input", "Control borders"],
                  ["--ring", "Focus rings"],
                ].map(([token, usage]) => (
                  <div
                    key={token}
                    className="flex items-center gap-4 border-b border-border px-4 py-2.5 last:border-0"
                  >
                    <span className="w-40 shrink-0 font-mono text-(length:--text-micro)">
                      {token}
                    </span>
                    <span
                      className="size-4 shrink-0 rounded-sm border border-border"
                      style={{ backgroundColor: `var(${token})` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {usage}
                    </span>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection title="Brand tier" aside="Literal in both themes">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Status hues (
                  <code className="font-mono text-xs text-foreground">
                    --status-task-*
                  </code>
                  ,{" "}
                  <code className="font-mono text-xs text-foreground">
                    --status-agent-*
                  </code>
                  ), agent gradients (
                  <code className="font-mono text-xs text-foreground">
                    --agent-1a…10b
                  </code>
                  ), and the AA-tuned icon hues are brand-fixed hex values —
                  identical across themes, so status reads the same at a glance
                  everywhere. The semantic layer above swaps; the brand tier
                  doesn&apos;t.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    "--status-task-backlog",
                    "--status-task-todo",
                    "--status-task-in_progress",
                    "--status-task-in_review",
                    "--status-task-done",
                    "--status-task-blocked",
                  ].map((v) => (
                    <div key={v} className="flex items-center gap-2">
                      <span
                        className="size-5 rounded-full border border-border"
                        style={{ backgroundColor: `var(${v})` }}
                      />
                      <span className="font-mono text-(length:--text-nano) text-muted-foreground">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SubSection>
          </SectionShell>

          {/* Footer */}
          <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-8">
            <p className="font-mono text-(length:--text-micro) text-muted-foreground">
              Design System Template · {SECTIONS.length} sections · tokens first
              · zero hardcoded values
            </p>
            <p className="font-mono text-(length:--text-micro) text-muted-foreground">
              React · Tailwind v4 · Radix primitives
            </p>
          </footer>
        </main>
      </div>

      {/* Floating theme toggle — mirrors the reference brand site */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
