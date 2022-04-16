import { useState, useEffect, useCallback } from 'react';
import request from 'utils/request';

export interface IFile {
  type: string;
  size: string;
  key: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

const useUpload = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    request('/tools/uploadToken', {
      method: 'post',
    }).then((res: any) => {
      setToken(res.token);
    });
  }, []);

  const upload = useCallback(
    (file) => {
      if (file && token) {
        const formData = new FormData();

        const name = file.name;

        formData.append('token', token);
        formData.append('file', file);
        formData.append('key', name);
        formData.append('fname', name);

        return request('https://upload.qiniup.com/', {
          method: 'post',
          data: formData,
        }).then((res: any) => {
          const { key, ...info } = res;

          return {
            url: `http://storage.maoyu.info/${key}`,
            ...info,
          };
        });
      }

      return Promise.reject();
    },
    [token]
  );

  return [upload];
};

export default useUpload;
