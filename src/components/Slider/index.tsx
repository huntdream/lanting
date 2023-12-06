import React, { useCallback, useRef, useState } from 'react';
import './style.scss';
import useDrag from './useDrag';

interface Props {
  value: number;
  direction?: 'x' | 'y';
}

const Slider: React.FC<Props> = ({ value, direction = 'x' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);
  const [] = useDrag({ containerRef, handlerRef });
  const [offsetValue, setOffsetValue] = useState<number>(0);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent | React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !handlerRef.current) return;
      const evt = 'touches' in e ? e.touches[0] : e;

      const pageX =
        evt.pageX - document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        window.scrollX;

      const pageY =
        evt.pageY - document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.scrollY;

      const {
        x: rectX,
        y: rectY,
        width,
        height,
      } = containerRef.current.getBoundingClientRect();

      const { width: targetWidth, height: targetHeight } =
        handlerRef.current.getBoundingClientRect();

      const centerOffsetX = targetWidth / 2;
      const centerOffsetY = targetHeight / 2;

      const offsetX =
        Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
      const offsetY =
        Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;
      console.log(offsetX);
      setOffsetValue(direction === 'x' ? offsetX : offsetY);
    },
    []
  );

  console.log(offsetValue, 'offsetValue');

  const handleEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);

    document.removeEventListener('mouseup', handleMove);
    document.removeEventListener('touchend', handleMove);
  }, [handleMove]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);

    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  return (
    <div
      className='lanting-slider'
      ref={containerRef}
      onMouseDown={handleMouseDown}
    >
      <div
        className='lanting-slider-track'
        style={{ width: `${offsetValue + 8}px` }}
      ></div>
      <div
        className='lanting-slider-handler'
        ref={handlerRef}
        style={{ left: `${offsetValue}px` }}
      ></div>
    </div>
  );
};

export default Slider;
