import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

export interface IToastItem {
  id: string;
  text: string;
}

interface Props extends IToastItem {
  timeout?: number;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<Props> = ({ id, text, timeout = 3000, onClose }) => {
  const now = useRef(Date.now());
  const timer = useRef<number>(0);
  const [wait, setWait] = useState(timeout);
  const [playState, setPlayState] = useState<AnimationPlayState>('running');

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      onClose(id);
    }, timeout);
  }, [id, onClose, timeout]);

  const handleClearTimeout = () => {
    clearTimeout(timer.current);
    const remainingTime = wait - (Date.now() - now.current);

    setWait(remainingTime);
    setPlayState('paused');
  };

  const handleSetTimeout = () => {
    timer.current = window.setTimeout(() => {
      onClose(id);
    }, wait);

    setPlayState('running');
  };

  return (
    <div
      className='lanting-toast-item'
      onMouseEnter={handleClearTimeout}
      onMouseLeave={handleSetTimeout}
    >
      {text}
      <div
        className='lanting-toast-item-progress'
        style={{ animationPlayState: playState }}
      ></div>
    </div>
  );
};

export default ToastItem;
