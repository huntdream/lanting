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
  const [image, setImage] = useState<IFile>();

  const handleInsert = () => {
    if (image) {
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: image.url,
        height: 'inherit',
        width: 'inherit',
        altText: image.name,
      });
    }

    if (onClose) {
      onClose();
    }
  };

  const handleImageChange = (files: IFile[]) => {
    setImage(files?.[0]);
  };

  return (
    <div className='lanting-editor-insert-image'>
      <Upload onChange={handleImageChange} accept='image/*' />

      <div className='lanting-editor-insert-image-footer'>
        <Button onClick={handleInsert} disabled={!image?.url}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default InsertImage;
