import { ReactNode, useContext } from 'react';
import { ToastContext } from '.';
import { IToastConfig } from './Toaster';

const useToast = (): [
  (text: ReactNode, config?: Partial<IToastConfig>) => void
] => {
  const { toast } = useContext(ToastContext);

  return [toast];
};

export default useToast;
