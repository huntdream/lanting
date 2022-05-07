import React, { FC } from 'react';
import { EditorState, LexicalEditor } from 'lexical';
import LexicalComposer from '@lexical/react/LexicalComposer';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import lanting from './themes/lanting';
import { ImageNode } from './nodes/ImageNode';
import Editor from './Editor';

import './style.scss';
import InitializePlugin from './plugins/InitializePlugin';

interface Props {
  readOnly?: boolean;
  initialEditorState?: string;
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void;
}

const LantingEditor: FC<Props> = ({
  readOnly,
  initialEditorState,
  onChange,
}) => {
  const editorConfig = {
    readOnly,
    theme: lanting,
    onError(error: Error) {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
    ],
  };

  return (
    <div className='lanting-editor'>
      <LexicalComposer initialConfig={editorConfig}>
        <Editor
          readOnly={readOnly}
          initialEditorState={initialEditorState}
          onChange={onChange}
        />
      </LexicalComposer>
    </div>
  );
};

export default LantingEditor;
