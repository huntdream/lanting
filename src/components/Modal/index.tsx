import React, { ReactNode, MouseEvent } from 'react';
import cls from 'classnames';
import './style.scss';
import { createPortal } from 'react-dom';
import Button from 'components/Button';
import useScrollLock from 'hooks/useScrollLock';

interface ModalProps {
  visible?: boolean;
  className?: string;
  title?: ReactNode;
  width?: string | number;
  children?: ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  width,
  className,
  children,
  onClose,
}) => {
  useScrollLock(visible);

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return visible
    ? createPortal(
        <div className='lanting-modal'>
          <div className='lanting-modal-mask'></div>
          <div className='lanting-modal-wrapper'>
            <div className='lanting-modal-inner'>
              <div className='lanting-modal-main'>
                <div
                  className={cls('lanting-modal-body', className)}
                  style={{ width }}
                  onClick={stopPropagation}
                >
                  <div className='lanting-modal-header'>
                    <h2 className='lanting-modal-title'>{title}</h2>
                    <Button
                      className='lanting-modal-close'
                      color='secondary'
                      onClick={onClose}
                      icon='close'
                    />
                  </div>
                  <div className='lanting-modal-content'>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('root')!
      )
    : null;
};

export default Modal;
