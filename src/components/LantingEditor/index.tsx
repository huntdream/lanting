import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from 'react';
import {
  Editor,
  EditorState,
  DraftHandleValue,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from 'draft-js';
import Prismjs from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import classnames from 'classnames';
import StyleControls from './StyleControls';
import decorators from './Decorator';
import blockRenderMap from './BlockRenderMap';
import utils from './utils';
import blockStyleFn from './BlockStyleFn';
import 'draft-js/dist/Draft.css';
import blockRenderer from './BlockRenderer';
import './style.scss';

export interface LantingEditorProps {
  readOnly?: boolean;
  rawContent?: EditorState;
  onChange?: (rawContent: EditorState) => void;
}

const LantingEditor: React.FC<LantingEditorProps> = ({
  readOnly,
  rawContent,
  onChange,
}) => {
  const editorRef = useRef<Editor>(null);
  const EmptyState = EditorState.createEmpty(decorators);
  const [editorState, setEditorState] = useState<EditorState>(EmptyState);

  useEffect(() => {
    if (!readOnly) {
      focusEditor();
    }
    Prismjs.highlightAll();
  }, [readOnly]);

  useEffect(() => {
    if (rawContent) {
      setEditorState(rawContent);
    }
  }, [rawContent]);

  const focusEditor = () => editorRef.current?.focus();

  const handleStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    console.log(convertToRaw(editorState.getCurrentContent()));

    if (onChange) {
      onChange(editorState);
    }
  };

  const handleTab = () => {
    if (utils.hasSelectionInBlock('code-block', editorState)) {
      handleStateChange(utils.onTabInCode(editorState));
    }
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    if (command === 'Tab') {
      handleTab();

      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const handleMouseUp = useCallback(() => {}, []);

  const handleFocus = () => {
    document.addEventListener(
      'selectionchange',
      handleMouseUp as unknown as EventListener
    );
  };

  const handleBlur = () => {
    document.removeEventListener(
      'selectionchange',
      handleMouseUp as unknown as EventListener
    );
  };

  const handleReturn = (
    event: KeyboardEvent<{}>,
    editorState: EditorState
  ): DraftHandleValue => {
    const currentBlock = utils.getCurrentBlock(editorState);

    if (['blockquote', 'code-block'].includes(currentBlock.getType())) {
      handleStateChange(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }

    return 'not-handled';
  };

  const handleKeyBinding = (event: KeyboardEvent) => {
    if (event.code === 'Tab') {
      return 'Tab';
    }

    return getDefaultKeyBinding(event);
  };

  return (
    <div
      className={classnames('lanting-editor', {
        'lanting-editor-hideplaceholder': utils.hidePlaceholder(editorState),
      })}
      id='lanting-editor'
    >
      {!readOnly && (
        <StyleControls onChange={handleStateChange} editorState={editorState} />
      )}
      <Editor
        ref={editorRef}
        readOnly={readOnly}
        placeholder='Your Story'
        onChange={handleStateChange}
        editorState={editorState}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blockRenderMap={blockRenderMap}
        blockRendererFn={blockRenderer(editorState)}
        blockStyleFn={blockStyleFn}
        handleKeyCommand={handleKeyCommand}
        handleReturn={handleReturn}
        keyBindingFn={handleKeyBinding}
      />
    </div>
  );
};

export default LantingEditor;
