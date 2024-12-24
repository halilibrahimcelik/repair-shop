'use client';
import React from 'react';
import { Switch } from '../ui/switch';
import { useTheme } from 'next-themes';

const DarkModeSwitch = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Switch
        onCheckedChange={() => {
          setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
        }}
      />
    </div>
  );
};

export default DarkModeSwitch;
