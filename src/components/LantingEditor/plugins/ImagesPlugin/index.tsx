import type { LexicalCommand } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  $isRootNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';
import { FC, useEffect } from 'react';

import {
  $createImageNode,
  ImageNode,
  ImagePayload,
} from '../../nodes/ImageNode';

export type InsertImagePayload = {
  altText: string;
  src: string;
  height: number | 'inherit';
  width: number | 'inherit';
};

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand();

const ImagesPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: ImagePayload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if ($isRootNode(selection.anchor.getNode())) {
            selection.insertParagraph();
          }

          const imageNode = $createImageNode(payload);
          selection.insertNodes([imageNode]);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);
  return null;
};

export default ImagesPlugin;
