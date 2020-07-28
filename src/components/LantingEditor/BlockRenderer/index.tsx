import { ContentBlock, EditorState } from 'draft-js';
import Image from '../components/Image';

const blockRenderer = (editorState: EditorState) => (
  contentBlock: ContentBlock
) => {
  const type = contentBlock.getType();

  if (type === 'atomic') {
    return {
      component: Image,
      editable: false,
    };
  }

  return null;
};

export default blockRenderer;
