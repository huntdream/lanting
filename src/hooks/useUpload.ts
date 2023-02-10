import { AxiosProgressEvent } from 'axios';
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

const useUpload = () => {
  const [token, setToken] = useState<string>('');

  const getToken = () => {
    request('/tools/uploadToken', {
      method: 'post',
    }).then((res: any) => {
      setToken(res.token);
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  const upload = useCallback(
    (file: File, onUploadProgress?: (progress: AxiosProgressEvent) => void) => {
      if (file && token) {
        const formData = new FormData();

        const name = file.name;
        const uid = createUID();
        const ext = file.name.split('.').pop();
        const key = `${Date.now().toString().slice(-6)}_${uid}.${ext}`;

        formData.append('token', token);
        formData.append('file', file);
        formData.append('key', key);
        formData.append('fname', name);

        return request('https://upload.qiniup.com/', {
          method: 'post',
          data: formData,
          onUploadProgress,
        })
          .then((res: any) => {
            const { key, ...info } = res;

            return {
              url: `https://storage.maoyu.info/${key}`,
              ...info,
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }

      return Promise.reject();
    },
    [token]
  );

  return [upload];
};

export default useUpload;
