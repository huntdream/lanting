import { useTheme } from 'context/Theme';
import React from 'react';
import './style.scss';

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const [theme, setTheme] = useTheme();

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
