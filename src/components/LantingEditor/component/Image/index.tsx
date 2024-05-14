import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import { $isImageNode } from 'components/LantingEditor/nodes/ImageNode';
import {
  $getNodeByKey,
  $getSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  GridSelection,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import Resizer from './Resizer';
import { mergeRegister } from '@lexical/utils';
import { OPEN_GALLERY_COMMAND } from 'components/LantingEditor/plugins/GalleryPlugin';

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
  const [, setSelection] = useState<
    RangeSelection | NodeSelection | GridSelection | null
  >(null);
  const [editor] = useLexicalComposerContext();

  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const aspectRatio = useMemo(() => {
    if (typeof width === 'number' && typeof height === 'number') {
      return `${width} / ${height}`;
    }

    return 'auto';
  }, [width, height]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()));
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
        (payload) => {
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
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, isResizing, isSelected, nodeKey, setSelected]);

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

  const isFocused = isSelected || isResizing;

  return (
    <div draggable={!isFocused}>
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
        })}
        src={`${src}?imageView2/2/w/1000`}
        alt={alt}
        onClick={handleImageClick}
      />
      {isFocused && editor.isEditable() && (
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
