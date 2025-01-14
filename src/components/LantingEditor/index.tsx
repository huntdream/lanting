import React, { FC } from 'react';
import cls from 'classnames';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';

import { nodes } from './nodes';
import lanting from './themes/lanting';
import Editor, { EditorProps } from './Editor';

import './style.scss';
import { ToolbarContext } from './context/ToolbarContext';

const LantingEditor: FC<EditorProps> = ({
  id,
  user,
  isCollab,
  editable = true,
  initialEditorState,
  onChange,
}) => {
  const editorConfig: InitialConfigType = {
    namespace: 'lanting',
    editable,
    theme: lanting,
    editorState: isCollab ? null : initialEditorState,
    onError(error: Error) {
      throw error;
    },
    nodes,
  };

  return (
    <div
      className={cls('lanting-editor', {
        'lanting-editor--readonly': !editable,
      })}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <ToolbarContext>
          <Editor
            editable={editable}
            onChange={onChange}
            isCollab={isCollab}
            id={id}
            user={user}
            initialEditorState={initialEditorState}
          />
        </ToolbarContext>
      </LexicalComposer>
    </div>
  );
};

export default LantingEditor;
