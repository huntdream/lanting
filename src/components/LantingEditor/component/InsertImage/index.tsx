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
  const [src, setSrc] = useState('');
  const [altText, setAltText] = useState('');

  const handleInsert = () => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, { src });

    if (onClose) {
      onClose();
    }
  };

  const handleImageChange = (files: IFile[]) => {
    setSrc(files?.[0].url);
  };

  return (
    <div className='lanting-editor-insert-image'>
      <Upload onChange={handleImageChange} />

      <div className='lanting-editor-insert-image-footer'>
        <Button onClick={handleInsert} disabled={!src}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default InsertImage;
