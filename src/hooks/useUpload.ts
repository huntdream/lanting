import { AxiosProgressEvent } from 'axios';
import useToast from 'components/Toast/useToast';
import dayjs from 'dayjs';
import { useCallback, useRef } from 'react';
import createUID from 'utils/createUID';
import useRequest from './useRequest';
import config from 'config';

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
  const [toast] = useToast()
  const [request] = useRequest();

  const getToken = () => {
    if (token.current) {
      return Promise.resolve();
    }

    return request('/upload/uploadToken', {
      method: 'post',
    }).then((res: any) => {
      token.current = res.token;
    }).catch(e => {
      toast(e.message)
      throw new Error(e.message)
    });
  };

  const upload = useCallback(
    (file: File, onUploadProgress?: (progress: AxiosProgressEvent) => void) => {
      return getToken().then(() => {
        if (file && token.current) {
          const formData = new FormData();

          const name = file.name;
          const uid = createUID();
          const key = `${name}-${dayjs().format("YYYYMMDD-HHmmss")}-${uid}`;

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
                url: `${config.storage}/${key}`,
                ...info,
              };
            })
            .catch((error) => {
              toast(error.error)
              throw new Error(error.error)
            });
        }

        return Promise.reject();
      })
    },
    [token]
  );

  return [upload];
};

export default useUpload;
