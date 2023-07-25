import React, { ReactNode } from 'react';
import { FC, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { IS_TOUCH_DEVICE } from 'utils/platform';

type EventType =
  | MouseEvent
  | React.MouseEvent<Element, MouseEvent>
  | React.TouchEvent<Element>
  | TouchEvent;

type EventHandle = (e: EventType) => void;

const useHover = <T extends HTMLElement>(): [RefObject<T>, ReactNode] => {
  const ref = useRef<T>(null);
  const [show, setShow] = useState(false);
  const isTouch = IS_TOUCH_DEVICE;

  useEffect(() => {
    const container = ref.current;

    const handleEnter: EventHandle = (e) => {
      e.preventDefault();
      setShow(true);
    };

    const handleLeave: EventHandle = (e) => {
      e.preventDefault();
      setShow(false);
    };

    if (container) {
      if (isTouch) {
        container.addEventListener('touchstart', handleEnter);
        container.addEventListener('touchend', handleLeave);
      } else {
        container.addEventListener('mouseenter', handleEnter);
        container.addEventListener('mouseleave', handleLeave);
      }
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleEnter);
        container.removeEventListener('mouseleave', handleLeave);
        container.removeEventListener('touchstart', handleEnter);
        container.removeEventListener('touchend', handleLeave);
      }
    };
  }, []);

  const overlay = useMemo(() => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: '4px',
          opacity: show ? '1' : '0',
          backgroundColor: 'var(--hover-overlay)',
          zIndex: '-1',
        }}
      />
    );
  }, [show]);

  return [ref, overlay];
};

export default useHover;
