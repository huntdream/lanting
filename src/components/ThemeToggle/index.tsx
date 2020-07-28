import React from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from 'recoil/theme';
import './style.scss';

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className='lanting-themetoggle' onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </div>
  );
};

export default ThemeToggle;
