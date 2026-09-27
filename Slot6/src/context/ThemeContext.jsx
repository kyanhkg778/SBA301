import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("app_theme", theme);
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
