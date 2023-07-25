import Icon from 'components/Icon';
import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import Tooltip from 'components/Tooltip';

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Visibility: React.FC<Props> = ({ value = true, onChange }) => {
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIsPublic(value);
  }, [value]);

  const handleChange = () => {
    const newValue = !isPublic;
    setIsPublic(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className='lanting-edit-visibility' onClick={handleChange}>
      <Icon name={isPublic ? 'public' : 'lock'} />
      <Tooltip
        title={isPublic ? t('article.publicDesc') : t('article.privateDesc')}
      >
        <span>{isPublic ? t('article.public') : t('article.private')}</span>
      </Tooltip>
    </div>
  );
};

export default Visibility;
