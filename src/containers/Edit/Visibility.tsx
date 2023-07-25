import Icon from 'components/Icon';
import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import Tooltip from 'components/Tooltip';
import useHover from 'hooks/useHover';

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Visibility: React.FC<Props> = ({ value = true, onChange }) => {
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const { t } = useTranslation();
  const [ref, overlay] = useHover<HTMLDivElement>();

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
    <Tooltip
      title={isPublic ? t('article.publicDesc') : t('article.privateDesc')}
    >
      <div ref={ref} className='lanting-edit-visibility' onClick={handleChange}>
        <Icon name={isPublic ? 'public' : 'lock'} />
        <span>{isPublic ? t('article.public') : t('article.private')}</span>
        {overlay}
      </div>
    </Tooltip>
  );
};

export default Visibility;
