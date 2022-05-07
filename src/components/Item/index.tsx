import React, { HTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';
import './style.scss';
import Icon from 'components/Icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  icon?: string;
}

const Item: React.FC<Props> = ({ icon, children, className, ...props }) => {
  return (
    <div className={cls('lanting-item', className)} {...props}>
      {icon && <Icon>{icon}</Icon>}
      {children}
    </div>
  );
};

export default Item;
