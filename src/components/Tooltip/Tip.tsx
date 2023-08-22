import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import './style.scss';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  title: ReactNode;
  rect: DOMRect;
  placement?: Placement;
  isClosing?: boolean;
  onClose: () => void;
}

const Tip: React.FC<Props> = ({
  title,
  rect,
  placement = 'top',
  isClosing,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const oberver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          calcPosition();
        }
      }
    });

    if (ref.current) {
      oberver.observe(ref.current);
    }

    return () => oberver.disconnect();
  }, [placement]);

  useEffect(() => {
    const handleClose = () => {
      onClose();
    };

    if (ref.current && isClosing) {
      ref.current.addEventListener('animationend', handleClose);
    }

    return () => ref.current?.removeEventListener('animationend', handleClose);
  }, [isClosing]);

  const calcPosition = () => {
    if (!ref.current) return;
    const { width, left, top, height } = rect;

    const coorX = window.scrollX + left;
    const coorY = window.scrollY + top;
    const { width: w, height: h } = ref.current.getBoundingClientRect();

    let x = coorX;
    let y = coorY;

    switch (placement) {
      case 'right':
        x = coorX + width;
        y = coorY + height / 2 - h / 2;
        break;
      case 'bottom':
        x = coorX + width / 2 - w / 2;
        y = coorY + height;

        break;
      case 'left':
        x = coorX - w;
        y = coorY + height / 2 - h / 2;

        break;
      default:
        x = coorX + width / 2 - w / 2;
        y = coorY - h;
        break;
    }

    x = Math.max(0, x);
    y = Math.max(0, y);

    setTransform(`translate(${x}px, ${y}px)`);
  };

  return (
    <div
      className={cls(
        'lanting-tooltip-container',
        `lanting-tooltip--${placement}`
      )}
      ref={ref}
      style={{
        transform,
      }}
    >
      <div
        className={cls('lanting-tooltip-content', {
          'lanting-tooltip-content--fadeOut': isClosing,
        })}
      >
        {title}
      </div>
    </div>
  );
};

export default Tip;
