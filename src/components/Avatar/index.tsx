import React from 'react';
import cls from 'classnames';
import './style.scss';
import Icon from 'components/Icon';

interface Props {
  src?: string;
  size?: 'small' | 'large' | 'normal';
  round?: boolean;
  onClick?: () => void;
}

const Avatar: React.FC<Props> = ({ src, size = 'normal', round, onClick }) => {
  return (
    <div
      className={cls('lanting-avatar', {
        [`lanting-avatar-${size}`]: size !== 'normal',
        'lanting-avatar-round': round,
        'lanting-avatar-clickable': !!onClick,
      })}
      onClick={onClick}
    >
      {src ? (
        <img
          src={`${src}?imageView2/2/w/100`}
          alt='Avatar'
          className='lanting-avatar-img'
        />
      ) : (
        <Icon name='account_circle' clickable />
      )}
    </div>
  );
};

export default Avatar;
