import React from 'react';
import cls from 'classnames';
import './style.scss';

interface ErrorProps {
  className?: string;
}

const Error: React.FC<ErrorProps> = ({ className, children }) => {
  return (
    <div className={cls('lanting-text lanting-text--error', className)}>
      {children}
    </div>
  );
};

export default Error;
