import Icon from 'components/Icon';
import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
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
      className={cls('lanting-toast-item', {
        'lanting-toast-item--slideout': closing,
      })}
      onMouseEnter={handleClearTimeout}
      onMouseLeave={handleSetTimeout}
      ref={ref}
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
