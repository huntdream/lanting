import React from 'react';
import './style.scss';
import StyleButton from './StyleButton';
import { EditorState, RichUtils } from 'draft-js';
import Icon from 'components/Icon';

interface InlineStyleProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const styleMap = [
  { label: <Icon>format_bold</Icon>, style: 'BOLD' },
  { label: <Icon>format_italic</Icon>, style: 'ITALIC' },
  { label: <Icon>format_underline</Icon>, style: 'UNDERLINE' },
  { label: <Icon>format_strikethrough</Icon>, style: 'STRIKETHROUGH' },
];

const InlineStyle: React.FC<InlineStyleProps> = ({ editorState, onChange }) => {
  const inlineTypes = editorState.getCurrentInlineStyle();

  const handleInlineStyleToggle = (inlineType: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  return (
    <>
      {styleMap.map(({ label, style }) => (
        <StyleButton
          active={inlineTypes.has(style)}
          key={style}
          label={label}
          onToggle={() => handleInlineStyleToggle(style)}
        />
      ))}
    </>
  );
};

export default InlineStyle;
