import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
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

  useEffect(() => {}, []);

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

  const child = React.cloneElement(children, {
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onTouchStart: handleEnter,
    onTouchEnd: handleLeave,
  });

  return (
    <>
      {child}
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
