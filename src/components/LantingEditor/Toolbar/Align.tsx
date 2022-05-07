import React from 'react';
import Divider from 'components/Divider';
import {
  LexicalEditor,
  FORMAT_ELEMENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  INDENT_CONTENT_COMMAND,
} from 'lexical';
import './style.scss';
import DropDown from 'components/DropDown';
import Icon from 'components/Icon';
import Item from 'components/Item';

interface AlignProps {
  isRTL: boolean;
  editor: LexicalEditor;
}

const Align: React.FC<AlignProps> = ({ editor, isRTL }) => {
  return (
    <DropDown icon='format_align_left' label='Align'>
      <Item
        icon='format_align_left'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        Left Align
      </Item>
      <Item
        icon='format_align_center'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        Center Align
      </Item>
      <Item
        icon='format_align_right'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        Right Align
      </Item>
      <Item
        icon='format_align_justify'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        Justify Align
      </Item>
    </DropDown>
  );
};

export default Align;
