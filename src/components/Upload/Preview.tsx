import Button from 'components/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { IFile } from '.';
import Audio from './Audio';
import './style.scss';
import { FileType, getFileType } from 'utils/file';

interface PreviewProps {
  file: IFile | File;
  onRemove: () => void;
}

const Preview: React.FC<PreviewProps> = ({ file, onRemove }) => {
  const [url, setUrl] = useState<string | undefined>();
  const [type, setType] = useState<FileType>();

  useEffect(() => {
    if (file instanceof File) {
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
    }
  }, [file]);

  const preview = useMemo(() => {
    if (type === 'image') {
      return (
        <img
          src={url}
          alt={file.name}
          className='lanting-upload-preview-image'
        />
      );
    }

    if (type === 'video') {
      return (
        <video src={url} className='lanting-upload-preview-video' controls />
      );
    }

    if (type === 'audio') {
      return <Audio src={url} />;
    }
  }, [file.name, type, url]);

  return url ? (
    <div className='lanting-upload-preview' key={url}>
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
