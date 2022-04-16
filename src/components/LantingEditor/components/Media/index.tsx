import React from 'react';
import { ContentState, ContentBlock } from 'draft-js';
import './style.scss';

interface ImageProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Media: React.FC<ImageProps> = ({ contentState, block, ...props }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const type = entity.getType();
  const { url, name, height, width } = entity.getData();

  const aspectRatio = width / height;

  console.log(type, url, name, height, width);

  const renderMedia = () => {
    if (type === 'image') {
      return (
        <img
          style={{ aspectRatio: aspectRatio + '' }}
          src={url}
          alt={name}
          className='lanting-editor-media-image'
        />
      );
    }

    if (type === 'video') {
      return (
        <video src={url} className='lanting-editor-media-video' controls />
      );
    }

    return null;
  };

  return <div className='lanting-editor-media'>{renderMedia()}</div>;
};

export default Media;
