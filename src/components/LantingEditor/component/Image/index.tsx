import React, { FC, useMemo } from 'react';
import './style.scss';

interface Props {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

const Image: FC<Props> = ({ src, alt, width, height }) => {
  const aspectRatio = useMemo(() => {
    if (typeof width === 'number' && typeof height === 'number') {
      return `${width} / ${height}`;
    }

    return 'auto';
  }, [width, height]);

  return (
    <img
      className='lanting-editor-image'
      style={{
        aspectRatio,
      }}
      src={src}
      alt={alt}
    />
  );
};

export default Image;
