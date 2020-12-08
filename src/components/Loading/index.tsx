import React from 'react';
import './style.scss';

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return <div className='lanting-loading'>Loading</div>;
};

export default Loading;
