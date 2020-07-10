import { EditorState } from 'draft-js';

const getCurrentBlock = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  return contentState.getBlockForKey(startKey);
};

export default getCurrentBlock;
