'use client';

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
            setTheme(savedTheme);
            console.log("Loaded saved theme:", savedTheme);
        } else {
            // Check system preference if no saved theme
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
            setTheme(systemTheme);
            console.log("Using system theme:", systemTheme);
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        
        if (theme === "dark") {
            root.classList.add("dark");
            console.log("Applied dark theme");
        } else {
            root.classList.remove("dark");
            console.log("Applied light theme");
        }
        
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        console.log("Toggling theme from", theme, "to", newTheme);
        setTheme(newTheme);
    };

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};