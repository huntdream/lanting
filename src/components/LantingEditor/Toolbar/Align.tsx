import React from 'react';
import {
  LexicalEditor,
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
} from 'lexical';
import './style.scss';
import Button from 'components/Button';

interface AlignProps {
  isRTL: boolean;
  editor: LexicalEditor;
  formatType: ElementFormatType;
}

const Align: React.FC<AlignProps> = ({ editor, isRTL, formatType }) => {
  const handleFormat = (type: ElementFormatType) => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      formatType === type ? '' : type
    );
  };

  return (
    <>
      <Button
        icon='format_align_left'
        variant='text'
        active={formatType === 'left'}
        onClick={() => handleFormat('left')}
        title='Left Align'
      />
      <Button
        icon='format_align_center'
        variant='text'
        active={formatType === 'center'}
        onClick={() => handleFormat('center')}
        title='Center Align'
      />
      <Button
        icon='format_align_right'
        variant='text'
        active={formatType === 'right'}
        onClick={() => handleFormat('right')}
        title='Right Align'
      />
      <Button
        icon='format_align_justify'
        variant='text'
        active={formatType === 'justify'}
        onClick={() => handleFormat('justify')}
        title='Justify Align'
      />
    </>
  );
};

export default Align;
