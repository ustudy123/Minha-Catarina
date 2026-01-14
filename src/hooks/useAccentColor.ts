import { useState, useEffect, useCallback } from 'react';

export type AccentColorOption = {
  id: string;
  name: { pt: string; en: string; es: string };
  primary: string;
  primaryHover: string;
  ring: string;
  gradient: string;
};

export const accentColors: AccentColorOption[] = [
  {
    id: 'rose',
    name: { pt: 'Rosa', en: 'Pink', es: 'Rosa' },
    primary: '340 80% 75%',
    primaryHover: '340 80% 70%',
    ring: '340 80% 75%',
    gradient: 'linear-gradient(135deg, hsl(340 80% 75%), hsl(320 70% 80%))',
  },
  {
    id: 'sky',
    name: { pt: 'Azul', en: 'Blue', es: 'Azul' },
    primary: '200 90% 70%',
    primaryHover: '200 90% 65%',
    ring: '200 90% 70%',
    gradient: 'linear-gradient(135deg, hsl(200 90% 70%), hsl(180 70% 75%))',
  },
];

const STORAGE_KEY = 'minha-catarina-accent-color';

export function useAccentColor() {
  const [accentColor, setAccentColorState] = useState<AccentColorOption>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = accentColors.find((c) => c.id === saved);
        if (found) return found;
      }
    }
    return accentColors[0];
  });

  const applyAccentColor = useCallback((color: AccentColorOption) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', color.primary);
    root.style.setProperty('--primary-hover', color.primaryHover);
    root.style.setProperty('--ring', color.ring);
    root.style.setProperty('--gradient-primary', color.gradient);
    root.style.setProperty('--shadow-glow', `0 0 20px hsl(${color.primary} / 0.3)`);
  }, []);

  useEffect(() => {
    applyAccentColor(accentColor);
  }, [accentColor, applyAccentColor]);

  const setAccentColor = useCallback((color: AccentColorOption) => {
    setAccentColorState(color);
    localStorage.setItem(STORAGE_KEY, color.id);
    applyAccentColor(color);
  }, [applyAccentColor]);

  return { accentColor, setAccentColor, accentColors };
}
