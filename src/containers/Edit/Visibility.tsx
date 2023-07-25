import Icon from 'components/Icon';
import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Visibility: React.FC<Props> = ({ value = true, onChange }) => {
  const [isPublic, setIsPublic] = useState<boolean>(true);

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
    <div className='lanting-edit-header-visibility' onClick={handleChange}>
      <Icon name={isPublic ? 'public' : 'lock'} />
      <span>{isPublic ? 'Public' : 'Private'}</span>
    </div>
  );
};

export default Visibility;
