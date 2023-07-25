import React, { MouseEvent, useState, useEffect, useMemo } from 'react';
import './style.scss';
import { createPortal } from 'react-dom';
import useScrollLock from 'hooks/useScrollLock';
import cls from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { ImagePayload } from 'components/LantingEditor/plugins/GalleryPlugin';

interface GalleryProps {
  visible?: boolean;
  onClose?: () => void;
  defaultActive?: string;
  images: ImagePayload[];
}

const Gallery: React.FC<GalleryProps> = ({
  visible,
  onClose,
  defaultActive,
  images,
}) => {
  useScrollLock(visible);
  const [activeKey, setActiveKey] = useState<string>();

  useEffect(() => {
    setActiveKey(defaultActive || images?.[0]?.nodeKey);
  }, [images, defaultActive]);

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const acitveImage = useMemo(
    () => images.find((i) => i.nodeKey === activeKey)?.src,
    [activeKey, images]
  );

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
                <Icon className='lanting-gallery-close-icon' name='close' />
              </Button>
              <div className='lanting-gallery-preview'>
                <img
                  src={acitveImage}
                  alt=''
                  className='lanting-gallery-preview-image'
                />
              </div>
              <div className='lanting-gallery-thumbnails'>
                {images.map(({ src, nodeKey }) => (
                  <div
                    className={cls('lanting-gallery-thumbnails-box', {
                      'lanting-gallery-thumbnails-box--active':
                        nodeKey === activeKey,
                    })}
                    key={nodeKey}
                  >
                    <img
                      src={src}
                      alt=''
                      onClick={() => setActiveKey(nodeKey)}
                      className='lanting-gallery-thumbnails-img'
                    />
                  </div>
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
