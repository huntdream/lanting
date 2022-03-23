import { useContext } from 'react';
import { Theme, ThemeContext } from './Theme';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const { theme, setTheme } = useContext(ThemeContext);

  return [theme, setTheme];
};
