import React from 'react';
import './style.scss';

interface Props {
  size?: number | string;
}

const Spin: React.FC<Props> = ({ size }) => {
  return (
    <div className='lanting-loading-spin'>
      <div
        className='lanting-loading-circle'
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Spin;
