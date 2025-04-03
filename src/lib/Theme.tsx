import { createContext, useContext, useState } from "react";

import Coffee from "../models/Coffee";
import Computer from "../models/Computer";

import type { DecimatedModel } from "./types";

export interface Theme {
  name: string;
  description: string;
  text: string;
  accent: string;
  background: string;
  lighting: string;

  model: DecimatedModel;
}

/**
 * All available themes based on models
 * present in the scene
 */
export const themes = [
  {
    name: "coffee",
    description: "coffee addict",
    text: "#6F4E37",
    accent: "#FED8B1",
    background: "#ECB176",
    lighting: "#B17457",

    model: Coffee,
  },
  {
    name: "computer",
    description: "computer geek",
    text: "#cdd6f4",
    accent: "#89b4fa",
    background: "#1e1e2e",
    lighting: "#f5e0dc",

    model: Computer,
  },
] as const satisfies Theme[];

/**
 * Name of a theme based on a model
 * present in the scene
 */
export type Name = (typeof themes)[number]["name"];

const ThemeContext = createContext<[Theme, (name: Name) => void]>([
  themes[0],
  () => null,
]);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(themes[0]);

  const changeTheme = (name: Name) => {
    const t = themes.find((t) => t.name === name);
    setTheme(t!);
  };

  return (
    <ThemeContext.Provider value={[theme, changeTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");

  return ctx;
}
