import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './style.scss';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  title: ReactNode;
  rect: DOMRect;
  placement?: Placement;
  offset?: number;
}

const Tip: React.FC<Props> = ({
  title,
  rect,
  placement = 'top',
  offset = 6,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, transform: '' });

  useEffect(() => {
    const oberver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          // calcPosition();
        }
      }
    });

    if (ref.current) {
      oberver.observe(ref.current);
    }

    return () => oberver.disconnect();
  }, []);

  const calcPosition = () => {
    const { width, left, top, height } = rect;

    const coorX = window.scrollX + left;
    const coorY = window.scrollY + top;

    let x = coorX;
    let y = coorY;
    let transform = '';

    switch (placement) {
      case 'right':
        x = coorX + width + offset;
        y = coorY + height / 2;
        transform = 'translateY(-50%)';
        break;
      case 'bottom':
        x = coorX + width / 2;
        y = coorY + height + offset;
        transform = 'translateX(-50%)';

        break;
      case 'left':
        x = coorX - offset;
        y = coorY + height / 2;
        transform = 'translate(-100%, -50%)';

        break;
      default:
        x = coorX + width / 2;
        y = coorY - offset;
        transform = 'translate(-50%, -100%)';
        break;
    }
    setPosition({ left: x, top: y, transform });
  };

  useEffect(() => {
    calcPosition();
  }, []);

  return (
    <div
      className='lanting-tooltip-container'
      ref={ref}
      style={{
        ...position,
      }}
    >
      <div className='lanting-tooltip-content' style={{ opacity: 1 }}>
        {title}
      </div>
    </div>
  );
};

export default Tip;
