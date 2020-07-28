import { atom } from 'recoil';

export type Theme = 'light' | 'dark';

export const themeState = atom<Theme>({
  key: 'theme',
  default: (localStorage.getItem('theme') || 'light') as Theme,
});
