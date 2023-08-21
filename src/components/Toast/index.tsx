import React, { createContext, ReactNode, useCallback, useState } from 'react';
import createUID from 'utils/createUID';
import { IToastConfig } from './Toaster';
import Toasts from './Toasts';
import './style.scss';

interface IContext {
  toast: (text: string) => void;
}

export const ToastContext = createContext<IContext>({} as IContext);

interface ToastProps {
  children: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ children }) => {
  const [list, setList] = useState<IToastConfig[]>([]);

  const toast = useCallback(
    (text: string, config?: IToastConfig) => {
      const newConfig = { text, ...config };
      const newList = [...list];

      if (newConfig.id) {
        const prevIndex = list.findIndex((item) => item.id === newConfig.id);

        if (prevIndex !== -1 && newConfig.id) {
          newList[prevIndex] = newConfig as IToastConfig;
        } else {
          newList.push(newConfig as IToastConfig);
        }
      } else {
        const id = createUID();
        newList.push({ position: 'top', ...newConfig, id });
      }

      setList(newList);
    },
    [list]
  );

  const context: IContext = {
    toast,
  };

  return (
    <ToastContext.Provider value={context}>
      {children}
      <Toasts list={list} updateList={setList} />
    </ToastContext.Provider>
  );
};

export default Toast;
