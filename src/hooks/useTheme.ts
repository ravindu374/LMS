import { useCallback, useSyncExternalStore } from "react";

/**
 * Theme lives in one module-level store rather than in component state.
 *
 * Navbar and AdminLayout both call useTheme(), and with plain useState each
 * got its own `darkMode` copy - toggling in one left the other's icon stale.
 * useSyncExternalStore gives every caller the same value with no provider.
 *
 * The initial `dark` class is applied by the inline script in index.html,
 * before first paint, so we read the DOM here instead of localStorage.
 */

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function useTheme() {
  const darkMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false // server/prerender fallback
  );

  const toggleTheme = useCallback(() => {
    const next = !getSnapshot();

    document.documentElement.classList.toggle("dark", next);

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage disabled - theme still applies for this session.
    }

    emit();
  }, []);

  return { darkMode, toggleTheme };
}
