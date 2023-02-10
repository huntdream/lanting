import React, { ReactNode } from 'react';
import cls from 'classnames';
import './style.scss';

interface LoadingProps {
  children?: ReactNode;
  loading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ children, loading }) => {
  return (
    <div className='lanting-loading'>
      {loading && (
        <div className='lanting-loading-spin'>
          <div className='lanting-loading-circle'></div>
        </div>
      )}
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
