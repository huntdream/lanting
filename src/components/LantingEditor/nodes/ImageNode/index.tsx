import Image from 'components/LantingEditor/component/Image';
import {
  DecoratorNode,
  LexicalEditor,
  NodeKey,
  createEditor,
  EditorConfig,
  LexicalNode,
  SerializedEditor,
  SerializedLexicalNode,
} from 'lexical';
import React, { ReactNode } from 'react';

export type SerializedImageNode = {
  caption: SerializedEditor;
  height?: number;
  maxWidth: number;
  showCaption: boolean;
  src: string;
  width?: number;
  type: 'image';
  version: 1;
} & SerializedLexicalNode;

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __width: 'inherit' | number;
  __height: 'inherit' | number;
  __maxWidth: number;
  __showCaption: boolean;
  __caption: LexicalEditor;
  __altText: string;

  static getType(): string {
    return 'image';
  }

  static importJSON(serializedNode: ImageNode): ImageNode {
    const node = $createImageNode(
      serializedNode.__src,
      serializedNode.__altText,
      serializedNode.__width,
      serializedNode.__height
    );

    return node;
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__key
    );
  }

  exportJSON(): SerializedImageNode {
    return {
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.__src,
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  constructor(
    src: string,
    maxWidth: number,
    width?: 'inherit' | number,
    height?: 'inherit' | number,
    showCaption?: boolean,
    caption?: LexicalEditor,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__maxWidth = maxWidth;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
    this.__altText = '';
  }

  setWidthAndHeight(
    width: 'inherit' | number,
    height: 'inherit' | number
  ): void {
    const writable: ImageNode = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  setShowCaption(showCaption: boolean): void {
    const writable: ImageNode = this.getWritable();
    writable.__showCaption = showCaption;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    console.log(this);
    return (
      <Image
        src={this.__src}
        alt={this.__altText}
        height={this.__height}
        width={this.__width}
      />
    );
  }
}

export function $createImageNode(
  src: string,
  altText: string,
  height: 'inherit' | number,
  width: 'inherit' | number
): ImageNode {
  return new ImageNode(src, 500, width, height);
}

export function $isImageNode(node?: LexicalNode): boolean {
  return node instanceof ImageNode;
}
