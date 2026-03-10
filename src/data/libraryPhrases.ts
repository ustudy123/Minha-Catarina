// Library phrases data - organized by category
// Each numbered item from the original script is a separate phrase entry

export interface LibraryPhraseData {
  text: string;
  category: string;
  timeOfDay?: string;
}

export const libraryPhrasesData: LibraryPhraseData[] = [];
