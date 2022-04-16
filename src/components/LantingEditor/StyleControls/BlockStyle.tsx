import React, { ReactNode, useState } from 'react';
import './style.scss';
import StyleButton from './StyleButton';
import { EditorState, RichUtils, Modifier, AtomicBlockUtils } from 'draft-js';
import Icon from 'components/Icon';
import { IFile } from 'components/Upload';
import MediaUpload, { MediaType } from '../components/MediaUpload';

interface BlockStyleProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export type StyleMap = { label: ReactNode; style: string };

export const customStyle: StyleMap[] = [
  { label: <Icon>format_quote</Icon>, style: 'blockquote' },
  {
    label: <Icon>format_align_left</Icon>,
    style: 'text-align-left',
  },
  {
    label: <Icon>format_align_center</Icon>,
    style: 'text-align-center',
  },
  {
    label: <Icon>format_align_right</Icon>,
    style: 'text-align-right',
  },
];

const styleMap: StyleMap[] = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: <Icon>format_list_bulleted</Icon>, style: 'unordered-list-item' },
  { label: <Icon>format_list_numbered</Icon>, style: 'ordered-list-item' },
  ...customStyle,
  {
    label: <Icon>code</Icon>,
    style: 'code-block',
  },
  {
    label: <Icon>image</Icon>,
    style: 'image',
  },
  {
    label: <Icon>movie</Icon>,
    style: 'video',
  },
];

const BlockStyle: React.FC<BlockStyleProps> = ({ editorState, onChange }) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<MediaType>('image');

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const handleBlockStyleToggle = (blockType: string) => {
    if (['image', 'video'].includes(blockType)) {
      setType(blockType as MediaType);
      setVisible(true);
    } else {
      onChange(RichUtils.toggleBlockType(editorState, blockType));
    }
  };

  const setMedia = (files: IFile[]) => {
    let newEditorState = editorState;
    let entityKey = '';

    files.forEach((data) => {
      const selectionState = newEditorState.getSelection();

      const contentState = newEditorState.getCurrentContent();

      const contentStateWithEntity = contentState.createEntity(
        type,
        'MUTABLE',
        data
      );

      entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      const contentStateWithPhoto = Modifier.applyEntity(
        contentStateWithEntity,
        selectionState,
        entityKey
      );

      newEditorState = EditorState.push(
        newEditorState,
        contentStateWithPhoto,
        'apply-entity'
      );

      newEditorState = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      );
    });

    onChange(newEditorState);
  };

  const insertImages = (images: IFile[]) => {
    setMedia(images);

    setVisible(false);
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
      <MediaUpload
        type={type}
        visible={visible}
        onClose={() => setVisible(false)}
        onOK={insertImages}
      />
    </>
  );
};

export default BlockStyle;
