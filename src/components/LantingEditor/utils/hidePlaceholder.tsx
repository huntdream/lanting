import { EditorState } from 'draft-js';

const hidePlaceholder = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
    return (
      contentState
        .getBlockMap()
        .first()
        .getType() !== 'unstyled'
    );
  }

  return false;
};
export default hidePlaceholder;
