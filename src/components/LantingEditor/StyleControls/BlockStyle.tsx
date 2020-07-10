import React from 'react';
import './style.scss';
import StyleButton from './StyleButton';
import { EditorState, RichUtils } from 'draft-js';
import Icon from 'components/Icon';

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
];

const BlockStyle: React.FC<BlockStyleProps> = ({ editorState, onChange }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const handleBlockStyleToggle = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className='stylecontrols-block'>
      {styleMap.map(({ label, style }) => (
        <StyleButton
          active={style === blockType}
          className={`stylecontrols-${style.toLowerCase()}`}
          key={style}
          label={label}
          onToggle={() => handleBlockStyleToggle(style)}
        />
      ))}
    </div>
  );
};

export default BlockStyle;
