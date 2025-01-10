import React from 'react';
import cls from 'classnames';
import AccountCircle from 'assets/icons/account_circle.svg?react';
import './style.scss';

interface Props {
  src?: string;
  size?: 'small' | 'large' | 'normal' | number;
  round?: boolean;
  onClick?: () => void;
}

const Avatar: React.FC<Props> = ({ src, size = 'normal', round, onClick }) => {
  const isCustomSize = typeof size === 'number';

  const px = isCustomSize ? `${size}px` : undefined;

  return (
    <div
      className={cls('lanting-avatar', {
        [`lanting-avatar-${size}`]: !isCustomSize && size !== 'normal',
        'lanting-avatar-round': round,
        'lanting-avatar-clickable': !!onClick,
      })}
      style={{ width: px, height: px }}
      onClick={onClick}
    >
      {src ? (
        <img src={src} alt='Avatar' className='lanting-avatar-img' />
      ) : (
        <AccountCircle className='lanting-avatar-account' />
      )}
    </div>
  );
};

export default Avatar;
