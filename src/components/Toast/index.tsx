import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import createUID from 'utils/createUID';
import './style.scss';
import ToastItem, { IToastConfig } from './ToastItem';

interface IContext {
  toast: (text: string) => void;
}

export const ToastContext = createContext<IContext>({} as IContext);

interface ToastProps {
  children: ReactNode;
}

interface IToastItem extends IToastConfig {
  text: string;
}

const Toast: React.FC<ToastProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [list, setList] = useState<IToastItem[]>([]);

  const toast = useCallback(
    (text: string, config?: IToastConfig) => {
      const newConfig = { text, ...config };
      const newList = [...list];

      if (newConfig.id) {
        const prevIndex = list.findIndex((item) => item.id === newConfig.id);

        if (prevIndex !== -1 && newConfig.id) {
          newList[prevIndex] = newConfig as IToastItem;
        } else {
          newList.push(newConfig as IToastItem);
        }
      } else {
        const id = createUID();
        newList.push({ ...newConfig, id });
      }

      setList(newList);
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
              {list.map(({ id, ...config }) => (
                <ToastItem key={id} id={id} {...config} onClose={handleClose} />
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
};

export default Toast;
