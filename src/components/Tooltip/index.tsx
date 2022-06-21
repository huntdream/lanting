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
  children: ReactElement;
}

const Tooltip: React.FC<Props> = ({ children, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const renderTooltip = () => {
    if (visible) {
      return <div className='lanting-tooltip-content'>{title}</div>;
    }
  };

  const onMouseEnter = (event: MouseEvent) => {
    console.log('enter', event.target);
    if (!visible) {
      const target = event.target as HTMLElement;
      const { top, left, height, width } = target.getBoundingClientRect();

      const x = left + window.scrollX + width / 2;
      const y = top - height + window.scrollY;
      setPosition({ left: x, top: y - 18 });

      setVisible(true);
    }
  };

  const onMouseLeave = () => {
    setVisible(false);
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

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className='lanting-tooltip'
    >
      {children}
      {visible && createPortal(tooltip, document.body)}
    </div>
  );
};
export default Tooltip;
