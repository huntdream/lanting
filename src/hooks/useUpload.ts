import { useState, useEffect, useCallback } from 'react';
import createUID from 'utils/createUID';
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

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

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
    (file: File) => {
      if (file && token) {
        const formData = new FormData();

        const name = file.name;

        const uid = createUID();
        const key = getDate() + '-' + uid;

        formData.append('token', token);
        formData.append('file', file);
        formData.append('key', key);
        formData.append('fname', name);

        return request('https://upload.qiniup.com/', {
          method: 'post',
          data: formData,
        }).then((res: any) => {
          const { key, ...info } = res;

          return {
            url: `https://storage.maoyu.info/${key}`,
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
