import React, { ReactNode } from 'react';
import {
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import AudioPlayer from 'components/Audio';

export interface AudioPayload {
  src: string;
  key: NodeKey;
}

export type SerializedAudioNode = Spread<
  {
    src: string;
    duration: string;
  },
  SerializedLexicalNode
>;

export class AudioNode extends DecoratorNode<ReactNode> {
  __src: string;

  static getType(): string {
    return 'voice';
  }

  static clone(node: AudioNode): AudioNode {
    return new AudioNode(node.__src, node.__key);
  }

  constructor(src: string, key?: NodeKey) {
    super(key);
    this.__src = src;
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
    return <AudioPlayer src={this.__src} />;
  }
}

export function $createAudioNode({ src, key }: AudioPayload): AudioNode {
  return new AudioNode(src, key);
}

export function $isAudioNode(node?: LexicalNode): boolean {
  return node instanceof AudioNode;
}
