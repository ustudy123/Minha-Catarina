export interface PresetRoutine {
  id: string;
  name: {
    pt: string;
    en: string;
    es: string;
  };
  icon: string;
  phrases: string[];
}

export const presetRoutines: PresetRoutine[] = [];
