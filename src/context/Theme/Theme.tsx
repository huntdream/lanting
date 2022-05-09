import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: () => {},
});

interface Props {
  children?: ReactNode;
}

const MetaThemeColor = {
  light: '#fff',
  dark: '#18191a',
};

const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') || 'light') as Theme
  );

  useLayoutEffect(() => {
    document.body.classList.add('theme-fade');
  }, [setTheme]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');

    meta?.setAttribute('content', MetaThemeColor[theme]);
  }, [theme]);

  const context = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
