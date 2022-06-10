import React from 'react';
import cls from 'classnames';
import './style.scss';
import Icon from 'components/Icon';

interface Props {
  src?: string;
  size?: 'small' | 'large' | 'normal';
  round?: boolean;
}

const Avatar: React.FC<Props> = ({ src, size = 'normal', round }) => {
  return (
    <div
      className={cls('lanting-avatar', {
        [`lanting-avatar-${size}`]: size !== 'normal',
        'lanting-avatar-round': round,
      })}
    >
      {!src ? (
        <img
          src={`${src}?imageView2/2/w/100`}
          alt='Avatar'
          className='lanting-avatar-img'
        />
      ) : (
        <Icon>account_circle</Icon>
      )}
    </div>
  );
};

export default Avatar;
