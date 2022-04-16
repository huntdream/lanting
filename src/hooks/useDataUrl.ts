import { useCallback } from 'react';

const useDataUrl = () => {
  const getDataUrl = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const src = event.target?.result?.toString() || '';

        resolve(src);
      };

      reader.onerror = () => {
        reject('');
      };
    });
  }, []);

  return [getDataUrl];
};

export default useDataUrl;
