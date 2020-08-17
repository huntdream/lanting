import React from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import './style.scss';

interface ImageProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Image: React.FC<ImageProps> = ({ contentState, block, ...props }) => {
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  return <img src={src} alt='flower' className='lanting-editor-image' />;
};

export default Image;
