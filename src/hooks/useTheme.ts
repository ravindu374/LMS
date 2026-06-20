import { useEffect, useState } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  const toggleTheme = () => {
    const nextValue = !darkMode;

    setDarkMode(nextValue);

    if (nextValue) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  };

  return {
    darkMode,
    toggleTheme,
  };
}