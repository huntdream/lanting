import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './style.scss';

interface Props {
  title: ReactNode;
  timeout?: number;
  children: ReactElement;
}

const Tooltip: React.FC<Props> = ({ children, title, timeout = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const renderTooltip = () => {
    if (visible) {
      return (
        <div className='lanting-tooltip-content' style={{ opacity: 1 }}>
          {title}
        </div>
      );
    }
  };

  const handleEnter = (event: MouseEvent) => {
    if (!visible) {
      const target = event.currentTarget as HTMLElement;
      const { top, left, height, width } = target.getBoundingClientRect();

      const x = left + window.scrollX + width / 2;
      const y = top - height + window.scrollY;
      setPosition({ left: x, top: y - 12 });

      if (timeout > 0) {
        timer.current = window.setTimeout(() => {
          setVisible(true);
        }, timeout);
      } else {
        setVisible(true);
      }
    }
  };

  const handleLeave = (event: MouseEvent) => {
    setVisible(false);

    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const tooltip = (
    <div
      className='lanting-tooltip-container'
      ref={ref}
      style={{
        transform: 'translateX(-50%)',
        ...position,
      }}
    >
      {renderTooltip()}
    </div>
  );

  const child = React.cloneElement(children, {
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onTouchStart: handleEnter,
    onTouchEnd: handleLeave,
  });

  return (
    <>
      {child}
      {visible && createPortal(tooltip, document.body)}
    </>
  );
};
export default Tooltip;
