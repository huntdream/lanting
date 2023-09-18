import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  isValidElement,
  useRef,
  useState,
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
}

const Tooltip: React.FC<Props> = ({
  children,
  title,
  timeout = 0,
  placement,
}) => {
  const timer = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect>();
  const [isClosing, setIsClosing] = useState(false);
  const isTouch = IS_TOUCH_DEVICE;

  const child = React.Children.only(children) as React.ReactElement;
  const originChildProps = child?.props || {};

  const handleEnter = (event: MouseEvent) => {
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
  };

  const handleClose = () => {
    setVisible(false);
    setRect(undefined);
  };

  const handleLeave = () => {
    setIsClosing(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const handleMouseEnter = (event: MouseEvent) => {
    originChildProps?.onMouseEnter?.(event);

    if (isTouch) return;

    handleEnter(event);
  };

  const handleMouseLeave = (event: MouseEvent) => {
    originChildProps?.onMouseLeave?.(event);

    if (isTouch) return;

    handleLeave();
  };

  const handleTouchStart = (event: MouseEvent) => {
    handleEnter(event);
    originChildProps?.onTouchStart?.(event);
  };

  const handleTouchEnd = (event: MouseEvent) => {
    handleLeave();
    originChildProps?.onTouchEnd?.(event);
  };

  const childProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  const trigger =
    isValidElement(children) && React.cloneElement(children, childProps);

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
