import React, { useCallback, useState } from 'react';
import './style.scss';
import { createPortal } from 'react-dom';
import Toaster, { IToastConfig, Position } from './Toaster';

interface Props {
  updateList: React.Dispatch<React.SetStateAction<IToastConfig[]>>;
  list: IToastConfig[];
}

const Toasts: React.FC<Props> = ({ updateList, list }) => {
  const handleClose = useCallback((id: string) => {
    updateList((state) => state.filter((item) => item.id !== id));
  }, []);

  const updateHeight = (id: string, height: number) => {
    updateList((state) =>
      state.map((item) => {
        if (item.id === id) {
          return { ...item, height };
        }

        return item;
      })
    );
  };

  const calcOffset = (id: string, position: Position) => {
    const samePositionList = list.filter((it) => it.position === position);

    const toastIndex = samePositionList.findIndex((it) => it.id === id);

    const isTop = position.includes('top');

    const offset = samePositionList
      .slice(toastIndex + 1)
      .reverse()
      .reduce((a, b) => a + (b.height || 0) + 16, 0);

    return offset * (isTop ? 1 : -1);
  };

  return createPortal(
    <div className='lanting-toast'>
      {list.map(({ id, ...config }) => {
        const offset = calcOffset(id, config.position);

        return (
          <Toaster
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
  );
};

export default Toasts;
