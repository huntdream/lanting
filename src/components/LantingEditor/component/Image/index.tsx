import React, { FC } from 'react';
import './style.scss';

interface Props {
  src?: string;
  alt?: string;
}

const Image: FC<Props> = ({ src, alt }) => {
  return <img className='lanting-editor-image' src={src} alt={alt} />;
};

export default Image;
