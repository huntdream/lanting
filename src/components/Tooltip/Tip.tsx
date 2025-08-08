import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
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
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const calcPosition = useCallback(() => {
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

    // Ensure tooltip stays within viewport bounds
    const padding = 8;
    x = Math.max(padding, Math.min(x, window.innerWidth - w - padding));
    y = Math.max(padding, Math.min(y, window.innerHeight - h - padding));

    setTransform(`translate(${x}px, ${y}px)`);
  }, [rect, placement]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          calcPosition();
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
      resizeObserverRef.current = observer;
    }

    return () => {
      observer.disconnect();
      resizeObserverRef.current = null;
    };
  }, [calcPosition]);

  useEffect(() => {
    const handleClose = () => {
      onClose();
    };

    if (ref.current && isClosing) {
      ref.current.addEventListener('animationend', handleClose);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('animationend', handleClose);
      }
    };
  }, [isClosing, onClose]);

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
      role='tooltip'
      id='tooltip'
      aria-live='polite'
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
