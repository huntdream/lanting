import { AxiosProgressEvent } from 'axios';
import Loading from 'components/Loading';
import React, { useEffect, useRef, useState } from 'react';
import Preview from './Preview';
import './style.scss';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { IFile } from 'hooks/useUpload';
import { IProgress } from '.';

interface Props {
  file: IFile;
  upload: () => Promise<any>;
  round?: boolean;
  error?: string;
  progress?: IProgress;
  onRemove: () => void;
}

const FileUpload: React.FC<Props> = ({
  file,
  upload,
  round,
  error,
  progress,
  onRemove,
}) => {
  const handleUpload = () => {
    upload();
  };

  return (
    <Loading loading={progress?.loading}>
      <div className='lanting-upload-file'>
        {file && <Preview file={file} round={round} onRemove={onRemove} />}
        {error && (
          <div className='lanting-upload-error'>
            <Icon name='refresh' onClick={handleUpload} />
            <Text.Error className='lanting-upload-error-text'>
              {error}
            </Text.Error>
          </div>
        )}
        {progress?.loading && (
          <div className='lanting-upload-file-progress'>
            {Math.floor((progress?.progress || 0) * 100)}%
          </div>
        )}
      </div>
    </Loading>
  );
};

export default FileUpload;
