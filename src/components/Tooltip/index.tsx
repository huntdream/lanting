import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './style.scss';
import Tip, { Placement } from './Tip';

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

  const handleLeave = (event: MouseEvent) => {
    setIsClosing(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const handleMouseEnter = (event: MouseEvent) => {
    handleEnter(event);
    originChildProps?.onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent) => {
    handleLeave(event);
    originChildProps?.onMouseLeave?.(event);
  };

  const handleTouchStart = (event: MouseEvent) => {
    handleEnter(event);
    originChildProps?.onTouchStart?.(event);
  };

  const handleTouchEnd = (event: MouseEvent) => {
    handleLeave(event);
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
