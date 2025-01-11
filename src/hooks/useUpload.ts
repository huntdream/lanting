import { AxiosProgressEvent } from 'axios';
import useToast from 'components/Toast/useToast';
import dayjs from 'dayjs';
import { useCallback, useRef } from 'react';
import createUID from 'utils/createUID';
import useRequest from './useRequest';
import { splitFilename } from 'utils/file';

export interface IFile extends File {
  key?: string;
  url?: string;
  width?: number;
  height?: number;
}

const useUpload = () => {
  const [toast] = useToast();
  const [request] = useRequest();

  const getPresignedURL = (filename: string) => {
    const uid = createUID();
    const { name, extension } = splitFilename(filename);

    const key = `${name}-${dayjs().format(
      'YYYYMMDDHHmmss'
    )}-${uid}.${extension}`;

    return request('/upload/presignedURL', {
      method: 'post',
      data: { name: key },
    })
      .then((res: any) => {
        return res.url;
      })
      .catch((e) => {
        const message = e?.message || '上传失败';
        toast(message);
        throw new Error(message);
      });
  };

  const upload = useCallback(
    (file: File, onUploadProgress?: (progress: AxiosProgressEvent) => void) => {
      return getPresignedURL(file.name).then((url) => {
        if (file && url) {
          return request(url, {
            method: 'put',
            data: file,
            headers: {
              'Content-Type': file.type,
            },
            onUploadProgress,
          })
            .then(() => {
              return {
                ...file,
                url: url.split('?')[0],
              };
            })
            .catch((error) => {
              const message = error?.error || '上传失败';
              toast(message);
              throw new Error(message);
            });
        }

        return Promise.reject();
      });
    },
    []
  );

  return [upload];
};

export default useUpload;
