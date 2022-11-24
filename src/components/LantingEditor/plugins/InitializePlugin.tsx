import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useEffect } from 'react';

interface Props {
  initialEditorState?: string;
}

const InitializePlugin: FC<Props> = ({ initialEditorState }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialEditorState) {
      try {
        const editorState = editor.parseEditorState(initialEditorState);
        editor.setEditorState(editorState);
      } catch (e) {}
    }
  }, [editor, initialEditorState]);

  return null;
};

export default InitializePlugin;
