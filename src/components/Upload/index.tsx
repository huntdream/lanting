import React, { ChangeEvent, useState } from 'react';
import './style.scss';

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
  const [previewUrl, setPreviewUrl] = useState<any>('');

  const preview = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      setPreviewUrl(event.target?.result);
    };
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const { files } = event.target;

    if (files) {
      for (const file of Object.values(files)) {
        preview(file);
      }
    }
  };

  return (
    <div className='lanting-upload'>
      <input type='file' onChange={handleChange} />
      <img src={previewUrl} alt='Preview' className='lanting-upload-preview' />
    </div>
  );
};

export default Upload;
