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
  $createAudioNode,
  AudioNode,
  AudioPayload,
} from 'components/LantingEditor/nodes/AudioNode';

export const INSERT_AUDIO_COMMAND: LexicalCommand<Omit<AudioPayload, 'key'>> =
  createCommand();

const AudioPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([AudioNode])) {
      throw new Error('AudioPlugin: ImageNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_AUDIO_COMMAND,
      (payload: AudioPayload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if ($isRootNode(selection.anchor.getNode())) {
            selection.insertParagraph();
          }

          const audioNode = $createAudioNode(payload);
          selection.insertNodes([audioNode]);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);
  return null;
};

export default AudioPlugin;
