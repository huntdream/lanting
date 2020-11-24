import Icon from 'components/Icon';
import React from 'react';
import './style.scss';

interface ExceptionProps {}

const Exception: React.FC<ExceptionProps> = () => {
  return (
    <div className='lanting-exception'>
      <div className='lanting-exception-icon'>
        <Icon>error_outline</Icon>
      </div>
      <div className='lanting-exception-text'>Something went wrong</div>
    </div>
  );
};

export default Exception;
