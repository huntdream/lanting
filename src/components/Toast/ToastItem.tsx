import Icon from 'components/Icon';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

export interface IToastConfig {
  id: string;
  close?: boolean;
  timeout?: number;
  showProgress?: boolean;
}

interface Props extends IToastConfig {
  text: string;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<Props> = ({
  id,
  text,
  close,
  timeout = 3000,
  showProgress,
  onClose,
}) => {
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

    now.current = Date.now();
    setPlayState('running');
  };

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div
      className='lanting-toast-item'
      onMouseEnter={handleClearTimeout}
      onMouseLeave={handleSetTimeout}
    >
      <div className='lanting-toast-item-content'>{text}</div>
      {close && <Icon onClick={handleClose} name='close' />}
      {showProgress && (
        <div
          className='lanting-toast-item-progress'
          style={{ animationPlayState: playState }}
        ></div>
      )}
    </div>
  );
};

export default ToastItem;
