import React, { ReactNode, useCallback } from 'react';
import { useMemo, useState } from 'react';
import { IS_TOUCH_DEVICE } from 'utils/platform';

export type EventType =
  | MouseEvent
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>
  | TouchEvent;

type EventHandle = (e: EventType) => void;

type Events = 'onMouseEnter' | 'onMouseLeave' | 'onTouchStart' | 'onTouchEnd';

const useHover = <T extends HTMLElement>(): [
  Record<Events, EventHandle>,
  ReactNode
] => {
  const [show, setShow] = useState(false);
  const isTouch = IS_TOUCH_DEVICE;

  const handleEnter: EventHandle = useCallback((e) => {
    if (isTouch && e.type === 'mouseenter') return;
    setShow(true);
  }, []);

  const handleLeave: EventHandle = useCallback((e) => {
    if (isTouch && e.type === 'mouseleave') return;

    setShow(false);
  }, []);

  const events = {
    onTouchStart: handleEnter,
    onTouchEnd: handleLeave,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
  };

  const overlay = useMemo(() => {
    return show && <div className='hover-effect' />;
  }, [show]);

  return [events, overlay];
};

export default useHover;
