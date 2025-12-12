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
    id: 'coral',
    name: { pt: 'Coral Rosa', en: 'Pink Coral', es: 'Coral Rosa' },
    primary: '355 100% 80%',
    primaryHover: '355 100% 75%',
    ring: '355 100% 80%',
    gradient: 'linear-gradient(135deg, hsl(355 100% 80%), hsl(273 100% 89%))',
  },
  {
    id: 'lavender',
    name: { pt: 'Lavanda', en: 'Lavender', es: 'Lavanda' },
    primary: '270 80% 75%',
    primaryHover: '270 80% 70%',
    ring: '270 80% 75%',
    gradient: 'linear-gradient(135deg, hsl(270 80% 75%), hsl(300 70% 85%))',
  },
  {
    id: 'sky',
    name: { pt: 'Azul Céu', en: 'Sky Blue', es: 'Azul Cielo' },
    primary: '200 90% 70%',
    primaryHover: '200 90% 65%',
    ring: '200 90% 70%',
    gradient: 'linear-gradient(135deg, hsl(200 90% 70%), hsl(180 70% 75%))',
  },
  {
    id: 'mint',
    name: { pt: 'Menta', en: 'Mint', es: 'Menta' },
    primary: '160 60% 65%',
    primaryHover: '160 60% 60%',
    ring: '160 60% 65%',
    gradient: 'linear-gradient(135deg, hsl(160 60% 65%), hsl(180 50% 70%))',
  },
  {
    id: 'peach',
    name: { pt: 'Pêssego', en: 'Peach', es: 'Durazno' },
    primary: '25 100% 80%',
    primaryHover: '25 100% 75%',
    ring: '25 100% 80%',
    gradient: 'linear-gradient(135deg, hsl(25 100% 80%), hsl(45 100% 85%))',
  },
  {
    id: 'rose',
    name: { pt: 'Rosa Suave', en: 'Soft Rose', es: 'Rosa Suave' },
    primary: '340 80% 75%',
    primaryHover: '340 80% 70%',
    ring: '340 80% 75%',
    gradient: 'linear-gradient(135deg, hsl(340 80% 75%), hsl(320 70% 80%))',
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
