import Button from 'components/Button';
import Modal from 'components/Modal';
import Upload, { IFile } from 'components/Upload';
import React, { useState } from 'react';
import './style.scss';

export type MediaType = 'video' | 'image' | 'audio';

interface MediaUploadProps {
  visible: boolean;
  type?: MediaType;
  onClose: () => void;
  onOK: (images: IFile[]) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  visible,
  type = 'image',
  onClose,
  onOK,
}) => {
  const [images, setImages] = useState<IFile[]>([]);

  const handleOK = () => {
    if (images.length) {
      onOK(images);
    }
  };

  return (
    <Modal title={type} visible={visible} onClose={onClose}>
      <div className='lanting-editor-media-upload'>
        <div className='lanting-editor-media-upload-content'>
          <Upload
            accept={`${type}/*`}
            multiple
            files={images}
            onChange={setImages}
          />
        </div>
        <div className='lanting-editor-media-upload-footer'>
          <Button onClick={handleOK} disabled={!images.length}>
            Insert
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MediaUpload;
