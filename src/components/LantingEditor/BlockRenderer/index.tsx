import { ContentBlock, EditorState } from 'draft-js';
import Media from '../components/Media';

const blockRenderer =
  (editorState: EditorState) => (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();

    if (type === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }

    return null;
  };

export default blockRenderer;
