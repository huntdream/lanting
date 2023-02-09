const createUID = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substring(0, 6);

export default createUID;
