import React, { ReactNode } from 'react';
import Icon from 'components/Icon';
import './style.scss';

interface ExceptionProps {
  children?: ReactNode;
}

const Exception: React.FC<ExceptionProps> = ({ children }) => {
  return (
    <div className='lanting-exception'>
      <div className='lanting-exception-icon'>
        <Icon name='error_outline' />
      </div>
      <div className='lanting-exception-text'>Something went wrong</div>
      {children}
    </div>
  );
};

export default Exception;
