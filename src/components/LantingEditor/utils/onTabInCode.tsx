import { KeyboardEvent } from 'react';
import Draft, { EditorState } from 'draft-js';

const onTabInCode = (event: KeyboardEvent<{}>, editorState: EditorState) => {
  event.preventDefault();

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(startKey);
  const text = currentBlock.getText();

  const indention = '  ';

  let newState = null;

  if (selection.isCollapsed()) {
    newState = Draft.Modifier.insertText(contentState, selection, indention);
  } else {
    newState = Draft.Modifier.replaceText(contentState, selection, indention);
  }

  return Draft.EditorState.push(editorState, newState, 'insert-characters');
};

export default onTabInCode;
