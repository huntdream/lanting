import React from 'react';
import { ContentBlock } from 'draft-js';
import Code from '../BlockRenderMap/Code';

const blockRenderer = (contentBlock: ContentBlock) => {
  const type = contentBlock.getType();
  const text = contentBlock.getText();

  if (type === 'code-block') {
    // return {
    //   component: Code,
    //   editable: true,
    //   props: {
    //     children: text,
    //   },
    // };
  }
};

export default blockRenderer;
