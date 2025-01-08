import Button from 'components/Button';
import React, { useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import Audio from './Audio';
import './style.scss';
import { FileType, getFileType } from 'utils/file';
import { IFile } from 'hooks/useUpload';

interface PreviewProps {
  file: IFile;
  round?: boolean;
  onRemove: () => void;
}

const Preview: React.FC<PreviewProps> = ({ file, round, onRemove }) => {
  const [url, setUrl] = useState<string | undefined>();
  const [type, setType] = useState<FileType>();

  useEffect(() => {
    if (file.type && file instanceof File) {
      const fileType = file.type.split('/')[0] as FileType;
      setType(fileType);

      if (fileType === 'image') {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event: ProgressEvent<FileReader>) => {
          setUrl(event.target?.result?.toString());
        };
      } else if (fileType === 'video' || fileType === 'audio') {
        setUrl(URL.createObjectURL(file));
      }
    } else if (file.url) {
      setType(getFileType(file.name || file.url));
      setUrl(file.url);
    }
  }, [file]);

  const preview = useMemo(() => {
    if (type === 'image') {
      return <img src={url} alt={file.name} className='image' />;
    }

    if (type === 'video') {
      return <video src={url} className='video' controls />;
    }

    if (type === 'audio') {
      return <Audio src={url} />;
    }
  }, [file.name, type, url]);

  return url ? (
    <div
      className={cls(
        'lanting-upload-preview',
        round && 'lanting-upload-preview--round'
      )}
      key={url}
    >
      {preview}
      {onRemove && (
        <Button
          color='secondary'
          icon='close'
          className='lanting-upload-preview-remove'
          onClick={onRemove}
        />
      )}
    </div>
  ) : null;
};

export default Preview;
