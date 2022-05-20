import { useContext } from 'react';
import { ToastContext } from '.';
import { IToastConfig } from './ToastItem';

const useToast = (): [
  (text: string, config?: Partial<IToastConfig>) => void
] => {
  const { toast } = useContext(ToastContext);

  return [toast];
};

export default useToast;
