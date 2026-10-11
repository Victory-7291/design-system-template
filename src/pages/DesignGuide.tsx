import { useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Copy,
  ExternalLink,
  Info,
  Layers,
  Palette,
  Play,
  Plus,
  Search,
  Sliders,
  Sparkles,
  Terminal,
  Trash2,
  Type,
  User,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ThemeToggle } from "@/components/ThemeToggle";
import { EmptyState } from "@/components/EmptyState";
import { InlineBanner } from "@/components/InlineBanner";
import { StatusBadge } from "@/components/StatusBadge";
import { StatusGlyph } from "@/components/StatusGlyph";
import { StatusIcon } from "@/components/StatusIcon";
import { useToastActions } from "@/context/ToastContext";

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6 pt-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            {number}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function DesignGuide() {
  const { pushToast } = useToastActions();
  const [toggleState, setToggleState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    pushToast({
      title: "Copied token",
      body: `${text} copied to clipboard.`,
      tone: "success",
    });
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary selection:text-primary-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Layers className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight text-foreground">Design System</span>
                <Badge variant="outline" className="font-mono text-xs uppercase">
                  v1.0 Template
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Living Kitchen Sink · Tailwind v4 · Single-Knob Radius
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#tokens">Tokens</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#buttons">Actions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#cards">Surfaces</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Components</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Separator orientation="vertical" className="hidden md:block h-5" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="mx-auto max-w-7xl px-6 pb-24 space-y-12">
        {/* Hero Notice */}
        <div className="pt-8">
          <InlineBanner
            tone="info"
            title="Design System Template Showcase"
            actions={
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  pushToast({
                    title: "Live Action",
                    body: "Toast trigger working as expected.",
                    tone: "info",
                  })
                }
              >
                Test Toast
              </Button>
            }
          >
            This living guide demonstrates all core tokens, typography, atomic primitives, and feedback
            elements. Every visual attribute is tokenized—no hardcoded hex colors, no arbitrary Tailwind brackets.
          </InlineBanner>
        </div>

        {/* 01. Foundations & Tokens */}
        <Section
          number="01"
          title="Tokens & Foundations"
          description="Color roles, OKLCH perceptual gamut, and single-knob multiplicative radius ladder."
        >
          <div id="tokens" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Color Swatch Card 1: Background & Foreground */}
            <Card
              interactive
              className="p-4 space-y-3 cursor-pointer"
              onClick={() => copyToClipboard("var(--background)")}
            >
              <div className="h-16 rounded-md border border-border bg-background flex items-center justify-center font-mono text-xs">
                --background
              </div>
              <div>
                <p className="text-sm font-medium">Canvas Background</p>
                <p className="font-mono text-xs text-muted-foreground">var(--background)</p>
              </div>
            </Card>

            {/* Color Swatch Card 2: Primary */}
            <Card
              interactive
              className="p-4 space-y-3 cursor-pointer"
              onClick={() => copyToClipboard("var(--primary)")}
            >
              <div className="h-16 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs font-semibold">
                --primary
              </div>
              <div>
                <p className="text-sm font-medium">Primary Accent / Action</p>
                <p className="font-mono text-xs text-muted-foreground">var(--primary)</p>
              </div>
            </Card>

            {/* Color Swatch Card 3: Muted Surface */}
            <Card
              interactive
              className="p-4 space-y-3 cursor-pointer"
              onClick={() => copyToClipboard("var(--muted)")}
            >
              <div className="h-16 rounded-md bg-muted text-muted-foreground flex items-center justify-center font-mono text-xs">
                --muted
              </div>
              <div>
                <p className="text-sm font-medium">Muted Surface</p>
                <p className="font-mono text-xs text-muted-foreground">var(--muted)</p>
              </div>
            </Card>

            {/* Color Swatch Card 4: Destructive */}
            <Card
              interactive
              className="p-4 space-y-3 cursor-pointer"
              onClick={() => copyToClipboard("var(--destructive)")}
            >
              <div className="h-16 rounded-md bg-destructive text-destructive-foreground flex items-center justify-center font-mono text-xs font-semibold">
                --destructive
              </div>
              <div>
                <p className="text-sm font-medium">Destructive Tone</p>
                <p className="font-mono text-xs text-muted-foreground">var(--destructive)</p>
              </div>
            </Card>
          </div>

          {/* Multiplicative Radius Scale Showcase */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Multiplicative Radius Scale (Single-Knob Anchor: <code>--radius: 0.5rem</code>)
              </h3>
              <p className="text-xs text-muted-foreground">
                Derived mathematically: sm (0.6x), md (0.8x controls), lg (1.0x containers), xl (1.4x overlays), 2xl (1.8x).
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 border-2 border-primary bg-primary/10 rounded-sm flex items-center justify-center text-xs font-mono font-medium">
                  sm (~4.8px)
                </div>
                <span className="text-xs text-muted-foreground font-mono">rounded-sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 border-2 border-primary bg-primary/10 rounded-md flex items-center justify-center text-xs font-mono font-medium">
                  md (~6.4px)
                </div>
                <span className="text-xs text-muted-foreground font-mono">rounded-md</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 border-2 border-primary bg-primary/10 rounded-lg flex items-center justify-center text-xs font-mono font-medium">
                  lg (8.0px)
                </div>
                <span className="text-xs text-muted-foreground font-mono">rounded-lg</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 border-2 border-primary bg-primary/10 rounded-xl flex items-center justify-center text-xs font-mono font-medium">
                  xl (~11.2px)
                </div>
                <span className="text-xs text-muted-foreground font-mono">rounded-xl</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-16 border-2 border-primary bg-primary/10 rounded-2xl flex items-center justify-center text-xs font-mono font-medium">
                  2xl (~14.4px)
                </div>
                <span className="text-xs text-muted-foreground font-mono">rounded-2xl</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 02. Typography */}
        <Section
          number="02"
          title="Typography Ladder"
          description="Named micro scale and monospace telemetric numbers."
        >
          <div className="rounded-lg border border-border bg-card divide-y divide-border">
            <div className="p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-muted-foreground">Display / H1</span>
                <p className="text-3xl font-bold tracking-tight">Mission Critical Intelligence</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">30px · font-bold</span>
            </div>
            <div className="p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-muted-foreground">Heading / H2</span>
                <p className="text-xl font-semibold tracking-tight">System Operational Overview</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">20px · font-semibold</span>
            </div>
            <div className="p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-muted-foreground">Body Standard</span>
                <p className="text-sm">High precision interfaces designed for autonomous agent execution and human oversight.</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">14px · text-sm</span>
            </div>
            <div className="p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-muted-foreground">Compact Text</span>
                <p className="text-xs">Compact operational descriptions and secondary metadata.</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">12px · text-xs</span>
            </div>
            <div className="p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono text-muted-foreground">Monospace Telemetry</span>
                <p className="font-mono text-xs">ID: PAP-4092 · TOKENS: 142,850 · LATENCY: 240ms</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">font-mono</span>
            </div>
          </div>
        </Section>

        {/* 03. Buttons & Actions */}
        <Section
          number="03"
          title="Buttons & Commands"
          description="Command-driven verbs with active scale feedback and loading states."
        >
          <div id="buttons" className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">
                <Play className="size-4" /> Start Task
              </Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">
                <Trash2 className="size-4" /> Terminate Run
              </Button>
              <Button variant="link">Inline Link</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="xs" variant="outline">
                xs (24px)
              </Button>
              <Button size="sm" variant="default">
                sm (32px)
              </Button>
              <Button size="default" variant="default">
                default (36px)
              </Button>
              <Button size="lg" variant="default">
                lg (40px)
              </Button>
              <Button size="icon" variant="outline">
                <Sliders className="size-4" />
              </Button>
              <Button size="icon-sm" variant="outline">
                <Plus className="size-4" />
              </Button>
              <Button disabled variant="default">
                Disabled Action
              </Button>
            </div>
          </div>
        </Section>

        {/* 04. Cards & Dual-Mode Surfaces */}
        <Section
          number="04"
          title="Cards & Surfaces (One Card, Two Modes)"
          description="Static containers vs interactive click targets with subtle hover elevation."
        >
          <div id="cards" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Static Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Static Container Card</CardTitle>
                  <Badge variant="secondary">Static</Badge>
                </div>
                <CardDescription>
                  Default mode for grouping information without action triggers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Borders and backgrounds strictly justified by content hierarchy. No drop shadows.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground font-mono">Footer Metadata</span>
                <span className="text-xs text-muted-foreground">Ready</span>
              </CardFooter>
            </Card>

            {/* Interactive Card */}
            <Card
              interactive
              className="cursor-pointer"
              onClick={() =>
                pushToast({
                  title: "Interactive Card Clicked",
                  body: "Triggered action on card container.",
                  tone: "info",
                })
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Interactive Target Card <ArrowRight className="size-4 text-muted-foreground" />
                  </CardTitle>
                  <Badge variant="default">Interactive</Badge>
                </div>
                <CardDescription>
                  Has <code>interactive</code> prop: cursor pointer, hover border tint, focus ring.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Click anywhere on this card. Ideal for resource tiles, project links, or run items.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border pt-4">
                <span className="text-xs text-primary font-medium">Click to execute</span>
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* 05. Status & Telemetry */}
        <Section
          number="05"
          title="Status & Telemetry Badges"
          description="Systematic status vocabulary: running (blue), done (emerald), todo (amber), blocked (red)."
        >
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2">
              <StatusGlyph status="in_progress" size="md" />
              <StatusBadge status="running" label="Running (Pulse)" />
            </div>

            <div className="flex items-center gap-2">
              <StatusGlyph status="done" size="md" />
              <StatusBadge status="done" label="Completed" />
            </div>

            <div className="flex items-center gap-2">
              <StatusGlyph status="todo" size="md" />
              <StatusBadge status="todo" label="Pending Approval" />
            </div>

            <div className="flex items-center gap-2">
              <StatusGlyph status="blocked" size="md" />
              <StatusBadge status="blocked" label="Execution Blocked" />
            </div>
          </div>
        </Section>

        {/* 06. Form Controls */}
        <Section
          number="06"
          title="Form Controls & Inputs"
          description="Rigid 4px rhythm, clean labels, and capsule toggles."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg border border-border bg-card">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="input-sample">Standard Input</Label>
                <Input id="input-sample" placeholder="e.g. acme-web-application" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="select-sample">Dropdown Select</Label>
                <Select defaultValue="fast">
                  <SelectTrigger id="select-sample">
                    <SelectValue placeholder="Select model..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">Gemini 1.5 Flash (Lightweight)</SelectItem>
                    <SelectItem value="pro">Gemini 1.5 Pro (Deep Reasoning)</SelectItem>
                    <SelectItem value="ultra">Gemini Ultra (Autonomous)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="textarea-sample">Specification Prompt</Label>
                <Textarea id="textarea-sample" rows={3} placeholder="Describe the constraints and requirements..." />
              </div>
            </div>

            <div className="space-y-6">
              {/* Capsule Toggle */}
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <div className="space-y-0.5">
                  <Label>Autonomous Execution Gate</Label>
                  <p className="text-xs text-muted-foreground">Capsule ToggleSwitch component</p>
                </div>
                <ToggleSwitch checked={toggleState} onCheckedChange={setToggleState} />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox id="check-sample" checked={checkboxState} onCheckedChange={(c) => setCheckboxState(Boolean(c))} />
                <Label htmlFor="check-sample" className="cursor-pointer text-sm font-normal">
                  Require human verification before state mutations
                </Label>
              </div>

              {/* Avatars */}
              <div className="space-y-2">
                <Label>Operator Avatars</Label>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">DS</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-muted text-muted-foreground font-semibold">AI</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 07. Overlays, Dialogs & Modals */}
        <Section
          number="07"
          title="Dialogs & Overlays"
          description="Focus-locked modals and contextual drawers."
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Modal Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Modal Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deploy New Production Worktree</DialogTitle>
                  <DialogDescription>
                    This will provision an isolated execution environment with the requested credentials.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <Label>Environment Name</Label>
                  <Input defaultValue="staging-agent-cluster-01" />
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Confirm Deployment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Sheet / Drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Side Drawer (Sheet)</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Audit Log Inspection</SheetTitle>
                  <SheetDescription>Real-time telemetry event stream.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
                <SheetFooter>
                  <Button variant="default" className="w-full">
                    Export Audit Dump
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon">
                  <Info className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip explaining complex parameters.</p>
              </TooltipContent>
            </Tooltip>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Context Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Inspect Parameters</DropdownMenuItem>
                <DropdownMenuItem>Duplicate Configuration</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Archive Environment</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* 08. Empty States */}
        <Section
          number="08"
          title="Empty States"
          description="Clear orientation: what happened and what to do next."
        >
          <div className="rounded-lg border border-border bg-card">
            <EmptyState
              icon={Compass}
              title="No active routines detected"
              message="Get started by configuring a schedule or event trigger for your automated tasks."
              action="Create First Routine"
              onAction={() =>
                pushToast({
                  title: "Action clicked",
                  body: "EmptyState CTA triggered.",
                  tone: "info",
                })
              }
            />
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 bg-muted/20 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground">
          <p>© Design System Starter Template · Open Source Edition</p>
          <p className="font-mono">Tailwind CSS v4 · Tokens First · Zero AI Slop</p>
        </div>
      </footer>
    </div>
  );
}
