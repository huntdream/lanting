import React, { CSSProperties, HTMLAttributes } from 'react';
import cls from 'classnames';
import './style.scss';

interface IconProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  size?: number;
  style?: CSSProperties;
  clickable?: boolean;
  round?: boolean;
  children: string;
}

const Icon: React.FC<IconProps> = ({
  className,
  children,
  style,
  size,
  round,
  clickable,
  onClick,
  ...props
}) => {
  return (
    <i
      className={cls(
        'lanting-icon',
        'material-icons',
        onClick || clickable ? 'lanting-icon--clickable' : undefined,
        className,
        {
          'lanting-icon-round': round,
        }
      )}
      onClick={onClick}
      style={{ fontSize: size, ...style }}
      {...props}
    >
      {children}
    </i>
  );
};

export default Icon;
