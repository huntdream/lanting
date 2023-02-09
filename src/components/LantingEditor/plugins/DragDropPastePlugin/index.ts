import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { isMimeType, mediaFileReader } from '@lexical/utils';
import useUpload, { IFile } from 'hooks/useUpload';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect } from 'react';

import { INSERT_IMAGE_COMMAND } from '../ImagesPlugin';

const ACCEPTABLE_IMAGE_TYPES = [
  'image/',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/webp',
];

const DragDropPaste = () => {
  const [editor] = useLexicalComposerContext();
  const [upload] = useUpload();

  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x)
          );
          for (const { file } of filesResult) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              upload(file).then((result: IFile) => {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  height: 500,
                  width: 'inherit',
                  altText: file.name,
                  src: result.url,
                });
              });
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, upload]);

  return null;
};

export default DragDropPaste;
