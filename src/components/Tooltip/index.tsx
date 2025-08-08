import React, {
  MouseEvent,
  TouchEvent,
  ReactElement,
  ReactNode,
  isValidElement,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import Tip, { Placement } from './Tip';
import { IS_TOUCH_DEVICE } from 'utils/platform';
import './style.scss';

interface Props {
  title?: ReactNode;
  timeout?: number;
  children: ReactElement;
  placement?: Placement;
  disabled?: boolean;
}

const Tooltip: React.FC<Props> = ({
  children,
  title,
  timeout = 0,
  placement,
  disabled = false,
}) => {
  const timer = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect>();
  const [isClosing, setIsClosing] = useState(false);
  const isTouch = IS_TOUCH_DEVICE;

  const child = React.Children.only(children) as React.ReactElement;
  const originChildProps = child?.props || {};

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = 0;
      }
    };
  }, []);

  // Handle escape key to close tooltip
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && visible) {
        handleClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [visible]);

  const handleEnter = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (disabled || !title) return;

      setIsClosing(false);

      if (!visible) {
        const target = event.currentTarget as HTMLElement;

        setRect(target.getBoundingClientRect());

        if (timeout > 0) {
          timer.current = window.setTimeout(() => {
            setVisible(true);
          }, timeout);
        } else {
          setVisible(true);
        }
      }
    },
    [disabled, title, visible, timeout]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
    setRect(undefined);
  }, []);

  const handleLeave = useCallback(() => {
    setIsClosing(true);

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = 0;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (event: MouseEvent) => {
      const originalHandler = (originChildProps as any)?.onMouseEnter;
      originalHandler?.(event);

      if (isTouch) return;

      handleEnter(event);
    },
    [isTouch, handleEnter, originChildProps]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      const originalHandler = (originChildProps as any)?.onMouseLeave;
      originalHandler?.(event);

      if (isTouch) return;

      handleLeave();
    },
    [isTouch, handleLeave, originChildProps]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      handleEnter(event);
      const originalHandler = (originChildProps as any)?.onTouchStart;
      originalHandler?.(event);
    },
    [handleEnter, originChildProps]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      handleLeave();
      const originalHandler = (originChildProps as any)?.onTouchEnd;
      originalHandler?.(event);
    },
    [handleLeave, originChildProps]
  );

  const childProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    'aria-describedby': visible ? 'tooltip' : undefined,
  };

  const trigger =
    isValidElement(children) && React.cloneElement(children, childProps);

  if (!title && !disabled) {
    return children;
  }

  return (
    <>
      {trigger}
      {visible &&
        rect &&
        createPortal(
          <Tip
            title={title}
            rect={rect}
            isClosing={isClosing}
            placement={placement}
            onClose={handleClose}
          />,
          document.body
        )}
    </>
  );
};

export default Tooltip;
