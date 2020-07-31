import { useEffect } from 'react';

const useScrollLock = (lock?: boolean) => {
  useEffect(() => {
    function overflow(type: string) {
      document.body.style.overflow = type;
    }

    if (lock) {
      overflow('hidden');
    } else {
      overflow('');
    }

    return () => overflow('');
  }, [lock]);
};

export default useScrollLock;
