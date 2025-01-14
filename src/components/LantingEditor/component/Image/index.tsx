import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cls from 'classnames';
import { $isImageNode } from 'components/LantingEditor/nodes/ImageNode';
import {
  $getNodeByKey,
  $getSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  BaseSelection,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
  $isNodeSelection,
  DRAGSTART_COMMAND,
  $isRangeSelection,
  $setSelection,
  KEY_DELETE_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import Resizer from './Resizer';
import { mergeRegister } from '@lexical/utils';
import { OPEN_GALLERY_COMMAND } from 'components/LantingEditor/plugins/GalleryPlugin';
import brokenImage from 'assets/image-broken.svg';

import './style.scss';

interface Props {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  maxWidth?: number;
  nodeKey: string;
}

const Image: FC<Props> = ({ src, alt, width, height, maxWidth, nodeKey }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeEditorRef = useRef<LexicalEditor | null>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();
  const [hasError, setHasError] = useState(false);

  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const aspectRatio = useMemo(() => {
    if (typeof width === 'number' && typeof height === 'number') {
      return `${width} / ${height}`;
    }

    return 'auto';
  }, [width, height]);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      const deleteSelection = $getSelection();
      if (isSelected && $isNodeSelection(deleteSelection)) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        deleteSelection.getNodes().forEach((node) => {
          if ($isImageNode(node)) {
            node.remove();
          }
        });
      }
      return false;
    },
    [isSelected]
  );

  const onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection();
      const buttonElem = buttonRef.current;
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (buttonElem !== null && buttonElem !== document.activeElement) {
          event.preventDefault();
          buttonElem.focus();
          return true;
        }
      }
      return false;
    },
    [isSelected]
  );

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (buttonRef.current === event.target) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [editor, setSelected]
  );

  const onClick = useCallback(
    (payload: MouseEvent) => {
      const event = payload;

      if (isResizing) {
        return true;
      }
      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected);
        } else {
          clearSelection();
          setSelected(true);
        }
        return true;
      }

      return false;
    },
    [isResizing, isSelected, setSelected, clearSelection]
  );

  useEffect(() => {
    let isMounted = true;
    const rootElement = editor.getRootElement();
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        onClick,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_LOW)
    );

    return () => {
      isMounted = false;
      unregister();
    };
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    onEnter,
    onEscape,
    onClick,
    setSelected,
  ]);

  const onResizeEnd = (nextWidth: 'inherit' | number) => {
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const handleImageClick = () => {
    if (editor.isEditable()) return;

    editor.dispatchCommand(OPEN_GALLERY_COMMAND, { nodeKey, src });
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
  const isFocused = (isSelected || isResizing) && isEditable;

  return (
    <div draggable={draggable}>
      <img
        style={{
          aspectRatio,
          height,
          width,
          maxWidth,
        }}
        ref={imageRef}
        className={cls('lanting-editor-image', {
          'lanting-editor-image--focused': isFocused,
          'lanting-editor-image--draggable': $isNodeSelection(selection),
        })}
        src={hasError ? brokenImage : src}
        alt={alt}
        onClick={handleImageClick}
        draggable='false'
        onError={handleImageError}
      />
      {isFocused && $isNodeSelection(selection) && isFocused && (
        <Resizer
          onResizeEnd={onResizeEnd}
          onResizeStart={onResizeStart}
          editor={editor}
          imageRef={imageRef}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
};

export default Image;
