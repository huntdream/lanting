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
import { AxiosProgressEvent } from 'axios';

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  files?: Partial<IFile>[];
  children?: ReactNode;
  round?: boolean;
  showList?: boolean;
  onChange?: (files: IFile[]) => void;
}

export interface IProgress extends AxiosProgressEvent {
  loading?: boolean;
}

const Upload: React.FC<UploadProps> = ({
  accept,
  multiple,
  files = [],
  round,
  showList = true,
  children,
  onChange,
}) => {
  const [upload] = useUpload();
  const ref = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<IFile[]>(files as IFile[]);
  const [fileInfo, setFileInfo] = useState<IFile[]>(files as IFile[]);
  const [progress, setProgress] = useState<IProgress[]>([]);
  const [errros, setErrors] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const updateProgress = ({
    progress,
    index,
    loading,
  }: {
    progress?: AxiosProgressEvent;
    index: number;
    loading: boolean;
  }) => {
    setProgress((p) => {
      const newList = [...p];
      if (progress) {
        newList[index] = { ...progress, loading };
      } else {
        newList[index] = { ...p[index], loading };
      }

      return newList;
    });
  };

  const handleUpload = (files: File[]) => {
    const startIndex = multiple ? fileInfo.length : 0;

    files.map((file, index) => {
      uploadFile(file, startIndex + index);
    });
  };

  const updateFile = (file: IFile, index: number) => {
    const newFiles = [...fileInfo];
    newFiles[index] = { ...file };

    if (onChange) {
      onChange(newFiles);
    }

    setFileInfo(newFiles);

    if (onChange) {
      onChange(newFiles);
    }
  };

  const updateError = (error: string, index: number) => {
    const errs = [...errros];
    errs[index] = error;
    setErrors(errs);
  };

  const uploadFile = (file: File, index: number) => {
    updateError('', index);

    return upload(file, (progress) =>
      updateProgress({ progress, index, loading: true })
    )
      .then((uploaded) => {
        updateFile(uploaded, index);
      })
      .catch((error) => {
        updateError(error.message, index);
      })
      .finally(() => {
        updateProgress({ index, loading: false });
      });
  };

  const updateFileList = (files: FileList) => {
    const newFiles = Array.from(files);
    const newFilelist: IFile[] = multiple
      ? [...fileList, ...newFiles]
      : newFiles;

    setFileList(newFilelist);
    handleUpload(newFiles);
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

  const removeFile = (index: number) => {
    const newFiles = [...fileList];
    const newFileInfo = [...fileInfo];

    newFiles.splice(index, 1);
    newFileInfo.splice(index, 1);

    setFileList(newFiles);
    setFileInfo(newFileInfo);

    if (onChange) {
      onChange(newFileInfo);
    }
  };

  const openFilePicker = () => {
    if (ref.current) {
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
    if (fileList?.length && showList) {
      return fileList.map((file, index) => (
        <FileUpload
          file={file}
          key={index}
          upload={() => uploadFile(file, index)}
          round={round}
          progress={progress[index]}
          onRemove={() => removeFile(index)}
          error={errros[index]}
        />
      ));
    }
  };

  const showPlaceholder = multiple || fileList.length < 1 || !showList;

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
      <div className='lanting-upload-preview-list'>
        {renderFileList()}
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
    </div>
  );
};

export default Upload;
