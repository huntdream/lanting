import Draft, { EditorState } from 'draft-js';

const onTabInCode = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();

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
