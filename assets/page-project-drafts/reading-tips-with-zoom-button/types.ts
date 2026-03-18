export interface GreekSound {
  ipa: string;
  description: string;
  example: string;
  audioUrl: string;
  label?: string; // e.g. "Hard" or "Soft"
}

export interface GreekLetter {
  id: string;
  name: string;
  upper: string;
  lower: string;
  sounds: GreekSound[];
  pronunciationNote?: string;
  isBonus?: boolean;
}

export interface LevelGroup {
  id: string;
  title: string;
  description: string;
  letters: string[]; // IDs of letters
  isBonus?: boolean;
}

export enum Screen {
  Welcome = 'WELCOME',
  Levels = 'LEVELS',
  Intro = 'INTRO',
  Learning = 'LEARNING',
  LevelComplete = 'LEVEL_COMPLETE',
  Test = 'TEST',
  Exercises = 'EXERCISES',
  About = 'ABOUT',
  ReadingTips = 'READING_TIPS',
  HELP = 'HELP',
  FAQ = 'FAQ',
  CONTACT = 'CONTACT',
  CaseStudy = 'CASE_STUDY'
}

export interface AppState {
  currentScreen: Screen;
  selectedLevelId?: string;
  currentLetterIndex?: number;
  activeTestLetterIds?: string[];
  testPhase?: 'single' | 'level';
}