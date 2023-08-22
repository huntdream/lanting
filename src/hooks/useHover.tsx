import React, { ReactNode, useCallback } from 'react';
import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { IS_TOUCH_DEVICE } from 'utils/platform';

type EventType =
  | MouseEvent
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>
  | TouchEvent;

type EventHandle = (e: EventType) => void;

const useHover = <T extends HTMLElement>(): [
  Record<string, EventHandle>,
  ReactNode
] => {
  const [show, setShow] = useState(false);
  const isTouch = IS_TOUCH_DEVICE;

  const handleEnter: EventHandle = useCallback((e) => {
    setShow(true);
  }, []);

  const handleLeave: EventHandle = useCallback((e) => {
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
