import cls from 'classnames';
import Icon from 'components/Icon';
import useUpload from 'hooks/useUpload';
import React, {
  ChangeEvent,
  DragEvent,
  ReactNode,
  useRef,
  useState,
} from 'react';
import FileUpload from './FileUpload';
import './style.scss';

export interface IFile {
  type: string;
  size: number;
  key?: string;
  name: string;
  url?: string;
  width?: number;
  height?: number;
}

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  files?: IFile[];
  children?: ReactNode;
  onChange?: (files: IFile[]) => void;
}

const Upload: React.FC<UploadProps> = ({
  accept,
  multiple,
  files,
  children,
  onChange,
}) => {
  const [upload] = useUpload();
  const ref = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<File[]>([]);
  const [fileInfoList, setFileInfoList] = useState<IFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const updateFileList = (files: FileList) => {
    const newFiles = Array.from(files);
    setFileList(fileList.concat(newFiles));
  };

  const clearValue = () => {
    if (ref.current) {
      ref.current.value = '';
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      updateFileList(files);
    }
  };

  const handleFileChange = (file: IFile, index: number) => {
    setFileInfoList((list) => {
      const newFiles = [...list];

      newFiles[index] = file;

      setFileInfoList(newFiles);

      if (onChange) {
        onChange(newFiles);
      }

      return newFiles;
    });
  };

  const removeFile = (index: number) => {
    const newFiles = [...fileList];
    newFiles.splice(index, 1);

    const newFileInfoList = [...fileInfoList];
    newFiles.splice(index, 1);

    setFileList(newFiles);
    setFileInfoList(newFileInfoList);

    if (onChange) {
      onChange(newFileInfoList);
    }
  };

  const openFilePicker = () => {
    if (ref.current && (multiple || !fileList.length)) {
      clearValue();

      ref.current.click();
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.dataTransfer) {
      const files = event.dataTransfer.files;

      if (files.length) {
        updateFileList(files);
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setIsDragOver(false);
  };

  const renderFileList = () => {
    if (fileList?.length) {
      return fileList.map((file, index) => (
        <FileUpload
          file={file}
          key={index}
          upload={upload}
          onRemove={() => removeFile(index)}
          onChange={(fileInfo) => handleFileChange(fileInfo, index)}
        />
      ));
    }
  };

  const showPlaceholder = multiple || fileList.length < 1;

  return (
    <div className='lanting-upload'>
      <input
        type='file'
        className='lanting-upload-input'
        onChange={handleChange}
        accept={accept}
        ref={ref}
        multiple={multiple}
      />
      <div className='lanting-upload-preview-list'>{renderFileList()}</div>
      {showPlaceholder && (
        <div
          onClick={openFilePicker}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className='lanting-upload-trigger'
        >
          {children || (
            <div
              className={cls('lanting-upload-placeholder', {
                'lanting-upload-placeholder--over': isDragOver,
              })}
            >
              <Icon name='file_upload' />
              <span>Upload</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
