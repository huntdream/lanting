import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import createUID from 'utils/createUID';
import './style.scss';
import ToastItem, { IToastItem } from './ToastItem';

interface IContext {
  toast: (text: string) => void;
}

export const ToastContext = createContext<IContext>({} as IContext);

interface ToastProps {
  children: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [list, setList] = useState<IToastItem[]>([]);

  const toast = useCallback(
    (text: string, wait: number = 2000) => {
      const id = createUID();

      setList(
        list.concat({
          id,
          text,
        })
      );

      setShow(true);
    },
    [setShow, list]
  );

  const handleClose = useCallback((id: string) => {
    setList((state) => state.filter((item) => item.id !== id));
  }, []);

  const context: IContext = {
    toast,
  };

  return (
    <ToastContext.Provider value={context}>
      {children}
      {show
        ? createPortal(
            <div className='lanting-toast'>
              {list.map(({ id, text }) => (
                <ToastItem key={id} id={id} text={text} onClose={handleClose} />
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
};

export default Toast;
