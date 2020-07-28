import React from 'react';
import './style.scss';

interface PopoverProps {
  align: 'start' | 'center' | 'end';
  position: 'left' | 'top' | 'right' | 'bottom';
}

const Popover: React.FC<PopoverProps> = ({ align, position }) => {
  return <div>Popover</div>;
};

export default Popover;
