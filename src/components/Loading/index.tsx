import React, { ReactNode } from 'react';
import cls from 'classnames';
import './style.scss';
import Spin from './Spin';

interface LoadingProps {
  children?: ReactNode;
  loading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ children, loading }) => {
  return (
    <div className='lanting-loading'>
      {loading && <Spin />}
      <div
        className={cls('lanting-loading-wrap', {
          'lanting-loading-wrap--blur': loading,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Loading;
