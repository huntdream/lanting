import React, { FC } from 'react';
import cls from 'classnames';
import { EditorState, LexicalEditor } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

import lanting from './themes/lanting';
import { ImageNode } from './nodes/ImageNode';
import Editor, { EditorProps } from './Editor';
import { AudioNode } from './nodes/AudioNode';

import './style.scss';

const LantingEditor: FC<EditorProps> = ({
  id,
  user,
  isCollab,
  editable = true,
  initialEditorState,
  onChange,
}) => {
  const editorConfig = {
    namespace: 'lanting',
    editable,
    theme: lanting,
    editorState: isCollab ? null : initialEditorState,
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
      AudioNode,
    ],
  };

  return (
    <div
      className={cls('lanting-editor', {
        'lanting-editor--readonly': !editable,
      })}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <Editor
          editable={editable}
          onChange={onChange}
          isCollab={isCollab}
          id={id}
          user={user}
          initialEditorState={initialEditorState}
        />
      </LexicalComposer>
    </div>
  );
};

export default LantingEditor;
