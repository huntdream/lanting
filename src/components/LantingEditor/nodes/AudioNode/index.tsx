import React, { ReactNode } from 'react';
import {
  DecoratorNode,
  DOMConversionOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import AudioPlayer from 'components/Audio';

export interface AudioPayload {
  src: string;
  key?: NodeKey;
  name?: string;
}

export type SerializedAudioNode = Spread<
  {
    src: string;
    name?: string;
  },
  SerializedLexicalNode
>;

export class AudioNode extends DecoratorNode<ReactNode> {
  __src: string;
  __name?: string;

  static getType(): string {
    return 'audio';
  }

  static clone(node: AudioNode): AudioNode {
    return new AudioNode(node.__src, node.__name, node.__key);
  }

  constructor(src: string, name?: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__name = name;
  }

  getName() {
    return this.__name;
  }

  getSrc() {
    return this.__src;
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

  static importJSON(serializedNode: SerializedAudioNode): AudioNode {
    const { src, name } = serializedNode;

    const node = $createAudioNode({
      src,
      name,
    });

    return node;
  }

  exportJSON(): SerializedAudioNode {
    return {
      name: this.getName(),
      src: this.getSrc(),
      type: 'audio',
      version: 1,
    };
  }

  decorate(): ReactNode {
    return <AudioPlayer src={this.__src} name={this.__name} />;
  }
}

export function $createAudioNode({ src, name, key }: AudioPayload): AudioNode {
  return new AudioNode(src, name, key);
}

export function $isAudioNode(node?: LexicalNode): boolean {
  return node instanceof AudioNode;
}
