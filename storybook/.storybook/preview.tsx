import { useLayoutEffect, type ReactNode } from "react";
import type { Preview } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import { DialogProvider } from "@/context/DialogContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./styles.css";
import "./tailwind-entry.css";

function StorybookProviders({
  children,
  theme,
}: {
  children: ReactNode;
  theme: "dark" | "light";
}) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  return (
    <ThemeProvider>
      <ToastProvider>
        <TooltipProvider>
          <BreadcrumbProvider>
            <SidebarProvider>
              <DialogProvider>{children}</DialogProvider>
            </SidebarProvider>
          </BreadcrumbProvider>
        </TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "light" ? "light" : "dark";
      return (
        <StorybookProviders key={`${context.id}:${theme}`} theme={theme}>
          <Story />
        </StorybookProviders>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: "Theme color mode",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    a11y: {
      test: "error",
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: "fullscreen",
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        mobile: {
          name: "Mobile",
          styles: { width: "390px", height: "844px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "834px", height: "1112px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "960px" },
        },
      },
    },
  },
};

export default preview;
