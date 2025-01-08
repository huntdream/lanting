import cls from 'classnames';
import Icon from 'components/Icon';
import useUpload, { IFile } from 'hooks/useUpload';
import React, {
  ChangeEvent,
  DragEvent,
  ReactNode,
  useRef,
  useState,
} from 'react';
import FileUpload from './FileUpload';
import './style.scss';

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  files?: Partial<IFile>[];
  children?: ReactNode;
  round?: boolean;
  onChange?: (files: IFile[]) => void;
}

const Upload: React.FC<UploadProps> = ({
  accept,
  multiple,
  files = [],
  round,
  children,
  onChange,
}) => {
  const [upload] = useUpload();
  const ref = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<IFile[]>(files as IFile[]);
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
    setFileList((list) => {
      const newFiles = [...list];

      newFiles[index] = file;

      if (onChange) {
        onChange(newFiles);
      }

      return newFiles;
    });
  };

  const removeFile = (index: number) => {
    const newFiles = [...fileList];
    newFiles.splice(index, 1);

    newFiles.splice(index, 1);

    setFileList(newFiles);

    if (onChange) {
      onChange(newFiles);
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
          round={round}
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
                'lanting-upload-placeholder--round': round,
              })}
            >
              <Icon name='file_upload' />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
