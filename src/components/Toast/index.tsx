import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import createUID from 'utils/createUID';
import './style.scss';
import ToastItem, { IToastConfig } from './Toaster';

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

  const updateHeight = (id: string, height: number) => {
    setList((state) =>
      state.map((item) => {
        if (item.id === id) {
          const offset = state.reduce((a, b) => a + (b.height || 0), 0);

          return { ...item, height, offset };
        }

        return item;
      })
    );
  };

  const calcOffset = (id: string) => {
    const toastIndex = list.findIndex((it) => it.id === id);

    const offset = list
      .slice(toastIndex + 1)
      .reverse()
      .reduce((a, b) => a + (b.height || 0) + 16, 0);

    return offset;
  };

  return (
    <ToastContext.Provider value={context}>
      {children}
      {show
        ? createPortal(
            <div className='lanting-toast'>
              {list.map(({ id, ...config }) => {
                const offset = calcOffset(id);

                return (
                  <ToastItem
                    key={id}
                    id={id}
                    {...config}
                    offset={offset}
                    onClose={handleClose}
                    updateHeight={updateHeight}
                  />
                );
              })}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
};

export default Toast;
