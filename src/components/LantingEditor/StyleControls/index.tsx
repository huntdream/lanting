import React from 'react';
import './style.scss';
import BlockStyle from './BlockStyle';
import { EditorState } from 'draft-js';
import InlineStyle from './InlineStyle';

interface StyleControlsProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({
  editorState,
  onChange,
}) => {
  return (
    <div className='stylecontrols'>
      <InlineStyle editorState={editorState} onChange={onChange} />
      <BlockStyle editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default StyleControls;
