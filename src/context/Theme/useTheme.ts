import { useContext } from 'react';
import { ThemeType, ThemeContext } from './Theme';

export const useTheme = (): [ThemeType, (theme: ThemeType) => void] => {
  const { theme, setTheme } = useContext(ThemeContext);

  return [theme, setTheme];
};
