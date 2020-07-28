import { ContentBlock, ContentState } from 'draft-js';
import Prism from 'prismjs';
import React from 'react';
import Immutable from 'immutable';

interface PrismDecorator {
  highlighted: {
    [key: string]: any;
  };
}

function getLang(lang: string) {
  if (lang && Prism.languages[lang]) {
    return Prism.languages[lang];
  }

  return Prism.languages['javascript'];
}

function occupySlice(
  targetArr: any,
  start: number,
  end: number,
  componentKey: string
) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

class PrismDecorator {
  constructor() {
    this.highlighted = {};
  }

  getDecorations(
    block: ContentBlock,
    contentState: ContentState
  ): Immutable.List<string> {
    let offset = 0,
      tokenCount = 0;

    const type = block.getType();
    const text = block.getText();
    const blockKey = block.getKey();

    const decorations: Array<string> = Array(text.length).fill(null);

    if (!['code-block'].includes(type)) return Immutable.List(decorations);

    const preClassName = document
      .querySelector(`code[data-offset-key*='${blockKey}']`)
      ?.closest('pre[class*=language-]')?.className;

    const lang = preClassName
      ? /(?<=language-)\w+$/.exec(preClassName)
      : ['javascript'];

    const tokens = Prism.tokenize(text, getLang(lang ? lang[0] : ''));

    this.highlighted[blockKey] = {};

    const processToken = (
      decorations: Array<string>,
      token: Prism.Token | string,
      offset: number
    ) => {
      if (typeof token === 'string') {
        return;
      }

      const tokenId = 'tk' + tokenCount++;
      const resultId = blockKey + '-' + tokenId;

      this.highlighted[blockKey][tokenId] = token;
      occupySlice(decorations, offset, offset + token.length, resultId);

      let childOffset = offset;
      for (let i = 0; i < token.content.length; i++) {
        const childToken = (token.content as string)[i];
        processToken(decorations, childToken, childOffset);
        childOffset += childToken.length;
      }
    };

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      processToken(decorations, token, offset);
      offset += token.length;
    }

    return Immutable.List(decorations);
  }

  getComponentForKey(key: string): Function {
    return (props: { type: any; children: React.ReactNode }) => (
      <span className={`token ${props.type}`}>{props.children}</span>
    );
  }

  getPropsForKey(key: string): any {
    const [blockKey, tokenId] = key.split('-');
    const token = this.highlighted[blockKey][tokenId];

    return {
      type: token.type,
    };
  }
}

export default PrismDecorator;
