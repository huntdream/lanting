const createUID = () =>
  crypto.randomUUID().split('-')[0]

export default createUID;
