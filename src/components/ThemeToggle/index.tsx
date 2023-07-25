import React from 'react';
import Icon from 'components/Icon';
import { useTheme } from 'context/Theme';
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
    <Icon
      onClick={toggleTheme}
      name={theme === 'dark' ? 'dark_mode' : 'light_mode'}
      className='lanting-themetoggle'
    />
  );
};

export default ThemeToggle;
