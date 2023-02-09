import React from 'react';
import { EditorState, LexicalEditor } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import Toolbar from './Toolbar';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';

import './style.scss';
import InitializePlugin from './plugins/InitializePlugin';
import GalleryPlugin from './plugins/GalleryPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import AudioPlugin from './plugins/AudioPlugin';

interface Props {
  editable?: boolean;
  initialEditorState?: string;
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void;
}

const Placeholder = () => {
  return <div className='editor-placeholder'>Your story...</div>;
};

const Editor: React.FC<Props> = ({
  editable,
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
      <div>{editable && <Toolbar />}</div>
      <div className='editor-container'>
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <InitializePlugin initialEditorState={initialEditorState} />
          <OnChangePlugin onChange={handleChange} />
          <CodeHighlightPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin />
          <GalleryPlugin />
          <DragDropPaste />
          <AudioPlugin />
        </div>
      </div>
    </>
  );
};

export default Editor;
