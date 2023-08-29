import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import useToast from 'components/Toast/useToast';

interface Props {}

type Lang = 'en-US' | 'zh-CN';

const Language: React.FC<Props> = () => {
  const { i18n, t } = useTranslation();
  const [toast] = useToast();

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language.includes('zh') ? 'en-US' : 'zh-CN');
    toast(t('greeting'), { id: 'lang' });
  };

  return <Icon onClick={handleLanguageChange} name={i18n.language as Lang} />;
};

export default Language;
