import React from 'react';
import cls from 'classnames';
import { ReactComponent as AccountCircle } from '../../assets/icons/account_circle.svg';
import './style.scss';

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
        <AccountCircle className='lanting-avatar-account' />
      )}
    </div>
  );
};

export default Avatar;
