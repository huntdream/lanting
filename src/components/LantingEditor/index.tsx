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
  ContentState,
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
  rawContent?: string;
  onChange?: (rawContent: ContentState) => void;
}

interface Position {
  x: number;
  y: number;
}

const LantingEditor: React.FC<LantingEditorProps> = ({
  rawContent,
  onChange,
}) => {
  const editorRef = useRef<Editor>(null);
  const EmptyState = EditorState.createEmpty(decorators);
  const [readOnly] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(EmptyState);

  useEffect(() => {
    if (!readOnly) {
      focusEditor();
    }
    Prismjs.highlightAll();
  }, [readOnly]);

  useEffect(() => {
    if (rawContent) {
      setEditorState(utils.convertToState(rawContent));
    }
  }, [rawContent]);

  const focusEditor = () => editorRef.current && editorRef.current.focus();

  const handleStateChange = (editorState: EditorState) => {
    setEditorState(editorState);

    if (onChange) {
      onChange(editorState.getCurrentContent());
    }
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // const getSelectionCoords = () => {
  //   const selectionRange = getSelectionRange();
  //   const editorBounds = document
  //     .getElementById('lanting-editor')
  //     ?.getBoundingClientRect();

  //   if (
  //     selectionRange &&
  //     selectionRange.startOffset !== selectionRange.endOffset &&
  //     editorBounds
  //   ) {
  //     const selectionBounds = selectionRange.getBoundingClientRect();

  //     const x = (selectionBounds.right + selectionBounds.left) / 2;
  //     const y = selectionBounds.top - 48;

  //     return { x, y };
  //   }

  //   return null;
  // };

  const handleMouseUp = useCallback(() => {
    // if (pos) {
    //   setInlineToolPos(pos)
    //   setShowInlineTool(true)
    // } else {
    //   setShowInlineTool(false)
    // }
  }, []);

  const handleFocus = () => {
    document.addEventListener(
      'selectionchange',
      (handleMouseUp as unknown) as EventListener
    );
  };

  const handleBlur = () => {
    document.removeEventListener(
      'selectionchange',
      (handleMouseUp as unknown) as EventListener
    );
  };

  const onTab = (event: KeyboardEvent<{}>) => {
    if (utils.hasSelectionInBlock('code-block', editorState)) {
      handleStateChange(utils.onTabInCode(event, editorState));
    }
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
        onTab={onTab}
        blockRenderMap={blockRenderMap}
        blockRendererFn={blockRenderer(editorState)}
        blockStyleFn={blockStyleFn}
        handleKeyCommand={handleKeyCommand}
        handleReturn={handleReturn}
      />
    </div>
  );
};

export default LantingEditor;
