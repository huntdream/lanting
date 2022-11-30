import React, { MouseEvent, useState, useEffect } from 'react';
import './style.scss';
import { createPortal } from 'react-dom';
import useScrollLock from 'hooks/useScrollLock';
import Button from 'components/Button';
import Icon from 'components/Icon';

interface GalleryProps {
  visible?: boolean;
  onClose?: () => void;
  defaultActive?: string;
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({
  visible,
  onClose,
  defaultActive,
  images,
}) => {
  useScrollLock(visible);
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(defaultActive || images?.[0]);
  }, [images, defaultActive]);

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return visible
    ? createPortal(
        <div className='lanting-gallery'>
          <div className='lanting-gallery-mask'></div>
          <div className='lanting-gallery-wrapper' onClick={onClose}>
            <div className='lanting-gallery-inner' onClick={stopPropagation}>
              <Button
                className='lanting-gallery-close'
                color='secondary'
                onClick={onClose}
              >
                <Icon className='lanting-gallery-close-icon'>close</Icon>
              </Button>
              <div className='lanting-gallery-preview'>
                <img
                  src={active}
                  alt=''
                  className='lanting-gallery-preview-image'
                />
              </div>
              <div className='lanting-gallery-thumbnails'>
                {images.map((src) => (
                  <img
                    src={src}
                    alt=''
                    onClick={() => setActive(src)}
                    className='lanting-gallery-thumbnails-img'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('root')!
      )
    : null;
};

export default Gallery;
