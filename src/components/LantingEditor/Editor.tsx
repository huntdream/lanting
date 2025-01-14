import React, { useCallback, useState } from 'react';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  LexicalEditor,
} from 'lexical';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import Toolbar from './Toolbar';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import GalleryPlugin from './plugins/GalleryPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import AudioPlugin from './plugins/AudioPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Provider } from '@lexical/yjs';

import './style.scss';
import config from 'config';
import { IUser } from 'typing/user';
import { URL_MATCHERS } from './constants';
import InitializePlugin from './plugins/InitializePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export interface EditorProps {
  id?: string;
  user?: IUser;
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
  user,
  isCollab,
  editable,
  onChange,
  initialEditorState,
}) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (onChange) {
      onChange(editorState, editor);
    }
  };

  const provider = useCallback(
    (id: string, yjsDocMap: Map<string, Y.Doc>): Provider => {
      let doc = yjsDocMap.get(id);

      if (!doc) {
        doc = new Y.Doc();
        yjsDocMap.set(id, doc);
      } else {
        doc.load();
      }

      const provider = new WebsocketProvider(config.yjs, id, doc, {
        connect: false,
      });

      // @ts-ignore
      return provider;
    },
    [id]
  );

  return (
    <>
      <div>
        {editable && (
          <Toolbar
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        )}
      </div>
      <div className='editor-container'>
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
          <CodeHighlightPlugin />
          <AutoFocusPlugin />
          <AutoLinkPlugin matchers={URL_MATCHERS} />
          <TabIndentationPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin />
          <GalleryPlugin />
          <DragDropPaste />
          <AudioPlugin />
          <CheckListPlugin />
          {isCollab && id ? (
            <CollaborationPlugin
              id={id}
              username={user?.name || user?.username}
              providerFactory={provider}
              initialEditorState={initState}
              shouldBootstrap={true}
            />
          ) : (
            <>
              <HistoryPlugin />
              <InitializePlugin initialEditorState={initialEditorState} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
