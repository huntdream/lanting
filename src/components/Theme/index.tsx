import React from 'react';
import Icon from 'components/Icon';
import { useTheme } from 'context/Theme';
import Tooltip from 'components/Tooltip';

interface ThemeProps {}

const Theme: React.FC<ThemeProps> = () => {
  const [theme, setTheme] = useTheme();

  const switchTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Tooltip title='Switch theme' placement='bottom'>
      <Icon
        onClick={switchTheme}
        name={theme === 'dark' ? 'dark_mode' : 'light_mode'}
        className='lanting-theme'
      />
    </Tooltip>
  );
};

export default Theme;
