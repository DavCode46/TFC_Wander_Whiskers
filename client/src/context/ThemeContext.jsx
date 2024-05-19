import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("themeMode");
        if (savedTheme) {
            setThemeMode(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = themeMode === "light" ? "dark" : "light";
        setThemeMode(newTheme);
        localStorage.setItem("themeMode", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme() {
    return useContext(ThemeContext);
}
