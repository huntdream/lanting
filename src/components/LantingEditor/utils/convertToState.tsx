import {
  convertFromHTML,
  ContentState,
  convertFromRaw,
  EditorState,
} from 'draft-js';

const convertToState = (content: string) => {
  try {
    const block = JSON.parse(content);
    console.log(block);
    return EditorState.createWithContent(convertFromRaw(block));
  } catch (e) {
    const blocksFromHTML = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(state);
  }
};

export default convertToState;
