import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import ToastBar from './ToastBar';

export interface IToastConfig {
  id: string;
  close?: boolean;
  timeout?: number;
  height?: number;
  showProgress?: boolean;
}

interface Props extends IToastConfig {
  text: string;
  offset: number;
  onClose: (id: string) => void;
  updateHeight: (id: string, height: number) => void;
}

const Toaster: React.FC<Props> = ({
  id,
  text,
  close,
  offset,
  timeout = 3000,
  showProgress,
  updateHeight,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const now = useRef(Date.now());
  const timer = useRef<number>(0);
  const [wait, setWait] = useState(timeout);
  const [closing, setClosing] = useState(false);
  const [playState, setPlayState] = useState<AnimationPlayState>('running');

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      handleClose();
    }, timeout);
  }, [id, onClose, timeout]);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;

      updateHeight(id, el.getBoundingClientRect().height);
    }
  }, []);

  const handleClearTimeout = () => {
    setClosing(false);

    clearTimeout(timer.current);
    const remainingTime = wait - (Date.now() - now.current);

    setWait(remainingTime);
    setPlayState('paused');
  };

  const handleSetTimeout = () => {
    timer.current = window.setTimeout(() => {
      handleClose();
    }, wait);

    now.current = Date.now();
    setPlayState('running');
  };

  const handleClose = () => {
    setClosing(true);

    if (ref.current) {
      ref.current.addEventListener('animationend', () => {
        onClose(id);
      });
    }
  };

  return (
    <div
      className='lanting-toast-item'
      onMouseEnter={handleClearTimeout}
      onMouseLeave={handleSetTimeout}
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <ToastBar
        onClose={handleClose}
        close={close}
        playState={playState}
        showProgress={showProgress}
        text={text}
        closing={closing}
      />
    </div>
  );
};

export default Toaster;
