import React from 'react';
import './style.scss';

interface UnderlineProps {}

const Underline: React.FC<UnderlineProps> = ({ children }) => {
  return <div className='lanting-underline'>{children}</div>;
};

export default Underline;
