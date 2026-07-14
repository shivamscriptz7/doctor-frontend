'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [state, setState] = useState({ theme: 'light', mounted: false });

  // Read saved theme (or system preference) once on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.classList.toggle('dark', initial === 'dark');
    // One-time sync from an external source (localStorage / OS preference) on mount,
    // required so the client theme matches what was actually saved before first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ theme: initial, mounted: true });
  }, []);

  const toggleTheme = () => {
    setState((prev) => {
      const next = prev.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('theme', next);
      return { ...prev, theme: next };
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme, mounted: state.mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
