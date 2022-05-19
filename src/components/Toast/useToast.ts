import { useContext } from 'react';
import { ToastContext } from '.';

const useToast = (): [(text: string) => void] => {
  const { toast } = useContext(ToastContext);

  return [toast];
};

export default useToast;
