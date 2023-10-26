import React, { useState } from 'react';
import Button from 'components/Button';
import Upload, { IFile } from 'components/Upload';
import { LexicalEditor } from 'lexical';
import { INSERT_IMAGE_COMMAND } from '../../plugins/ImagesPlugin';
import './style.scss';

interface Props {
  activeEditor: LexicalEditor;
  onClose?: () => void;
}

const InsertImage: React.FC<Props> = ({ activeEditor, onClose }) => {
  const [images, setImages] = useState<IFile[]>();

  const handleInsert = () => {
    if (images) {
      images.forEach((image) => {
        activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: image.url!,
          height: 'inherit',
          maxWidth: '100%',
          altText: image.name,
        });
      });
    }

    if (onClose) {
      onClose();
    }
  };

  const handleImageChange = (files: IFile[]) => {
    setImages(files);
  };

  return (
    <div className='lanting-editor-insert-image'>
      <Upload accept='image/*' multiple onChange={handleImageChange} />

      <div className='lanting-editor-insert-image-footer'>
        <Button onClick={handleInsert} disabled={!images?.length}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default InsertImage;
