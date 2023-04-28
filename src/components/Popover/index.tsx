import React, { ReactNode } from 'react';
import './style.scss';

interface PopoverProps {
  align: 'start' | 'center' | 'end';
  position: 'left' | 'top' | 'right' | 'bottom';
  children?: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ align, position, children }) => {
  return <div>Popover</div>;
};

export default Popover;
