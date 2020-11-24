import Error from './Error';

interface IText {
  Error: typeof Error;
}

const Text: IText = {
  Error,
};

export default Text;
