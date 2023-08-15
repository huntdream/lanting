import React from 'react';
import cls from 'classnames';
import './style.scss';
import Icon from 'components/Icon';

interface Props {
  text: string;
  showProgress?: boolean;
  playState?: string;
  close?: boolean;
  closing: boolean;
  onClose: () => void;
}

const ToastBar: React.FC<Props> = ({
  text,
  showProgress,
  close,
  closing,
  playState,
  onClose,
}) => {
  return (
    <div
      className={cls('lanting-toast-bar', {
        'lanting-toast-bar--slideout': closing,
      })}
    >
      <div className='lanting-toast-bar-content'>{text}</div>
      {close && <Icon onClick={onClose} name='close' />}
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
