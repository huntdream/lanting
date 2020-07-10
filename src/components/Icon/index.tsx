import React, { CSSProperties, HTMLAttributes } from 'react';
import cls from 'classnames';

interface IconProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  children: string;
}

const Icon: React.FC<IconProps> = ({
  className,
  children,
  style,
  onClick,
  ...props
}) => {
  return (
    <i
      className={cls('material-icons', 'lanting-icon--clickable', className)}
      style={style}
      {...props}
    >
      {children}
    </i>
  );
};

export default Icon;
