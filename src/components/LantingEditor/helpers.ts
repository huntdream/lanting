export const getSelectionRange = () => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount === 1) {
    return selection.getRangeAt(0);
  }

  return null;
};
