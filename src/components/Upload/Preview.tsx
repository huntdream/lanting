import Button from 'components/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { IFile } from '.';
import './style.scss';

interface PreviewProps {
  file: IFile | File;
  onRemove: () => void;
}

export type FileType = 'image' | 'audio' | 'video';

const Preview: React.FC<PreviewProps> = ({ file, onRemove }) => {
  const [url, setUrl] = useState<string | undefined>();
  const [type, setType] = useState<FileType>();

  useEffect(() => {
    if (file instanceof File) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event: ProgressEvent<FileReader>) => {
          setUrl(event.target?.result?.toString());
        };
      }
    } else {
      if (file.type.startsWith('image/')) {
        setUrl(`${file.url}?imageView2/2/w/100`);
        setType('image');
      } else if (file.type.startsWith('video/')) {
        setUrl(file.url);
        setType('video');
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
  }, [file.name, type, url]);

  return url ? (
    <div className='lanting-upload-preview' key={url}>
      {preview}
      <Button
        color='secondary'
        icon='close'
        className='lanting-upload-preview-remove'
        onClick={onRemove}
      />
    </div>
  ) : null;
};

export default Preview;
