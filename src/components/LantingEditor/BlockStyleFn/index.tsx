import { ContentBlock } from 'draft-js';

const blockStyleFn = (contentBlock: ContentBlock) => {
  const type = contentBlock.getType();

  if (type === 'blockquote') {
    return 'myeditor-blockquote';
  }

  return '';
};

export default blockStyleFn;
