import Button from 'components/Button';
import useUpload from 'hooks/useUpload';
import React, { ChangeEvent, useRef, useState } from 'react';
import Preview from './Preview';
import './style.scss';

export interface IFile {
  type: string;
  size: string;
  key: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  files?: IFile[];
  onChange?: (files: IFile[]) => void;
}

const Upload: React.FC<UploadProps> = ({
  accept,
  multiple,
  files,
  onChange,
}) => {
  const [fileList, setFileList] = useState<IFile[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [upload] = useUpload();

  const handleUpload = (files: File[]) => {
    const tasks = files.map(upload);

    Promise.all(tasks).then((uploaded) => {
      const newFiles = fileList.concat(uploaded);

      setFileList(newFiles);

      if (onChange) {
        onChange(newFiles);
      }
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = event.target;

    if (newFiles) {
      handleUpload(Array.from(newFiles));
    }
  };

  const openFilePicker = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const renderPreviewImages = () => {
    if (fileList?.length) {
      return fileList.map((file, index) => <Preview file={file} key={index} />);
    }
  };

  return (
    <div className='lanting-upload'>
      <Button onClick={openFilePicker}>Upload</Button>
      <input
        type='file'
        className='lanting-upload-input'
        onChange={handleChange}
        accept={accept}
        ref={ref}
        multiple={multiple}
      />
      <div className='lanting-upload-preview-list'>{renderPreviewImages()}</div>
    </div>
  );
};

export default Upload;
