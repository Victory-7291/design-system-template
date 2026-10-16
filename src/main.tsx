import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { ToastProvider } from "./context/ToastContext";
import { ToastViewport } from "./components/ToastViewport";
import DesignGuide from "./app/brand/page";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <TooltipProvider>
          <ToastProvider>
            <DesignGuide />
            <ToastViewport />
          </ToastProvider>
        </TooltipProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
