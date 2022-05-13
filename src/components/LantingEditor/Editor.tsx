import React from 'react';
import { EditorState, LexicalEditor } from 'lexical';
import OnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin';
import ContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import AutoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin';
import LinkPlugin from '@lexical/react/LexicalLinkPlugin';
import ListPlugin from '@lexical/react/LexicalListPlugin';
import LexicalMarkdownShortcutPlugin from '@lexical/react/LexicalMarkdownShortcutPlugin';
import Toolbar from './Toolbar';
import InitializePlugin from './plugins/InitializePlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';

import './style.scss';

interface Props {
  readOnly?: boolean;
  initialEditorState?: string;
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void;
}

const Placeholder = () => {
  return <div className='editor-placeholder'>Your story...</div>;
};

const Editor: React.FC<Props> = ({
  readOnly,
  initialEditorState,
  onChange,
}) => {
  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (onChange) {
      onChange(editorState, editor);
    }
  };

  return (
    <>
      <div>{!readOnly && <Toolbar />}</div>
      <div className='editor-container'>
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
          />
          <InitializePlugin initialEditorState={initialEditorState} />
          <OnChangePlugin onChange={handleChange} />
          <CodeHighlightPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin />
          {/* <LexicalMarkdownShortcutPlugin /> */}
        </div>
      </div>
    </>
  );
};

export default Editor;
