'use client';
import { useEffect } from 'react';
export default function ThemeInit() {
  useEffect(() => {
    const theme = localStorage.getItem('edusphere_theme') || 'dark';
    document.documentElement.classList.toggle('light', theme === 'light');
  }, []);
  return null;
}
