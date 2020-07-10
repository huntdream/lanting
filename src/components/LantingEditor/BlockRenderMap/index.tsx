import React from 'react';
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import Code from './Code';

const customBlockRender = Map({
  'code-block': {
    wrapper: <Code />,
  },
});

const blockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRender);

export default blockRenderMap;
