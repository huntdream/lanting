import React, { useState } from 'react';
import './style.scss';
import StyleButton from './StyleButton';
import { EditorState, RichUtils, Modifier, AtomicBlockUtils } from 'draft-js';
import Icon from 'components/Icon';
import bg from 'assets/images/bg.jpg';
import Modal from 'components/Modal';
import Upload from 'components/Upload';
import Button from 'components/Button';

interface BlockStyleProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const styleMap = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: <Icon>format_quote</Icon>, style: 'blockquote' },
  { label: <Icon>format_list_bulleted</Icon>, style: 'unordered-list-item' },
  { label: <Icon>format_list_numbered</Icon>, style: 'ordered-list-item' },
  {
    label: <Icon>code</Icon>,
    style: 'code-block',
  },
  {
    label: <Icon>image</Icon>,
    style: 'image',
  },
];

const BlockStyle: React.FC<BlockStyleProps> = ({ editorState, onChange }) => {
  const [visible, setVisible] = useState(false);

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const handleBlockStyleToggle = (blockType: string) => {
    if (blockType === 'image') {
      // setImage();
      setVisible(true);
    } else {
      onChange(RichUtils.toggleBlockType(editorState, blockType));
    }
  };

  const setImage = () => {
    const selectionState = editorState.getSelection();

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'PHOTO',
      'MUTABLE',
      { src: bg }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const contentStateWithPhoto = Modifier.applyEntity(
      contentStateWithEntity,
      selectionState,
      entityKey
    );

    const newEditorState = EditorState.push(
      editorState,
      contentStateWithPhoto,
      'apply-entity'
    );

    onChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );
  };

  return (
    <>
      {styleMap.map(({ label, style }) => (
        <StyleButton
          active={style === blockType}
          className={`stylecontrols-${style.toLowerCase()}`}
          key={style}
          label={label}
          onToggle={() => handleBlockStyleToggle(style)}
        />
      ))}
      <Modal title='Image' visible={visible} onClose={() => setVisible(false)}>
        <div>
          <Upload />
          <div>
            <Button onClick={setImage}>Upload</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlockStyle;
