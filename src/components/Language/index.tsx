import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';

interface Props {}

type Lang = 'en-US' | 'zh';

const Language: React.FC<Props> = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language.includes('zh') ? 'en-US' : 'zh');
  };

  return <Icon onClick={handleLanguageChange} name={i18n.language as Lang} />;
};

export default Language;
