import React, { AnimationEvent } from 'react';
import cls from 'classnames';
import './style.scss';
import Icon from 'components/Icon';

interface Props {
  id: string;
  text: string;
  showProgress?: boolean;
  playState?: string;
  close?: boolean;
  closing: boolean;
  onClose: (id: string) => void;
  onStartClose: () => void;
}

const ToastBar: React.FC<Props> = ({
  id,
  text,
  showProgress,
  close,
  closing,
  playState,
  onClose,
  onStartClose,
}) => {
  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || !closing) {
      return;
    }

    onClose(id);
  };

  return (
    <div
      className={cls('lanting-toast-bar', {
        'lanting-toast-bar--slideout': closing,
      })}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className='lanting-toast-bar-content'>{text}</div>
      {close && <Icon onClick={onStartClose} name='close' />}
      {showProgress && (
        <div
          className='lanting-toast-progress'
          style={{ animationPlayState: playState }}
        ></div>
      )}
    </div>
  );
};

export default ToastBar;
