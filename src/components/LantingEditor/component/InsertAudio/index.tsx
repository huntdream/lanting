import React, { useState } from 'react';
import Button from 'components/Button';
import Upload, { IFile } from 'components/Upload';
import { LexicalEditor } from 'lexical';
import { INSERT_AUDIO_COMMAND } from 'components/LantingEditor/plugins/AudioPlugin';

interface Props {
  activeEditor: LexicalEditor;
  onClose?: () => void;
}

const InsertAudio: React.FC<Props> = ({ activeEditor, onClose }) => {
  const [audio, setAudio] = useState<IFile>();

  const handleInsert = () => {
    if (audio) {
      activeEditor.dispatchCommand(INSERT_AUDIO_COMMAND, {
        src: audio.url,
        name: audio.name.replace(/\.[^/.]+$/, ''),
      });
    }

    if (onClose) {
      onClose();
    }
  };

  const handleUplodChange = (files: IFile[]) => {
    setAudio(files?.[0]);
  };

  return (
    <div className='lanting-editor-insert-image'>
      <Upload onChange={handleUplodChange} accept='audio/*' />

      <div className='lanting-editor-insert-image-footer'>
        <Button onClick={handleInsert} disabled={!audio?.url}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default InsertAudio;
