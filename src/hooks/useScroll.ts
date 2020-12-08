import { useEffect } from 'react';

const useScroll = (element: HTMLElement) => {
  useEffect(() => {
    const handler = (event: Event) => {
      const { currentTarget } = event;
    };

    element.addEventListener('scroll', handler);

    return element.removeEventListener('scroll', handler);
  }, [element]);
};

export default useScroll;
