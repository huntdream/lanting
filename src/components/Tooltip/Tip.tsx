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
  const [position, setPosition] = useState({ left: 0, top: 0, transform: '' });

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
    let transform = '';

    switch (placement) {
      case 'right':
        x = coorX + width;
        y = coorY + height / 2 - h / 2;
        // transform = 'translateY(-50%)';
        break;
      case 'bottom':
        x = coorX + width / 2 - w / 2;
        y = coorY + height;
        // transform = 'translateX(-50%)';

        break;
      case 'left':
        x = coorX - w;
        y = coorY + height / 2 - h / 2;
        // transform = 'translate(-100%, -50%)';

        break;
      default:
        x = coorX + width / 2 - w / 2;
        y = coorY - h;
        // transform = 'translate(-50%, -100%)';
        break;
    }

    x = Math.max(0, x);
    y = Math.max(0, y);

    setPosition({ left: x, top: y, transform });
  };

  return (
    <div
      className={cls(
        'lanting-tooltip-container',
        `lanting-tooltip--${placement}`
      )}
      ref={ref}
      style={{
        transform: `translate(${position.left}px, ${position.top}px)`,
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
