import { AxiosProgressEvent } from 'axios';
import Loading from 'components/Loading';
import React, { useEffect, useRef, useState } from 'react';
import { IFile } from '.';
import Preview from './Preview';
import './style.scss';

interface Props {
  file: File;
  upload: (
    file: File,
    onUploadProgress?: (progress: AxiosProgressEvent) => void
  ) => Promise<any>;
  onChange: (file: IFile) => void;
  onRemove: () => void;
}

const FileUpload: React.FC<Props> = ({ file, upload, onChange, onRemove }) => {
  const [fileInfo, setFileInfo] = useState<IFile>();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<AxiosProgressEvent>();
  const isUploaded = useRef(false);

  const handleProgress = (progress: AxiosProgressEvent) => {
    setProgress(progress);
  };

  useEffect(() => {
    if (isUploaded.current) return;
    setLoading(true);

    upload(file, handleProgress).then((uploadedFile) => {
      if (uploadedFile) {
        isUploaded.current = true;
        setFileInfo(uploadedFile);

        if (onChange) {
          onChange(uploadedFile);
        }
      }

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, upload]);

  return (
    <Loading loading={loading}>
      <div className='lanting-upload-file'>
        {fileInfo && <Preview file={fileInfo} onRemove={onRemove} />}
        {loading && (
          <div className='lanting-upload-file-progress'>
            {Math.floor((progress?.progress || 0) * 100)}%
          </div>
        )}
      </div>
    </Loading>
  );
};

export default FileUpload;
