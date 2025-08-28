import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-testid="theme-toggle"
      className="relative overflow-hidden hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-105"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-400" />
      <span className="sr-only">Toggle theme</span>
      
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-blue-900/30 dark:to-purple-900/30 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
    </Button>
  );
}
