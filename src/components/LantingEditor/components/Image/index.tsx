import React from 'react';
import flower from 'assets/images/flower.jpg';
import { ContentState, ContentBlock } from 'draft-js';
import './style.scss';

interface ImageProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Image: React.FC<ImageProps> = ({ contentState, block }) => {
  console.log(contentState, block);
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();

  return <img src={src} alt='flower' className='lanting-editor-image' />;
};

export default Image;
