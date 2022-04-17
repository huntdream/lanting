import React, { ReactNode } from 'react';
import './style.scss';

interface UnderlineProps {
  children?: ReactNode;
}

const Underline: React.FC<UnderlineProps> = ({ children }) => {
  return <div className='lanting-underline'>{children}</div>;
};

export default Underline;
