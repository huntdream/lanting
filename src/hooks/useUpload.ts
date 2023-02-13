import { AxiosProgressEvent } from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';
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
  const token = useRef<string>('');

  const getToken = () => {
    if (token.current) {
      return Promise.resolve();
    }

    return request('/tools/uploadToken', {
      method: 'post',
    }).then((res: any) => {
      token.current = res.token;
    });
  };

  const upload = useCallback(
    (file: File, onUploadProgress?: (progress: AxiosProgressEvent) => void) => {
      return getToken().then(() => {
        if (file) {
          const formData = new FormData();

          const name = file.name;
          const uid = createUID();
          const ext = file.name.split('.').pop();
          const key = `${Date.now().toString().slice(-6)}_${uid}.${ext}`;

          formData.append('token', token.current);
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
      });
    },
    [token]
  );

  return [upload];
};

export default useUpload;
