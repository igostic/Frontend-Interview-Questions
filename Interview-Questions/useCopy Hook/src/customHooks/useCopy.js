const useCopy = () => {
  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard is not enabled or available");
      return;
    }

    try {
      // writeText method copy the text
      // and paste it anywhere
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(`error while copying text: ${text}`, error);
    }
  };

  return [copy];
};

export default useCopy;
