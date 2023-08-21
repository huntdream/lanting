import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import './style.scss';
import ToastBar from './ToastBar';
import { flushSync } from 'react-dom';

export type Position =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left';

export interface IToastConfig {
  id: string;
  text: ReactNode;
  close?: boolean;
  timeout?: number;
  height?: number;
  position: Position;
  showProgress?: boolean;
}

interface Props extends IToastConfig {
  offset: number;
  onClose: (id: string) => void;
  updateHeight: (id: string, height: number) => void;
}

const Toaster: React.FC<Props> = ({
  id,
  text,
  close,
  offset,
  position = 'top',
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
      handleStartClose();
    }, timeout);
  }, [id, onClose, timeout]);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      const { height } = el.getBoundingClientRect();

      updateHeight(id, height);
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
      handleStartClose();
    }, wait);

    now.current = Date.now();
    setPlayState('running');
  };

  const handleStartClose = () => {
    setClosing(true);
  };

  const [vertical, horizontal] = position.split('-');

  return (
    <div
      className={cls('lanting-toast-item', {
        [`lanting-toast--${vertical}`]: vertical,
        [`lanting-toast--${horizontal}`]: horizontal,
      })}
      onMouseEnter={handleClearTimeout}
      onMouseLeave={handleSetTimeout}
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <ToastBar
        id={id}
        onStartClose={handleStartClose}
        onClose={onClose}
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
