'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid flashing the wrong icon before we know the real theme (hydration-safe)
  if (!mounted) {
    return <div className="w-12 h-7 rounded-full bg-emerald-800/40" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex items-center w-12 h-7 rounded-full p-1 shadow-inner ring-1 transition-colors duration-300 cursor-pointer flex-shrink-0
        ${isDark
          ? 'bg-slate-900/60 ring-slate-900/40 justify-end'
          : 'bg-white/20 ring-white/30 justify-start'
        }`}
    >
      <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-out">
        {isDark ? (
          <Moon className="w-3 h-3 text-slate-700" strokeWidth={2.5} />
        ) : (
          <Sun className="w-3 h-3 text-emerald-600" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}
