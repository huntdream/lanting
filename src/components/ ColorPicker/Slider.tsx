import React, { MouseEvent, useCallback, useRef, useState } from 'react';
import cls from 'classnames';
import './style.scss';
import useColorDrag from './hooks/useColorDrag';

interface Props {
  className?: string;
}

const Slider: React.FC<Props> = ({ className }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  const [offset, onDragStart] = useColorDrag({
    containerRef: sliderRef,
    targetRef: handlerRef,
    direction: 'x',
  });

  return (
    <div
      className={cls('lanting-color-picker-slider', className)}
      ref={sliderRef}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      <div style={{ position: 'absolute', left: offset.x }}>
        <div
          className='lanting-color-picker-handler lanting-color-picker-handler-sm'
          ref={handlerRef}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
