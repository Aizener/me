'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="flex items-center p-1 cursor-pointer"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' && <Sun />}
      {theme === 'light' && <Moon color="#666" size={20} />}
    </div>
  );
}

export default ThemeButton;
