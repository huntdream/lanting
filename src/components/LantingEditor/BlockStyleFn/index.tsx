import { ContentBlock } from 'draft-js';
import { customStyle } from '../StyleControls/BlockStyle';

const blockStyleFn = (contentBlock: ContentBlock) => {
  const type = contentBlock.getType();

  if (customStyle.findIndex((style) => style.style === type) !== -1) {
    return `lanting-editor-${type}`;
  }

  return '';
};

export default blockStyleFn;
