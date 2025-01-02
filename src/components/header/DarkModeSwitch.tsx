'use client';
import React, { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';
import { useTheme } from 'next-themes';

const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering the switch until mounted
  if (!mounted) {
    return null; // or return a placeholder with the same dimensions
  }

  return (
    <div>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      />
    </div>
  );
};

export default DarkModeSwitch;
