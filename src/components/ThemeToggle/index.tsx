import AppContext from 'containers/App/context';
import React, { useContext } from 'react';
import './style.scss';

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const { theme, setTheme } = useContext(AppContext);

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
