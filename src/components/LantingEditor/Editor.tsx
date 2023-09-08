import React, { useCallback } from 'react';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  LexicalEditor,
} from 'lexical';
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
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import InitializePlugin from './plugins/InitializePlugin';
import GalleryPlugin from './plugins/GalleryPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import AudioPlugin from './plugins/AudioPlugin';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Provider } from '@lexical/yjs';

import './style.scss';
import config from 'config';

export interface EditorProps {
  id?: string | number;
  isCollab?: boolean;
  editable?: boolean;
  initialEditorState?: string;
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void;
}

const Placeholder = () => {
  return <div className='editor-placeholder'>Your story...</div>;
};

const initState = (editor: LexicalEditor) => {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  const text = $createTextNode('Welcome to collab!');
  paragraph.append(text);
  root.append(paragraph);
};

const Editor: React.FC<EditorProps> = ({
  id,
  isCollab,
  editable,
  initialEditorState,
  onChange,
}) => {
  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (onChange) {
      onChange(editorState, editor);
    }
  };

  const provider = useCallback(
    (id: string, yjsDocMap: Map<string, Y.Doc>): Provider => {
      let doc = yjsDocMap.get(id);

      console.log('DOC', doc, yjsDocMap);

      if (!doc) {
        doc = new Y.Doc();
        yjsDocMap.set(id, doc);
      } else {
        doc.load();
      }

      const provider = new WebsocketProvider(config.yjs, id, doc, {
        connect: false,
      });

      console.log(provider);

      provider.on('status', console.log);
      provider.on('sync', console.log);

      // @ts-ignore
      return provider;
    },
    [id]
  );

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
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin />
          <GalleryPlugin />
          <DragDropPaste />
          <AudioPlugin />
          {isCollab ? (
            <CollaborationPlugin
              id={id}
              providerFactory={provider}
              initialEditorState={initState}
              shouldBootstrap={true}
            />
          ) : (
            <HistoryPlugin />
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
