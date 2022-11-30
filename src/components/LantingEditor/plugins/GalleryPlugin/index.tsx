import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Gallery from 'components/LantingEditor/component/Gallery';
import {
  $isImageNode,
  ImageNode,
} from 'components/LantingEditor/nodes/ImageNode';
import Modal from 'components/Modal';
import {
  $getRoot,
  $isParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import React, { useEffect, useState } from 'react';

interface Props {}

type ImagePayload = {
  nodeKey: string;
  src?: string;
};

export const OPEN_GALLERY_COMMAND: LexicalCommand<ImagePayload> =
  createCommand();

const GalleryPlugin: React.FC<Props> = () => {
  const [editor] = useLexicalComposerContext();
  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    editor.registerCommand(
      OPEN_GALLERY_COMMAND,
      (payload: ImagePayload) => {
        setVisible(true);
        editor.getEditorState().read(() => {
          const children = $getRoot().getChildren();
          const images: ImageNode[] = [];

          children.forEach((child) => {
            if ($isParagraphNode(child)) {
              const grandChildren = child.getChildren();
              grandChildren.forEach((it) => {
                if ($isImageNode(it)) {
                  images.push(it);
                }
              });
            }
          });

          setImages(images.map((it) => it.getSrc()));
          setCurrentImage(payload.src);
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return visible ? (
    <Gallery
      visible={visible}
      images={images}
      onClose={() => setVisible(false)}
      defaultActive={currentImage}
    />
  ) : null;
};

export default GalleryPlugin;
