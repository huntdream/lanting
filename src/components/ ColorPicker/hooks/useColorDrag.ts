import React, { RefObject, useState, useRef, useEffect } from 'react'

type EventType =
  | MouseEvent
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>
  | TouchEvent;

type EventHandle = (e: EventType) => void;

interface ColorDragProps {
  containerRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  direction?: 'x' | 'y'
}

function getPosition(e: EventType) {
  const obj = 'touches' in e ? e.touches[0] : e;
  const scrollXOffset =
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    window.scrollX;
  const scrollYOffset =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.scrollY;
  return { pageX: obj.pageX - scrollXOffset, pageY: obj.pageY - scrollYOffset };
}

const useColorDrag = ({ containerRef, targetRef, direction = 'x' }: ColorDragProps): [{ x: number, y: number }, EventHandle] => {
  const [offsetValue, setOffsetValue] = useState({ x: 0, y: 0 })
  const mouseMoveRef = useRef<EventHandle | null>(null)
  const mouseUpRef = useRef<EventHandle | null>(null)

  useEffect(
    () => () => {
      if (!mouseMoveRef.current || !mouseUpRef.current) return

      document.removeEventListener('mousemove', mouseMoveRef.current);
      document.removeEventListener('mouseup', mouseUpRef.current);
      document.removeEventListener('touchmove', mouseMoveRef.current);
      document.removeEventListener('touchend', mouseUpRef.current);

      mouseMoveRef.current = null;
      mouseUpRef.current = null;
    },
    [],
  );

  const updateOffset: EventHandle = (e) => {
    if (!containerRef.current || !targetRef.current) return

    const { pageX, pageY } = getPosition(e)

    const {
      x: rectX,
      y: rectY,
      width,
      height,
    } = containerRef.current.getBoundingClientRect();
    const { width: targetWidth, height: targetHeight } =
      targetRef.current.getBoundingClientRect();

    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;

    const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
    const offsetY =
      Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;

    const calcOffset = {
      x: offsetX,
      y: direction === 'x' ? offsetValue.y : offsetY,
    };

    setOffsetValue(calcOffset);
  }

  const onDragEnd: EventHandle = (e) => {
    e.preventDefault()
    if (mouseUpRef.current && mouseMoveRef.current) {
      document.removeEventListener('mouseup', mouseUpRef.current)
      document.removeEventListener('mousemove', mouseMoveRef.current)
      document.removeEventListener('touchend', mouseUpRef.current)
      document.removeEventListener('touchmove', mouseMoveRef.current)

      mouseMoveRef.current = null
      mouseUpRef.current = null
    }

  }

  const onDragMove: EventHandle = e => {
    e.preventDefault();
    updateOffset(e)
  };

  const onDragStart: EventHandle = e => {
    updateOffset(e)

    document.addEventListener('mouseup', onDragEnd)
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('touchend', onDragEnd)
    document.addEventListener('touchmove', onDragMove)

    mouseMoveRef.current = onDragMove
    mouseUpRef.current = onDragEnd
  }

  return [offsetValue, onDragStart]
}

export default useColorDrag