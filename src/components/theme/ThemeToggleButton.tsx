'use client';

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleButtonProps {
    className?: string;
}

export const ThemeToggleButton = ({ className = "" }: ThemeToggleButtonProps) => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <button
            onClick={toggleTheme}
            className={`
                inline-flex h-10 w-10 items-center justify-center 
                rounded-md border border-input bg-background 
                text-foreground transition-colors 
                hover:bg-accent hover:text-accent-foreground 
                focus:outline-none focus:ring-2 focus:ring-ring 
                focus:ring-offset-2 
                ${className}
            `}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </button>
    );
};
