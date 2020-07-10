import { EditorState } from 'draft-js';
import getCurrentBlock from './getCurrentBlock';

const hasSelectionInBlock = (type: string, editorState: EditorState) => {
  const currentBlcok = getCurrentBlock(editorState);

  return currentBlcok.getType() === type;
};

export default hasSelectionInBlock;
