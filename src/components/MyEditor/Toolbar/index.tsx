import React from 'react';
import MarkButton from '../MarkButton';
import './style.scss';
import { isMarkActive, toggleMark } from '../utils';
import { ReactEditor } from 'slate-react';
import { Editor } from 'slate';

interface ToolbarProps {
  editor: Editor & ReactEditor;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const marks = [
    { format: 'bold', icon: 'format_bold' },
    { format: 'italic', icon: 'format_italic' },
    { format: 'underline', icon: 'format_underlined' },
    { format: 'code', icon: 'code' },
    { format: 'heading-one', icon: 'looks_one' },
    { format: 'heading-two', icon: 'looks_two' },
    { format: 'block-quote', icon: 'format_quote' },
    { format: 'numbered-list', icon: 'format_list_numbered' },
    { format: 'bulleted-list', icon: 'format_list_bulleted' },
  ];

  return (
    <div className='myeditor-toolbar'>
      {marks.map((mark) => (
        <MarkButton
          format={mark.format}
          icon={mark.icon}
          active={isMarkActive(editor, mark.format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, mark.format);
          }}
        />
      ))}
    </div>
  );
};

export default Toolbar;
