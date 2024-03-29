import React from 'react';
import Icon from 'components/Icon';
import { useTheme } from 'context/Theme';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';

interface ThemeProps {}

const Theme: React.FC<ThemeProps> = () => {
  const [theme, setTheme] = useTheme();
  const { t } = useTranslation();

  const switchTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Tooltip
      title={t(`switchTheme.${theme === 'dark' ? 'light' : 'dark'}`)}
      placement='bottom'
    >
      <Button
        variant='text'
        onClick={switchTheme}
        icon={theme === 'dark' ? 'dark_mode' : 'light_mode'}
        className='lanting-theme'
      />
    </Tooltip>
  );
};

export default Theme;
